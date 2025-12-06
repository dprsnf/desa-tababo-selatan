# 🚀 Quick Start Guide - Desa Tababo Selatan Website

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Git

## ⚡ Installation (5 minutes)

### 1. Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd desa-tababo-selatan

# Install dependencies
npm install
```

### 2. Database Setup

```bash
# Create .env file
cp .env.example .env

# Edit .env with your database credentials
DATABASE_URL="postgresql://user:password@localhost:5432/desa_tababo"
JWT_SECRET="your-secret-key-here"

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# (Optional) Seed initial data
npx prisma db seed
```

### 3. Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎯 First Steps

### 1. Login as Admin

```
URL: http://localhost:3000/admin/login
Default credentials:
- Email: admin@desatababo.id
- Password: admin123
```

**⚠️ IMPORTANT**: Change default password immediately!

### 2. Update Basic Information

Navigate to: **Admin Dashboard** → **Edit Beranda**

1. Update Hero Section (title, tagline, description)
2. Update Statistics (population, area, etc.)
3. Save changes

### 3. Add Content

**High Priority Pages:**
- `/admin/edit/sejarah` - Village history
- `/admin/edit/keunggulan` - Village advantages
- `/admin/perangkat` - Add village staff

---

## 📂 Project Structure

```
desa-tababo-selatan/
├── app/
│   ├── (pages)/              # Public pages
│   │   ├── page.tsx          # Homepage
│   │   ├── sejarah/          # History page
│   │   └── keunggulan/       # Advantages page
│   ├── admin/                # Admin pages
│   │   ├── dashboard/
│   │   ├── edit/             # Edit pages
│   │   └── perangkat/        # Staff management
│   └── api/                  # API routes
│       ├── beranda/          # Homepage API
│       ├── sejarah/          # History API
│       └── upload/           # Image upload
├── components/               # Reusable components
│   ├── ImageUpload.tsx       # Image upload component
│   ├── Navbar.tsx            # Navigation
│   └── Footer.tsx            # Footer
├── lib/
│   ├── prisma.ts             # Prisma client
│   └── auth.ts               # Auth helpers
├── prisma/
│   └── schema.prisma         # Database schema
└── public/
    └── uploads/              # Uploaded images
```

---

## 🎨 Key Features

### ✅ Public Pages (Dynamic from DB)
- Beranda (Homepage)
- Sejarah (History)
- Keunggulan (Advantages)
- Struktur Organisasi (Organization)
- Kepala Desa Sebelumnya (Past Leaders)
- Pertanggungjawaban (Accountability)

### ✅ Admin Features
- Dashboard with stats
- Content management (WYSIWYG)
- Staff/Personnel management
- Image upload with optimization
- User-friendly forms

### ✅ Technical Features
- TypeScript for type safety
- Prisma ORM for database
- JWT authentication
- Image optimization (Sharp)
- Responsive design (Tailwind CSS)
- Framer Motion animations

---

## 🔧 Common Tasks

### Add New Admin User

```bash
npx prisma studio
# Navigate to User table → Add record
```

Or use API:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newadmin@example.com",
    "password": "securepassword",
    "nama": "Admin Name"
  }'
```

### Upload Image in Admin Form

1. Use `ImageUpload` component:
```tsx
import ImageUpload from "@/components/ImageUpload";

<ImageUpload
  value={foto}
  onChange={setFoto}
  label="Upload Foto"
  maxSize={5}
/>
```

2. Image auto-optimized and saved to `/public/uploads/`

