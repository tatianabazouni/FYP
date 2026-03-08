import { Award, Camera, Star, Trophy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';

export default function Profile() {
  const { user } = useAuth();
  const xp = user?.xp ?? 220;
  return (
    <div className="space-y-5">
      <div><h1 className="font-serif text-4xl">Profile</h1><p className="text-slate-600">Your public-facing life story profile.</p></div>
      <section className="rounded-3xl bg-white/90 p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-[#f5f1e8]"><Camera className="h-7 w-7 text-[#458B73]" /></div>
          <div>
            <h2 className="font-serif text-3xl">{user?.name || 'LifeOS Explorer'}</h2>
            <p className="text-slate-600">Designing a life full of meaningful moments.</p>
          </div>
        </div>
        <div className="mt-4"><p className="text-sm text-slate-500">Life level progress</p><Progress value={(xp / 400) * 100} className="mt-2 h-3" /></div>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white/90 p-5 shadow"><Trophy className="h-5 w-5 text-[#E5A11F]" /><p className="text-xs text-slate-500">Life Level</p><p className="text-2xl font-bold">Explorer</p></div>
        <div className="rounded-3xl bg-white/90 p-5 shadow"><Star className="h-5 w-5 text-[#458B73]" /><p className="text-xs text-slate-500">XP</p><p className="text-2xl font-bold">{xp}</p></div>
        <div className="rounded-3xl bg-white/90 p-5 shadow"><Award className="h-5 w-5 text-[#C5005E]" /><p className="text-xs text-slate-500">Badges</p><p className="text-2xl font-bold">Reflector • Courage</p></div>
      </div>
      <section className="rounded-3xl bg-[#fffaf2] p-5 shadow-lg">
        <h3 className="mb-3 font-serif text-2xl">Highlights</h3>
        <div className="grid gap-3 md:grid-cols-3">{['Memories', 'Journal', 'Achievements'].map((x) => <div key={x} className="h-36 rounded-2xl bg-white p-4">{x}</div>)}</div>
      </section>
    </div>
  );
}
