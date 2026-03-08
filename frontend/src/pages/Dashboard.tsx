import { motion } from 'framer-motion';
import { BookHeart, Brain, Flame, Goal, Sparkles, Star, Trophy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const quests = ['Write one journal reflection', 'Upload a memory photo', 'Complete one goal subtask'];
const memories = ['First solo trip sunset in Cappadocia', 'Late-night tea with grandma', 'The day your project finally launched'];

export default function Dashboard() {
  const { user } = useAuth();
  const xp = user?.xp ?? 220;
  const xpToNext = 400;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl">Good evening {user?.name?.split(' ')[0] || 'friend'} — ready to write today&apos;s chapter?</h1>
        <p className="text-slate-600">Life Hub • a living overview of your growth journey</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-3xl bg-white/80 p-5 shadow-lg lg:col-span-2">
          <p className="mb-2 text-sm text-slate-500">Life Level</p>
          <div className="mb-3 flex items-center gap-2 text-2xl font-semibold"><Trophy className="h-6 w-6 text-[#E5A11F]" /> Level {user?.level ?? 5} Explorer</div>
          <p className="mb-2 text-sm">{xp}/{xpToNext} XP to next chapter</p>
          <Progress value={(xp / xpToNext) * 100} className="h-3" />
        </div>
        <div className="rounded-3xl bg-white/80 p-5 shadow-lg"><Flame className="h-5 w-5 text-[#C5005E]" /><p className="mt-2 text-sm text-slate-500">Streak</p><p className="text-2xl font-bold">7 days</p></div>
        <div className="rounded-3xl bg-white/80 p-5 shadow-lg"><Star className="h-5 w-5 text-[#458B73]" /><p className="mt-2 text-sm text-slate-500">Badges</p><p className="text-2xl font-bold">Reflector</p></div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/80 bg-[#fffaf2] p-5 shadow-lg">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-2xl"><Goal className="h-5 w-5 text-[#458B73]" /> Daily Quests</h2>
          <ul className="space-y-2 text-sm text-slate-600">{quests.map((q) => <li key={q} className="rounded-xl bg-white p-3">{q}</li>)}</ul>
        </motion.section>

        <section className="rounded-3xl border border-white/80 bg-[#fffaf2] p-5 shadow-lg">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-2xl"><BookHeart className="h-5 w-5 text-[#C5005E]" /> Quick Journal</h2>
          <textarea className="h-36 w-full rounded-2xl border bg-white p-3 text-sm" placeholder="What made today meaningful?" />
          <Button className="mt-3 w-full bg-[#C5005E] hover:bg-[#aa0051]">Save entry (+10 XP)</Button>
        </section>

        <section className="rounded-3xl border border-white/80 bg-[#fffaf2] p-5 shadow-lg">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-2xl"><Sparkles className="h-5 w-5 text-[#E5A11F]" /> Recent Memories</h2>
          <div className="space-y-2">{memories.map((m) => <p key={m} className="rounded-xl bg-white p-3 text-sm text-slate-600">{m}</p>)}</div>
        </section>
      </div>

      <section className="rounded-3xl bg-gradient-to-r from-[#458B73] to-[#6ea78e] p-6 text-white shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-3xl">Vie.ai Insight</h3>
            <p className="text-white/90">"Growth often hides in small, repeated acts of courage."</p>
          </div>
          <Button variant="secondary"><Brain className="mr-2 h-4 w-4" /> Open companion</Button>
        </div>
      </section>
    </div>
  );
}
