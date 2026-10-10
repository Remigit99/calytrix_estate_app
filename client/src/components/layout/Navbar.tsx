
import { useState } from 'react';
import { Heart, LogOut, Menu, UserRound, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLogoutMutation } from '../../features/auth/authApi';
import { clearSession } from '../../features/auth/authSlice';
import { Container } from '../ui';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [logout] = useLogoutMutation();

  const isHomePage = pathname === '/';
  const isAuthenticated = Boolean(accessToken);

  const displayName =
    user?.firstName ||
    user?.email?.split('@')[0] ||
    'Account';

  const role = user?.role;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // Clear the local session even if the server logout fails.
    } finally {
      dispatch(clearSession());
      closeMenu();
      navigate('/');
    }
  };

  const linkClass = [
    'text-sm font-medium transition',
    isHomePage
      ? 'text-white/85 hover:text-white'
      : 'text-slate-600 hover:text-slate-950',
  ].join(' ');

  const actionClass = [
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
    isHomePage
      ? 'text-white hover:bg-white/10'
      : 'text-slate-700 hover:bg-slate-100',
  ].join(' ');

  const mobileLinkClass = [
    'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition',
    isHomePage
      ? 'text-white/90 hover:bg-white/10 hover:text-white'
      : 'text-slate-700 hover:bg-slate-100',
  ].join(' ');

  return (
    <header
      className={[
        'z-50 w-full',
        isHomePage
          ? 'absolute left-0 top-0'
          : 'relative border-b border-slate-200 bg-white',
      ].join(' ')}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <div
              className={[
                'flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold',
                isHomePage
                  ? 'bg-white text-slate-950'
                  : 'bg-slate-950 text-white',
              ].join(' ')}
            >
              C
            </div>

            <span
              className={[
                'text-lg font-semibold tracking-tight',
                isHomePage ? 'text-white' : 'text-slate-950',
              ].join(' ')}
            >
              Calytrix
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/properties" className={linkClass}>
              Properties
            </Link>

            <Link to="/properties" className={linkClass}>
              Discover
            </Link>

            <Link to="/agents" className={linkClass}>
              Agents
            </Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/favorites"
              aria-label="Favorites"
              className={[
                'flex h-10 w-10 items-center justify-center rounded-full transition',
                isHomePage
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-100',
              ].join(' ')}
            >
              <Heart className="h-4.5 w-4.5" />
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className={actionClass}
                >
                  <UserRound className="h-4 w-4" />
                  Sign in
                </Link>
              </>
            ) : (
              <>
                {/* USER */}
                {role === 'USER' && (
                  <Link
                    to="/profile"
                    className={actionClass}
                  >
                    <UserRound className="h-4 w-4" />
                    {displayName}
                  </Link>
                )}

                {/* AGENT */}
                {role === 'AGENT' && (
                  <Link
                    to="/agent"
                    className={actionClass}
                  >
                    <UserRound className="h-4 w-4" />
                    Agent Dashboard
                  </Link>
                )}

                {/* ADMIN */}
                {role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className={actionClass}
                  >
                    <UserRound className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  aria-label="Log out"
                  className={[
                    'flex h-10 w-10 items-center justify-center rounded-full transition',
                    isHomePage
                      ? 'text-white hover:bg-white/10'
                      : 'text-slate-700 hover:bg-slate-100',
                  ].join(' ')}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Only agents can create listings */}
            {role === 'AGENT' && (
              <Link
                to="/properties/new"
                className={[
                  'ml-1 rounded-full px-5 py-2.5 text-sm font-semibold transition',
                  isHomePage
                    ? 'bg-white text-slate-950 hover:bg-white/90'
                    : 'bg-slate-950 text-white hover:bg-slate-800',
                ].join(' ')}
              >
                List a property
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className={[
              'flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur lg:hidden',
              isHomePage
                ? 'border-white/20 bg-black/20 text-white'
                : 'border-slate-200 bg-white text-slate-700',
            ].join(' ')}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

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
            <nav className="space-y-1">
              <Link
                to="/properties"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Properties
              </Link>

              <Link
                to="/properties"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Discover
              </Link>

              <Link
                to="/agents"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Agents
              </Link>

              <Link
                to="/favorites"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                <Heart className="mr-2.5 h-4 w-4" />
                Favorites
              </Link>

              {isAuthenticated && role === 'USER' && (
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <UserRound className="mr-2.5 h-4 w-4" />
                  {displayName}
                </Link>
              )}

              {isAuthenticated && role === 'AGENT' && (
                <Link
                  to="/agent"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <UserRound className="mr-2.5 h-4 w-4" />
                  Agent Dashboard
                </Link>
              )}

              {isAuthenticated && role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <UserRound className="mr-2.5 h-4 w-4" />
                  Admin Dashboard
                </Link>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  <UserRound className="mr-2.5 h-4 w-4" />
                  Sign in
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className={[
                    mobileLinkClass,
                    'w-full text-left',
                  ].join(' ')}
                >
                  <LogOut className="mr-2.5 h-4 w-4" />
                  Log out
                </button>
              )}

              {role === 'AGENT' && (
                <>
                  <div
                    className={[
                      'my-2 border-t',
                      isHomePage
                        ? 'border-white/10'
                        : 'border-slate-200',
                    ].join(' ')}
                  />

                  <Link
                    to="/properties/new"
                    onClick={closeMenu}
                    className={[
                      'flex items-center justify-center rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                      isHomePage
                        ? 'bg-white text-slate-950 hover:bg-white/90'
                        : 'bg-slate-950 text-white hover:bg-slate-800',
                    ].join(' ')}
                  >
                    List a property
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;

