
import { Heart, Menu, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Container } from '../ui';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Container>
        <nav className="relative flex h-20 items-center justify-between border-b border-white/15">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="relative z-10 text-xl font-semibold tracking-[-0.03em] text-white"
          >
            Calytrix
            <span className="ml-1 font-normal text-white/60">
              Estate
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              to="/properties"
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              Properties
            </Link>

            <Link
              to="/properties"
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              Discover
            </Link>

            <Link
              to="/agents"
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              Agents
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="flex size-10 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Heart size={19} strokeWidth={1.8} />
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <UserRound size={17} strokeWidth={1.8} />
              Sign in
            </Link>

            {/* List property */}
            <Link
              to="/properties/new"
              className="ml-1 inline-flex h-10 items-center rounded-full border border-white/35 bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/20"
            >
              List a property
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative z-10 flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-md transition-colors hover:bg-white/15 lg:hidden"
          >
            {isMenuOpen ? (
              <X size={21} strokeWidth={1.8} />
            ) : (
              <Menu size={21} strokeWidth={1.8} />
            )}
          </button>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-white/20 bg-black/75 p-2 shadow-[0_20px_50px_rgb(0_0_0_/_0.3)] backdrop-blur-xl lg:hidden">
              <div className="flex flex-col">
                <Link
                  to="/properties"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Properties
                </Link>

                <Link
                  to="/properties"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Discover
                </Link>

                <Link
                  to="/agents"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Agents
                </Link>

                <Link
                  to="/favorites"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Heart size={17} strokeWidth={1.8} />
                  Favorites
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <UserRound size={17} strokeWidth={1.8} />
                  Sign in
                </Link>

                <div className="my-2 border-t border-white/10" />

                <Link
                  to="/properties/new"
                  onClick={closeMenu}
                  className="flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-sm font-medium text-white transition-colors hover:bg-white/20"
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

