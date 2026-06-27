/** Serialisiert JSON-LD sicher für <script>-Einbettung: neutralisiert Tag-Breakouts. */

// U+2028 (Line Separator) und U+2029 (Paragraph Separator) sind in JS-Strings
// gueltige Zeilenumbrueche und koennen Inline-Scripts brechen. Per Code-Point
// erzeugt, damit der Quelltext rein ASCII bleibt.
const LINE_SEP = new RegExp(String.fromCharCode(0x2028), 'g')
const PARA_SEP = new RegExp(String.fromCharCode(0x2029), 'g')

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(LINE_SEP, '\\u2028')
    .replace(PARA_SEP, '\\u2029')
}
