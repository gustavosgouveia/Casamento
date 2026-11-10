// Recomprime imagens > 1 MB em public/ (in-place), limitando o lado maior a 2400px.
// Uso: node scripts/compress-images.mjs
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const LIMIT = 1024 * 1024;
const MAX_SIDE = 2400;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const before = (await stat(file)).size;
  if (before <= LIMIT) continue;

  // Lê para buffer: no Windows o sharp segura o handle do arquivo e impede sobrescrever.
  const img = sharp(await readFile(file)).rotate().resize(MAX_SIDE, MAX_SIDE, { fit: "inside", withoutEnlargement: true });
  // PNG mantém transparência (ex.: papel rasgado do contador); JPG vai para mozjpeg q80.
  const buf =
    ext === ".png"
      ? await img.png({ compressionLevel: 9, palette: true, quality: 85 }).toBuffer()
      : await img.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  if (buf.length < before) {
    await writeFile(file, buf);
    console.log(`${path.relative(ROOT, file)}: ${(before / 1e6).toFixed(1)} MB -> ${(buf.length / 1e6).toFixed(2)} MB`);
  }
}
