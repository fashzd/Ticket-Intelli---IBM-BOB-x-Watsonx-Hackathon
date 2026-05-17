# Ticket Inteli

AI-powered support ticket analysis to accelerate triage and improve customer response quality.

## Overview

Ticket Inteli uses IBM watsonx.ai to analyze customer support tickets and provide:
- Severity assessment
- Business impact analysis
- Root cause identification
- Engineering handoff summaries
- Customer response drafts
- Recommended next steps

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **UI Library**: Carbon Design System
- **AI**: IBM watsonx.ai (granite-3.1-8b-instruct)
- **Styling**: Tailwind CSS + Carbon Styles

## Project Structure

```
├── docs/                    # Planning and architecture documents
├── bob_sessions/           # Development session logs
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── lib/              # Utilities and mock data
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Development Phases

### Phase 1: Foundation ✓
- [x] Next.js TypeScript setup
- [x] Carbon Design System integration
- [x] TypeScript types aligned with watsonx schema
- [x] Mock data and responses
- [x] Basic project structure

### Phase 2: Core UI (Next)
- [ ] Main analysis page layout
- [ ] Sample ticket selector
- [ ] Manual ticket input
- [ ] Analysis results display
- [ ] Customer response editor

### Phase 3: watsonx Integration
- [ ] API route for watsonx
- [ ] Prompt engineering
- [ ] Response parsing
- [ ] Error handling

### Phase 4: Polish
- [ ] Loading states
- [ ] Error messages
- [ ] Copy/export functionality
- [ ] Responsive design

## Documentation

See the `docs/` folder for detailed planning documents:
- Architecture overview
- Technical implementation plan
- Business value analysis
- Project summary

## License

MIT
