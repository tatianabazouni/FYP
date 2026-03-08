import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, Flag, Globe2, Heart, Milestone, Sparkles } from 'lucide-react';

const moodData = [
  { week: 'W1', mood: 63 },
  { week: 'W2', mood: 70 },
  { week: 'W3', mood: 66 },
  { week: 'W4', mood: 78 },
  { week: 'W5', mood: 82 },
];

const growthData = [
  { label: 'Goals', value: 14 },
  { label: 'Memories', value: 38 },
  { label: 'Journal', value: 27 },
  { label: 'Challenges', value: 9 },
];

const counters = [
  { label: 'Memories Saved', value: '128', icon: Heart },
  { label: 'Dreams Achieved', value: '12', icon: Flag },
  { label: 'Countries Visited', value: '9', icon: Globe2 },
  { label: 'Milestones', value: '31', icon: Milestone },
];

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div><h1 className="font-serif text-4xl">Life Analytics</h1><p className="text-slate-600">Visualize personal growth through mood, XP, and milestones.</p></div>
      <div className="grid gap-4 md:grid-cols-4">
        {counters.map((counter) => {
          const Icon = counter.icon;
          return (
            <div key={counter.label} className="rounded-3xl bg-white/85 p-4 shadow">
              <Icon className="h-5 w-5 text-[#458B73]" />
              <p className="text-xs text-slate-500">{counter.label}</p>
              <p className="text-2xl font-bold">{counter.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl bg-white/90 p-5 shadow-lg">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl"><Activity className="h-5 w-5 text-[#C5005E]" /> Mood trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="mood" stroke="#C5005E" fill="#C5005E33" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl bg-white/90 p-5 shadow-lg">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl"><Sparkles className="h-5 w-5 text-[#E5A11F]" /> Growth stats</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#458B73" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
