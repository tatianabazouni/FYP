import { CalendarDays, CheckCircle2, ListTodo, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const goals = [
  { title: 'Launch portfolio v2', deadline: '2026-04-15', progress: 70, tasks: 9 },
  { title: 'Run 10km', deadline: '2026-03-20', progress: 40, tasks: 5 },
  { title: 'Read 12 books', deadline: '2026-12-31', progress: 30, tasks: 12 },
];

export default function Goals() {
  return (
    <div className="space-y-5">
      <div><h1 className="font-serif text-4xl">Goals System</h1><p className="text-slate-600">Transform dreams into milestones and earn XP for completion.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white/85 p-5 shadow"><Trophy className="h-5 w-5 text-[#E5A11F]" /><p className="text-sm text-slate-500">XP reward</p><p className="text-2xl font-bold">+25 per goal</p></div>
        <div className="rounded-3xl bg-white/85 p-5 shadow"><CheckCircle2 className="h-5 w-5 text-[#458B73]" /><p className="text-sm text-slate-500">Completed</p><p className="text-2xl font-bold">14 goals</p></div>
        <div className="rounded-3xl bg-white/85 p-5 shadow"><CalendarDays className="h-5 w-5 text-[#C5005E]" /><p className="text-sm text-slate-500">Calendar view</p><p className="text-2xl font-bold">5 upcoming</p></div>
      </div>
      <div className="space-y-3">{goals.map((goal) => <article key={goal.title} className="rounded-3xl bg-white/90 p-5 shadow-lg"><div className="mb-2 flex items-center justify-between"><h3 className="font-semibold">{goal.title}</h3><span className="text-xs text-slate-500">Due {goal.deadline}</span></div><Progress value={goal.progress} className="h-2.5" /><div className="mt-2 flex items-center justify-between text-xs text-slate-600"><span>{goal.progress}% progress</span><span><ListTodo className="mr-1 inline h-3.5 w-3.5" />{goal.tasks} subtasks</span></div></article>)}</div>
    </div>
  );
}
