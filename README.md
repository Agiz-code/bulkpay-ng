# bulkpay-ng

**Modern Payroll SaaS Platform** for Nigerian businesses.

Built with **React Native (Expo)** + **NestJS** + **Prisma** + **Neon Postgres** + **Flutterwave** & **Mono**.

---

## ✨ Features

- Secure Authentication & Role-based Access
- Employee Management (CRUD)
- Bulk Payroll Disbursement via Flutterwave
- CSV Upload with Smart Validation
- Real-time Push Notifications
- Wallet & Multi-currency Support
- Transaction History & Analytics Dashboard
- Premium Fintech UI/UX
- Monorepo Architecture (Turborepo)

---

## 🛠 Tech Stack

### Frontend (Mobile)
- **React Native** with Expo SDK 54
- **Expo Router** (File-based routing)
- **TypeScript**
- **NativeWind** ready (Tailwind)
- **TanStack Query**
- **Expo Notifications**

### Backend
- **NestJS**
- **Prisma ORM**
- **Neon Serverless Postgres**
- **Flutterwave Node SDK**
- **JWT Authentication**
- **TypeScript**

---

## 📁 Project Structure

```bash
bulkpay-ng/
├── apps/
│   ├── backend/          # NestJS API
│   └── mobile/           # React Native Expo App
├── prisma/               # Shared Prisma schema
├── .env.example
├── turbo.json
└── pnpm-workspace.yaml

🚀 Quick Start
1. Clone & Install
Bashgit clone https://github.com/Agiz-code/bulkpay-ng.git
cd bulkpay-ng
pnpm install
2. Environment Setup
Copy and configure environment files:
Bashcp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/mobile/.env.example apps/mobile/.env
Update your laptop IP in apps/mobile/.env for development.
3. Database (Neon)
Bashcd apps/backend
npx prisma generate
npx prisma db push
4. Run Development
Bash# Terminal 1 - Backend
pnpm dev:backend

# Terminal 2 - Mobile
cd apps/mobile
npx expo start --clear

📱 Key Screens

Login / Register
Dashboard (Balance Card + Quick Actions)
Payroll (Bulk payout + CSV validation)
Employees (Team management)
Transactions (History)
Reports (Analytics & Insights)
Success (Payment confirmation with animation)


🔐 Security Features

JWT Authentication
Password hashing with bcrypt
Protected routes
Webhook signature verification (Flutterwave)
Input validation with class-validator


💳 Payment Integrations

Flutterwave – Bulk transfers
Mono – Bank account linking 


📦 Build for Production
Bashcd apps/mobile
eas build --platform android   # or ios

🤝 Contributing

Fork the repository
Create a feature branch
Commit your changes
Open a Pull Request


📄 License
MIT License © 2026 bulkpay-ng

👨‍💼 Author
Agiz Seth
Mobile & Full-Stack Developer
Lagos, Nigeria

Made with ❤️ for Nigerian businesses
