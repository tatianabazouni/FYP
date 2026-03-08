import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, GalleryHorizontal, Mic, Tag, Video } from 'lucide-react';

const memories = [
  { date: '2026-02-02', title: 'Graduation Day', note: 'Mom cried. I smiled all day.', type: 'photo' },
  { date: '2026-01-11', title: 'Rainy train ride', note: 'Recorded a voice memo about hope.', type: 'voice' },
  { date: '2025-12-24', title: 'Family dinner', note: 'Everyone shared one gratitude.', type: 'video' },
];

export default function LifeCapsule() {
  const [view, setView] = useState<'timeline' | 'masonry'>('timeline');
  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div><h1 className="font-serif text-4xl">Life Capsule</h1><p className="text-slate-600">A cinematic timeline of meaningful moments.</p></div>
        <div className="rounded-full bg-white p-1 shadow">
          <button onClick={() => setView('timeline')} className={`rounded-full px-4 py-1.5 text-sm ${view === 'timeline' ? 'bg-[#458B73] text-white' : ''}`}>Timeline</button>
          <button onClick={() => setView('masonry')} className={`rounded-full px-4 py-1.5 text-sm ${view === 'masonry' ? 'bg-[#458B73] text-white' : ''}`}>Masonry</button>
        </div>
      </div>

      {view === 'timeline' ? (
        <div className="space-y-4">
          {memories.map((m, i) => (
            <motion.article key={m.title} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-lg">
              <p className="mb-2 flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="h-3.5 w-3.5" />{m.date}</p>
              <h3 className="font-serif text-2xl">{m.title}</h3>
              <p className="mt-2 text-slate-600">{m.note}</p>
              <div className="mt-3 flex gap-2 text-xs">
                <span className="rounded-full bg-[#f5f1e8] px-3 py-1">{m.type === 'photo' ? <GalleryHorizontal className="mr-1 inline h-3 w-3" /> : m.type === 'voice' ? <Mic className="mr-1 inline h-3 w-3" /> : <Video className="mr-1 inline h-3 w-3" />} {m.type}</span>
                <span className="rounded-full bg-[#f5f1e8] px-3 py-1"><Tag className="mr-1 inline h-3 w-3" /> gratitude</span>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">{memories.map((m) => <div key={m.title} className="mb-4 break-inside-avoid rounded-3xl bg-white p-4 shadow"><div className="h-36 rounded-2xl bg-gradient-to-br from-[#458B73]/20 to-[#C5005E]/20" /><h4 className="mt-3 font-semibold">{m.title}</h4><p className="text-sm text-slate-600">{m.note}</p></div>)}</div>
      )}
    </div>
  );
}
