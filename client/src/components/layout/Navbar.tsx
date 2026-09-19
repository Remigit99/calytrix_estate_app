import { Heart, Menu, User } from 'lucide-react';
import { Link, NavLink } from 'react-router';

import { Button } from '../ui';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-surface)/95 backdrop-blur">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="shrink-0 text-lg font-semibold tracking-tight text-(--color-text)"
          >
            Calytrix
            <span className="text-(--color-primary)">.</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavItem to="/">
              Discover
            </NavItem>

            <NavItem to="/properties">
              Properties
            </NavItem>

            <NavItem to="/agents">
              Agents
            </NavItem>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="inline-flex size-10 items-center justify-center rounded-(--radius-control) text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text)"
            >
              <Heart size={19} strokeWidth={1.8} />
            </Link>

            <Link
              to="/login"
              className="inline-flex h-10 items-center gap-2 rounded-(--radius-control) px-3 text-body-sm font-medium text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text)"
            >
              <User size={18} strokeWidth={1.8} />
              Sign in
            </Link>

            <Button size="sm">
              List a property
            </Button>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="inline-flex size-10 items-center justify-center rounded-(--radius-control) text-(--color-text-secondary) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-text) md:hidden"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
};

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

const NavItem = ({ to, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        [
          'rounded-(--radius-control) px-3 py-2',
          'text-body-sm font-medium',
          'transition-colors duration-200',
          isActive
            ? 'bg-(--color-primary-soft) text-(--color-primary)'
            : 'text-(--color-text-secondary) hover:bg-(--color-surface-muted) hover:text-(--color-text)',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
};

export default Navbar;