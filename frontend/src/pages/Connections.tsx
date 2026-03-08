import { Search, Send, UserPlus, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

const friends = [
  { name: 'Maya Noor', sharedGoal: 'Read 20 books', status: 'Connected' },
  { name: 'Kenji Ito', sharedGoal: 'Build a travel fund', status: 'Pending' },
  { name: 'Ayla Demir', sharedGoal: 'Meditate daily', status: 'Connected' },
];

export default function Connections() {
  return (
    <div className="space-y-5">
      <div><h1 className="font-serif text-4xl">Connections</h1><p className="text-slate-600">Find people, share goals, and grow together.</p></div>
      <div className="rounded-3xl bg-white/85 p-4 shadow-lg">
        <label className="mb-2 block text-sm text-slate-500">Search by email</label>
        <div className="flex gap-2"><Input placeholder="friend@email.com" /><button className="rounded-xl bg-[#458B73] px-4 text-white"><Search className="h-4 w-4" /></button></div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((f) => (
          <article key={f.name} className="rounded-3xl bg-white/90 p-5 shadow-lg">
            <div className="mb-3 flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#f5f1e8]"><Users className="h-5 w-5 text-[#458B73]" /></div><div><p className="font-semibold">{f.name}</p><p className="text-xs text-slate-500">{f.status}</p></div></div>
            <p className="text-sm text-slate-600">Shared goal: {f.sharedGoal}</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-full bg-[#f5f1e8] px-3 py-1 text-xs"><UserPlus className="mr-1 inline h-3 w-3" /> profile</button>
              <button className="rounded-full bg-[#f5f1e8] px-3 py-1 text-xs"><Send className="mr-1 inline h-3 w-3" /> share goal</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
