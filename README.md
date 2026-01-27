# Radiant Bistro - Restaurant Website

A modern, production-ready restaurant website built with Next.js 14, Prisma, Tailwind CSS, and PostgreSQL (Neon).

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

1. Create a Neon PostgreSQL database at [neon.tech](https://neon.tech)
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Add your Neon connection string to `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
   ```

### 3. Initialize Prisma

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx             # Homepage
│   ├── menu/
│   │   └── page.tsx         # Menu page (server component)
│   └── globals.css          # Tailwind + design system
├── components/
│   ├── Navbar.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   └── LayoutShell.tsx      # Layout wrapper with gradients
├── lib/
│   ├── prisma.ts            # Prisma Client singleton
│   └── menu.ts              # Menu data fetching functions
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seed script
└── public/                  # Static assets (SVG placeholders)
```

## 🗄️ Database Schema

The Prisma schema includes:

- **MenuCategory** - Menu sections (e.g., "Snacks & Small Plates")
- **MenuItem** - Individual dishes with prices, descriptions, tags
- **Customer** - Customer profiles (future)
- **Reservation** - Table reservations (future)
- **Order** - Orders placed (future)
- **OrderItem** - Order line items (future)

## 🎨 Design System

The project uses a custom Tailwind design system:

- **Colors**: Brand (warm orange) and Accent (muted green) palettes
- **Typography**: Inter (sans) and Playfair Display (headings)
- **Components**: Pre-styled buttons, cards, badges via CSS classes
- **Dark theme**: Slate-based dark background with subtle gradients

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:migrate` - Run Prisma migrations
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:seed` - Seed the database
- `npm run db:reset` - Reset database and re-seed

## 🚀 Next Steps

### Add Shopping Cart

1. Create a cart context/provider
2. Add "Add to Cart" buttons to menu items
3. Build a cart page (`/cart`)
4. Integrate with Order/OrderItem models

### Add Reservations

1. Create a reservation form component
2. Build `/reservations` page
3. Add API routes for creating reservations
4. Connect to Reservation model

### Add Admin Dashboard

1. Create `/admin` route with authentication
2. Build CRUD interfaces for menu items
3. Add reservation management
4. Add order management

### Deploy

1. Push to GitHub
2. Deploy to Vercel (recommended) or your preferred platform
3. Add production `DATABASE_URL` to environment variables
4. Run migrations in production

## 📝 Notes

- All data fetching uses Server Components (no client-side data fetching)
- Menu page revalidates every hour (`revalidate: 3600`)
- Prisma Client uses the global singleton pattern for Next.js
- SVG placeholders are included; replace with real images when ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Fonts**: Inter, Playfair Display (Google Fonts)

---

Built with ❤️ using Next.js, Prisma, and Tailwind CSS.