### Update Database Schema

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name description_of_changes
# 3. Generate client
npx prisma generate
```

### View Database

```bash
npx prisma studio
# Opens GUI at http://localhost:5555
```

---

## 🌐 API Endpoints

### Public (No Auth)
```
GET  /api/beranda                    # Homepage data
GET  /api/sejarah                    # History
GET  /api/keunggulan                 # Advantages
GET  /api/struktur-organisasi        # Organization
GET  /api/kepala-desa-sebelumnya     # Past leaders
GET  /api/pertanggungjawaban-page    # Accountability
GET  /api/slider-publik              # Active sliders
GET  /api/faq                        # FAQs
```

### Admin (Auth Required)
```
PUT    /api/beranda                  # Update homepage
PUT    /api/sejarah                  # Update history
POST   /api/upload                   # Upload image
DELETE /api/upload?filename=xxx      # Delete image
POST   /api/faq                      # Create FAQ
PUT    /api/faq/[id]                 # Update FAQ
DELETE /api/faq/[id]                 # Delete FAQ
```

**Auth Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🐛 Troubleshooting

### Issue: Database connection failed
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify .env DATABASE_URL is correct
cat .env | grep DATABASE_URL

# Test connection
npx prisma db pull
```

### Issue: Image upload fails
```bash
# Check uploads folder exists and writable
ls -la public/uploads/

# Create if missing
mkdir -p public/uploads

# Check permissions
chmod 755 public/uploads
```

### Issue: Build fails
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install

# Regenerate Prisma
npx prisma generate

# Try build again
npm run build
```

### Issue: Authentication not working
```bash
# Check JWT_SECRET in .env
# Verify token in browser localStorage

# Clear browser data and re-login
localStorage.clear()
```

---

## 📱 Testing

### Manual Testing Checklist

**Public Pages:**
- [ ] Homepage loads with hero + stats
- [ ] Sejarah displays content
- [ ] Keunggulan shows categories
- [ ] All pages responsive on mobile
- [ ] Images load correctly

**Admin:**
- [ ] Login works
- [ ] Can update beranda content
- [ ] Can add new staff member
- [ ] Image upload works
- [ ] Changes reflect on public pages

**Performance:**
- [ ] Pages load < 3 seconds
- [ ] Images optimized
- [ ] No console errors

### Run Build Test

```bash
npm run build
# Should complete with 0 errors
```

---

## 🚀 Deployment

### Build for Production

```bash
# Build
npm run build

# Test production build locally
npm start

# Visit http://localhost:3000
```

### Environment Variables (Production)

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="change-this-to-random-string"
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Link PostgreSQL database (Vercel Postgres recommended)
```

### Deploy to VPS

```bash
# On server:
git clone <repo>
cd desa-tababo-selatan
npm install
npx prisma migrate deploy
npx prisma generate
npm run build

# Use PM2 to run
npm install -g pm2
pm2 start npm --name "desa-tababo" -- start
pm2 save
```

---

## 📚 Additional Resources

### Documentation
- `FINAL_INTEGRATION_COMPLETE.md` - Complete integration docs
- `PUBLIC_FRONTEND_INTEGRATION.md` - Frontend integration details
- `ADMIN_PAGES_GUIDE.md` - Admin pages guide

### Framework Docs
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Support
- Check GitHub Issues
- Review documentation files
- Contact development team

---

## 💡 Pro Tips

### Development
1. **Use Prisma Studio** for quick data inspection
2. **Check browser console** for client errors
3. **Check terminal** for server errors
4. **Clear .next folder** if weird issues occur

### Content Management
1. **Optimize images** before upload (< 2MB)
2. **Use descriptive filenames**
3. **Test on mobile** after changes
4. **Backup database** regularly

### Performance
1. Images auto-optimized to max 1920px
2. Thumbnails generated automatically
3. Use WebP format when possible
4. Lazy loading enabled by default

---

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create migration
npx prisma generate      # Generate client
npx prisma db seed       # Seed database

# Utilities
npm run lint             # Run ESLint
npm run format           # Format code (if configured)
```

---

## 🎉 You're Ready!

You now have:
- ✅ Working development environment
- ✅ Understanding of project structure
- ✅ Knowledge of key features
- ✅ Troubleshooting guide

**Next Steps:**
1. Login to admin panel
2. Update basic information
3. Add village content
4. Test all features
5. Deploy to production

**Need Help?**
- Read full documentation in project root
- Check API endpoints in `app/api/`
- Review component examples in `components/`

---

**Happy Coding! 🚀**

**Version**: 2.0  
**Last Updated**: December 2024