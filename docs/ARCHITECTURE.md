# Ticket Inteli - Architecture Overview

## High-Level System Design

This document provides visual representations of the Ticket Inteli architecture, component relationships, and data flows.

---

## Application Flow

```mermaid
graph LR
    A[User Visits App] --> B{Choose Action}
    B -->|View Info| C[Home Page]
    B -->|Analyze Ticket| D[Analyze Page]
    
    D --> E[Enter Ticket Details]
    E --> F{Use Sample?}
    F -->|Yes| G[Load Sample Ticket]
    F -->|No| H[Manual Entry]
    
    G --> I[Submit for Analysis]
    H --> I
    
    I --> J[API Processing]
    J --> K[Mock Analyzer]
    K --> L[Generate Results]
    L --> M[Display Analysis]
    
    M --> N{User Action}
    N -->|Copy Response| O[Clipboard]
    N -->|New Ticket| E
    N -->|Export| P[Download JSON]
    
    style A fill:#e0f2fe
    style D fill:#bae6fd
    style J fill:#7dd3fc
    style M fill:#38bdf8
```

---

## Component Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App Router]
        B[React Components]
        C[Carbon Design System]
        D[Tailwind CSS]
    end
    
    subgraph "Page Layer"
        E[Home Page]
        F[Analyze Page]
    end
    
    subgraph "Component Layer"
        G[Layout Components]
        H[Ticket Components]
        I[Analysis Components]
        J[UI Components]
    end
    
    subgraph "API Layer"
        K[API Routes]
        L[Mock Analyzer]
    end
    
    subgraph "Data Layer"
        M[TypeScript Types]
        N[Sample Tickets JSON]
        O[Constants]
    end
    
    A --> E
    A --> F
    E --> G
    F --> G
    F --> H
    F --> I
    G --> J
    H --> J
    I --> J
    
    B --> C
    B --> D
    
    F --> K
    K --> L
    L --> M
    L --> N
    L --> O
    
    style A fill:#dbeafe
    style K fill:#93c5fd
    style L fill:#60a5fa
