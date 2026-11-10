// Gera o "Pix copia e cola" (BR Code estático, padrão EMV do Banco Central) com valor fixo.
// Sem imports: scripts/pix.test.mjs importa este arquivo direto no Node.

interface PixInput {
  key: string;
  receiverName: string;
  receiverCity: string;
  amount: number;
  /** Identificador da transação (até 25 alfanuméricos). "***" = sem identificador. */
  txid?: string;
}

const field = (id: string, value: string) => id + String(value.length).padStart(2, "0") + value;

// Remove acentos/símbolos: o BR Code só aceita ASCII básico em nome e cidade.
const clean = (s: string, max: number) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, "").toUpperCase().slice(0, max);

/** CRC16-CCITT-FALSE (poly 0x1021, init 0xFFFF), exigido no campo 63. */
export function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function pixPayload({ key, receiverName, receiverCity, amount, txid = "***" }: PixInput): string {
  const body =
    field("00", "01") +
    field("26", field("00", "br.gov.bcb.pix") + field("01", key.trim())) +
    field("52", "0000") +
    field("53", "986") +
    field("54", amount.toFixed(2)) +
    field("58", "BR") +
    field("59", clean(receiverName, 25)) +
    field("60", clean(receiverCity, 15)) +
    field("62", field("05", txid.replace(/[^A-Za-z0-9*]/g, "").slice(0, 25) || "***")) +
    "6304";
  return body + crc16(body);
}
