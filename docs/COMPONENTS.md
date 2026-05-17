# Component Documentation

Complete guide to all React components in Ticket Inteli.

## Table of Contents

- [Overview](#overview)
- [Component Categories](#component-categories)
- [Analysis Components](#analysis-components)
- [Ticket Components](#ticket-components)
- [Layout Components](#layout-components)
- [UI Components](#ui-components)
- [Hooks](#hooks)
- [Best Practices](#best-practices)

## Overview

Ticket Inteli uses a modular component architecture built with React, TypeScript, and IBM Carbon Design System. All components are fully typed and follow consistent patterns.

### Component Structure

```
src/components/
├── analysis/          # Analysis result displays
├── ticket/           # Ticket input components
├── layout/           # Page layout components
└── ui/              # Reusable UI elements
```

### Design Principles

1. **Single Responsibility** - Each component has one clear purpose
2. **Type Safety** - All props are fully typed with TypeScript
3. **Accessibility** - WCAG 2.1 AA compliant
4. **Reusability** - Components are composable and reusable
5. **Carbon First** - Use Carbon Design System components when possible

## Component Categories

### Analysis Components (10)

Display ticket analysis results in structured, expandable sections.

- `AnalysisSummary` - Overview with severity and confidence
- `SeverityDisplay` - Severity badge and description
- `BusinessImpactDisplay` - Business impact metrics
- `RootCauseDisplay` - Root cause analysis
- `EngineeringHandoffDisplay` - Technical handoff information
- `ResolutionStepsDisplay` - Step-by-step resolution guide
- `CustomerCommunicationDisplay` - Customer response draft
- `TimeEstimateDisplay` - Resolution time estimate
- `SimilarTicketsDisplay` - Related historical tickets
- `EscalationDisplay` - Escalation recommendations

### Ticket Components (2)

Handle ticket input and selection.

- `TicketInputForm` - Manual ticket entry form
- `SampleTicketSelector` - Pre-loaded ticket selector

### Layout Components (2)

Provide page structure and navigation.

- `Header` - Application header with navigation
- `Footer` - Application footer with links

### UI Components (5)

Reusable interface elements.

- `LoadingSpinner` - Loading indicator
- `ErrorMessage` - Error display
- `CopyButton` - Copy-to-clipboard button
- `SkeletonLoader` - Content placeholder
- `Toast` - Notification toast

## Analysis Components

### AnalysisSummary

Displays high-level analysis overview with severity and confidence score.

**Location:** `src/components/analysis/AnalysisSummary.tsx`

**Props:**

```typescript
interface AnalysisSummaryProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  timeSaved: number;
}
```

**Usage:**

```tsx
import { AnalysisSummary } from '@/components/analysis';

<AnalysisSummary 
  severity="high"
  confidence={87}
  timeSaved={28}
/>
```

**Features:**
- Color-coded severity badge
- Confidence percentage display
- Time saved calculation
- Responsive layout

---

### SeverityDisplay

Shows detailed severity information with visual indicators.

**Location:** `src/components/analysis/SeverityDisplay.tsx`

**Props:**

```typescript
interface SeverityDisplayProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
}
```

**Usage:**

```tsx
import { SeverityDisplay } from '@/components/analysis';

<SeverityDisplay 
  severity="critical"
  confidence={92}
/>
```

**Features:**
- Large severity badge with icon
- Confidence score
- Severity description
- Color-coded styling (Red/Orange/Yellow/Blue)

---

### BusinessImpactDisplay

Displays business impact metrics and analysis.

**Location:** `src/components/analysis/BusinessImpactDisplay.tsx`

**Props:**

```typescript
interface BusinessImpactDisplayProps {
  impact: {
    affectedUsers: number;
    revenueImpact: string;
    description: string;
  };
}
```

**Usage:**

```tsx
import { BusinessImpactDisplay } from '@/components/analysis';

<BusinessImpactDisplay 
  impact={{
    affectedUsers: 150,
    revenueImpact: "$15,000/hour",
    description: "Critical authentication failure..."
  }}
/>
```

**Features:**
- User count with icon
- Revenue impact display
- Detailed description
- Copy functionality

---

### RootCauseDisplay

Shows potential root causes with confidence levels.

**Location:** `src/components/analysis/RootCauseDisplay.tsx`

**Props:**

```typescript
interface RootCauseDisplayProps {
  causes: Array<{
    cause: string;
    confidence: number;
    evidence: string;
  }>;
}
```

**Usage:**

```tsx
import { RootCauseDisplay } from '@/components/analysis';

<RootCauseDisplay 
  causes={[
    {
      cause: "Token validation service failure",
      confidence: 85,
      evidence: "500 error indicates server-side issue"
    }
  ]}
/>
```

**Features:**
- Ordered list by confidence
- Confidence percentage bars
- Evidence display
- Expandable details

---

### EngineeringHandoffDisplay

Provides structured technical handoff information.

**Location:** `src/components/analysis/EngineeringHandoffDisplay.tsx`

**Props:**

```typescript
interface EngineeringHandoffDisplayProps {
  handoff: {
    summary: string;
    technicalDetails: string;
    affectedComponents: string[];
    priority: string;
    assignedTeam: string;
  };
}
```

**Usage:**

```tsx
import { EngineeringHandoffDisplay } from '@/components/analysis';

<EngineeringHandoffDisplay 
  handoff={{
    summary: "Critical authentication service failure",
    technicalDetails: "500 Internal Server Error on login endpoint",
    affectedComponents: ["Auth Service", "Token Validator"],
    priority: "P0 - Critical",
    assignedTeam: "Platform Engineering"
  }}
/>
```

**Features:**
- Technical summary
- Component list with tags
- Priority badge
- Team assignment
- Copy functionality

---

### ResolutionStepsDisplay

Shows prioritized resolution steps with time estimates.

**Location:** `src/components/analysis/ResolutionStepsDisplay.tsx`

**Props:**

```typescript
interface ResolutionStepsDisplayProps {
  steps: Array<{
    step: string;
    priority: 'immediate' | 'high' | 'medium' | 'low';
    estimatedTime: string;
  }>;
  regressionTests: string[];
}
```

**Usage:**

```tsx
import { ResolutionStepsDisplay } from '@/components/analysis';

<ResolutionStepsDisplay 
  steps={[
    {
      step: "Check token validation service health",
      priority: "immediate",
      estimatedTime: "5 minutes"
    }
  ]}
  regressionTests={[
    "Test login with valid credentials",
    "Test token validation service under load"
  ]}
/>
```

**Features:**
- Numbered step list
- Priority badges
- Time estimates
- Regression test checklist
- Copy functionality

---

### CustomerCommunicationDisplay

Displays draft customer response with editing capability.

**Location:** `src/components/analysis/CustomerCommunicationDisplay.tsx`

**Props:**

```typescript
interface CustomerCommunicationDisplayProps {
  communication: string;
}
```

**Usage:**

```tsx
import { CustomerCommunicationDisplay } from '@/components/analysis';

<CustomerCommunicationDisplay 
  communication="We're aware of a login issue affecting our platform..."
/>
```

**Features:**
- Formatted text display
- Copy button
- Professional styling
- Editable textarea (optional)

---

### TimeEstimateDisplay

Shows resolution time estimate with visual indicator.

**Location:** `src/components/analysis/TimeEstimateDisplay.tsx`

**Props:**

```typescript
interface TimeEstimateDisplayProps {
  estimate: string;
}
```

**Usage:**

```tsx
import { TimeEstimateDisplay } from '@/components/analysis';

<TimeEstimateDisplay 
  estimate="2-4 hours"
/>
```

**Features:**
- Large time display
- Clock icon
- Responsive layout

---

### SimilarTicketsDisplay

Lists related historical tickets with similarity scores.

**Location:** `src/components/analysis/SimilarTicketsDisplay.tsx`

**Props:**

```typescript
interface SimilarTicketsDisplayProps {
  tickets: Array<{
    id: string;
    title: string;
    similarity: number;
    resolution: string;
  }>;
}
```

**Usage:**

```tsx
import { SimilarTicketsDisplay } from '@/components/analysis';

<SimilarTicketsDisplay 
  tickets={[
    {
      id: "TICK-1234",
      title: "Authentication service timeout",
      similarity: 85,
      resolution: "Restarted token validation service"
    }
  ]}
/>
```

**Features:**
- Ticket list with IDs
- Similarity percentage
- Resolution summaries
- Clickable ticket IDs (future)

---

### EscalationDisplay

Shows escalation recommendations and urgency.

**Location:** `src/components/analysis/EscalationDisplay.tsx`

**Props:**

```typescript
interface EscalationDisplayProps {
  escalation: {
    shouldEscalate: boolean;
    reason: string;
    escalateTo: string;
    urgency: 'immediate' | 'high' | 'medium' | 'low';
  };
}
```

**Usage:**

```tsx
import { EscalationDisplay } from '@/components/analysis';

<EscalationDisplay 
  escalation={{
    shouldEscalate: true,
    reason: "Critical severity with high business impact",
    escalateTo: "Engineering Manager",
    urgency: "immediate"
  }}
/>
```

**Features:**
- Escalation indicator
- Reason display
- Target person/team
- Urgency badge
- Conditional rendering

## Ticket Components

### TicketInputForm

Form for manual ticket entry with validation.

**Location:** `src/components/ticket/TicketInputForm.tsx`

**Props:**

```typescript
interface TicketInputFormProps {
  onSubmit: (ticket: TicketInput) => void;
  isLoading?: boolean;
}
```

**Usage:**

```tsx
import { TicketInputForm } from '@/components/ticket';

<TicketInputForm 
  onSubmit={(ticket) => analyzeTicket(ticket)}
  isLoading={false}
/>
```

**Features:**
- Title input (required)
- Description textarea (required)
- Customer email input (optional)
- Priority selector (optional)
- Form validation
- Loading state
- Error messages
- Character counters

**Form Fields:**

| Field | Type | Required | Max Length |
|-------|------|----------|------------|
| Title | Text | Yes | 200 chars |
| Description | Textarea | Yes | 5000 chars |
| Customer Email | Email | No | - |
| Priority | Select | No | - |

---

### SampleTicketSelector

Dropdown selector for pre-loaded sample tickets.

**Location:** `src/components/ticket/SampleTicketSelector.tsx`

**Props:**

```typescript
interface SampleTicketSelectorProps {
  onSelect: (ticket: TicketInput) => void;
}
```

**Usage:**

```tsx
import { SampleTicketSelector } from '@/components/ticket';

<SampleTicketSelector 
  onSelect={(ticket) => setSelectedTicket(ticket)}
/>
```

**Features:**
- Dropdown with sample tickets
- Ticket preview on hover
- Auto-fill form on selection
- Keyboard navigation

**Sample Tickets:**
1. Login Page 500 Error (Critical)
2. Payment Processing Failure (High)
3. Slow Dashboard Loading (Medium)
4. UI Button Misalignment (Low)

## Layout Components

### Header

Application header with branding and navigation.

**Location:** `src/components/layout/Header.tsx`

**Props:**

```typescript
interface HeaderProps {
  // No props - uses global state
}
```

**Usage:**

```tsx
import { Header } from '@/components/layout';

<Header />
```

**Features:**
- IBM branding
- Navigation links
- Responsive menu
- Active link highlighting
- Accessibility support

---

### Footer

Application footer with links and copyright.

**Location:** `src/components/layout/Footer.tsx`

**Props:**

```typescript
interface FooterProps {
  // No props
}
```

**Usage:**

```tsx
import { Footer } from '@/components/layout';

<Footer />
```

**Features:**
- Copyright notice
- Documentation links
- Social links (future)
- Responsive layout

## UI Components

### LoadingSpinner

Animated loading indicator.

**Location:** `src/components/ui/LoadingSpinner.tsx`

**Props:**

```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}
```

**Usage:**

```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner 
  size="medium"
  message="Analyzing ticket..."
/>
```

**Features:**
- Three size options
- Optional message
- Smooth animation
- Accessible (aria-live)

---

### ErrorMessage

Error display with retry option.

**Location:** `src/components/ui/ErrorMessage.tsx`

**Props:**

```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
```

**Usage:**

```tsx
import { ErrorMessage } from '@/components/ui';

<ErrorMessage 
  message="Failed to analyze ticket"
  onRetry={() => retryAnalysis()}
/>
```

**Features:**
- Error icon
- Clear message
- Optional retry button
- Accessible

---

### CopyButton

Copy-to-clipboard button with feedback.

**Location:** `src/components/ui/CopyButton.tsx`

**Props:**

```typescript
interface CopyButtonProps {
  text: string;
  label?: string;
}
```

**Usage:**

```tsx
import { CopyButton } from '@/components/ui';

<CopyButton 
  text="Content to copy"
  label="Copy to clipboard"
/>
```

**Features:**
- One-click copy
- Visual feedback
- Toast notification
- Keyboard accessible
- Icon animation

---

### SkeletonLoader

Content placeholder during loading.

**Location:** `src/components/ui/SkeletonLoader.tsx`

**Props:**

```typescript
interface SkeletonLoaderProps {
  lines?: number;
  height?: string;
}
```

**Usage:**

```tsx
import { SkeletonLoader } from '@/components/ui';

<SkeletonLoader 
  lines={3}
  height="20px"
/>
```

**Features:**
- Animated shimmer effect
- Configurable lines
- Custom height
- Responsive

---

### Toast

Notification toast for feedback.

**Location:** `src/components/ui/Toast.tsx`

**Props:**

```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}
```

**Usage:**

```tsx
import { Toast } from '@/components/ui';

<Toast 
  message="Copied to clipboard!"
  type="success"
  onClose={() => setShowToast(false)}
/>
```

**Features:**
- Auto-dismiss (3 seconds)
- Type-based styling
- Close button
- Slide-in animation
- Accessible

## Hooks

### useToast

Custom hook for toast notifications.

**Location:** `src/hooks/useToast.ts`

**Usage:**

```tsx
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { showToast, ToastComponent } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  return (
    <>
      <button onClick={handleCopy}>Copy</button>
      {ToastComponent}
    </>
  );
}
```

**API:**

```typescript
interface UseToastReturn {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  ToastComponent: JSX.Element | null;
}
```

## Best Practices

### Component Development

1. **Use TypeScript** - Always define prop interfaces
2. **Export Named** - Use named exports, not default
3. **Document Props** - Add JSDoc comments for complex props
4. **Handle Loading** - Show loading states for async operations
5. **Handle Errors** - Display user-friendly error messages

### Styling

1. **Use Carbon First** - Prefer Carbon components
2. **Tailwind for Layout** - Use Tailwind for spacing and layout
3. **Consistent Spacing** - Use standard spacing scale (4, 8, 16, 24, 32)
4. **Responsive Design** - Test on mobile, tablet, desktop
5. **Dark Mode Ready** - Use semantic color tokens

### Accessibility

1. **Semantic HTML** - Use proper HTML elements
2. **ARIA Labels** - Add labels for screen readers
3. **Keyboard Navigation** - Support Tab, Enter, Escape
4. **Focus Indicators** - Visible focus states
5. **Color Contrast** - WCAG AA compliant

### Performance

1. **Lazy Loading** - Use dynamic imports for large components
2. **Memoization** - Use React.memo for expensive renders
3. **Avoid Inline Functions** - Define handlers outside JSX
4. **Optimize Images** - Use Next.js Image component
5. **Code Splitting** - Split by route

### Testing

1. **Unit Tests** - Test component logic
2. **Integration Tests** - Test component interactions
3. **Accessibility Tests** - Use axe or similar tools
4. **Visual Tests** - Screenshot testing (future)
5. **E2E Tests** - Test user flows (future)

## Example: Creating a New Component

```tsx
// src/components/analysis/NewComponent.tsx
import { useState } from 'react';
import { Button } from '@carbon/react';
import { Copy } from '@carbon/icons-react';
import { useToast } from '@/hooks/useToast';

/**
 * Displays new analysis information
 */
interface NewComponentProps {
  /** The data to display */
  data: string;
  /** Optional callback when data is copied */
  onCopy?: () => void;
}

export function NewComponent({ data, onCopy }: NewComponentProps) {
  const { showToast, ToastComponent } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      showToast('Copied to clipboard!', 'success');
      onCopy?.();
    } catch (error) {
      showToast('Failed to copy', 'error');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">New Information</h3>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Copy}
          iconDescription="Copy"
          onClick={handleCopy}
          hasIconOnly
        />
      </div>
      
      <div className={isExpanded ? '' : 'line-clamp-3'}>
        {data}
      </div>
      
      <Button
        kind="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </Button>
      
      {ToastComponent}
    </div>
  );
}
```

## Component Index

Quick reference for importing components:

```tsx
// Analysis Components
import {
  AnalysisSummary,
  SeverityDisplay,
  BusinessImpactDisplay,
  RootCauseDisplay,
  EngineeringHandoffDisplay,
  ResolutionStepsDisplay,
  CustomerCommunicationDisplay,
  TimeEstimateDisplay,
  SimilarTicketsDisplay,
  EscalationDisplay,
} from '@/components/analysis';

// Ticket Components
import {
  TicketInputForm,
  SampleTicketSelector,
} from '@/components/ticket';

// Layout Components
import {
  Header,
  Footer,
} from '@/components/layout';

// UI Components
import {
  LoadingSpinner,
  ErrorMessage,
  CopyButton,
  SkeletonLoader,
  Toast,
} from '@/components/ui';

// Hooks
import { useToast } from '@/hooks/useToast';
```

---

**Last Updated:** May 17, 2026  
**Version:** 1.0  
**Status:** Complete