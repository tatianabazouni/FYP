import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock3, Compass, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const storySections = [
  { title: 'Remember Your Past', text: 'Collect memories like artifacts in your own digital museum.', icon: Clock3 },
  { title: 'Reflect on the Present', text: 'Journal what matters and notice your emotional patterns.', icon: BookOpen },
  { title: 'Build Your Future', text: 'Turn dreams into quests and level up through meaningful progress.', icon: Target },
];

export default function Index() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF7F2]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(69,139,115,.2),transparent_32%),radial-gradient(circle_at_90%_0%,rgba(197,0,94,.22),transparent_30%),radial-gradient(circle_at_60%_90%,rgba(255,209,80,.3),transparent_30%)]" />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-600">
          <Sparkles className="h-4 w-4 text-[#C5005E]" /> Storytelling-driven personal growth
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl leading-tight text-slate-900 lg:text-7xl"
        >
          You are the hero <br /> of your life story.
        </motion.h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          LifeOS is a cinematic scrapbook for memories, reflections, dreams, and milestones.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-[#458B73] hover:bg-[#3b775f]">Start Your Life Journey <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
          <Link to="/login"><Button size="lg" variant="outline">Enter Your Archive</Button></Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        {storySections.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-lg backdrop-blur"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-[#f5f1e8] p-3"><item.icon className="h-5 w-5 text-[#458B73]" /></div>
            <h2 className="font-serif text-2xl">{item.title}</h2>
            <p className="mt-2 text-slate-600">{item.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="border-y border-white/80 bg-[#f5f1e8]/80 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Compass className="mx-auto mb-4 h-8 w-8 text-[#E5A11F]" />
          <h3 className="font-serif text-3xl">Your life matters. Your story is worth documenting.</h3>
        </div>
      </section>
    </div>
  );
}
