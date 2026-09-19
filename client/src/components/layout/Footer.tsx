import { Link } from 'react-router';

import { Container } from '../ui';

const Footer = () => {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface)">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-(--color-text)"
            >
              Calytrix
              <span className="text-(--color-primary)">.</span>
            </Link>

            <p className="mt-4 max-w-sm text-body-sm leading-6 text-(--color-text-secondary)">
              A better way to discover, manage, and connect
              around exceptional properties.
            </p>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore">
            <FooterLink to="/properties">
              Properties
            </FooterLink>

            <FooterLink to="/agents">
              Agents
            </FooterLink>

            <FooterLink to="/favorites">
              Favorites
            </FooterLink>
          </FooterColumn>

          {/* Account */}
          <FooterColumn title="Account">
            <FooterLink to="/login">
              Sign in
            </FooterLink>

            <FooterLink to="/register">
              Create account
            </FooterLink>

            <FooterLink to="/profile">
              My profile
            </FooterLink>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <FooterLink to="/about">
              About
            </FooterLink>

            <FooterLink to="/contact">
              Contact
            </FooterLink>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 border-t border-(--color-border) py-6 text-caption text-(--color-text-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Calytrix Estate.
            All rights reserved.
          </p>

          <p>
            Built for better property experiences.
          </p>
        </div>
      </Container>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({
  title,
  children,
}: FooterColumnProps) => {
  return (
    <div>
      <h3 className="text-body-sm font-semibold text-(--color-text)">
        {title}
      </h3>

      <div className="mt-4 flex flex-col items-start gap-3">
        {children}
      </div>
    </div>
  );
};

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

const FooterLink = ({
  to,
  children,
}: FooterLinkProps) => {
  return (
    <Link
      to={to}
      className="text-body-sm text-(--color-text-secondary) transition-colors hover:text-(--color-primary)"
    >
      {children}
    </Link>
  );
};

export default Footer;