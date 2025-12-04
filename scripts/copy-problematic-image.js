const fs = require('fs')
const path = require('path')

// Copy the problematic WhitecloakLaunchPad.jpg to public folder
// This image has corrupted EXIF data that breaks Next.js image processing
const src = path.join(__dirname, '../features/programming/assets/WhitecloakLaunchPad.jpg')
const destDir = path.join(__dirname, '../public/assets/features/programming/assets')
const dest = path.join(destDir, 'WhitecloakLaunchPad.jpg')

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Copy the file
if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest)
  console.log('Copied WhitecloakLaunchPad.jpg to public folder')
} else {
  console.warn('Warning: WhitecloakLaunchPad.jpg not found in source')
}

