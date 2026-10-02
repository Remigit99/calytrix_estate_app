import {
  Heart,
  Menu,
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
import {
  Link,
  useLocation,
} from 'react-router';

import { Container } from '../ui';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const { pathname } = useLocation();

  // The homepage hero uses the transparent/white navbar.
  // Inner pages use a solid navbar.
  const isHomePage = pathname === '/';

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const linkClass = isHomePage
    ? 'text-white/75 hover:text-white'
    : 'text-slate-600 hover:text-slate-950';

  return (
    <header
      className={
        isHomePage
          ? 'absolute inset-x-0 top-0 z-50'
          : 'relative z-50 border-b border-slate-200 bg-white'
      }
    >
      <Container>
        <nav
          className={[
            'relative flex h-20 items-center justify-between',
            isHomePage
              ? 'border-b border-white/15'
              : '',
          ].join(' ')}
        >
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className={[
              'relative z-10 text-xl font-semibold tracking-[-0.03em]',
              isHomePage
                ? 'text-white'
                : 'text-slate-950',
            ].join(' ')}
          >
            Calytrix
            <span
              className={
                isHomePage
                  ? 'ml-1 font-normal text-white/60'
                  : 'ml-1 font-normal text-slate-400'
              }
            >
              Estate
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              to="/properties"
              className={`text-sm font-medium transition-colors ${linkClass}`}
            >
              Properties
            </Link>

            <Link
              to="/properties"
              className={`text-sm font-medium transition-colors ${linkClass}`}
            >
              Discover
            </Link>

            <Link
              to="/agents"
              className={`text-sm font-medium transition-colors ${linkClass}`}
            >
              Agents
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/favorites"
              aria-label="Favorites"
              className={[
                'flex size-10 items-center justify-center rounded-full transition-colors',
                isHomePage
                  ? 'text-white/75 hover:bg-white/10 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
              ].join(' ')}
            >
              <Heart
                size={19}
                strokeWidth={1.8}
              />
            </Link>

            <Link
              to="/login"
              className={[
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isHomePage
                  ? 'text-white/80 hover:bg-white/10 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950',
              ].join(' ')}
            >
              <UserRound
                size={17}
                strokeWidth={1.8}
              />
              Sign in
            </Link>

            <Link
              to="/properties/new"
              className={[
                'ml-1 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition-all duration-200',
                isHomePage
                  ? 'border border-white/35 bg-white/10 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20'
                  : 'bg-slate-950 text-white hover:bg-slate-800',
              ].join(' ')}
            >
              List a property
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              isMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((open) => !open)
            }
            className={[
              'relative z-10 flex size-10 items-center justify-center rounded-full transition-colors lg:hidden',
              isHomePage
                ? 'border border-white/25 bg-black/10 text-white backdrop-blur-md hover:bg-white/15'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
            ].join(' ')}
          >
            {isMenuOpen ? (
              <X
                size={21}
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                size={21}
                strokeWidth={1.8}
              />
            )}
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div
              className={[
                'absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border p-2 shadow-xl lg:hidden',
                isHomePage
                  ? 'border-white/20 bg-black/80 backdrop-blur-xl'
                  : 'border-slate-200 bg-white',
              ].join(' ')}
            >
              <div className="flex flex-col">
                <Link
                  to="/properties"
                  onClick={closeMenu}
                  className={[
                    'rounded-xl px-4 py-3.5 text-sm font-medium transition-colors',
                    isHomePage
                      ? 'text-white/85 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950',
                  ].join(' ')}
                >
                  Properties
                </Link>

                <Link
                  to="/properties"
                  onClick={closeMenu}
                  className={[
                    'rounded-xl px-4 py-3.5 text-sm font-medium transition-colors',
                    isHomePage
                      ? 'text-white/85 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950',
                  ].join(' ')}
                >
                  Discover
                </Link>

                <Link
                  to="/agents"
                  onClick={closeMenu}
                  className={[
                    'rounded-xl px-4 py-3.5 text-sm font-medium transition-colors',
                    isHomePage
                      ? 'text-white/85 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950',
                  ].join(' ')}
                >
                  Agents
                </Link>

                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className={[
                    'flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors',
                    isHomePage
                      ? 'text-white/85 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950',
                  ].join(' ')}
                >
                  <Heart
                    size={17}
                    strokeWidth={1.8}
                  />
                  Favorites
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={[
                    'flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors',
                    isHomePage
                      ? 'text-white/85 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950',
                  ].join(' ')}
                >
                  <UserRound
                    size={17}
                    strokeWidth={1.8}
                  />
                  Sign in
                </Link>

                <div
                  className={
                    isHomePage
                      ? 'my-2 border-t border-white/10'
                      : 'my-2 border-t border-slate-100'
                  }
                />

                <Link
                  to="/properties/new"
                  onClick={closeMenu}
                  className={[
                    'flex h-11 items-center justify-center rounded-xl text-sm font-medium transition-colors',
                    isHomePage
                      ? 'border border-white/25 bg-white/10 text-white hover:bg-white/20'
                      : 'bg-slate-950 text-white hover:bg-slate-800',
                  ].join(' ')}
                >
                  List a property
                </Link>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;