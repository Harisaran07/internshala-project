# 🏌️ Golf Charity Platform — Localization

> A modern, full-stack web platform connecting golf enthusiasts with charitable causes — built with Next.js, Supabase, and Stripe.

[![Next.js](https://img.shields.io/badge/Next.js-Latest-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)](https://stripe.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF4154?style=flat-square&logo=framer)](https://www.framer.com/motion/)

---

## 📖 Overview

**Pannu Golf Charity Platform** is a localized, feature-rich web application that enables golf clubs, players, and organizations to organize charity events, track scores, support non-profit causes, and manage subscriptions — all from one unified platform.

The platform is designed with a focus on **localization**, making it accessible to users across different regions and languages. It supports multi-region charity campaigns, currency-aware donations, and locale-specific content.

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-up / login flows powered by Supabase Auth
- 🏆 **Score Tracking** — Real-time golf score management and leaderboards
- 💝 **Charity Management** — Browse, support, and donate to registered charities
- 💳 **Stripe Payments** — Secure subscription and donation processing
- 🖥️ **Admin Dashboard** — Full control panel for platform administrators
- 🌍 **Localization Ready** — Multi-locale support for global reach
- 🎨 **Animated UI** — Smooth, modern animations via Framer Motion
- 📱 **Responsive Design** — Mobile-first, fully responsive layout

---

## 🌍 Localization

The platform is built with internationalization (i18n) in mind:

| Locale | Language | Status |
|--------|----------|--------|
| `en`   | English  | ✅ Default |
| `hi`   | Hindi    | 🔄 In Progress |
| `fr`   | French   | 🔄 Planned |
| `es`   | Spanish  | 🔄 Planned |

> Locale-specific charity listings, date formats, and currency symbols are dynamically resolved based on the user's region.

---

## 🗂️ Project Structure

```
internshala/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home / Landing page
│   │   ├── layout.tsx          # Root layout
│   │   ├── Home.module.css     # Home page styles
│   │   ├── admin/              # Admin dashboard routes
│   │   ├── api/                # API route handlers
│   │   ├── charities/          # Charity listing & detail pages
│   │   ├── dashboard/          # User dashboard
│   │   ├── login/              # Login page
│   │   ├── signup/             # Sign-up page
│   │   └── subscribe/          # Subscription/payment page
│   ├── components/
│   │   ├── charity/            # Charity-specific UI components
│   │   ├── layout/             # Header, Footer, Nav components
│   │   ├── scores/             # Golf score & leaderboard components
│   │   └── ui/                 # Shared UI (GlassCard, Buttons, etc.)
│   ├── context/
│   │   └── AuthContext.tsx     # Global authentication context
│   ├── lib/                    # Utility functions & Supabase client
│   └── styles/                 # Global stylesheets
├── supabase/                   # Supabase migrations & config
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- A [Supabase](https://supabase.com/) project
- A [Stripe](https://stripe.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harisaran07/internshala-project.git
   cd internshala-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js](https://nextjs.org/) | Full-stack React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Supabase](https://supabase.com/) | Database, Auth & Realtime |
| [Stripe](https://stripe.com/) | Payment processing & subscriptions |
| [Framer Motion](https://www.framer.com/motion/) | UI animations |
| [Lucide React](https://lucide.dev/) | Icon library |
| CSS Modules | Scoped, component-level styling |

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Harisaran07** — [@Harisaran07](https://github.com/Harisaran07)

> *"Golf is a game of giving — Pannu Golf Charity Platform makes every swing count."* 🏌️‍♂️💚
