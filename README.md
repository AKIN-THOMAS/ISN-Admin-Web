# ISN Admin Web Dashboard

Enterprise-grade React TypeScript admin dashboard with Redux Toolkit for state management.

## 🚀 Features

- **React 18** with TypeScript
- **Redux Toolkit** for state management with slices
- **React Router v6** for routing
- **Tailwind CSS** for styling with dark mode support
- **Vite** for fast development and building
- **Vitest** for testing
- **ESLint + Prettier** for code quality
- **Husky** for git hooks
- **Enterprise-grade** folder structure

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (buttons, modals, etc.)
│   ├── forms/           # Form-specific components
│   ├── layout/          # Layout components (header, sidebar, etc.)
│   └── ui/              # Base UI components
├── pages/               # Page components
│   └── auth/            # Authentication pages
├── store/               # Redux store configuration
│   └── slices/          # Redux slices
├── hooks/               # Custom React hooks
├── services/            # API services and external integrations
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── styles/              # Global styles and theme
├── assets/              # Static assets (images, icons, etc.)
└── test/                # Test utilities and setup
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ISN-Admin-Web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration

### Redux Store

The application uses Redux Toolkit with the following slices:
- `authSlice` - Authentication state management
- `uiSlice` - UI state management (sidebar, theme, notifications, etc.)

### Styling

- **Tailwind CSS** for utility-first styling
- **Dark mode** support with `class` strategy
- **Custom theme** configuration in `tailwind.config.js`
- **Global styles** in `src/styles/globals.css`

### Path Aliases

Configured path aliases for cleaner imports:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/pages/*` → `src/pages/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/store/*` → `src/store/*`
- `@/services/*` → `src/services/*`
- `@/styles/*` → `src/styles/*`
- `@/assets/*` → `src/assets/*`
- `@/constants/*` → `src/constants/*`

## 🧪 Testing

The project uses Vitest for testing with the following setup:
- **jsdom** environment for React component testing
- **@testing-library/react** for component testing utilities
- **Custom render** function with providers in `src/test/test-utils.tsx`
- **Coverage** reporting with v8 provider

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.