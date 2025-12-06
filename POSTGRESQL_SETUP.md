# 🐘 PostgreSQL Setup Guide untuk Windows

## 📥 Instalasi PostgreSQL

### Opsi 1: Download Official Installer (Recommended)

1. **Download PostgreSQL**
   - Buka: https://www.postgresql.org/download/windows/
   - Klik "Download the installer"
   - Pilih versi terbaru (PostgreSQL 16+)
   - Download installer untuk Windows

2. **Install PostgreSQL**
   - Jalankan installer yang sudah didownload
   - **Port**: Biarkan default `5432`
   - **Superuser Password**: Masukkan password (misal: `postgres`)
   - **Locale**: Default (Indonesia atau English)
   - Centang semua komponen (PostgreSQL Server, pgAdmin, Command Line Tools)
   - Tunggu hingga instalasi selesai

3. **Verifikasi Instalasi**
   ```powershell
   # Buka PowerShell baru (restart terminal)
   psql --version
   ```

### Opsi 2: Install via Chocolatey (Lebih Cepat)

```powershell
# Install Chocolatey dulu jika belum ada
# Buka PowerShell sebagai Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install PostgreSQL
choco install postgresql16 -y

# Set password untuk user postgres
# Akan diminta saat instalasi
```

---

## 🔧 Setup Database untuk Proyek

### 1. Buka pgAdmin atau Command Line

**Via Command Line:**
```powershell
# Login sebagai postgres user
psql -U postgres

# Password: [password yang Anda set saat install]
```

### 2. Buat Database Baru

```sql
-- Di dalam psql prompt
CREATE DATABASE desa_tababo_selatan;

-- Cek database sudah dibuat
\l

-- Keluar dari psql
\q
```

**Via pgAdmin (GUI):**
1. Buka pgAdmin 4
2. Klik kanan pada "Databases"
3. Create → Database
4. Name: `desa_tababo_selatan`
5. Owner: `postgres`
6. Save

---

## ⚙️ Konfigurasi Proyek

### 1. Update File `.env`

```env
# Sesuaikan dengan kredensial Anda
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/desa_tababo_selatan?schema=public"
```

Ganti `YOUR_PASSWORD` dengan password PostgreSQL Anda.

### 2. Generate Prisma Client

```powershell
npx prisma generate
```

### 3. Push Database Schema

```powershell
# Buat tabel di database
npx prisma db push
```

### 4. Seed Data (Opsional)

```powershell
# Isi database dengan data awal
npm run db:seed
```

### 5. Buka Prisma Studio (Database GUI)

```powershell
# Lihat dan edit data via browser
npm run db:studio
```

---

## 🔍 Troubleshooting

### Error: "Connection refused"
```powershell
# Cek PostgreSQL service berjalan
Get-Service -Name postgresql*

# Jika tidak berjalan, start service
Start-Service postgresql-x64-16  # Sesuaikan dengan versi Anda
```

### Error: "Password authentication failed"
```powershell
# Reset password postgres user
psql -U postgres
ALTER USER postgres WITH PASSWORD 'new_password';
\q

# Update DATABASE_URL di .env dengan password baru
```

### Error: "Database does not exist"
```sql
-- Buat database via psql
psql -U postgres
CREATE DATABASE desa_tababo_selatan;
\q
```

### Port 5432 sudah digunakan
```powershell
# Cek aplikasi yang menggunakan port 5432
netstat -ano | findstr :5432

# Stop service lain atau ganti port PostgreSQL
```

---

## 📚 Command Cheatsheet

```powershell
# PostgreSQL Service
Get-Service postgresql*              # Cek status
Start-Service postgresql-x64-16      # Start service
Stop-Service postgresql-x64-16       # Stop service
Restart-Service postgresql-x64-16    # Restart service

# Prisma Commands
npx prisma generate                  # Generate client
npx prisma db push                   # Push schema ke DB
npx prisma db pull                   # Pull schema dari DB
npx prisma migrate dev               # Buat migration
npx prisma studio                    # Buka DB GUI
npm run db:seed                      # Seed data

# PostgreSQL Commands
psql -U postgres                     # Login ke PostgreSQL
psql -U postgres -d desa_tababo_selatan  # Login ke database spesifik

# Di dalam psql:
\l                                   # List databases
\c desa_tababo_selatan              # Connect to database
\dt                                  # List tables
\d table_name                        # Describe table
\q                                   # Quit
```

---

## 🎯 Next Steps

1. Install PostgreSQL
2. Buat database `desa_tababo_selatan`
3. Update `.env` dengan kredensial yang benar
4. Jalankan `npx prisma generate`
5. Jalankan `npx prisma db push`
6. Jalankan `npm run db:seed`
7. Jalankan `npm run dev`

**Selamat! Database PostgreSQL sudah siap digunakan! 🎉**
