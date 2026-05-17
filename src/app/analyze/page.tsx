"use client";

import { useCallback, useState } from "react";
import { Button } from "@carbon/react";
import {
  Analytics,
  ChartLine,
  Checkmark,
  DocumentExport,
  TaskComplete,
  Time,
  WarningAlt,
} from "@carbon/icons-react";
import TicketInputForm from "@/components/ticket/TicketInputForm";
import SampleTicketSelector from "@/components/ticket/SampleTicketSelector";
import AnalysisSummary from "@/components/analysis/AnalysisSummary";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ToastContainer } from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { TicketAnalysis, SampleTicket } from "@/types/ticket";

const coverageItems = [
  { label: "Severity and impact", Icon: WarningAlt },
  { label: "Root cause candidates", Icon: Analytics },
  { label: "Resolution checklist", Icon: TaskComplete },
  { label: "Engineering handoff", Icon: DocumentExport },
];

export default function AnalyzePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<TicketAnalysis | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [formRevision, setFormRevision] = useState(0);
  const { toasts, showToast, dismissToast } = useToast();

  const handleSampleSelect = useCallback((ticket: SampleTicket) => {
    setTitle(ticket.title);
    setDescription(ticket.description);
    setError(null);
    setAnalysis(null);
    setFormRevision((revision) => revision + 1);
    showToast({
      type: "info",
      title: "Sample loaded",
      message: ticket.title,
      duration: 3000,
    });
  }, [showToast]);

  const handleSubmit = useCallback(async (
    ticketTitle: string,
    ticketDescription: string,
    isRetry = false
  ) => {
    setTitle(ticketTitle);
    setDescription(ticketDescription);
    setLoading(true);
    setError(null);
    if (!isRetry) {
      setAnalysis(null);
      setRetryCount(0);
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: ticketTitle,
          description: ticketDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze ticket");
      }

      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        setRetryCount(0);

        showToast({
          type: "success",
          title: "Analysis complete",
          message: "Ticket insights are ready to review",
          duration: 4000,
        });

        setTimeout(() => {
          document.getElementById("analysis-results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "An unexpected error occurred while analyzing the ticket";

      setError(errorMessage);

      showToast({
        type: "error",
        title: "Analysis failed",
        message: errorMessage,
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const handleRetry = useCallback(() => {
    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);

    const delay = Math.min(1000 * Math.pow(2, retryCount), 4000);

    showToast({
      type: "info",
      title: "Retrying",
      message: `Attempt ${newRetryCount + 1}`,
      duration: 2000,
    });

    setTimeout(() => {
      handleSubmit(title, description, true);
    }, delay);
  }, [retryCount, title, description, handleSubmit, showToast]);

  const handleNewAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setTitle("");
    setDescription("");
    setRetryCount(0);
    setFormRevision((revision) => revision + 1);
  }, []);

  return (
    <div className="app-page analyze-page">
      <ToastContainer toasts={toasts} onClose={dismissToast} />

      <section className="workspace-header">
        <div>
          <div className="section-kicker">AI-powered support operations</div>
          <h1>Analyze support ticket</h1>
          <p>
            Convert raw customer context into a triage decision, investigation
            path, and communication draft.
          </p>
        </div>
        <div className="workspace-header__metrics" aria-label="Analysis performance">
          <div>
            <Time size={20} />
            <span>2-3s</span>
            <p>Typical analysis</p>
          </div>
          <div>
            <ChartLine size={20} />
            <span>80%</span>
            <p>Triage time saved</p>
          </div>
        </div>
      </section>

      <section className="analyze-workspace">
        <aside className="surface-panel input-panel">
          <div className="panel-title">
            <div className="icon-tile">
              <Analytics size={22} />
            </div>
            <div>
              <h2>Ticket details</h2>
              <p>Paste a support case or start from a sample.</p>
            </div>
          </div>

          {!analysis && (
            <>
              <TicketInputForm
                key={formRevision}
                onSubmit={(ticketTitle, ticketDescription) => handleSubmit(ticketTitle, ticketDescription, false)}
                loading={loading}
                initialTitle={title}
                initialDescription={description}
              />
              <SampleTicketSelector onSelect={handleSampleSelect} />
            </>
          )}

          {analysis && (
            <div className="analysis-complete-panel">
              <div className="analysis-complete-panel__status">
                <Checkmark size={20} />
                <div>
                  <strong>Analysis complete</strong>
                  <p>Review the generated workspace to the right.</p>
                </div>
              </div>
              <Button
                kind="secondary"
                onClick={handleNewAnalysis}
                className="w-full"
              >
                Analyze another ticket
              </Button>
            </div>
          )}

          <div className="coverage-list" aria-label="Analysis coverage">
            {coverageItems.map(({ label, Icon }) => (
              <div key={label}>
                <Icon size={18} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="results-column" id="analysis-results">
          {loading && (
            <div className="surface-panel loading-panel">
              <div className="loading-panel__header">
                <div className="spinner-ring" aria-hidden="true" />
                <div>
                  <h2>Analyzing ticket</h2>
                  <p>Generating severity, impact, next steps, and handoff text.</p>
                </div>
              </div>
              <SkeletonLoader type="analysis" />
            </div>
          )}

          {error && !loading && (
            <div className="surface-panel error-panel">
              <ErrorMessage
                message={error}
                title="Analysis failed"
              />
              <div className="error-panel__actions">
                <Button
                  onClick={handleRetry}
                  disabled={retryCount >= 3}
                  size="md"
                >
                  {retryCount >= 3 ? "Max retries reached" : `Retry analysis ${retryCount > 0 ? `(${retryCount}/3)` : ""}`}
                </Button>
                <Button
                  onClick={handleNewAnalysis}
                  kind="secondary"
                  size="md"
                >
                  Start over
                </Button>
              </div>
            </div>
          )}

          {analysis && !loading && (
            <>
              <div className="surface-panel results-intro">
                <div>
                  <div className="section-kicker">Generated analysis</div>
                  <h2>Results workspace</h2>
                  <p>Verify the recommendations, then copy the handoff or customer response.</p>
                </div>
                <span className="status-pill status-pill--success">
                  <Checkmark size={16} />
                  Complete
                </span>
              </div>
              <AnalysisSummary analysis={analysis} />
            </>
          )}

          {!loading && !error && !analysis && (
            <div className="surface-panel empty-results">
              <div className="empty-results__icon">
                <ChartLine size={34} />
              </div>
              <h2>Ready for ticket context</h2>
              <p>
                Once a ticket is submitted, this workspace will show the triage
                summary, impact estimate, root cause candidates, next steps,
                and copy-ready communication.
              </p>
              <div className="empty-results__rows">
                <div>
                  <WarningAlt size={18} />
                  <span>Priority and customer impact</span>
                </div>
                <div>
                  <TaskComplete size={18} />
                  <span>Investigation checklist</span>
                </div>
                <div>
                  <DocumentExport size={18} />
                  <span>Engineering handoff</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
