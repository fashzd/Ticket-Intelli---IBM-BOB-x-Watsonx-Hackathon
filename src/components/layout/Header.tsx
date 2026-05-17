'use client';

import { usePathname } from 'next/navigation';
import {
  Header as CarbonHeader,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from '@carbon/react';
import { Notification, UserAvatar } from '@carbon/icons-react';

/**
 * Header Component
 *
 * Main navigation header using IBM Carbon Design System.
 * Features:
 * - IBM branding with "Ticket Inteli" name
 * - Navigation links (Home, Analyze Ticket)
 * - Active page highlighting with consistent styling
 * - Global actions (notifications, user profile)
 * - Responsive design
 * - Accessible with skip-to-content link
 * - Enhanced contrast for better visibility
 */
export default function Header() {
  const pathname = usePathname();

  /**
   * Check if a path is currently active
   */
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <CarbonHeader aria-label="Ticket Inteli">
        <SkipToContent />
        <HeaderName href="/" prefix="IBM">
          Ticket Inteli
        </HeaderName>
        <HeaderNavigation aria-label="Main navigation">
          <HeaderMenuItem
            href="/"
            isCurrentPage={isActive('/')}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </HeaderMenuItem>
          <HeaderMenuItem
            href="/analyze"
            isCurrentPage={isActive('/analyze')}
            aria-current={isActive('/analyze') ? 'page' : undefined}
          >
            Analyze Ticket
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="end"
          >
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="User profile"
            tooltipAlignment="end"
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </CarbonHeader>
      
      {/* Enhanced active tab styling for consistency */}
      <style jsx global>{`
        .cds--header__menu-item[aria-current="page"],
        .cds--header__menu-item.cds--header__menu-item--current {
          position: relative;
          background-color: rgba(15, 98, 254, 0.1);
        }
        
        .cds--header__menu-item[aria-current="page"]::after,
        .cds--header__menu-item.cds--header__menu-item--current::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #0f62fe;
        }
        
        .cds--header__menu-item[aria-current="page"] .cds--header__menu-item-link,
        .cds--header__menu-item.cds--header__menu-item--current .cds--header__menu-item-link {
          color: #0f62fe;
          font-weight: 600;
        }
        
        .cds--header__menu-item:hover {
          background-color: rgba(15, 98, 254, 0.05);
        }
      `}</style>
    </>
  );
}

// Made with Bob
