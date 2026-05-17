"use client";

import { Tag } from "@carbon/react";
import { Analytics, Currency, Login } from "@carbon/icons-react";
import { sampleTickets } from "@/lib/mockData";
import { SampleTicket } from "@/types/ticket";

interface SampleTicketSelectorProps {
  onSelect: (ticket: SampleTicket) => void;
}

const sampleMeta: Record<string, {
  severity: "Critical" | "High" | "Medium";
  area: string;
  tagType: "red" | "magenta" | "purple";
  Icon: React.ComponentType<{ size?: number }>;
}> = {
  "TICK-001": {
    severity: "High",
    area: "Authentication",
    tagType: "magenta",
    Icon: Login,
  },
  "TICK-002": {
    severity: "Critical",
    area: "Payments",
    tagType: "red",
    Icon: Currency,
  },
  "TICK-003": {
    severity: "Medium",
    area: "Analytics",
    tagType: "purple",
    Icon: Analytics,
  },
};

export default function SampleTicketSelector({ onSelect }: SampleTicketSelectorProps) {
  return (
    <div className="sample-picker">
      <div className="sample-picker__header">
        <h3>Sample tickets</h3>
        <p>Load a realistic case to preview the full analysis workflow.</p>
      </div>

      <div className="sample-picker__list">
        {sampleTickets.map((ticket) => {
          const meta = sampleMeta[ticket.id];
          const Icon = meta.Icon;

          return (
            <button
              type="button"
              key={ticket.id}
              className="sample-ticket-card"
              onClick={() => onSelect(ticket)}
            >
              <div className="sample-ticket-card__icon">
                <Icon size={18} />
              </div>
              <div className="sample-ticket-card__body">
                <div className="sample-ticket-card__meta">
                  <span>{ticket.id}</span>
                  <Tag type={meta.tagType} size="sm">
                    {meta.severity}
                  </Tag>
                </div>
                <strong>{ticket.title}</strong>
                <p>{ticket.customerName} · {meta.area}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
