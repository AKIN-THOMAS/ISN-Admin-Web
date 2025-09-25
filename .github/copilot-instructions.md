# ISN Admin Web - AI Coding Agent Instructions

## Project Overview
Enterprise React TypeScript admin dashboard using Redux Toolkit, React Router v6, Tailwind CSS, and Vite. Focus on compact, accessible design with comprehensive loading states and fine-print typography system.

## Key Architecture Patterns

### State Management with Redux Toolkit
- Use typed hooks `useAppDispatch()` and `useAppSelector()` from `/src/store/store.ts`
- State slices: `auth` (authentication), `ui` (sidebar, theme, notifications)
- Import actions directly from slice files: `import { loginSuccess, loginFailure } from '@/store/slices/authSlice'`

### Path Aliases (configured in vite.config.ts)
Always use path aliases for imports:
```tsx
import { Button } from '@/components/common'
import { useAppSelector } from '@/store'
import { ROUTES } from '@/constants/routes'
```

### Component Export Pattern
Follow the barrel export pattern in `/src/components/common/index.ts`:
- Export component + typed props + related utilities
- Example: `export { default as LoadingScreen, useLoadingScreen } from './LoadingScreen'`

## Styling & Design System

### Tailwind Configuration
- Custom ISN brand colors: `primary-500: '#DB241C'` (red), secondary grays
- Typography system for fine-print: `text-fine-xs` (0.725rem), `text-fine-sm` (0.75rem), `text-fine` (0.8125rem)
- Button text sizes: `text-btn-xs` (0.6875rem), `text-btn-sm` (0.75rem), `text-btn-base` (0.8125rem)

### Component Styling
- Use `cn()` utility from `/src/lib/utils.ts` for class merging (combines clsx + tailwind-merge)
- Compact button system with sizes: `xs` (h-7), `sm` (h-8), `md` (h-9), `lg` (h-10)
- Dark mode support via `class` strategy

### Fine-Print Components
Use specialized fine-print components for legal/metadata text:
```tsx
import { LegalText, MetadataText, TimestampText } from '@/components/common'
<LegalText>Terms and conditions apply</LegalText>
<MetadataText>↗ +12.5% from last month</MetadataText>
```

## Loading Strategy
Comprehensive loading component system:
- `LoadingScreen`: Full-page loading with logo/branding
- `LoadingSpinner`: Inline indicators
- `LoadingButton`: Button with integrated loading state
- `SplashScreen`: Initial app load (managed by `ui.showSplash` state)

## Authentication Flow
- Route-based protection via `ProtectedRoute` and `PublicRoute` components
- Auth state managed in `authSlice` with user object + JWT token
- Route constants centralized in `/src/constants/routes.ts`
- Layout wrapper (`Layout.tsx`) includes Header + Sidebar for authenticated users

## Development Workflow

### Commands
- `npm run dev` - Development server (port 3000)
- `npm run type-check` - TypeScript validation
- `npm run lint:fix` - ESLint auto-fix
- `npm run test` - Vitest tests
- `npm run format` - Prettier formatting

### Testing
- Custom render function in `/src/test/test-utils.tsx` includes Redux Provider + Router
- Import: `import { render } from '@/test/test-utils'` instead of @testing-library/react

### Code Standards
- TypeScript strict mode enabled
- Interfaces for all component props
- Functional components with proper TypeScript annotations
- Consistent use of React.FC for component typing when needed

## Common Patterns

### Forms
- React Hook Form with Yup validation (dependencies installed)
- Axios for API calls (configured dependency)

### Routing
```tsx
// Protected route example
<Route path={ROUTES.DASHBOARD} element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />

// Navigation
const navigate = useNavigate()
navigate(ROUTES.AUTH.LOGIN)
```

### Component Structure
```tsx
interface ComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <div className={cn('base-classes', variantClasses[variant], className)}>
      {/* component content */}
    </div>
  )
}
```

## Project-Specific Guidelines
- Maintain compact design philosophy - prefer smaller button/text sizes
- Always include loading states for async operations
- Use fine-print typography for metadata/legal text
- Follow the established barrel export pattern for components
- Leverage path aliases consistently
- Test components with the custom render function that includes providers