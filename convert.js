const fs = require('fs');
const path = require('path');
const OpenCC = require('opencc-js');

const mode = process.argv[2];      
const inputDir = process.argv[3];
const outputDir = process.argv[4];

if (!mode || !['s2t', 't2s'].includes(mode) || !inputDir || !outputDir) {
  console.error('Usage: node convert.js [s2t|t2s] [inputDir] [outputDir]');
  process.exit(1);
}

const converter = OpenCC.Converter({
  from: mode === 's2t' ? 'cn' : 'tw',
  to:   mode === 's2t' ? 'tw' : 'cn',
});

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  const fullPath   = path.join(inputDir, file);
  const outputFile = path.join(outputDir, file);

  if (
    fs.statSync(fullPath).isFile() &&
    path.extname(fullPath).toLowerCase() === '.txt'
  ) {
    const content   = fs.readFileSync(fullPath, 'utf-8');
    const converted = converter(content);    // sync API in opencc-js
    fs.writeFileSync(outputFile, converted, 'utf-8');
    console.log(` Converted: ${file}`);
  }
});
