import fs from 'node:fs';

const d = JSON.parse(fs.readFileSync('out/dossier.json', 'utf8'));
console.log('Dossier keys:', Object.keys(d));
console.log('Cover name:', d.cover?.name, 'bytes:', d.cover?.bytes);
console.log('Images count:', d.images?.length);
d.images?.forEach((img: any) => console.log(' - image:', img.name, img.bytes, 'bytes'));
console.log('Schema:', d.schema);
console.log('Text length (bytes):', Buffer.byteLength(d.text, 'utf8'));

