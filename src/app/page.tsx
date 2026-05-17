"use client";

import { Header, HeaderName, Content } from "@carbon/react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header aria-label="Ticket Inteli">
        <HeaderName href="/" prefix="IBM">
          Ticket Inteli
        </HeaderName>
      </Header>
      <Content>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Ticket Inteli
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            AI-powered support ticket analysis to accelerate triage and improve customer response quality.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Setup Complete! ✓</h2>
            <p className="text-gray-700">
              Phase 1 initialization is complete. The Next.js app with Carbon Design System is ready.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✓ Next.js 16 with TypeScript</li>
              <li>✓ Carbon Design System installed</li>
              <li>✓ TypeScript types defined</li>
              <li>✓ Mock data prepared</li>
              <li>✓ Project structure organized</li>
            </ul>
          </div>
        </div>
      </Content>
    </div>
  );
}

// Made with Bob
