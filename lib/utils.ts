/**
 * Base path for GitHub Pages deployment
 * This should match the basePath in next.config.js
 */
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/khaizerdn' : ''

/**
 * Prefix an asset path with the base path if needed
 * @param path - The asset path (e.g., '/certificates/image.jpg')
 * @returns The path with basePath prefix if in production
 */
export function assetPath(path: string): string {
  if (!BASE_PATH) {
    return path
  }
  // Ensure path starts with /, then append basePath
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BASE_PATH}${cleanPath}`
}

