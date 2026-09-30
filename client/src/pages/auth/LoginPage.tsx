import {
  useState,
  type FormEvent,
} from 'react';
import { Link, useNavigate } from 'react-router';

import { useLoginMutation } from '../../features/auth/authApi';
import { Button, Input } from '../../components/ui';

const LoginPage = () => {
  const navigate = useNavigate();

  const [  login, { isLoading }] =
    useLoginMutation();

    console.log("data:", login);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(
    null,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);

    try {
      await login(form).unwrap();

      navigate('/');
    } catch (error: any) {
      setError(
        error?.data?.message ??
          'Invalid email or password.',
      );
    }
  };

  return (
    <main className="min-h-screen bg-(--color-background)">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden bg-(--color-primary-950) lg:flex lg:flex-col lg:justify-between lg:p-12">
          <Link
            to="/"
            className="text-xl font-semibold tracking-[-0.03em] text-white"
          >
            Calytrix
            <span className="ml-1 font-normal text-white/60">
              Estate
            </span>
          </Link>

          <div className="max-w-lg">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-white/50">
              Welcome back
            </p>

            <h1 className="mt-4 text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1] tracking-[-0.045em] text-white">
              Your next place is closer than you think.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              Continue exploring properties and managing
              the places that matter to you.
            </p>
          </div>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Calytrix Estate
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="text-xl font-semibold tracking-[-0.03em] text-(--color-text)"
              >
                Calytrix
                <span className="ml-1 font-normal text-(--color-text-muted)">
                  Estate
                </span>
              </Link>
            </div>

            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.18em] text-(--color-primary)">
                Welcome back
              </p>

              <h2 className="mt-3 text-h1 tracking-[-0.035em] text-(--color-text)">
                Sign in.
              </h2>

              <p className="mt-3 text-body text-(--color-text-secondary)">
                Access your saved properties and account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />

              {error && (
                <div className="rounded-lg border border-(--color-error)/20 bg-(--color-error-soft) px-4 py-3 text-sm text-(--color-error)">
                  {Array.isArray(error)
                    ? error.join(', ')
                    : error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading
                  ? 'Signing in...'
                  : 'Sign in'}
              </Button>
            </form>

            <p className="mt-6 text-center text-body-sm text-(--color-text-secondary)">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;