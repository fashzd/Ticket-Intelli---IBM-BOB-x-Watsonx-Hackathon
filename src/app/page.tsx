"use client";

import Link from "next/link";
import { Button } from "@carbon/react";
import {
  Analytics,
  ArrowRight,
  ChartLine,
  Checkmark,
  Time,
  UserMultiple,
} from "@carbon/icons-react";

const metrics = [
  { value: "80%", label: "Faster triage" },
  { value: "95%", label: "Decision consistency" },
  { value: "2-3s", label: "Analysis response" },
];

const capabilities = [
  {
    icon: Analytics,
    title: "Severity and impact",
    description: "Classifies urgency, affected users, and likely business risk from the ticket content.",
  },
  {
    icon: ChartLine,
    title: "Root cause direction",
    description: "Surfaces probable causes and product areas so support can start in the right place.",
  },
  {
    icon: Time,
    title: "Resolution path",
    description: "Turns raw ticket text into ordered next steps, owner-ready handoff, and time estimates.",
  },
  {
    icon: UserMultiple,
    title: "Customer-ready response",
    description: "Drafts a clear update for the customer while engineering investigates the issue.",
  },
];

const previewRows = [
  ["Payment failure at checkout", "Critical", "Billing"],
  ["Login page blank after release", "High", "Auth"],
  ["Dashboard totals mismatch", "Medium", "Analytics"],
];

export default function Home() {
  return (
    <div className="app-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <div className="section-kicker">IBM watsonx.ai assisted triage</div>
          <h1>Ticket Inteli</h1>
          <p className="home-hero__lead">
            Analyze support tickets into severity, impact, likely root causes,
            resolution steps, and customer communication in one focused workflow.
          </p>
          <div className="home-hero__actions">
            <Link href="/analyze">
              <Button size="lg" renderIcon={ArrowRight}>
                Analyze a ticket
              </Button>
            </Link>
            <a href="#capabilities" className="secondary-link">
              See capabilities
            </a>
          </div>
        </div>

        <div className="workflow-preview" aria-label="Ticket analysis preview">
          <div className="workflow-preview__header">
            <div>
              <p className="eyebrow">Triage queue</p>
              <h2>Live support signals</h2>
            </div>
            <span className="status-pill">AI ready</span>
          </div>

          <div className="workflow-preview__metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <span>{metric.value}</span>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="ticket-table">
            {previewRows.map(([title, severity, area]) => (
              <div key={title} className="ticket-row">
                <div>
                  <strong>{title}</strong>
                  <span>{area}</span>
                </div>
                <span className={`severity-badge severity-badge--${severity.toLowerCase()}`}>
                  {severity}
                </span>
              </div>
            ))}
          </div>

          <div className="insight-strip">
            <Checkmark size={20} />
            <span>Suggested handoff and customer update are ready to copy.</span>
          </div>
        </div>
      </section>

      <section className="capability-section" id="capabilities">
        <div className="section-heading">
          <div className="section-kicker">Core workflow</div>
          <h2>Everything a support lead needs before escalation</h2>
          <p>
            The interface keeps the operator close to the ticket while making
            generated guidance easy to verify, copy, and act on.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <article key={capability.title} className="surface-card">
                <div className="icon-tile">
                  <Icon size={24} />
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready when the queue spikes</p>
          <h2>Start with a sample ticket or paste a real support case.</h2>
        </div>
        <Link href="/analyze">
          <Button size="lg" renderIcon={ArrowRight}>
            Open analyzer
          </Button>
        </Link>
      </section>
    </div>
  );
}
