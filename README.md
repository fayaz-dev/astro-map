# Astro Creative Developer Blog

A visually stunning, responsive developer blog built with Astro, featuring an interactive Three.js mind map that visualizes how blog posts connect through tags and relationships.

## ✨ Features

### 🎨 Design & User Experience
- **Modern, Creative Design**: Apple-level design aesthetics with attention to detail
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Dark/Light Mode**: Automatic theme switching with user preference
- **Smooth Animations**: Thoughtful micro-interactions and transitions
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support

### 🧠 Interactive Mind Map
- **3D Visualization**: Interactive Three.js-powered mind map of blog posts
- **Smart Connections**: Auto-generated relationships based on tags and explicit links
- **Clickable Navigation**: Click nodes to navigate directly to posts
- **Responsive Controls**: Touch-friendly on mobile, mouse/keyboard on desktop
- **Performance Optimized**: Respects `prefers-reduced-motion` settings

### 📝 Content Management
- **Markdown-Powered**: Write posts in Markdown with rich frontmatter
- **Content Collections**: Type-safe content with Zod schema validation
- **Tag System**: Organize posts with tags and automatic filtering
- **Related Posts**: Explicit and automatic post relationships
- **Reading Time**: Auto-calculated reading time estimates

### 🚀 Performance & SEO
- **Static Site Generation**: Lightning-fast loading with Astro
- **Image Optimization**: Lazy loading with blur-up placeholders
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD structured data
- **RSS Feed**: Automatic RSS feed generation
- **Sitemap**: Auto-generated XML sitemap

### 🛠 Developer Experience
- **TypeScript**: Full type safety throughout the codebase
- **Modern Tooling**: ESLint, Prettier, and Tailwind CSS
- **Component Architecture**: Reusable, maintainable components
- **Build Optimization**: Code splitting and tree shaking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/astro-creative-blog.git
   cd astro-creative-blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

## 🏗 Local Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
- `pnpm generate:mindmap` - Generate mind map data (runs automatically during build)

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── MindMapVisualization.tsx
│   └── ...
├── content/            # Blog posts and content
│   ├── blog/           # Blog post markdown files
│   └── config.ts       # Content collection configuration
├── layouts/            # Page layouts
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── pages/              # Route pages
│   ├── index.astro     # Homepage
│   ├── blog/           # Blog pages
│   └── about.astro
├── scripts/            # Build scripts
│   └── generate-mindmap.ts
├── styles/             # Global styles
│   └── global.css
└── utils/              # Utility functions
    └── date.ts
```

## 🌐 Netlify Setup & Deployment

### Automatic Deployment

1. **Connect to Netlify**
   - Push your code to GitHub
   - Connect your repository to Netlify
   - Netlify will automatically detect the Astro configuration

2. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Environment Variables**
   Set any required environment variables in Netlify dashboard

### Manual Deployment

```bash
# Build the project
pnpm build

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod --dir=dist
```

### Custom Domain

1. Add your custom domain in Netlify dashboard
2. Update `site` URL in `astro.config.mjs`
3. Redeploy the site

## ✍️ Adding Blog Posts

### Creating a New Post

1. **Create a new markdown file** in `src/content/blog/`
   ```bash
   touch src/content/blog/my-new-post.md
   ```

2. **Add frontmatter** with required fields:
   ```markdown
   ---
   title: "Your Post Title"
   description: "A brief description of your post"
   publishDate: 2025-01-15
   tags: ["javascript", "tutorial", "web-development"]
   featured: false
   author: "Your Name"
   image: "https://example.com/image.jpg"
   imageAlt: "Description of the image"
   related: ["other-post-slug", "another-post-slug"]
   category: "tutorial"
   ---

   # Your Post Title

   Your content here...
   ```

3. **Required frontmatter fields:**
   - `title`: Post title
   - `description`: Meta description
   - `publishDate`: Publication date
   - `tags`: Array of tags
   - `author`: Author name

4. **Optional frontmatter fields:**
   - `updatedDate`: Last updated date
   - `featured`: Show on homepage (boolean)
   - `draft`: Hide from production (boolean)
   - `image`: Featured image URL
   - `imageAlt`: Image alt text
   - `related`: Array of related post slugs
   - `category`: Post category

### Mind Map Relationships

Posts are automatically connected in the mind map through:

1. **Shared Tags**: Posts with common tags are linked
2. **Explicit Relations**: Use the `related` frontmatter field
3. **Category Connections**: Posts in the same category are connected

The mind map data is automatically generated during the build process.

## 🎨 Typography Guidelines

### Font Stack
- **Sans-serif**: Inter (headings and UI)
- **Serif**: Crimson Pro (body text in articles)
- **Monospace**: JetBrains Mono (code)

### Type Scale
- **Headings**: Use semantic HTML (h1-h6) with consistent sizing
- **Body Text**: 18px base size with 1.7 line height
- **Small Text**: 14px for metadata and captions

### Best Practices
- Maximum line length of 70 characters for readability
- Sufficient color contrast (4.5:1 minimum)
- Consistent vertical rhythm using 8px grid system

## 🔧 Customization

### Colors
Edit the color palette in `tailwind.config.mjs`:

```javascript
colors: {
  primary: {
    // Your primary color scale
  },
  secondary: {
    // Your secondary color scale
  }
}
```

### Components
All components are in `src/components/` and can be customized:

- `Header.astro` - Site navigation
- `Footer.astro` - Site footer
- `MindMapVisualization.tsx` - 3D mind map
- `HeroSection.astro` - Homepage hero

### Styling
Global styles are in `src/styles/global.css` using Tailwind CSS.

## 🐛 FAQ & Troubleshooting

### Common Issues

**Q: Mind map not loading**
A: Ensure the `mindmap.json` file is generated during build. Run `pnpm generate:mindmap` manually if needed.

**Q: Images not displaying**
A: Check that image URLs are accessible and use HTTPS. Consider using a CDN for better performance.

**Q: Build failing on Netlify**
A: Verify Node.js version is 18+ and all dependencies are properly installed.

**Q: Dark mode not working**
A: Check that the theme toggle script is loaded and localStorage is accessible.

### Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minimize JavaScript**: Only load what's necessary for each page
3. **Use CDN**: Serve static assets from a CDN
4. **Monitor Core Web Vitals**: Use Lighthouse and real user monitoring

### Getting Help

- Check the [Astro documentation](https://docs.astro.build)
- Review [Three.js documentation](https://threejs.org/docs)
- Open an issue on GitHub for bugs
- Join the Astro Discord for community support

## 📄 Credits & License

### Built With
- [Astro](https://astro.build) - Static site generator
- [Three.js](https://threejs.org) - 3D graphics library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Preact](https://preactjs.com) - Lightweight React alternative

### Images
- Stock photos from [Pexels](https://pexels.com)
- Icons from [Heroicons](https://heroicons.com)

### License
MIT License - see [LICENSE](LICENSE) file for details.

### Contributing
Contributions are welcome! Please read the contributing guidelines and submit pull requests for any improvements.

---

**Happy blogging!** 🚀

Built with ❤️ using Astro and modern web technologies.