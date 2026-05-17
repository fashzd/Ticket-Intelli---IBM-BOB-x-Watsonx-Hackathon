# Ticket Inteli - Implementation Guide

## Quick Start Checklist

This guide provides a step-by-step walkthrough for implementing Ticket Inteli, organized by development phases.

---

## Phase 1: Project Setup ⚙️

### 1.1 Initialize Next.js Project

```bash
# Create Next.js app with TypeScript
npx create-next-app@latest ticket-inteli --typescript --tailwind --app --no-src-dir

# Navigate to project
cd ticket-inteli
```

**Configuration prompts:**
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ `src/` directory: Yes
- ✅ App Router: Yes
- ✅ Import alias: Yes (@/*)

### 1.2 Install Dependencies

```bash
# Install Carbon Design System
npm install @carbon/react @carbon/icons-react

# Install additional utilities (optional)
npm install clsx
```

### 1.3 Configure Carbon Design System

**File: `src/app/globals.css`**
```css
@import '@carbon/react/css/index.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**File: `tailwind.config.ts`**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // IBM Carbon color tokens
        'carbon-blue': '#0f62fe',
        'carbon-gray': '#161616',
      },
    },
  },
  plugins: [],
  // Prevent Tailwind from conflicting with Carbon
  corePlugins: {
    preflight: false,
  },
}
export default config
```

### 1.4 Create Project Structure

```bash
# Create directory structure
mkdir -p src/components/{layout,ticket,analysis,ui}
mkdir -p src/lib
mkdir -p src/data
mkdir -p src/styles
mkdir -p src/app/analyze
mkdir -p src/app/api/analyze
mkdir -p public/images
```

**Checklist:**
- [ ] Next.js project initialized
- [ ] Carbon Design System installed
- [ ] Tailwind configured
- [ ] Directory structure created
- [ ] Git repository initialized

---

## Phase 2: Core Types & Data 📊

### 2.1 Create TypeScript Types

**File: `src/lib/types.ts`**

```typescript
// Copy the complete type definitions from TECHNICAL_PLAN.md
// Key types to include:
// - SupportTicket
// - SeverityLevel
// - ProductArea
// - BusinessImpact
// - RootCause
// - NextStep
// - RegressionTest
// - TicketAnalysis
// - AnalyzeTicketRequest
// - AnalyzeTicketResponse
```

### 2.2 Create Constants

**File: `src/lib/constants.ts`**

```typescript
export const SEVERITY_LEVELS = {
  critical: { label: 'Critical', color: 'red' },
  high: { label: 'High', color: 'orange' },
  medium: { label: 'Medium', color: 'yellow' },
  low: { label: 'Low', color: 'green' },
} as const;

export const PRODUCT_AREAS = [
  'authentication',
  'billing',
  'api',
  'ui',
  'database',
  'infrastructure',
  'integration',
  'performance',
  'security',
  'other',
] as const;

export const SEVERITY_KEYWORDS = {
  critical: ['down', 'outage', 'cannot access', 'all users', 'production down'],
  high: ['error 500', 'payment', 'security', 'data loss', 'critical bug'],
  medium: ['slow', 'performance', 'intermittent', 'some users'],
  low: ['cosmetic', 'typo', 'minor', 'enhancement', 'feature request'],
};

export const PRODUCT_AREA_KEYWORDS = {
  authentication: ['login', 'password', 'auth', 'token', 'session', 'logout'],
  billing: ['payment', 'invoice', 'subscription', 'charge', 'refund'],
  api: ['api', 'endpoint', 'rate limit', 'integration', 'webhook'],
  ui: ['button', 'display', 'layout', 'css', 'design', 'interface'],
  database: ['data', 'query', 'database', 'sql', 'records'],
  performance: ['slow', 'timeout', 'latency', 'load time', 'speed'],
  infrastructure: ['server', 'deployment', 'hosting', 'network'],
  integration: ['third party', 'external', 'sync', 'import'],
  security: ['security', 'vulnerability', 'breach', 'unauthorized'],
};
```

### 2.3 Create Sample Data

**File: `src/data/sample-tickets.json`**

```json
[
  {
    "id": "TKT-001",
    "title": "Login page returns 500 error",
    "description": "Multiple users reporting they cannot log in. Getting 500 Internal Server Error on the login page. Started happening around 2 PM EST. Affects both web and mobile app. Users are unable to access their accounts and this is blocking critical business operations.",
    "customerName": "Acme Corp",
    "customerEmail": "support@acme.com",
    "submittedAt": "2026-05-16T14:30:00Z"
  },
  {
    "id": "TKT-002",
    "title": "Payment processing fails for international cards",
    "description": "Customers with international credit cards are unable to complete purchases. Error message: 'Payment declined'. Our payment processor shows no issues on their end. This is affecting approximately 30% of our international customer base and causing significant revenue loss.",
    "customerName": "Global Retail Inc",
    "customerEmail": "tech@globalretail.com",
    "submittedAt": "2026-05-16T10:15:00Z"
  },
  {
    "id": "TKT-003",
    "title": "Dashboard loads very slowly",
    "description": "The main dashboard takes 30+ seconds to load. This started after yesterday's deployment. Users are complaining about poor performance. The issue seems to affect all users regardless of their location or device.",
    "customerName": "TechStart LLC",
    "customerEmail": "admin@techstart.com",
    "submittedAt": "2026-05-17T08:00:00Z"
  },
  {
    "id": "TKT-004",
    "title": "API rate limiting too aggressive",
    "description": "Our integration is hitting rate limits even though we're well within documented limits. Getting 429 errors. Need rate limit increased or clarification on limits. This is blocking our production deployment.",
    "customerName": "DevTools Co",
    "customerEmail": "api@devtools.com",
    "submittedAt": "2026-05-16T16:45:00Z"
  },
  {
    "id": "TKT-005",
    "title": "Data export feature not working",
    "description": "When trying to export data to CSV, the download starts but file is corrupted. Tried multiple times with same result. Urgent as we need this for compliance reporting due tomorrow.",
    "customerName": "Finance Corp",
    "customerEmail": "it@financecorp.com",
    "submittedAt": "2026-05-17T09:30:00Z"
  }
]
```

**Checklist:**
- [ ] TypeScript types created
- [ ] Constants defined
- [ ] Sample tickets JSON created
- [ ] Types exported correctly

---

## Phase 3: Mock Analyzer Logic 🧠

### 3.1 Create Mock Analyzer

**File: `src/lib/mockAnalyzer.ts`**

Key functions to implement:
1. `analyzeSeverity(text: string): SeverityLevel`
2. `detectProductAreas(text: string): ProductArea[]`
3. `generateRootCauses(severity, areas): RootCause[]`
4. `createHandoffSummary(ticket, severity, areas): string`
5. `suggestNextSteps(severity, areas): NextStep[]`
6. `generateRegressionTests(areas): RegressionTest[]`
7. `draftCustomerResponse(ticket, severity): string`
8. `calculateConfidence(matches): number`
9. `estimateTimeSaved(severity): number`
10. `analyzeTicket(ticket: SupportTicket): TicketAnalysis`

**Implementation approach:**
- Use keyword matching for severity detection
- Count keyword occurrences for confidence scoring
- Generate contextual responses based on detected patterns
- Add realistic variability to results

**Checklist:**
- [ ] Severity detection implemented
- [ ] Product area mapping implemented
- [ ] Root cause generation implemented
- [ ] Handoff summary creation implemented
- [ ] Next steps suggestion implemented
- [ ] Regression test generation implemented
- [ ] Customer response drafting implemented
- [ ] Confidence calculation implemented
- [ ] Time savings estimation implemented
- [ ] Main analyzer function implemented

---

## Phase 4: API Route 🔌

### 4.1 Create API Endpoint

**File: `src/app/api/analyze/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { analyzeTicket } from '@/lib/mockAnalyzer';
import type { AnalyzeTicketRequest, AnalyzeTicketResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeTicketRequest = await request.json();
    
    // Validate request
    if (!body.ticket || !body.ticket.title || !body.ticket.description) {
      return NextResponse.json(
        { success: false, error: 'Invalid ticket data' },
        { status: 400 }
      );
    }
    
    // Simulate processing delay (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    // Analyze ticket
    const analysis = analyzeTicket(body.ticket);
    
    const response: AnalyzeTicketResponse = {
      success: true,
      analysis,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Analysis failed' },
      { status: 500 }
    );
  }
}
```

**Checklist:**
- [ ] API route created
- [ ] Request validation implemented
- [ ] Mock delay added
- [ ] Error handling implemented
- [ ] Response formatting correct

---

## Phase 5: Layout Components 🎨

### 5.1 Create Header Component

**File: `src/components/layout/Header.tsx`**

Carbon components to use:
- `Header`
- `HeaderName`
- `HeaderNavigation`
- `HeaderMenuItem`

### 5.2 Create Footer Component

**File: `src/components/layout/Footer.tsx`**

Include:
- IBM branding
- watsonx.ai acknowledgment
- Copyright notice

### 5.3 Update Root Layout

**File: `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Ticket Inteli - AI-Powered Support Triage',
  description: 'Transform support tickets into actionable engineering briefs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

**Checklist:**
- [ ] Header component created
- [ ] Footer component created
- [ ] Root layout updated
- [ ] Navigation working

---

## Phase 6: Ticket Input Form 📝

### 6.1 Create Form Component

**File: `src/components/ticket/TicketInputForm.tsx`**

Carbon components to use:
- `Form`
- `TextInput`
- `TextArea`
- `Button`
- `Select`

Features to implement:
- Form state management
- Validation (title required, description min 50 chars)
- Sample ticket loading
- Submit handler
- Loading state
- Error display

### 6.2 Create Sample Selector

**File: `src/components/ticket/SampleTicketSelector.tsx`**

Load sample tickets from JSON and populate form.

**Checklist:**
- [ ] Form component created
- [ ] Validation implemented
- [ ] Sample selector created
- [ ] Loading states added
- [ ] Error handling added

---

## Phase 7: Analysis Results Display 📊

### 7.1 Create Main Results Component

**File: `src/components/analysis/AnalysisResults.tsx`**

Container component that orchestrates all sub-components.

### 7.2 Create Sub-Components

Create each analysis display component:

1. **SeverityBadge.tsx** - Color-coded badge
2. **ImpactCard.tsx** - Business impact metrics
3. **ProductAreaTag.tsx** - Chip-style tags
4. **RootCausesList.tsx** - Ordered list with likelihood
5. **HandoffSummary.tsx** - Formatted text block
6. **NextStepsChecklist.tsx** - Interactive checklist
7. **RegressionTests.tsx** - Categorized test list
8. **CustomerResponse.tsx** - Editable draft
9. **ConfidenceScore.tsx** - Progress bar
10. **TimeSavings.tsx** - Metric display

Carbon components to use:
- `Tile`
- `Tag`
- `Accordion`
- `ProgressIndicator`
- `Checkbox`
- `CodeSnippet` (for copy functionality)

**Checklist:**
- [ ] Main results component created
- [ ] All 10 sub-components created
- [ ] Carbon components integrated
- [ ] Copy-to-clipboard functionality added
- [ ] Responsive layout implemented

---

## Phase 8: Pages 📄

### 8.1 Create Home Page

**File: `src/app/page.tsx`**

Sections:
1. Hero with CTA
2. Features grid (3 columns)
3. Demo stats
4. Call to action

### 8.2 Create Analyze Page

**File: `src/app/analyze/page.tsx`**

```typescript
'use client';

import { useState } from 'react';
import TicketInputForm from '@/components/ticket/TicketInputForm';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import type { SupportTicket, TicketAnalysis } from '@/lib/types';

export default function AnalyzePage() {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [analysis, setAnalysis] = useState<TicketAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (submittedTicket: SupportTicket) => {
    setIsLoading(true);
    setError(null);
    setTicket(submittedTicket);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket: submittedTicket }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Analyze Support Ticket</h1>
      
      <TicketInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      
      {error && <ErrorMessage message={error} />}
      
      {analysis && ticket && (
        <AnalysisResults analysis={analysis} ticket={ticket} />
      )}
    </div>
  );
}
```

**Checklist:**
- [ ] Home page created
- [ ] Analyze page created
- [ ] State management implemented
- [ ] API integration working
- [ ] Error handling added

---

## Phase 9: Polish & Testing ✨

### 9.1 Responsive Design

Test on:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone, Android)

### 9.2 Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Focus indicators visible
- [ ] ARIA labels added

### 9.3 Performance

- [ ] Page load < 2 seconds
- [ ] API response < 5 seconds
- [ ] Images optimized
- [ ] Bundle size reasonable

### 9.4 Testing

- [ ] All sample tickets work
- [ ] Form validation works
- [ ] Error states display correctly
- [ ] Loading states work
- [ ] Copy functionality works
- [ ] Navigation works
- [ ] Mobile responsive

---

## Phase 10: Documentation 📚

### 10.1 Create README

**File: `README.md`**

Sections:
1. Project overview
2. Business value for IBM Bob Hackathon
3. Features
4. Technology stack
5. Getting started
6. Usage guide
7. Architecture
8. Future roadmap
9. Contributing
10. License

### 10.2 Environment Variables

**File: `.env.local.example`**

```bash
NEXT_PUBLIC_APP_NAME=Ticket Inteli
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_USE_MOCK_API=true
```

**Checklist:**
- [ ] README created
- [ ] Environment variables documented
- [ ] Code comments added
- [ ] API documentation added

---

## Phase 11: Demo Preparation 🎬

### 11.1 Demo Script

1. **Introduction (30 seconds)**
   - Problem statement
   - Solution overview

2. **Live Demo (2 minutes)**
   - Load sample ticket
   - Show analysis process
   - Highlight key features
   - Show time savings

3. **Business Value (1 minute)**
   - ROI metrics
   - Enterprise applicability
   - watsonx.ai integration path

4. **Q&A (1 minute)**

### 11.2 Demo Checklist

- [ ] Demo script written
- [ ] Sample tickets tested
- [ ] Presentation slides created
- [ ] Screenshots captured
- [ ] Video demo recorded (backup)
- [ ] Talking points memorized

---

## Troubleshooting Guide 🔧

### Common Issues

**Issue: Carbon styles not loading**
- Solution: Check `globals.css` import order
- Ensure `@carbon/react/css/index.css` is imported first

**Issue: Tailwind conflicts with Carbon**
- Solution: Set `corePlugins.preflight: false` in `tailwind.config.ts`

**Issue: API route not found**
- Solution: Ensure file is at `src/app/api/analyze/route.ts`
- Check Next.js App Router configuration

**Issue: TypeScript errors**
- Solution: Run `npm run type-check`
- Ensure all types are properly exported

**Issue: Build fails**
- Solution: Run `npm run build` to see detailed errors
- Check for unused imports or type errors

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types

# Testing
npm test                 # Run tests (if configured)

# Deployment
vercel                   # Deploy to Vercel
```

---

## Success Criteria ✅

Before considering the project complete, ensure:

- [ ] All 10 analysis outputs display correctly
- [ ] Sample tickets load and analyze properly
- [ ] Form validation works as expected
- [ ] Loading states are smooth
- [ ] Error handling is graceful
- [ ] UI is responsive on all devices
- [ ] Accessibility standards met
- [ ] Code is well-documented
- [ ] README is comprehensive
- [ ] Demo is polished and rehearsed

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-17  
**Purpose:** Step-by-step implementation guide