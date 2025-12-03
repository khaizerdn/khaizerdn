export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-sm font-light">
            © {currentYear} khaizerdn. All rights reserved.
          </p>
          <p className="text-xs text-white font-light tracking-wide">
            Thank you for visiting. Let's create something amazing together.
          </p>
        </div>
      </div>
    </footer>
  )
}

