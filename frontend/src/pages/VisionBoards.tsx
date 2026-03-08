import { Lightbulb, Pin, Plus, WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dreams = [
  { title: 'Open a design studio', year: 2027, note: 'A warm space for meaningful brands.' },
  { title: 'Visit Kyoto in spring', year: 2026, note: 'Photograph quiet streets and cherry blossoms.' },
  { title: 'Publish a book', year: 2028, note: 'A memoir about growth and courage.' },
];

export default function VisionBoards() {
  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div><h1 className="font-serif text-4xl">Vision Board</h1><p className="text-slate-600">Dream cards in a Pinterest-style inspiration wall.</p></div>
        <Button className="bg-[#C5005E] hover:bg-[#ab0052]"><Plus className="mr-2 h-4 w-4" />Add Dream</Button>
      </div>

      <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {dreams.map((d, i) => (
          <article key={d.title} className="mb-4 break-inside-avoid rounded-3xl border border-white/80 bg-white/90 p-4 shadow-lg">
            <div className="mb-3 h-40 rounded-2xl bg-gradient-to-br from-[#FFD150]/50 via-[#f5f1e8] to-[#458B73]/30" />
            <p className="text-xs text-slate-500"><Pin className="mr-1 inline h-3 w-3" /> Target {d.year}</p>
            <h3 className="mt-2 font-serif text-2xl">{d.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{d.note}</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-full bg-[#f5f1e8] px-3 py-1 text-xs"><WandSparkles className="mr-1 inline h-3 w-3" /> into goal</button>
              <button className="rounded-full bg-[#f5f1e8] px-3 py-1 text-xs"><Lightbulb className="mr-1 inline h-3 w-3" /> motivation</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
