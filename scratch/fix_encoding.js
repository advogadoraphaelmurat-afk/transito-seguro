import fs from 'fs';

const filePath = 'd:/transito seguro/App/web/src/index.css';
const content = fs.readFileSync(filePath, 'utf8');
fs.writeFileSync(filePath, content, { encoding: 'utf8' });
console.log('Fixed encoding for index.css');
