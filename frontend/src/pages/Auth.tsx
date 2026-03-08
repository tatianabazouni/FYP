import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  const { login, register } = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const strength = useMemo(() => [/.{8,}/, /[A-Z]/, /\d/].filter((x) => x.test(form.password)).length, [form.password]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to continue your journey right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-[#FAF7F2] lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#458B73] to-[#C5005E] p-10 text-white">
        <div className="max-w-md">
          <h1 className="font-serif text-5xl">LifeOS</h1>
          <p className="mt-4 text-lg text-white/90">A personal museum for your memories, dreams, and becoming.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <motion.form onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-3xl border border-white/80 bg-white/80 p-8 shadow-xl">
          <div className="mb-5">
            <p className="text-sm text-slate-500">Welcome</p>
            <h2 className="font-serif text-3xl">{isLogin ? 'Continue your story' : 'Start your life archive'}</h2>
          </div>

          {!isLogin && (
            <div className="mb-4">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
            </div>
          )}
          <div className="mb-4"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
          <div className="mb-2">
            <Label>Password</Label>
            <div className="relative mt-1">
              <Input type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShow((v) => !v)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
            </div>
          </div>
          {!isLogin && <p className="mb-4 text-xs text-slate-500">Password strength: {strength}/3</p>}

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <Button className="w-full bg-[#458B73] hover:bg-[#3a7662]" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{isLogin ? 'Log in' : 'Create account'}</Button>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "New here?" : 'Already a member?'}{' '}
            <button type="button" onClick={() => navigate(isLogin ? '/register' : '/login')} className="font-medium text-[#C5005E]">
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </p>

          <div className="mt-6 rounded-xl bg-[#f5f1e8] p-3 text-xs text-slate-500"><Heart className="mr-1 inline h-3.5 w-3.5" /> This space is designed to hold your most meaningful moments.</div>
        </motion.form>
      </div>
    </div>
  );
}
