const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
console.error('please provide a file path.');
process.exit(1);
}

try {
const content = fs.readFileSync(path.resolve(filePath), 'utf-8');
JSON.parse(content);
console.log('Valid JSON file.');
} catch (err) {
console.error('Invalid JSON: ', err.message);
}
