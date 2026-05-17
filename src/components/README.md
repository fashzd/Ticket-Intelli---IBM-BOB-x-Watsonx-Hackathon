# Components

This directory contains React components organized by feature area.

## Structure

- **analysis/** - Components for displaying ticket analysis results
- **ticket/** - Components for ticket input and selection
- **layout/** - Layout and navigation components

## Naming Conventions

- Use PascalCase for component files (e.g., `TicketSelector.tsx`)
- Export components as named exports
- Include TypeScript types for all props
- Use Carbon Design System components where possible

## Example Component

```tsx
import { Button } from "@carbon/react";

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>Click me</Button>
    </div>
  );
}