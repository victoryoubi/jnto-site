// generate-env.js
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'opproject-459908-credentials.json');
const outputPath = path.join(__dirname, '.env.local');

try {
  const raw = fs.readFileSync(inputPath, 'utf-8');
  const escaped = raw
    .replace(/\\/g, '\\\\')     // バックスラッシュをエスケープ
    .replace(/\n/g, '\\n')      // 改行をエスケープ
    .replace(/"/g, '\\"');      // ダブルクォートをエスケープ

  const envContent = `GOOGLE_CREDENTIALS="{${escaped.slice(1, -1)}}"\n`; // ダブルクォートで囲ってJSON文字列に

  fs.writeFileSync(outputPath, envContent);
  console.log('.env.local regenerated ✅');
} catch (error) {
  console.error('❌ 再生成失敗');
  console.error(error.message);
}
