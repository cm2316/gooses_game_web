import fs from 'node:fs/promises';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';
export default async function generator(url = 'public/android-chrome-192x192.png') {
  try {
    const file = await fs.readFile(path.resolve('./', url));
    const { base64, color, css } = await getPlaiceholder(file);
    console.log(base64);
    console.log(color);
    console.log(css);
  } catch (err) {
    console.log(err);
  }
}
generator();
