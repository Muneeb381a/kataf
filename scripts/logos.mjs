// Prepares the Al-Kausar logo files: trims the empty margin, sizes them for the web and makes a light version for dark backgrounds.
// Usage: node scripts/logos.mjs <mark.png> <full.png>
import sharp from "sharp";

const [markSrc, fullSrc] = process.argv.slice(2);
const out = "public/logo";

async function prep(src, width, name) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 12 })
    .resize({ width })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const img = () => sharp(Buffer.from(data), { raw: { width: w, height: h, channels: 4 } });

  // make near-white opaque pixels transparent (the source may carry a white background)
  const clean = Buffer.from(data);
  const light = Buffer.from(data);
  for (let i = 0; i < clean.length; i += 4) {
    const [r, g, b, a] = [clean[i], clean[i + 1], clean[i + 2], clean[i + 3]];
    const whiteness = Math.min(r, g, b);
    if (a > 0 && whiteness > 235) {
      clean[i + 3] = 0;
      light[i + 3] = 0;
      continue;
    }
    // soft edge: fade pixels that are partly white
    const fade = whiteness > 170 ? Math.round(255 * (1 - (whiteness - 170) / 65)) : 255;
    clean[i + 3] = Math.min(a, fade);
    light[i + 3] = Math.min(a, fade);
    const dark = g < 120; // dark green; the leaf green is brighter
    if (dark) {
      light[i] = 245; light[i + 1] = 240; light[i + 2] = 227; // paper
    } else {
      light[i] = 150; light[i + 1] = 214; light[i + 2] = 60; // leaf green, lifted for dark backgrounds
    }
  }
  const raw = (buf) => sharp(buf, { raw: { width: w, height: h, channels: 4 } });
  await raw(clean).png({ compressionLevel: 9 }).toFile(`${out}/${name}.png`);
  await raw(light).png({ compressionLevel: 9 }).toFile(`${out}/${name}-light.png`);
  console.log(name, w, h);
}

await prep(markSrc, 640, "alkausar-mark");
await prep(fullSrc, 1100, "alkausar");
