import { Calendar, PenLine, Sticker, Flame } from 'lucide-react';

const entries = [
  { day: 'Mon', mood: 'Hopeful', text: 'Walked at sunset and felt grounded.' },
  { day: 'Tue', mood: 'Focused', text: 'Finished my portfolio draft.' },
  { day: 'Wed', mood: 'Grateful', text: 'Had a deep talk with a close friend.' },
];

export default function Journal() {
  return (
    <div className="space-y-5">
      <div><h1 className="font-serif text-4xl">Journal Scrapbook</h1><p className="text-slate-600">Write your daily chapter with mood tags, photos, and voice notes.</p></div>
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl bg-white/85 p-5 shadow-lg lg:col-span-2">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-2xl"><PenLine className="h-5 w-5 text-[#C5005E]" /> Today's page</h2>
          <textarea className="h-56 w-full rounded-2xl border p-4" placeholder="Write what happened, what you felt, and what you learned..." />
          <div className="mt-3 flex gap-2 text-xs">
            {['Joyful', 'Calm', 'Proud', 'Reflective'].map((m) => <span key={m} className="rounded-full bg-[#f5f1e8] px-3 py-1">{m}</span>)}
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-3xl bg-white/85 p-5 shadow-lg"><p className="flex items-center gap-2 text-sm text-slate-500"><Flame className="h-4 w-4 text-[#E5A11F]" /> Journal streak</p><p className="font-serif text-3xl">12 days</p></div>
          <div className="rounded-3xl bg-white/85 p-5 shadow-lg"><p className="mb-2 text-sm text-slate-500"><Calendar className="mr-1 inline h-4 w-4" /> Calendar view</p><div className="grid grid-cols-7 gap-1 text-center text-xs">{Array.from({ length: 28 }, (_, i) => <span key={i} className={`rounded p-1 ${i % 4 === 0 ? 'bg-[#458B73] text-white' : 'bg-[#f5f1e8]'}`}>{i + 1}</span>)}</div></div>
        </aside>
      </div>
      <section className="rounded-3xl bg-[#fffaf2] p-5 shadow-lg">
        <h3 className="mb-3 flex items-center gap-2 font-serif text-2xl"><Sticker className="h-5 w-5 text-[#458B73]" /> Recent pages</h3>
        <div className="grid gap-3 md:grid-cols-3">{entries.map((e) => <article key={e.day} className="rounded-2xl bg-white p-4"><p className="text-xs text-slate-500">{e.day} • {e.mood}</p><p className="mt-2 text-sm text-slate-600">{e.text}</p></article>)}</div>
      </section>
    </div>
  );
}
