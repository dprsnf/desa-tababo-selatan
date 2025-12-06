#!/bin/bash

# Quick Start Script for Website Content Tables Migration
# Desa Tababo Selatan - Content Management System

echo "🚀 Starting Database Migration for Website Content Tables..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ Error: npx not found. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Step 1: Generate Prisma Client
echo -e "${BLUE}📦 Step 1: Generating Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma Client generated successfully!${NC}"
else
    echo -e "${RED}❌ Failed to generate Prisma Client${NC}"
    exit 1
fi
echo ""

# Step 2: Create Migration
echo -e "${BLUE}📊 Step 2: Creating database migration...${NC}"
echo -e "${YELLOW}Migration name: add_website_content_tables${NC}"
npx prisma migrate dev --name add_website_content_tables
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migration created and applied successfully!${NC}"
else
    echo -e "${RED}❌ Migration failed${NC}"
    exit 1
fi
echo ""

# Step 3: Verify Tables
echo -e "${BLUE}🔍 Step 3: Verifying new tables...${NC}"
echo -e "${YELLOW}New tables added:${NC}"
echo "  • HeroSection"
echo "  • ProfileDesa"
echo "  • Gallery"
echo "  • FAQ"
echo "  • Slider"
echo "  • Pengaduan"
echo "  • DokumenPublik"
echo "  • PotensiDesa"
echo ""

# Step 4: Optional - Seed Data
echo -e "${BLUE}📝 Step 4: Seed Initial Data (Optional)${NC}"
read -p "Do you want to seed initial content data? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -f "prisma/seed-content.ts" ]; then
        echo -e "${YELLOW}Running seed script...${NC}"
        npx prisma db seed
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Data seeded successfully!${NC}"
        else
            echo -e "${YELLOW}⚠️  Seed script not configured or failed${NC}"
            echo -e "${YELLOW}   You can manually create seed data later${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Seed file not found: prisma/seed-content.ts${NC}"
        echo -e "${YELLOW}   Create the file if you want to seed initial data${NC}"
    fi
fi
echo ""

# Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Migration Completed Successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📚 Next Steps:${NC}"
echo ""
echo "  1. Start development server:"
echo -e "     ${YELLOW}npm run dev${NC}"
echo ""
echo "  2. View database in Prisma Studio:"
echo -e "     ${YELLOW}npx prisma studio${NC}"
echo ""
echo "  3. Start implementing admin pages:"
echo -e "     ${YELLOW}See NEW_ADMIN_PAGES_TODO.md for priority list${NC}"
echo ""
echo "  4. Check documentation:"
echo -e "     ${YELLOW}• WEBSITE_CONTENT_TABLES.md - Schema details${NC}"
echo -e "     ${YELLOW}• NEW_ADMIN_PAGES_TODO.md - Implementation guide${NC}"
echo -e "     ${YELLOW}• ADMIN_PAGES_GUIDE.md - Pattern & templates${NC}"
echo ""
echo -e "${BLUE}🎯 High Priority Pages to Build:${NC}"
echo "  1. Hero Section (3 pages)"
echo "  2. Profile Desa (2 pages)"
echo "  3. Slider/Pengumuman (3 pages)"
echo "  4. FAQ (3 pages)"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
echo ""
