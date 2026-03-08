import { useState } from 'react';
import { Bot, Sparkles, Send, Heart } from 'lucide-react';
import api from '@/services/api';

const suggestions = [
  'What made today meaningful?',
  'Help me break this dream into weekly steps.',
  'Analyze this journal entry and suggest one reflection.',
];

export default function AICompanion() {
  const [text, setText] = useState('');
  const [reply, setReply] = useState('Small moments often become the most important memories.');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      const res = await api.post<{ message: string }>('/ai/chat', { message: text, mode: 'reflection' });
      setReply(res.data.message);
    } catch {
      setReply('I am here with you. Try sharing your thoughts in a simpler way and we will reflect together.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div><h1 className="font-serif text-4xl">Vie.ai Companion</h1><p className="text-slate-600">A warm guide for reflection, goals, and emotional clarity.</p></div>

      <section className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#FFD150] to-[#E5A11F]"><Bot className="h-7 w-7 text-slate-800" /></div>
          <div><p className="font-semibold">Vie.ai</p><p className="text-xs text-slate-500">Warm • Wise • Encouraging</p></div>
        </div>
        <p className="rounded-2xl bg-[#f5f1e8] p-4 text-slate-700">{reply}</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {suggestions.map((s) => (
            <button key={s} onClick={() => setText(s)} className="rounded-xl bg-white p-3 text-left text-xs shadow hover:bg-[#fffaf2]">
              <Sparkles className="mr-1 inline h-3.5 w-3.5 text-[#C5005E]" /> {s}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="h-24 flex-1 rounded-2xl border p-3" placeholder="Share what is on your mind..." />
          <button onClick={ask} className="h-12 self-end rounded-xl bg-[#458B73] px-4 text-white"><Send className="h-4 w-4" /></button>
        </div>
      </section>

      <p className="text-sm text-slate-500"><Heart className="mr-1 inline h-4 w-4 text-[#C5005E]" />Life is worth living and documenting.</p>
    </div>
  );
}
