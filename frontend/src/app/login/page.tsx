import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-6 max-w-2xl space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">ActivityHub login</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">Mock login UI for the frontend foundation.</h1>
          <p className="text-base leading-7 text-muted">
            The form is intentionally disconnected from backend services. It exists to establish the layout and visual language for the project.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}