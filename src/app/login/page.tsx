"use client";
import { useState, Suspense, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function LoginForm() {
  const [email, setEmail] = useState("demo@betday.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setError("Credenciales inválidas. Usa cualquier email y contraseña: demo123");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand mx-auto flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(0,255,135,0.3)]">
            <span className="text-black font-black text-2xl">B</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            BetDay <span className="text-brand">Lite</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Tu plataforma de apuestas simuladas</p>
        </div>

        <div className="bg-surface-2 border border-border rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Iniciar sesión</h2>

          <div className="mb-5 p-3 bg-brand/5 border border-brand/20 rounded-xl flex gap-2 items-center">
            <span className="text-lg">💡</span>
            <p className="text-xs text-gray-400">
              <strong className="text-brand">Demo:</strong> usa cualquier email.{" "}
              Contraseña: <code className="bg-surface-3 px-1.5 py-0.5 rounded text-brand font-mono">demo123</code>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@betday.com"
                required
                className="w-full bg-surface-3 border border-border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-surface-3 border border-border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 text-sm">⚠ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-3.5 rounded-xl font-bold text-black transition-all mt-2",
                loading
                  ? "bg-brand/60 cursor-not-allowed"
                  : "bg-brand hover:bg-brand-dark hover:shadow-[0_4px_16px_rgba(0,255,135,0.3)] active:scale-95"
              )}
            >
              {loading ? "⏳ Ingresando..." : "Ingresar"}
            </button>
          </form>

          <p className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Ver eventos sin iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
