// Downloads all assets for the amabillyegabriel.com clone into public/.
// Run: node scripts/download-assets.mjs
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = "https://www.amabillyegabriel.com";
const IK = "https://ik.imagekit.io/oe4ukkunu";
const PUBLIC = join(process.cwd(), "public");

// index-ordered remote gift filenames (exactly as hosted)
const GIFT_FILES = [
  "cortina-janela.jpg", "air fryer.jpg", "utensilios.jpg", "sobremesa.jpg", "faqueiro.jpg",
  "romantic-dinner.jpg", "potes.jpg", "ferro.jpg", "xícaras.jpg", "formas e assaddiras.jpg",
  "ventilador.jpg", "taças.jpg", "purificador.jpg", "varal-dobravel.jpg", "tábua de passar.jpg",
  "arroz.jpg", "jarras.jpg", "cortina.jpg", "mesa de centro.jpg", "liquidificador.jpg",
  "processador.jpg", "chaleira.jpg", "aspirador.jpg", "panela-pressao.jpg", "jogo-panelas.jpg",
  "copos.jpg", "banho.jpg", "almofadas.jpg", "arandela.jpg", "travessas.jpg",
  "aparelho de jantar.jpg", "cota-viagem-1.jpg", "cota-hospedagem-1.jpg", "mesa.jpg", "cadeira-escritorio.jpg",
  "cota-viagem-4.jpg", "bau.jpg", "sofa.jpg", "estante.jpg", "cota-hospedagem-2.jpg",
  "cristaleira.jpg", "cota-viagem-2.jpg", "escrivaninha.jpg", "cota-viagem-3.jpg", "ar.jpg",
  "colchao-king.jpg", "edredom.jpg", "travesseiros.jpg", "mesa-escritorio.jpg", "cafe.jpg",
  "roupa de cama.jpg", "fogão.jpg", "panela pressão.jpg", "sousplat.jpg", "robo.jpg",
  "microondas.jpg", "tapete.jpg", "maquina-de-lavar.jpg", "mixer.jpg", "cadeiras.jpg",
];

const pad = (n) => String(n).padStart(2, "0");

const jobs = [];

// Banners 01-08 (hero slideshow)
for (let i = 1; i <= 8; i++) jobs.push([`${ROOT}/banner/${pad(i)}.jpg`, `banner/${pad(i)}.jpg`]);

// Watercolor / nature panel backgrounds + misc root assets
for (const f of ["folha2.jpg", "tulipa.jpg", "girassol.jpg", "dandelion.jpg", "planta.jpg", "final.jpg",
                 "logo-teste2.png", "logo-teste.png", "favicon.png", "giftpage.jpg"]) {
  jobs.push([`${ROOT}/${f}`, f]);
}

// Save-the-date / our-story photos
for (const n of [41, 5, 111, 124, 65, 205]) {
  jobs.push([`${IK}/amabilly_gab_love_session-${n}.jpg`, `photos/love-session-${n}.jpg`]);
}

// Gift images -> gifts/gift-NN.jpg
GIFT_FILES.forEach((name, i) => {
  jobs.push([`${IK}/Giftlist/${encodeURIComponent(name)}`, `gifts/gift-${pad(i)}.jpg`]);
});

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function download([url, rel]) {
  const dest = join(PUBLIC, rel);
  if (await exists(dest)) return { rel, status: "skip" };
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return { rel, status: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    return { rel, status: `ok ${(buf.length / 1024).toFixed(0)}kb` };
  } catch (e) {
    return { rel, status: `ERR ${e.message}` };
  }
}

async function run() {
  const results = [];
  const BATCH = 6;
  for (let i = 0; i < jobs.length; i += BATCH) {
    const chunk = jobs.slice(i, i + BATCH);
    results.push(...await Promise.all(chunk.map(download)));
  }
  const bad = results.filter((r) => !/^(ok|skip)/.test(r.status));
  for (const r of results) console.log(`${r.status.padEnd(10)} ${r.rel}`);
  console.log(`\n${results.length} files, ${bad.length} problems`);
  if (bad.length) { console.log("PROBLEMS:"); bad.forEach((b) => console.log(`  ${b.rel} -> ${b.status}`)); }
}
run();
