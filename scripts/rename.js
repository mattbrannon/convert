const fs = require('fs');
const path = require('path');

const esmDir = path.join(__dirname, '..', 'dist', 'esm');

const isDirectory = (dir) =>
  fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();

(function find(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (isDirectory(filePath)) {
      find(filePath);
    }
    else if (file.endsWith('.js')) {
      const { dir, name } = path.parse(filePath);
      const newFilePath = path.join(dir, `${name}.mjs`);

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const newFileContents = fileContents.replace(/\.js/g, '.mjs');

      fs.writeFileSync(filePath, newFileContents, 'utf8');
      fs.renameSync(filePath, newFilePath);
    }
  });
})(esmDir);
