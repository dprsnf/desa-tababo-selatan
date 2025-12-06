# 🚀 Deployment Guide - Desa Tababo Selatan

## 📋 Pre-Deployment Checklist

- [ ] Semua environment variables sudah diset
- [ ] Database sudah dibuat dan accessible
- [ ] JWT_SECRET sudah di-generate (gunakan string random yang kuat)
- [ ] Admin user sudah dibuat di database
- [ ] Semua dependencies sudah terinstall
- [ ] Build berhasil tanpa error

---

## 🔧 Environment Variables

### Required Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database_name"

# Authentication
JWT_SECRET="your-very-long-and-secure-random-string-here"

# API (optional, default: /api)
NEXT_PUBLIC_API_URL="/api"

# Node Environment
NODE_ENV="production"
```

### Generate JWT Secret

```bash
# Linux/Mac
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🗄️ Database Setup

### 1. Create Database

```bash
# PostgreSQL
createdb desa_tababo_selatan

# atau via psql
psql -U postgres
CREATE DATABASE desa_tababo_selatan;
```

### 2. Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# atau untuk development
npx prisma migrate dev --name init
```

### 3. Seed Initial Data

Create admin user:

```bash
# Buat file seed.ts di prisma/seed.ts
npx prisma db seed
```

**prisma/seed.ts** example:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@desa.id' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@desa.id',
      password: hashedPassword,
      namaLengkap: 'Administrator',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to **package.json**:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

---

## 🏗️ Build & Run Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Access at http://localhost:3000
```

---

## ☁️ Deployment Options

### Option 1: Vercel (Recommended for Next.js)

#### Via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Via Dashboard:

1. Push code ke GitHub/GitLab/Bitbucket
2. Import project di [vercel.com](https://vercel.com)
3. Set environment variables di dashboard
4. Deploy!

**Environment Variables di Vercel:**
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_API_URL` (optional)

**Database Options for Vercel:**
- [Supabase](https://supabase.com) (PostgreSQL)
- [Neon](https://neon.tech) (PostgreSQL)
- [PlanetScale](https://planetscale.com) (MySQL)
- [Railway](https://railway.app)

---

### Option 2: VPS (Ubuntu/Debian)

#### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2
```

#### 2. Setup Database

```bash
sudo -u postgres psql

postgres=# CREATE DATABASE desa_tababo_selatan;
postgres=# CREATE USER desauser WITH PASSWORD 'your_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE desa_tababo_selatan TO desauser;
postgres=# \q
```

#### 3. Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd desa-tababo-selatan

# Create .env.production
cat > .env.production <<EOF
DATABASE_URL="postgresql://desauser:your_password@localhost:5432/desa_tababo_selatan"
JWT_SECRET="your-jwt-secret"
NODE_ENV="production"
EOF

# Install dependencies
npm install

# Build application
npm run build

# Run migrations
npx prisma migrate deploy

# Start with PM2
pm2 start npm --name "desa-tababo-selatan" -- start
pm2 save
pm2 startup
```

#### 4. Setup Nginx (optional)

```bash
sudo apt install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/desa-tababo-selatan
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/desa-tababo-selatan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 3: Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/desa_tababo_selatan
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: desa_tababo_selatan
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Build & Run:**

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma migrate deploy

# View logs
docker-compose logs -f
```

---

## 🔍 Post-Deployment Verification

### 1. Health Checks

```bash
# Check if app is running
curl http://your-domain.com

# Check API
curl http://your-domain.com/api/health
```

### 2. Login Test

1. Navigate to `http://your-domain.com/admin/login`
2. Login dengan credentials admin
3. Verify semua halaman accessible
4. Test create, edit, delete operations

### 3. Database Connection

```bash
# Connect to production database
npx prisma studio --schema=./prisma/schema.prisma

# View data
psql $DATABASE_URL
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs desa-tababo-selatan

# Monitor
pm2 monit

# Restart
pm2 restart desa-tababo-selatan
```

### Logs Location

```bash
# Next.js logs
~/.pm2/logs/

# Nginx logs
/var/log/nginx/access.log
/var/log/nginx/error.log
```

---

## 🔐 Security Checklist

- [ ] Environment variables tidak di-commit ke repository
- [ ] JWT_SECRET cukup panjang dan random
- [ ] Database password kuat
- [ ] SSL/HTTPS sudah aktif
- [ ] Firewall dikonfigurasi dengan benar
- [ ] Database tidak accessible dari internet (kecuali via app)
- [ ] Regular backups database
- [ ] Rate limiting untuk API endpoints (optional)
- [ ] Update dependencies secara regular

---

## 💾 Backup & Restore

### Database Backup

```bash
# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup (cron)
0 2 * * * pg_dump $DATABASE_URL > /backups/db_$(date +\%Y\%m\%d).sql
```

### Restore

```bash
psql $DATABASE_URL < backup_20240101.sql
```

---

## 🔄 Updates & Maintenance

### Update Application

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Rebuild
npm run build

# Restart
pm2 restart desa-tababo-selatan
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name description

# Deploy to production
npx prisma migrate deploy

# Reset database (DANGER!)
npx prisma migrate reset
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Database connection error**
```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL
```

**2. Build errors**
```bash
# Clear cache
rm -rf .next
npm run build
```

**3. Prisma issues**
```bash
# Regenerate client
npx prisma generate

# View schema
npx prisma studio
```

**4. Port already in use**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

## 📞 Support

- **Documentation**: Check `ADMIN_PAGES_GUIDE.md`
- **Session Summary**: Check `SESSION_COMPLETION_SUMMARY.md`
- **Issues**: Create issue di repository
- **Email**: admin@desa.id (update sesuai kontak Anda)

---

## 🎉 Quick Start Commands

```bash
# Development
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Production
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
npm start

# Docker
docker-compose up -d
docker-compose exec app npx prisma migrate deploy
```

---

**Happy Deploying! 🚀**