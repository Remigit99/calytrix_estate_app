import {
  useState,
  type FormEvent,
} from 'react';
import { Link, useNavigate } from 'react-router';

import { useRegisterMutation } from '../../features/auth/authApi';
import { Button, Input } from '../../components/ui';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] =
    useRegisterMutation();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || undefined,
        password: form.password,
      }).unwrap();

      navigate('/login');
    } catch (error: any) {
      setError(
        error?.data?.message ??
          'Unable to create your account.',
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
              Find your place
            </p>

            <h1 className="mt-4 text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1] tracking-[-0.045em] text-white">
              A better way to find where you belong.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              Discover properties, save your favorites,
              and connect with trusted agents.
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
                Get started
              </p>

              <h2 className="mt-3 text-h1 tracking-[-0.035em] text-(--color-text)">
                Create your account.
              </h2>

              <p className="mt-3 text-body text-(--color-text-secondary)">
                Start discovering properties that fit
                your needs.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  id="firstName"
                  name="firstName"
                  label="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />

                <Input
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                />
              </div>

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
                id="phone"
                name="phone"
                type="tel"
                label="Phone number"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                autoComplete="new-password"
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
                  ? 'Creating account...'
                  : 'Create account'}
              </Button>
            </form>

            <p className="mt-6 text-center text-body-sm text-(--color-text-secondary)">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover)"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;