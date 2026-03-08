import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Clock3,
  BookHeart,
  Images,
  Target,
  Users,
  BarChart3,
  UserCircle2,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  LogOut,
  Bot,
  Send,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/life-capsule', label: 'Life Capsule', icon: Clock3 },
  { to: '/journal', label: 'Journal', icon: BookHeart },
  { to: '/vision-boards', label: 'Vision Board', icon: Images },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/connections', label: 'Connections', icon: Users },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
];

const viesPrompts = [
  'What made today meaningful?',
  'Name one memory you never want to forget and why.',
  'What tiny step can move your dream forward tonight?',
];

export default function MainLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [vieOpen, setVieOpen] = useState(false);
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(197,0,94,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(69,139,115,0.15),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(229,161,31,0.12),transparent_30%)]" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-50 h-screen border-r border-white/40 bg-[#f5f1e8]/95 backdrop-blur-xl transition-all duration-300 ${
          collapsed ? 'w-[84px]' : 'w-[280px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#458B73] to-[#C5005E] text-white shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              {!collapsed && (
                <div>
                  <p className="font-serif text-xl leading-5">LifeOS</p>
                  <p className="text-xs text-slate-500">Your living archive</p>
                </div>
              )}
            </Link>
            <div className="flex items-center gap-1">
              <button onClick={() => setCollapsed((v) => !v)} className="hidden rounded-lg p-2 hover:bg-white/60 lg:block">
                {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              </button>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 hover:bg-white/60 lg:hidden">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!collapsed && (
            <div className="mb-4 rounded-2xl border border-white/60 bg-white/70 p-3">
              <p className="text-xs text-slate-500">Good {greeting}</p>
              <p className="font-semibold">{user?.name || 'Storyteller'}</p>
            </div>
          )}

          <nav className="flex-1 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                    active ? 'bg-[#458B73] text-white shadow-md' : 'hover:bg-white/70 text-slate-600'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              );
            })}
          </nav>

          <button onClick={logout} className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-white/70">
            <LogOut className="h-4 w-4" /> {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-[84px]' : 'lg:ml-[280px]'}`}>
        <header className="sticky top-0 z-30 border-b border-white/40 bg-[#faf7f2]/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 hover:bg-white/60 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <p className="text-sm text-slate-500 hidden lg:block">Your life is worth documenting.</p>
            <Button onClick={() => setVieOpen((v) => !v)} className="rounded-full bg-[#C5005E] hover:bg-[#a90051]">
              <Bot className="mr-2 h-4 w-4" /> Vie.ai
            </Button>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {vieOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-24 right-5 z-50 w-[360px] rounded-3xl border border-white/70 bg-[#fffaf2] p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#FFD150] to-[#E5A11F]">
                <Sparkles className="h-5 w-5 text-slate-800" />
              </div>
              <div>
                <p className="font-semibold">Vie.ai</p>
                <p className="text-xs text-slate-500">Warm. Wise. Encouraging.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">"Small moments often become the most important memories."</p>
            <div className="mt-3 space-y-2">
              {viesPrompts.map((prompt) => (
                <button key={prompt} className="w-full rounded-xl bg-white p-2 text-left text-xs text-slate-600 hover:bg-[#f5f1e8]">
                  {prompt}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Textarea placeholder="Ask Vie about your next chapter..." className="min-h-16 bg-white" />
              <Button size="icon" className="self-end bg-[#458B73] hover:bg-[#3a7662]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
