import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'Semsas-web';
const SOURCE_DIR = process.env.IMAGE_SOURCE_DIR || path.join(process.cwd(), 'public', 'images');
const OUTPUT_DIR = process.env.IMAGE_OUTPUT_DIR || path.join(process.cwd(), '.tmp', 'compressed-images');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase env values. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
    } else if (/\.(jpe?g|png|webp|gif|avif)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const targetPath = path.join(OUTPUT_DIR, fileName);

  const image = sharp(filePath);
  const metadata = await image.metadata();
  const maxWidth = 2000;
  const shouldResize = (metadata.width && metadata.width > maxWidth) || !metadata.width;

  const pipeline = sharp(filePath)
    .rotate()
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .resize(shouldResize ? { width: maxWidth, withoutEnlargement: true, fit: 'inside' } : undefined);

  if (ext === '.png') {
    await pipeline.png({ quality: 80, compressionLevel: 8, progressive: true }).toFile(targetPath);
  } else if (ext === '.webp') {
    await pipeline.webp({ quality: 78, effort: 6 }).toFile(targetPath);
  } else if (ext === '.avif') {
    await pipeline.avif({ quality: 68, effort: 6 }).toFile(targetPath);
  } else {
    await pipeline.toFile(targetPath);
  }

  return targetPath;
}

async function uploadFile(filePath, remotePath) {
  const fileContent = await sharp(filePath).toBuffer();
  const { data, error } = await supabase.storage.from(STORAGE_BUCKET).upload(remotePath, fileContent, {
    upsert: true,
    contentType: 'image/jpeg',
  });

  if (error) {
    throw new Error(`Upload failed for ${remotePath}: ${error.message}`);
  }

  return data;
}

async function main() {
  await ensureDir(OUTPUT_DIR);
  const files = await collectFiles(SOURCE_DIR);

  if (files.length === 0) {
    console.log(`No image files found in ${SOURCE_DIR}`);
    return;
  }

  console.log(`Found ${files.length} image(s) in ${SOURCE_DIR}`);

  let uploaded = 0;
  for (const file of files) {
    const relative = path.relative(SOURCE_DIR, file);
    const cleaned = relative.split(path.sep).join('/');
    const compressedPath = await compressImage(file);
    const remotePath = cleaned.replace(/\\/g, '/');
    await uploadFile(compressedPath, remotePath);
    uploaded += 1;
    console.log(`Uploaded ${cleaned} -> ${remotePath}`);
  }

  console.log(`Completed upload: ${uploaded}/${files.length} images uploaded to bucket ${STORAGE_BUCKET}.`);
  console.log('Public URLs are available via Supabase Storage object URLs.');
}

main().catch((error) => {
  console.error('Upload failed:', error);
  process.exit(1);
});
