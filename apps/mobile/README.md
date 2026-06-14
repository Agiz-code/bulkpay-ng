# bulkpay-ng

<<<<<<< HEAD:apps/mobile/README.md
Fixed Issues
Navigation: Corrected all router paths to use relative navigation that works with Expo Router
Authentication Flow: Enhanced login/register with better UX (keyboard handling, input validation, error messages)
CSV Processing: Fixed DocumentPicker usage with proper type checking and FileSystem integration
Type Safety: Resolved all TypeScript errors and unused variables
UI Polish: Added loading states, better error handling, and professional styling
Key Improvements
Auth Screens: Added KeyboardAvoidingView, better input validation, and professional error messages
CSV Validation: Proper file handling with expo-file-system, loading indicators, and robust error handling
Navigation: Fixed all route transitions to work correctly with the app structure
Success Screen: Proper parameter parsing and navigation back to dashboard
Code Quality: Removed unused imports, fixed TypeScript issues, added proper error handling
App Flow Now Works
User opens app → Redirects to login if not authenticated
Login/Register with proper validation and feedback
Dashboard with quick actions for payroll management
CSV upload and validation with real-time feedback
Successful payroll processing with confirmation screen
Proper navigation between all screens
The app is now production-ready with professional UX, proper error handling, and smooth navigation throughout the payroll workflow. All TypeScript errors have been resolved and the code follows React Native best practices.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
=======
**Modern Payroll SaaS Platform** for Nigerian businesses.
>>>>>>> d68a2871e14ff857a4bcd4eb659fa541c60946c5:README.md

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
