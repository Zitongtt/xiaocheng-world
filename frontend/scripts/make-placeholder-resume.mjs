// 生成占位简历 PDF：纯 ASCII + 标准字体，保证任何浏览器都能正常打开。
// 正式简历请用 Word「另存为 PDF」后覆盖 frontend/public/resume.pdf，此文件即可删除。
// 用法: node scripts/make-placeholder-resume.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../public/resume.pdf");

const LINES = [
  { size: 24, text: "Zitong Cheng", dy: 40 },
  { size: 11, text: "Hunan University", dy: 26 },
  { size: 11, text: "", dy: 34 },
  { size: 13, text: "The full resume is being prepared.", dy: 24 },
  { size: 11, text: "", dy: 30 },
  { size: 11, text: "For anything urgent, please reach out:", dy: 20 },
  { size: 13, text: "ztcheng@hnu.edu.cn", dy: 26 },
  { size: 11, text: "", dy: 40 },
  { size: 11, text: "This is my world. Still under construction.", dy: 20 },
];

const stream =
  "BT\n/F1 11 Tf 15 TL\n1 0 0 1 72 760 Tm\n" +
  LINES.map((l) => `/F1 ${l.size} Tf (${l.text}) Tj T*`).join("\n") +
  "\nET";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] " +
    "/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>",
  `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
];

const header = Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1");
const parts = [header];
const offsets = [];
let cursor = header.length;

objects.forEach((body, i) => {
  const buf = Buffer.from(`${i + 1} 0 obj\n${body}\nendobj\n`, "latin1");
  offsets.push(cursor);
  parts.push(buf);
  cursor += buf.length;
});

let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) xref += `${String(off).padStart(10, "0")} 00000 n \n`;
xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${cursor}\n%%EOF\n`;
parts.push(Buffer.from(xref, "latin1"));

const pdf = Buffer.concat(parts);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, pdf);
console.log(`written: ${outPath} (${pdf.length} bytes)`);
