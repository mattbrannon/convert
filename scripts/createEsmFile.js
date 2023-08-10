const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const indexFile = path.join(srcDir, 'index.ts');

const fileContents = fs
  .readFileSync(indexFile, 'utf8')
  .split('\n')
  .filter((line) => !line.trim().startsWith('//'));

const exp = fileContents
  .filter((line) => line.startsWith('import'))
  .map((line) => {
    const words = line.split(' ');
    const dir = words[words.length - 1];
    return `export * from ${dir}`;
  });

const updatedContents = [ ...fileContents, ...exp ].join('\n');

const esmFile = path.join(srcDir, 'index.esm.ts');
fs.writeFileSync(esmFile, updatedContents, 'utf8');
