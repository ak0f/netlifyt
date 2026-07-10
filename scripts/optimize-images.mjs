import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import path from 'node:path'

const IMG_DIR = path.resolve('public/img')
const MAX_DIM = 1600          // cap the largest side (screenshots/photos)
const QUALITY = 80

const files = await readdir(IMG_DIR)

// UI assets that must keep their exact pixels / transparency untouched.
const KEEP_AS_IS = new Set(['logo.png', 'favicon.png', 'og.png'])

async function recompress(file) {
  const ext = path.extname(file).toLowerCase()
  const full = path.join(IMG_DIR, file)
  const before = (await stat(full)).size

  const img = sharp(full, { failOn: 'none' })
  const meta = await img.metadata()
  let pipe = (meta.width > MAX_DIM || meta.height > MAX_DIM)
    ? img.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    : img

  if (ext === '.png') {
    pipe = pipe.png({ compressionLevel: 9, quality: QUALITY, palette: true, effort: 8 })
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipe = pipe.jpeg({ quality: QUALITY, mozjpeg: true })
  } else if (ext === '.webp') {
    pipe = pipe.webp({ quality: QUALITY })
  } else {
    return
  }

  const tmp = full + '.tmp'
  await pipe.toFile(tmp)
  const after = (await stat(tmp)).size
  // keep the smaller of the two
  if (after < before) {
    await unlink(full)
    await rename(tmp, full)
  } else {
    await unlink(tmp)
  }
  console.log(`${file.padEnd(28)} ${(before / 1024).toFixed(0).padStart(7)} KB -> ${(Math.min(after, before) / 1024).toFixed(0).padStart(7)} KB`)
}

// 1) Recompress every existing asset in place (paths unchanged).
for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue
  if (KEEP_AS_IS.has(file)) continue
  if (file === 'akif.png') continue // handled separately below
  await recompress(file)
}

// 2) Founder photo: convert the 32 MB akif.png into a small, portrait-cropped WebP.
const akifSrc = path.join(IMG_DIR, 'akif.png')
try {
  await stat(akifSrc)
  const out = path.join(IMG_DIR, 'akif.webp')
  await sharp(akifSrc, { failOn: 'none' })
    .rotate() // respect EXIF orientation
    .resize({ width: 1000, height: 1250, fit: 'cover', position: 'entropy' })
    .webp({ quality: 82 })
    .toFile(out)
  const before = (await stat(akifSrc)).size
  const after = (await stat(out)).size
  console.log(`akif.png -> akif.webp          ${(before / 1024).toFixed(0).padStart(7)} KB -> ${(after / 1024).toFixed(0).padStart(7)} KB`)
  await unlink(akifSrc).catch(() => {})
} catch { /* no akif.png */ }

console.log('done')
