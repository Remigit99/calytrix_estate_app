import type { ReactNode } from 'react';

import { useInitializeSessionQuery } from './authApi';

type AuthBootstrapProps = {
  children: ReactNode;
};

const AuthBootstrap = ({
  children,
}: AuthBootstrapProps) => {
  const { isLoading } =
    useInitializeSessionQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-background)">
        <div className="text-sm text-(--color-text-secondary)">
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthBootstrap;