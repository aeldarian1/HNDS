# HNDS Website - Configuration Guide

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id

# Contact Form (if using external service)
NEXT_PUBLIC_FORM_ENDPOINT=https://your-api.com/submit

# CMS Integration (future)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Quick Start Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Deployment
vercel              # Deploy to Vercel (with Vercel CLI)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority
/>
```

### Code Splitting

Automatic with Next.js App Router

### Caching

- Static pages: Cached indefinitely
- Dynamic routes: Cache as needed
- API: Configure in route handlers

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** - Built-in
2. **Google Analytics 4** - Free
3. **Sentry** - Error tracking
4. **Hotjar** - User behavior

### Setup Google Analytics

1. Create GA4 property
2. Add `NEXT_PUBLIC_GA_ID` to `.env.local`
3. Implement gtag tracking

## Maintenance

### Regular Tasks

- **Weekly**: Check error logs
- **Monthly**: Security updates
- **Quarterly**: Performance audit
- **Yearly**: SEO review

### Backup

- GitHub repo is primary backup
- Vercel maintains deployment history
- Database backups (if using CMS)

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Slow Performance

```bash
# Analyze bundle
npm run build -- --profile
```

### TypeScript Errors

```bash
# Generate types
npx tsc --noEmit
```

## Scaling

### When Traffic Increases

1. Enable Vercel Pro (auto-scaling)
2. Implement ISR for dynamic pages
3. Add CDN for static assets
4. Monitor build time

### Database Considerations

If adding database:
- Use connection pooling
- Implement caching
- Monitor query performance

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables protected
- [ ] Input validation on forms
- [ ] Rate limiting on API routes
- [ ] CORS properly configured
- [ ] Dependencies updated
- [ ] Regular security audits

## Development Workflow

1. Create feature branch
2. Run `npm run dev`
3. Make changes
4. Test in multiple browsers
5. Run `npm run build` to verify
6. Commit and push
7. Deploy via Vercel

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Docs](https://vercel.com/docs)

## Support & Updates

Check these resources regularly:
- GitHub Releases
- Next.js Blog
- Dependencies security alerts
- Vercel status page

---

**Last Updated**: January 2026
**Version**: 1.0.0
