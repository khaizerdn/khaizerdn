export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 text-gray-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-sm font-light">
            © {currentYear} khaizerdn. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-light tracking-wide">
            Built with Next.js, Tailwind CSS, and deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  )
}

