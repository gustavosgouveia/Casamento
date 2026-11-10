// Uso: node --test scripts/pix.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { crc16, pixPayload } from "../src/lib/pix.ts";

test("crc16 bate com o valor de referência CCITT-FALSE", () => {
  assert.equal(crc16("123456789"), "29B1");
});

test("payload tem campos corretos e CRC válido", () => {
  const p = pixPayload({ key: "fulano@exemplo.com", receiverName: "Samira e Gustavo", receiverCity: "Taubaté", amount: 90 });
  assert.ok(p.startsWith("000201"));
  assert.ok(p.includes("0014br.gov.bcb.pix0118fulano@exemplo.com"));
  assert.ok(p.includes("540590.00"));
  assert.ok(p.includes("5916SAMIRA E GUSTAVO"));
  assert.ok(p.includes("6007TAUBATE"));
  assert.ok(p.includes("62070503***"));
  assert.equal(p.slice(-4), crc16(p.slice(0, -4)));
});
