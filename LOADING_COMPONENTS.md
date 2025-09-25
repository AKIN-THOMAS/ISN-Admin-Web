# Loading Components Documentation

This documentation covers the comprehensive set of reusable loading components created for the ISN Admin Web application.

## Components Overview

### 1. `LoadingScreen` - Full Page Loading
**Purpose**: Display full-page loading states with customizable animations and branding.

```tsx
import { LoadingScreen } from '@/components/common'

<LoadingScreen
  variant="spinner"        // 'spinner' | 'dots' | 'pulse' | 'bars'
  size="lg"               // 'sm' | 'md' | 'lg' | 'xl'
  showLogo={true}         // boolean - display company logo
  loadingText="Loading Dashboard"
  message="Fetching latest data..."
  overlay={true}          // boolean - fixed overlay or inline
  backgroundColor="bg-white/80"
/>
```

**Features**:
- 4 animation variants (spinner, dots, pulse, bars)
- 4 size options with responsive scaling
- Optional company logo integration
- Customizable loading text and messages
- Overlay or inline display modes
- Progress bar animation

### 2. `LoadingSpinner` - Inline Loading Indicators
**Purpose**: Small, inline loading indicators for components and sections.

```tsx
import { LoadingSpinner } from '@/components/common'

<LoadingSpinner
  size="md"               // 'xs' | 'sm' | 'md' | 'lg'
  color="blue"            // 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
  showText={true}         // boolean - show loading text
  text="Loading..."       // custom text
  inline={false}          // boolean - inline or block display
/>
```

**Features**:
- Multiple size options (xs to lg)
- 6 color themes
- Optional text display
- Inline or block layout modes

### 3. `LoadingButton` - Interactive Loading Buttons
**Purpose**: Buttons with integrated loading states for forms and actions.

```tsx
import { LoadingButton } from '@/components/common'

<LoadingButton
  loading={isSubmitting}  // boolean - loading state
  loadingText="Submitting..."
  variant="primary"       // 'primary' | 'secondary' | 'outline'
  size="md"              // 'sm' | 'md' | 'lg'
  onClick={handleSubmit}
  type="submit"
  disabled={false}
>
  Submit Form
</LoadingButton>
```

**Features**:
- Automatic spinner integration
- 3 visual variants (primary, secondary, outline)
- 3 size options
- Customizable loading text
- Proper disabled state handling
- TypeScript support

### 4. `PageLoadingWrapper` - Page-Level Loading Management
**Purpose**: Wrap entire pages or sections with loading states.

```tsx
import { PageLoadingWrapper } from '@/components/common'

<PageLoadingWrapper
  loading={isDataLoading}
  loadingProps={{
    variant: 'dots',
    size: 'lg',
    showLogo: true,
    loadingText: 'Loading Dashboard',
    message: 'Fetching latest data...'
  }}
>
  <YourPageContent />
</PageLoadingWrapper>
```

**Features**:
- Conditional rendering based on loading state
- Passes through all LoadingScreen props
- Clean separation of loading and content states

### 5. `useLoadingScreen` Hook - Programmatic Loading Control
**Purpose**: Custom hook for managing loading states programmatically.

```tsx
import { useLoadingScreen } from '@/components/common'

const MyComponent = () => {
  const { isLoading, loadingMessage, showLoading, hideLoading } = useLoadingScreen()

  const handleLongOperation = async () => {
    showLoading('Processing your request...')
    
    try {
      await performLongOperation()
    } finally {
      hideLoading()
    }
  }

  return (
    <div>
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      <button onClick={handleLongOperation}>Start Operation</button>
    </div>
  )
}
```

**Features**:
- Centralized loading state management
- Custom loading messages
- Easy show/hide methods
- React state management integration

## Usage Patterns

### 1. Page-Level Loading
```tsx
// For initial page loads
const [pageLoading, setPageLoading] = useState(true)

useEffect(() => {
  loadData().finally(() => setPageLoading(false))
}, [])

return (
  <PageLoadingWrapper loading={pageLoading}>
    <PageContent />
  </PageLoadingWrapper>
)
```

### 2. Form Submission Loading
```tsx
const [submitting, setSubmitting] = useState(false)

const handleSubmit = async (data) => {
  setSubmitting(true)
  try {
    await submitForm(data)
  } finally {
    setSubmitting(false)
  }
}

return (
  <LoadingButton loading={submitting} onClick={handleSubmit}>
    Submit
  </LoadingButton>
)
```

### 3. Section-Level Loading
```tsx
// For loading specific sections
const [sectionLoading, setSectionLoading] = useState(false)

return (
  <div className="card">
    {sectionLoading ? (
      <LoadingSpinner size="md" showText text="Loading data..." />
    ) : (
      <SectionContent />
    )}
  </div>
)
```

### 4. Modal/Overlay Loading
```tsx
const { isLoading, showLoading, hideLoading } = useLoadingScreen()

const performAction = async () => {
  showLoading('Processing...')
  await longRunningTask()
  hideLoading()
}

// Renders modal overlay when isLoading is true
```

## Animation Variants

### Spinner
- Classic rotating spinner
- Most commonly used
- Works well in all contexts

### Dots
- Three bouncing dots
- Great for text-heavy interfaces
- Less visually intrusive

### Pulse
- Gentle pulsing circle
- Subtle and elegant
- Good for minimalist designs

### Bars
- Multiple animated bars
- More dynamic appearance
- Good for data-heavy applications

## Styling & Theming

All components support:
- **Dark mode** - Automatic theme adaptation
- **Custom colors** - Multiple color schemes
- **Responsive design** - Mobile-friendly sizing
- **Tailwind CSS** - Full utility class support

## Best Practices

1. **Choose appropriate sizes**:
   - `xs/sm` for inline elements
   - `md` for standard components
   - `lg/xl` for full-page loading

2. **Use meaningful loading text**:
   - Be specific: "Loading dashboard..." vs "Loading..."
   - Match user expectations
   - Keep it concise

3. **Consider user experience**:
   - Don't show loading for very fast operations (< 500ms)
   - Use skeletons for known layouts
   - Provide progress indication when possible

4. **Accessibility**:
   - All components include proper ARIA labels
   - Screen reader compatible
   - Keyboard navigation support

## Integration Examples

See `src/pages/Dashboard.tsx` and `src/pages/auth/Login.tsx` for comprehensive implementation examples demonstrating all loading component patterns.

## TypeScript Support

All components are fully typed with TypeScript:
- Comprehensive prop interfaces
- Type-safe event handlers
- IntelliSense support
- Strict type checking

## Performance

- **Lazy loading** - Components load only when needed
- **Minimal bundle size** - Tree-shakable exports
- **Optimized animations** - CSS-based animations for best performance
- **Memory efficient** - Proper cleanup and state management