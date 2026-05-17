'use client';

import { Grid, Column, Link } from '@carbon/react';

/**
 * Footer Component
 * 
 * Application footer using IBM Carbon Design System.
 * Features:
 * - IBM branding and copyright
 * - Links to documentation and resources
 * - "Powered by IBM watsonx.ai" badge
 * - Responsive grid layout
 * - Accessible and professional styling
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Grid className="footer-content">
        <Column lg={16} md={8} sm={4}>
          <div className="footer-grid">
            {/* Branding Section */}
            <div className="footer-section">
              <h4 className="footer-heading">Ticket Inteli</h4>
              <p className="footer-text">
                AI-powered support ticket analysis and triage platform
              </p>
              <div className="footer-badge">
                <span className="badge-text">Powered by IBM watsonx.ai</span>
              </div>
            </div>

            {/* Resources Section */}
            <div className="footer-section">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/docs" className="footer-link">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="footer-link">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="footer-link">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="footer-section">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li>
                  <Link
                    href="https://www.ibm.com/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    About IBM
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.ibm.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.ibm.com/legal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>
              © {currentYear} IBM Corporation. All rights reserved.
            </p>
          </div>
        </Column>
      </Grid>

      <style jsx>{`
        .footer {
          background-color: var(--cds-background);
          border-top: 1px solid var(--cds-border-subtle);
          padding: 3rem 0 2rem;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1584px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-heading {
          font-size: 1rem;
          font-weight: 600;
          color: var(--cds-text-primary);
          margin: 0;
        }

        .footer-text {
          font-size: 0.875rem;
          color: var(--cds-text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .footer-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background-color: var(--cds-layer-01);
          border: 1px solid var(--cds-border-subtle);
          border-radius: 4px;
          margin-top: 0.5rem;
          width: fit-content;
        }

        .badge-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--cds-text-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          font-size: 0.875rem;
          color: var(--cds-link-primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--cds-link-primary-hover);
          text-decoration: underline;
        }

        .footer-copyright {
          padding-top: 2rem;
          border-top: 1px solid var(--cds-border-subtle);
          text-align: center;
        }

        .footer-copyright p {
          font-size: 0.75rem;
          color: var(--cds-text-secondary);
          margin: 0;
        }

        @media (max-width: 672px) {
          .footer {
            padding: 2rem 0 1.5rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .footer-copyright {
            padding-top: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}

// Made with Bob
