'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales inválidas. Verifica el Usuario y PIN.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('Ocurrió un error inesperado. Reintenta later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-height-[100dvh] flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements (Inspired by Twilio Console) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-amber-200 to-accent opacity-50" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="w-full max-w-md animate-scale-in">
        <div className="glass-premium p-8 rounded-[2rem] border border-white/40">
          <div className="flex flex-col items-center mb-10">
            <Logo className="mb-4" />
            <h1 className="text-2xl font-black text-primary mt-2 tracking-tight">
              Admin Console
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Acceso exclusivo para operaciones Limpiamax
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1 uppercase tracking-wider">
                Usuario
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-lg"
                  placeholder="Usuario Admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1 uppercase tracking-wider">
                PIN de Seguridad
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all font-medium text-lg tracking-[0.5em]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-primary text-white rounded-2xl font-bold text-lg shadow-elegant hover:bg-slate-800 focus:ring-4 focus:ring-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Entrar al Command Center'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              Powered by Gahenax AI — Sovereign Ops
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
