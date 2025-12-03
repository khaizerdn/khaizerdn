# khaizerdn - Personal Portfolio

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and deployed on GitHub Pages.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Works seamlessly on all devices
- **Fast Performance**: Optimized for speed with Next.js static export
- **SEO Optimized**: Built-in SEO metadata and Open Graph tags
- **Smooth Animations**: Powered by Framer Motion
- **Easy to Customize**: Well-structured codebase for easy modifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khaizerdn/khaizerdn.git
   cd khaizerdn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`)
   - Update name, title, and description
   - Update social media links

2. **About Section** (`components/About.tsx`)
   - Modify the about text and features

3. **Skills Section** (`components/Skills.tsx`)
   - Update skill categories and proficiency levels

4. **Projects Section** (`components/Projects.tsx`)
   - Replace with your actual projects
   - Update GitHub and live demo links

5. **Contact Section** (`components/Contact.tsx`)
   - Update contact information
   - Add your email, GitHub, LinkedIn, etc.

6. **Metadata** (`app/layout.tsx`)
   - Update SEO metadata, title, and description

### Update Repository Name

If your GitHub repository name is different from `khaizerdn`, update the `basePath` and `assetPrefix` in `next.config.js`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

### Color Scheme

The color scheme uses a primary blue theme. To change it, update the `primary` color values in `tailwind.config.js`.

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys your site when you push to the `main` branch.

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Wait for deployment**
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at `https://yourusername.github.io/khaizerdn`

### Option 2: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `out` folder**
   - The build process creates an `out` folder
   - You can deploy this folder to GitHub Pages manually or use the provided script:
   ```bash
   npm run deploy
   ```

## 📝 Project Structure

```
khaizerdn/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills section
│   ├── Projects.tsx        # Projects section
│   ├── Contact.tsx         # Contact section
│   └── Footer.tsx          # Footer
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (for testing)
- `npm run export` - Build and export static site
- `npm run deploy` - Build and deploy to GitHub Pages (manual)

## 📱 Contact Form Integration

Since GitHub Pages doesn't support server-side code, you can integrate third-party form services:

- **Formspree**: [https://formspree.io](https://formspree.io)
- **GetForm**: [https://getform.io](https://getform.io)
- **Netlify Forms**: [https://www.netlify.com/products/forms/](https://www.netlify.com/products/forms/)

Example integration with Formspree:

```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" placeholder="Your email" />
  <textarea name="message" placeholder="Your message"></textarea>
  <button type="submit">Send</button>
</form>
```

## 🎯 Next Steps

1. Customize all sections with your personal information
2. Add your actual projects with screenshots
3. Update social media links
4. Configure contact form (optional)
5. Update repository name in `next.config.js` if needed
6. Deploy to GitHub Pages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by khaizerdn

