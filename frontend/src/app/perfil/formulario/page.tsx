import {LoginForm} from "@/components/profile/login";
import {RegisterForm} from "@/components/profile/register"

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Bienvenido</h1>
        <LoginForm />
        <div className="border-t pt-4">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
