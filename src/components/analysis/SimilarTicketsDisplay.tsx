/**
 * SimilarTicketsDisplay Component
 * Displays related/similar tickets (placeholder for future ML integration)
 */

import { Tile, Tag } from '@carbon/react';
import { DocumentMultiple_01, Search } from '@carbon/icons-react';

interface SimilarTicketsDisplayProps {
  productArea: string;
  className?: string;
}

/**
 * Mock similar tickets based on product area
 * In production, this would query a vector database or ML model
 */
function getMockSimilarTickets(productArea: string) {
  const tickets: Record<string, Array<{
    id: string;
    title: string;
    status: string;
    similarity: number;
  }>> = {
    Authentication: [
      { id: 'TKT-1234', title: 'Login timeout after 2FA', status: 'Resolved', similarity: 0.89 },
      { id: 'TKT-1156', title: 'Session expires too quickly', status: 'Resolved', similarity: 0.82 },
      { id: 'TKT-0987', title: 'Password reset not working', status: 'In Progress', similarity: 0.76 }
    ],
    Billing: [
      { id: 'TKT-2341', title: 'Payment gateway timeout', status: 'Resolved', similarity: 0.91 },
      { id: 'TKT-2298', title: 'International cards declined', status: 'Resolved', similarity: 0.85 },
      { id: 'TKT-2187', title: 'Invoice generation fails', status: 'Resolved', similarity: 0.78 }
    ],
    Performance: [
      { id: 'TKT-3456', title: 'Dashboard slow to load', status: 'Resolved', similarity: 0.88 },
      { id: 'TKT-3401', title: 'API response time increased', status: 'Resolved', similarity: 0.83 },
      { id: 'TKT-3298', title: 'Database query timeout', status: 'In Progress', similarity: 0.79 }
    ],
    API: [
      { id: 'TKT-4567', title: 'Rate limiting too aggressive', status: 'Resolved', similarity: 0.87 },
      { id: 'TKT-4512', title: 'API returns 429 errors', status: 'Resolved', similarity: 0.84 },
      { id: 'TKT-4489', title: 'Webhook delivery failures', status: 'Resolved', similarity: 0.77 }
    ]
  };

  // Return tickets for the primary product area, or generic ones
  return tickets[productArea] || [
    { id: 'TKT-9001', title: 'Similar issue reported', status: 'Resolved', similarity: 0.75 },
    { id: 'TKT-9002', title: 'Related system error', status: 'Resolved', similarity: 0.70 }
  ];
}

export default function SimilarTicketsDisplay({ 
  productArea, 
  className = '' 
}: SimilarTicketsDisplayProps) {
  const similarTickets = getMockSimilarTickets(productArea);

  return (
    <div className={`similar-tickets-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DocumentMultiple_01 size={24} className="text-teal-600" />
          <h3 className="text-lg font-semibold">Similar Tickets</h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Previously resolved tickets with similar characteristics. Review their solutions for insights.
        </p>

        {/* Similar Tickets List */}
        <div className="space-y-3">
          {similarTickets.map((ticket) => (
            <div 
              key={ticket.id}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      {ticket.id}
                    </span>
                    <Tag 
                      type={ticket.status === 'Resolved' ? 'green' : 'blue'}
                      size="sm"
                    >
                      {ticket.status}
                    </Tag>
                  </div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {ticket.title}
                  </h4>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Similarity
                  </div>
                  <div className="text-sm font-bold text-teal-600">
                    {Math.round(ticket.similarity * 100)}%
                  </div>
                </div>
              </div>
              
              {/* Similarity Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-teal-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${ticket.similarity * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Search size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-teal-800 dark:text-teal-200">
              <strong>Note:</strong> Similarity scores are calculated using semantic analysis. 
              Click on a ticket to view its full resolution details.
            </p>
          </div>
        </div>
      </Tile>
    </div>
  );
}

// Made with Bob