```

---

## Data Model Relationships

```mermaid
erDiagram
    SupportTicket ||--|| TicketAnalysis : generates
    TicketAnalysis ||--|{ RootCause : contains
    TicketAnalysis ||--|{ NextStep : contains
    TicketAnalysis ||--|{ RegressionTest : contains
    TicketAnalysis ||--|| BusinessImpact : includes
    TicketAnalysis ||--|{ ProductArea : identifies
    
    SupportTicket {
        string id PK
        string title
        string description
        string customerName
        string customerEmail
        datetime submittedAt
    }
    
    TicketAnalysis {
        string ticketId FK
        string severity
        int confidenceScore
        int estimatedTriageTimeSaved
        string engineeringHandoff
        string customerResponse
        datetime analyzedAt
    }
    
    BusinessImpact {
        int affectedUsers
        string revenueImpact
        string description
    }
    
    RootCause {
        string category
        string description
        string likelihood
    }
    
    NextStep {
        string action
        string priority
        string assignee
        string estimatedTime
    }
    
    RegressionTest {
        string scenario
        string testType
        string priority
    }
```

---

## API Request/Response Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as React UI
    participant Form as Ticket Form
    participant API as /api/analyze
    participant Analyzer as Mock Analyzer
    participant Data as Sample Data
    
    User->>UI: Navigate to /analyze
    UI->>Form: Render form
    
    alt Load Sample Ticket
        User->>Form: Select sample
        Form->>Data: Fetch sample ticket
        Data-->>Form: Return ticket data
        Form->>Form: Populate fields
    else Manual Entry
        User->>Form: Enter ticket details
    end
    
    User->>Form: Click Analyze
    Form->>Form: Validate input
    
    alt Validation Fails
        Form-->>User: Show error message
    else Validation Passes
        Form->>API: POST ticket data
        API->>Analyzer: Process ticket
        
        Analyzer->>Analyzer: Detect keywords
        Analyzer->>Analyzer: Calculate severity
        Analyzer->>Analyzer: Map product areas
        Analyzer->>Analyzer: Generate root causes
        Analyzer->>Analyzer: Create handoff summary
        Analyzer->>Analyzer: Suggest next steps
        Analyzer->>Analyzer: Generate tests
        Analyzer->>Analyzer: Draft customer response
        Analyzer->>Analyzer: Calculate confidence
        
        Analyzer-->>API: Return analysis
        API-->>Form: Send response
        Form->>UI: Update with results
        UI-->>User: Display analysis
    end
```

---

## Mock Analyzer Logic Flow

```mermaid
flowchart TD
    A[Receive Ticket] --> B[Extract Text]
    B --> C[Normalize Text]
    C --> D[Keyword Detection]
    
    D --> E{Detect Severity Keywords}
    E -->|Critical Words| F[Set Severity: Critical]
    E -->|High Words| G[Set Severity: High]
    E -->|Medium Words| H[Set Severity: Medium]
    E -->|Low/None| I[Set Severity: Low]
    
    F --> J[Map Product Areas]
    G --> J
    H --> J
    I --> J
    
    J --> K{Identify Areas}
    K -->|Auth Keywords| L[Add: Authentication]
    K -->|Payment Keywords| M[Add: Billing]
    K -->|API Keywords| N[Add: API]
    K -->|UI Keywords| O[Add: UI]
    K -->|Perf Keywords| P[Add: Performance]
    
    L --> Q[Generate Root Causes]
    M --> Q
    N --> Q
    O --> Q
    P --> Q
    
    Q --> R[Create Handoff Summary]
    R --> S[Suggest Next Steps]
    S --> T[Generate Regression Tests]
    T --> U[Draft Customer Response]
    U --> V[Calculate Confidence Score]
    
    V --> W{Score Calculation}
    W -->|Base Score| X[Start at 70]
    X -->|+Keyword Matches| Y[Add 5 per match]
    Y -->|+Error Codes| Z[Add 10]
    Z -->|+Specific Areas| AA[Add 5]
    AA -->|-Vague Description| AB[Subtract 10]
    AB --> AC[Cap at 95]
    
    AC --> AD[Estimate Time Saved]
    AD --> AE[Return Analysis Object]
    
    style A fill:#e0f2fe
    style E fill:#bae6fd
    style K fill:#7dd3fc
    style V fill:#38bdf8
    style AE fill:#0ea5e9
```

---

## Component Hierarchy

```mermaid
graph TD
    A[app/layout.tsx] --> B[Header]
    A --> C[Main Content]
    A --> D[Footer]
    
    C --> E[app/page.tsx - Home]
    C --> F[app/analyze/page.tsx]
    
    E --> G[Hero Section]
    E --> H[Features Grid]
    E --> I[Demo Stats]
    
    F --> J[TicketInputForm]
    F --> K[AnalysisResults]
    
    J --> L[TextInput: Title]
    J --> M[TextArea: Description]
    J --> N[TextInput: Customer Name]
    J --> O[TextInput: Customer Email]
    J --> P[SampleTicketSelector]
    J --> Q[Button: Analyze]
    
    K --> R[SeverityBadge]
    K --> S[ImpactCard]
    K --> T[ProductAreaTag]
    K --> U[RootCausesList]
    K --> V[HandoffSummary]
    K --> W[NextStepsChecklist]
    K --> X[RegressionTests]
    K --> Y[CustomerResponse]
    K --> Z[ConfidenceScore]
    K --> AA[TimeSavings]
    
    style A fill:#f0f9ff
    style F fill:#e0f2fe
    style K fill:#bae6fd
    style R fill:#7dd3fc
    style Z fill:#38bdf8
```

---

## File Structure Tree

```
ticket-inteli/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx ..................... Root layout with Carbon theme
│   │   ├── page.tsx ....................... Home page
│   │   ├── globals.css .................... Global styles
│   │   │
│   │   ├── analyze/
│   │   │   └── page.tsx ................... Main analysis interface
│   │   │
│   │   └── api/
│   │       └── analyze/
│   │           └── route.ts ............... Mock API endpoint
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx ................. App header
│   │   │   ├── Footer.tsx ................. App footer
│   │   │   └── Sidebar.tsx ................ Navigation sidebar
│   │   │
│   │   ├── ticket/
│   │   │   ├── TicketInputForm.tsx ........ Main form component
│   │   │   ├── TicketPreview.tsx .......... Ticket display
│   │   │   └── SampleTicketSelector.tsx ... Sample loader
│   │   │
│   │   ├── analysis/
│   │   │   ├── AnalysisResults.tsx ........ Results container
│   │   │   ├── SeverityBadge.tsx .......... Severity indicator
│   │   │   ├── ImpactCard.tsx ............. Business impact
│   │   │   ├── ProductAreaTag.tsx ......... Product tags
│   │   │   ├── RootCausesList.tsx ......... Root causes
│   │   │   ├── HandoffSummary.tsx ......... Engineering handoff
│   │   │   ├── NextStepsChecklist.tsx ..... Action items
│   │   │   ├── RegressionTests.tsx ........ Test suggestions
│   │   │   ├── CustomerResponse.tsx ....... Draft response
│   │   │   ├── ConfidenceScore.tsx ........ Confidence meter
│   │   │   └── TimeSavings.tsx ............ Time saved metric
│   │   │
│   │   └── ui/
│   │       ├── LoadingSpinner.tsx ......... Loading state
│   │       ├── ErrorMessage.tsx ........... Error display
│   │       └── MetricCard.tsx ............. Metric component
│   │
│   ├── lib/
│   │   ├── types.ts ....................... TypeScript interfaces
│   │   ├── mockAnalyzer.ts ................ Analysis logic
│   │   ├── constants.ts ................... App constants
│   │   └── utils.ts ....................... Utility functions
│   │
│   ├── data/
│   │   └── sample-tickets.json ............ Sample fixtures
│   │
│   └── styles/
│       └── carbon-overrides.css ........... Theme customizations
│
├── public/
│   ├── images/
│   │   └── logo.svg ....................... App logo
│   └── favicon.ico
│
├── .env.local.example ..................... Environment template
├── .env.local ............................. Local config
├── next.config.js ......................... Next.js config
├── tailwind.config.ts ..................... Tailwind config
├── tsconfig.json .......................... TypeScript config
├── package.json ........................... Dependencies
├── README.md .............................. Documentation
├── TECHNICAL_PLAN.md ...................... This document
└── ARCHITECTURE.md ........................ Architecture diagrams
```

---

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Idle: Page Load
    
    Idle --> FormEntry: User starts typing
    FormEntry --> FormValidation: User submits
    
    FormValidation --> FormError: Validation fails
    FormError --> FormEntry: User corrects
    
    FormValidation --> Analyzing: Validation passes
    Analyzing --> AnalysisSuccess: API returns success
    Analyzing --> AnalysisError: API returns error
    
    AnalysisSuccess --> DisplayingResults: Render results
    DisplayingResults --> Idle: User clicks New Ticket
    DisplayingResults --> DisplayingResults: User interacts with results
    
    AnalysisError --> FormEntry: User retries
    
    note right of Analyzing
        Shows loading spinner
        Disables form inputs
        Simulates 2-3s delay
    end note
    
    note right of DisplayingResults
        Shows all 10 analysis fields
        Enables copy/export actions
        Displays confidence score
    end note
```

---

## Deployment Architecture (Future)

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile Browser]
    end
    
    subgraph "CDN Layer"
        C[Vercel Edge Network]
    end
    
    subgraph "Application Layer"
        D[Next.js App]
        E[API Routes]
    end
    
    subgraph "AI Layer - Future"
        F[watsonx.ai API]
        G[IBM Cloud]
    end
    
    subgraph "Data Layer - Future"
        H[PostgreSQL]
        I[Redis Cache]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    E -.->|Future| F
    F -.->|Hosted on| G
    E -.->|Future| H
    E -.->|Future| I
    
    style D fill:#dbeafe
    style E fill:#93c5fd
    style F fill:#60a5fa
    style G fill:#3b82f6
```

---

## Security & Error Handling

```mermaid
flowchart TD
    A[User Input] --> B{Input Validation}
    B -->|Invalid| C[Return 400 Error]
    B -->|Valid| D[Sanitize Input]
    
    D --> E[Process Request]
    E --> F{Processing Success?}
    
    F -->|Yes| G[Return 200 + Data]
    F -->|No| H{Error Type}
    
    H -->|Server Error| I[Return 500 Error]
    H -->|Timeout| J[Return 504 Error]
    H -->|Rate Limit| K[Return 429 Error]
    
    C --> L[Display User-Friendly Message]
    I --> L
    J --> L
    K --> L
    
    G --> M[Render Results]
    L --> N[Show Error Component]
    
    style B fill:#fef3c7
    style F fill:#fef3c7
    style H fill:#fecaca
    style M fill:#bbf7d0
```

---

## Performance Optimization Strategy

```mermaid
mindmap
    root((Performance))
        Frontend
            Code Splitting
                Dynamic imports
                Route-based splitting
            Image Optimization
                Next.js Image component
                WebP format
                Lazy loading
            CSS Optimization
                Tailwind purging
                Critical CSS
                Carbon tree-shaking
        Backend
            API Caching
                Response caching
                Memoization
            Mock Delays
                Realistic timing
                Progressive loading
        Build
            Bundle Size
                Tree shaking
                Minification
                Compression
            Static Generation
                Pre-render pages
                ISR for updates
```

---

## Testing Strategy

```mermaid
graph LR
    A[Testing Pyramid] --> B[Unit Tests]
    A --> C[Integration Tests]
    A --> D[E2E Tests]
    A --> E[Manual Tests]
    
    B --> F[Mock Analyzer Logic]
    B --> G[Utility Functions]
    B --> H[Type Validation]
    
    C --> I[API Routes]
    C --> J[Component Integration]
    C --> K[Form Submission]
    
    D --> L[Full User Flow]
    D --> M[Cross-Browser]
    D --> N[Mobile Responsive]
    
    E --> O[Accessibility]
    E --> P[UX Testing]
    E --> Q[Demo Rehearsal]
    
    style A fill:#f0f9ff
    style B fill:#dbeafe
    style C fill:#bae6fd
    style D fill:#7dd3fc
    style E fill:#38bdf8
```

---

## Future Integration Path

```mermaid
graph TD
    A[Current: Mock API] --> B{Phase 2}
    B --> C[watsonx.ai Integration]
    
    C --> D[API Key Setup]
    C --> E[Model Selection]
    C --> F[Prompt Engineering]
    
    D --> G[Environment Config]
    E --> H[Fine-tuning]
    F --> I[Response Parsing]
    
    G --> J[Production Deployment]
    H --> J
    I --> J
    
    J --> K{Phase 3}
    K --> L[Historical Analytics]
    K --> M[Ticket Routing]
    K --> N[Multi-language]
    
    L --> O[Database Integration]
    M --> P[Workflow Automation]
    N --> Q[Translation API]
    
    style A fill:#e0f2fe
    style C fill:#93c5fd
    style J fill:#3b82f6
    style K fill:#2563eb
```

---

## Carbon Design System Integration

```mermaid
graph LR
    A[Carbon Components] --> B[Layout]
    A --> C[Forms]
    A --> D[Data Display]
    A --> E[Feedback]
    
    B --> F[Grid System]
    B --> G[Header/Footer]
    B --> H[Sidebar]
    
    C --> I[TextInput]
    C --> J[TextArea]
    C --> K[Button]
    C --> L[Select]
    
    D --> M[Tile]
    D --> N[Tag]
    D --> O[Accordion]
    D --> P[ProgressIndicator]
    
    E --> Q[Loading]
    E --> R[InlineNotification]
    E --> S[Modal]
    
    style A fill:#0f62fe
    style B fill:#4589ff
    style C fill:#4589ff
    style D fill:#4589ff
    style E fill:#4589ff
```

---

**Document Version:** 1.0  
**Last Updated:** 2026-05-17  
**Purpose:** Visual architecture reference for Ticket Inteli