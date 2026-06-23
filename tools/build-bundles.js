const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const cssFiles = [
  'css/style.css',
  'css/premium-refine.css',
  'css/academic-framework.css',
  'css/detailed-sublessons.css',
  'css/live-ready.css',
  'css/seo-audit-fix.css',
  'css/path-course-filter.css',
  'css/extreme-density-lessons.css',
  'css/scholarly-density-lessons.css',
  'css/scholarly-density-2x.css',
  'css/portfolio-section.css',
  'css/plans-window-upgrade.css'
];

const jsFiles = [
  'js/script.js',
  'js/premium-refine.js',
  'js/academic-framework.js',
  'js/lesson-open-fix.js',
  'js/detailed-sublessons.js',
  'js/live-ready.js',
  'js/backend-checkout.js',
  'js/seo-audit-fix.js',
  'js/path-course-filter.js',
  'js/extreme-density-lessons.js',
  'js/scholarly-density-lessons.js',
  'js/scholarly-density-2x.js',
  'js/path-buttons-hard-fix.js',
  'js/course-levels-30-refined.js',
  'js/portfolio-section.js',
  'js/plans-window-upgrade.js',
  'js/stripe-plan-status.js',
  'js/final-stability-cleanup.js'
];

function readLayer(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error(`Missing source layer: ${file}`);
  return fs.readFileSync(full, 'utf8').replace(/\s+$/g, '');
}

function writeBundle(outFile, files, commentType) {
  const lines = [];
  const header = [
    'Creator Academy Hub generated runtime bundle.',
    'Do not reorder layers unless you understand the override chain.',
    'Source layer order is defined in tools/build-bundles.js.'
  ].join('\n');

  lines.push(commentType === 'css' ? `/*\n${header}\n*/` : `/*\n${header}\n*/`);
  for (const file of files) {
    lines.push('');
    lines.push(commentType === 'css' ? `/* ===== ${file} ===== */` : `/* ===== ${file} ===== */`);
    lines.push(readLayer(file));
  }
  lines.push('');

  fs.writeFileSync(path.join(root, outFile), lines.join('\n'), 'utf8');
  console.log(`Wrote ${outFile} from ${files.length} layers`);
}

writeBundle('css/academy.bundle.css', cssFiles, 'css');
writeBundle('js/academy.bundle.js', jsFiles, 'js');
