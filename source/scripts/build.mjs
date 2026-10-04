import { build } from 'vite';
import { cp, readFile, rm, access, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const source = fileURLToPath(new URL('../', import.meta.url));
const destination = resolve(source, '..');
const staging = resolve(source, '.build');
// Preserve the source and original artwork; replace only generated files.
await access(resolve(destination, 'print-art'));
await access(resolve(destination, 'fonts'));
// Preserve the notices for runtime dependencies included in the browser bundle.
const lock = JSON.parse(await readFile(resolve(source, 'package-lock.json'), 'utf8'));
const notices = ['kikiau: third-party runtime notices\nFont notices: fonts/*-OFL.txt\nshadcn notice: source/vendor/shadcn-tailwind-4.13.0.LICENSE.md\n'];
notices.push(await readFile(resolve(source, 'vendor/shadcn-tailwind-4.13.0.LICENSE.md'), 'utf8'));
for (const [relative, entry] of Object.entries(lock.packages)) {
  if (!relative.startsWith('node_modules/') || entry.dev) continue;
  const directory = resolve(source, relative);
  let files;
  try { files = await readdir(directory); } catch { continue; }
  const name = JSON.parse(await readFile(resolve(directory, 'package.json'), 'utf8')).name;
  const licenses = files.filter(file => /^(licen[sc]e|copying|notice)(\.|$)/i.test(file));
  if (!licenses.length) {
    const supplemental = await readFile(resolve(source, 'vendor', name.replaceAll('/', '__') + '.LICENSE.txt'), 'utf8');
    notices.push(`\n--- ${name}@${entry.version} / supplemental license ---\n` + supplemental);
  }
  for (const file of licenses) {
    notices.push(`\n--- ${name}@${entry.version} / ${file} ---\n` + await readFile(resolve(directory, file), 'utf8'));
  }
}
await build({ configFile: resolve(source, 'vite.config.mjs') });
const html = await readFile(resolve(staging, 'index.html'), 'utf8');
if (!html.includes('./assets/') || html.includes('main.tsx')) {
  throw new Error('Unexpected build output. Existing published files were preserved.');
}
await rm(resolve(destination, 'assets'), { recursive: true, force: true });
await cp(resolve(staging, 'assets'), resolve(destination, 'assets'), { recursive: true });
await cp(resolve(staging, 'index.html'), resolve(destination, 'index.html'));
await writeFile(resolve(destination, 'THIRD-PARTY-NOTICES.txt'), notices.join('\n'));
await rm(staging, { recursive: true, force: true });
console.log('Ready: parent index.html and assets/ have been rebuilt. Upload the repository contents.');
