# ISN Color Scheme Guide

This document outlines the custom color scheme for the ISN Admin Web application.

## Primary Brand Colors

### Primary Red: `#DB241C`
**Usage**: Primary buttons, links, highlights, brand elements
- `bg-primary-500` - Main background color
- `text-primary-500` - Main text color  
- `border-primary-500` - Main border color
- Available shades: `primary-50` through `primary-950`

### Custom Gray: `#C0C0C0`
**Usage**: Secondary text, borders, subtle backgrounds
- `bg-gray-300` - Light gray backgrounds
- `text-gray-300` - Subtle text
- `border-gray-300` - Light borders

## Usage Examples

### Buttons
```tsx
// Primary button with ISN red
<button className="bg-primary-500 text-white hover:bg-primary-600">
  Primary Action
</button>

// Outline button with ISN red
<button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50">
  Secondary Action
</button>
```

### Loading Components
```tsx
// All loading components now default to ISN red
<LoadingSpinner color="primary" />
<LoadingButton variant="primary" loading={true}>Submit</LoadingButton>
<LoadingScreen variant="spinner" />
```

### Cards and Borders
```tsx
// Subtle borders using custom gray
<div className="border border-gray-300 rounded-lg">
  Card content
</div>

// Primary accent borders
<div className="border-l-4 border-primary-500">
  Highlighted content
</div>
```

### Text Elements
```tsx
// Primary text color
<h1 className="text-primary-500">ISN Heading</h1>

// Subtle secondary text
<p className="text-gray-300">Secondary information</p>
```

## Color Palette Reference

### Primary Red Shades
- `primary-50`: #fef2f2 (lightest)
- `primary-100`: #fee2e2
- `primary-200`: #fecaca
- `primary-300`: #fca5a5
- `primary-400`: #f87171
- `primary-500`: #DB241C ⭐ **Main brand color**
- `primary-600`: #c71e16
- `primary-700`: #b31912
- `primary-800`: #9f140e
- `primary-900`: #8b0f0a
- `primary-950`: #4a0805 (darkest)

### Gray Shades
- `gray-50`: #f9fafb
- `gray-100`: #f3f4f6
- `gray-200`: #e5e7eb
- `gray-300`: #C0C0C0 ⭐ **Custom ISN gray**
- `gray-400`: #9ca3af
- `gray-500`: #6b7280
- `gray-600`: #4b5563
- `gray-700`: #374151
- `gray-800`: #1f2937
- `gray-900`: #111827
- `gray-950`: #030712

## Component Updates

All loading and UI components have been updated to use the new ISN color scheme:

✅ **LoadingScreen** - Now uses `primary-500` for all animations
✅ **LoadingSpinner** - Defaults to `primary` color
✅ **LoadingButton** - Primary variant uses ISN red
✅ **Dashboard** - Updated demo components
✅ **Tailwind Config** - Custom colors defined

## Migration Notes

- Replace `blue-600` with `primary-500` for brand elements
- Replace generic `gray-300` usage with the custom ISN gray where appropriate
- Update any hardcoded color values to use the new Tailwind classes
- Test dark mode compatibility with the new color scheme

## Dark Mode Support

The color scheme automatically adapts for dark mode while maintaining brand consistency:
- Primary colors maintain their vibrancy
- Gray colors provide appropriate contrast
- All components respect dark mode settings