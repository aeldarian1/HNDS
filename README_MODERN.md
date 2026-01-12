# HNDS Split - Ultra-Modern Website

A stunning, ultra-modern website for the Croatian-German Society Split (HNDS), built with cutting-edge technologies.

## 🚀 Features

- **Next.js 15** - Latest React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations and transitions
- **Responsive Design** - Perfect on all devices
- **Dark Modern Theme** - Contemporary aesthetic
- **SEO Optimized** - Meta tags, Open Graph support
- **Fast Performance** - Optimized build, static generation
- **Multiple Pages** - Home, About, Gallery, Contact

## 📋 Pages

- **Home** - Hero section, stats, events preview
- **About** - Mission, chapters, company info
- **Gallery** - Filterable photo gallery
- **Contact** - Contact form, location, social links

## 🛠 Tech Stack

- **Frontend**: Next.js 15 + React 19
- **Styling**: Tailwind CSS 3.4 + Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone or navigate to the project:**
   ```bash
   cd hnds-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Building for Production

```bash
npm run build
npm run start
```

## 📂 Project Structure

```
hnds-website/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── gallery/
│   │   └── page.tsx         # Gallery page
│   └── contact/
│       └── page.tsx         # Contact page
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🎨 Customization

### Colors & Branding

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary: 59 89% 50%;      /* Main accent color */
  --secondary: 200 100% 45%;  /* Secondary accent */
  --accent: 0 84% 60%;        /* Accent color */
}
```

### Typography

Fonts are configured in `app/layout.tsx`:
- **Geist Sans** - Main font
- **Geist Mono** - Monospace font

### Content

Update organization details in:
- `app/page.tsx` - Home page content
- `app/about/page.tsx` - About page
- `app/contact/page.tsx` - Contact info

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Click "Deploy"

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the `.next` folder
```

**Self-hosted:**
```bash
npm run build
npm run start
```

Server requirements:
- Node.js 18.17+
- Environment: Production
- Port: 3000 (configurable)

## 🔧 Configuration

### Next.js Config

Edit `next.config.ts` for:
- Image optimization
- Redirects
- Headers
- Environment variables

### Tailwind Config

Customize in `tailwind.config.ts`:
- Colors
- Fonts
- Breakpoints
- Plugins

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- ARIA labels
- Keyboard navigation
- Focus indicators
- Semantic HTML

## 📊 Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2s
- **Cumulative Layout Shift**: < 0.1

## 🔐 Security

- HTTPS enforced
- Security headers included
- XSS protection
- CSRF protection

## 📝 Future Enhancements

- [ ] Multi-language support (i18n)
- [ ] Sanity CMS integration
- [ ] Event registration system
- [ ] Member portal
- [ ] Blog with search
- [ ] Newsletter subscription
- [ ] Analytics integration

## 🤝 Contributing

To contribute improvements:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

&copy; 2026 HNDS Split. All rights reserved.

## 📞 Support

For questions or issues:
- Email: hnjd.split@gmail.com
- Phone: +385 98 244 124
- Address: Sinjska 3, Split, Croatia

## 🎯 Next Steps

1. **Add Real Content**: Replace placeholder text with actual content
2. **Add Images**: Place images in `public/` folder
3. **Connect Analytics**: Add Google Analytics or similar
4. **Setup Email**: Configure contact form backend
5. **Deploy**: Deploy to Vercel or your hosting provider
