#!/usr/bin/env node
/**
 * Saksham FLN - Font Asset Downloader & Validator
 *
 * Downloads official, self-hosted WOFF2 font binaries for:
 * 1. Noto Sans Gujarati (Weights: 400, 500, 600, 700 - Gujarati & Latin subsets)
 * 2. Noto Sans Devanagari (Weights: 400, 500, 600, 700 - Devanagari & Latin subsets)
 * 3. Inter (Weights: 400, 500, 600, 700 - Latin & Latin-ext subsets)
 * 4. Official SIL Open Font License (OFL) notices for each family.
 *
 * Validates:
 * - HTTP 200 OK
 * - WOFF2 magic header bytes ('wOF2' / 0x774F4632)
 * - File size threshold (> 1KB) to ensure non-HTML payload
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')
const FONTS_DIR = path.join(ROOT_DIR, 'public', 'fonts')

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const LICENSES = [
  {
    name: 'INTER-OFL.txt',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt',
  },
  {
    name: 'NOTO-SANS-GUJARATI-OFL.txt',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansgujarati/OFL.txt',
  },
  {
    name: 'NOTO-SANS-DEVANAGARI-OFL.txt',
    url: 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansdevanagari/OFL.txt',
  },
]

const FONT_FAMILIES = [
  {
    name: 'Noto Sans Gujarati',
    slug: 'noto-sans-gujarati',
    weights: [
      { weight: '400', name: 'regular' },
      { weight: '500', name: 'medium' },
      { weight: '600', name: 'semibold' },
      { weight: '700', name: 'bold' },
    ],
    targetSubsets: ['gujarati', 'latin'],
  },
  {
    name: 'Noto Sans Devanagari',
    slug: 'noto-sans-devanagari',
    weights: [
      { weight: '400', name: 'regular' },
      { weight: '500', name: 'medium' },
      { weight: '600', name: 'semibold' },
      { weight: '700', name: 'bold' },
    ],
    targetSubsets: ['devanagari', 'latin'],
  },
  {
    name: 'Inter',
    slug: 'inter',
    weights: [
      { weight: '400', name: 'regular' },
      { weight: '500', name: 'medium' },
      { weight: '600', name: 'semibold' },
      { weight: '700', name: 'bold' },
    ],
    targetSubsets: ['latin', 'latin-ext'],
  },
]

async function fetchFontMetadata(familyApiName, weight) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(familyApiName)}:wght@${weight}&display=swap`
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) {
    throw new Error(`Failed to fetch CSS for ${familyApiName}@${weight}: HTTP ${res.status}`)
  }
  const css = await res.text()

  const rules = []
  const ruleRegex = /\/\*\s*([^*]+)\s*\*\/[\s\S]*?@font-face\s*\{([^}]+)\}/g
  let match
  while ((match = ruleRegex.exec(css)) !== null) {
    const subset = match[1].trim()
    const body = match[2]
    const urlMatch = body.match(/url\((https:\/\/[^)]+)\)/)
    const unicodeMatch = body.match(/unicode-range:\s*([^;]+);/)
    if (urlMatch) {
      rules.push({
        subset,
        url: urlMatch[1],
        unicodeRange: unicodeMatch ? unicodeMatch[1].trim() : '',
      })
    }
  }
  return rules
}

function isValidWoff2(buffer) {
  if (buffer.length < 4) return false
  const magic = buffer.toString('ascii', 0, 4)
  return magic === 'wOF2'
}

async function downloadBinary(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Download failed with HTTP ${res.status} for ${url}`)
  }
  const arrayBuf = await res.arrayBuffer()
  const buf = Buffer.from(arrayBuf)

  if (buf.length < 1000) {
    throw new Error(`File too small (${buf.length} bytes), likely error payload: ${url}`)
  }

  if (!isValidWoff2(buf)) {
    throw new Error(`Invalid WOFF2 signature header for ${url}`)
  }

  return buf
}

async function main() {
  console.log('====================================================')
  console.log(' Saksham FLN - Font Asset Downloader & Validator')
  console.log('====================================================\n')

  let totalBytes = 0
  let totalFiles = 0
  const manifest = []

  // Ensure output directories exist
  const dirs = [
    path.join(FONTS_DIR, 'inter'),
    path.join(FONTS_DIR, 'noto-sans-gujarati'),
    path.join(FONTS_DIR, 'noto-sans-devanagari'),
    path.join(FONTS_DIR, 'licenses'),
  ]
  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // 1. Download Font Binaries
  for (const fam of FONT_FAMILIES) {
    console.log(`--> Processing: ${fam.name}`)
    for (const w of fam.weights) {
      const rules = await fetchFontMetadata(fam.name, w.weight)

      for (const targetSubset of fam.targetSubsets) {
        const rule = rules.find((r) => r.subset === targetSubset)
        if (!rule) {
          console.warn(`  [WARN] Subset '${targetSubset}' not found for ${fam.name}@${w.weight}`)
          continue
        }

        let fileName = ''
        if (fam.slug === 'inter') {
          fileName = `inter-${targetSubset}-${w.name}.woff2`
        } else if (fam.slug === 'noto-sans-gujarati') {
          fileName = targetSubset === 'gujarati' ? `gujarati-${w.name}.woff2` : `gujarati-${targetSubset}-${w.name}.woff2`
        } else if (fam.slug === 'noto-sans-devanagari') {
          fileName = targetSubset === 'devanagari' ? `devanagari-${w.name}.woff2` : `devanagari-${targetSubset}-${w.name}.woff2`
        }

        const destPath = path.join(FONTS_DIR, fam.slug, fileName)

        console.log(`  Downloading ${fileName} (${targetSubset}, wght ${w.weight})...`)
        const buf = await downloadBinary(rule.url)
        fs.writeFileSync(destPath, buf)

        totalBytes += buf.length
        totalFiles += 1

        manifest.push({
          family: fam.name,
          slug: fam.slug,
          fileName,
          weight: w.weight,
          weightName: w.name,
          subset: targetSubset,
          unicodeRange: rule.unicodeRange,
          bytes: buf.length,
          relativePath: `/fonts/${fam.slug}/${fileName}`,
        })
      }
    }
  }

  // 2. Download OFL Licenses
  console.log('\n--> Downloading Official SIL Open Font License notices...')
  for (const lic of LICENSES) {
    const destPath = path.join(FONTS_DIR, 'licenses', lic.name)
    console.log(`  Fetching ${lic.name}...`)
    const res = await fetch(lic.url)
    if (!res.ok) throw new Error(`Failed to download ${lic.url}: HTTP ${res.status}`)
    const text = await res.text()
    fs.writeFileSync(destPath, text, 'utf8')
    totalBytes += Buffer.byteLength(text)
    totalFiles += 1
  }

  // 3. Write Manifest JSON for CSS Generator & Verification
  const manifestPath = path.join(FONTS_DIR, 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')

  console.log('\n====================================================')
  console.log(' Download Complete & Validated')
  console.log('====================================================')
  console.log(`Total Font & License Files: ${totalFiles}`)
  console.log(`Total Asset Size: ${(totalBytes / 1024).toFixed(1)} KB (${totalBytes} bytes)`)
  console.log(`Output Directory: ${FONTS_DIR}`)
  console.log('Manifest: public/fonts/manifest.json generated.\n')
}

main().catch((err) => {
  console.error('\n[FATAL ERROR]', err)
  process.exit(1)
})
