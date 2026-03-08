import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Goal,
  Image,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Life Capsule",
    description:
      "Capture memories, reflections, photos, and milestones organized into meaningful life chapters.",
  },
  {
    icon: Image,
    title: "Vision Board",
    description:
      "Visualize the future you want to create and turn your dreams into clear life intentions.",
  },
  {
    icon: Goal,
    title: "Goals & Growth",
    description:
      "Transform ambitions into actionable goals and track your personal progress over time.",
  },
  {
    icon: Brain,
    title: "AI Companion",
    description:
      "Receive intelligent reflection prompts, summaries, and guidance to better understand your journey.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}

      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--brand-gold-deep)]">
              <Sparkles className="h-4 w-4" />
              A new way to experience your life
            </p>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Your Life. <br />
              Your Story. <br />
              <span className="text-[var(--brand-teal)]">Your Growth.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              LifeOS is a digital platform designed to help you document your
              life journey, reflect on meaningful experiences, and transform
              dreams into achievable goals — creating a living legacy of your
              personal growth.
            </p>

            <div className="flex gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-[var(--brand-teal)] text-white">
                  Start Your Life Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/login">
                <Button size="lg" variant="outline">
                  Log In
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.img
            src="https://images.unsplash.com/photo-1519682337058-a94d519337bc"
            alt="Life reflection"
            className="rounded-2xl shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          />

        </div>
      </section>

      {/* PROBLEM */}

      <section className="bg-card/40 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-bold mb-6">
            Life is happening… but where is it recorded?
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Every person experiences moments that shape who they become —
            dreams, struggles, achievements, and lessons learned.
            <br />
            <br />
            Yet most of these moments remain scattered across social media,
            forgotten notes, or memories that slowly fade with time.
            <br />
            <br />
            Without a structured way to document life, reflect on experiences,
            and track personal growth, much of our journey remains invisible.
          </p>

        </div>
      </section>

      {/* SOLUTION */}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-4xl font-bold mb-6">
            LifeOS brings your life story together
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            LifeOS transforms the way people experience and document their
            lives.
            <br />
            <br />
            Instead of scattered memories and forgotten ambitions, LifeOS
            creates a structured digital environment where users can record
            memories, reflect on experiences, and intentionally grow toward
            the future they imagine.
            <br />
            <br />
            It is not just a productivity tool — it is a personal space for
            reflection, intention, and growth.
          </p>

        </div>
      </section>

      {/* FEATURES */}

      <section className="bg-card/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">

          <h2 className="text-center text-4xl font-bold mb-12">
            The LifeOS Experience
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="p-6 bg-background border rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <feature.icon className="h-7 w-7 mb-4 text-[var(--brand-teal)]" />

                <h3 className="font-semibold text-lg mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* AI SECTION */}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-bold mb-6">
            An AI companion for your journey
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            LifeOS integrates artificial intelligence to help users better
            understand their personal experiences and aspirations.
            <br />
            <br />
            The AI companion can summarize journal entries, suggest meaningful
            reflection prompts, and help break ambitious dreams into
            achievable steps.
            <br />
            <br />
            Rather than replacing human reflection, AI becomes a supportive
            guide that encourages deeper self-awareness.
          </p>

        </div>
      </section>

      {/* FUTURE */}

      <section className="bg-card/40 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-bold mb-6">
            A platform for meaningful living
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            LifeOS is more than a digital tool — it is an attempt to transform
            the way people interact with their own lives.
            <br />
            <br />
            By combining memory preservation, goal setting, and intelligent
            reflection, the platform encourages individuals to live more
            intentionally and to create a meaningful narrative of their life
            journey.
            <br />
            <br />
            Every memory documented, every goal achieved, and every reflection
            written becomes part of a growing personal legacy.
          </p>

        </div>
      </section>

      {/* CTA */}

      <section className="px-6 py-24 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Start documenting your life story today
        </h2>

        <p className="text-muted-foreground mb-8">
          Your memories, dreams, and experiences deserve a place where they
          can grow into something meaningful.
        </p>

        <Link to="/register">
          <Button size="lg" className="bg-[var(--brand-magenta)] text-white">
            Begin Your Journey
          </Button>
        </Link>

      </section>

      {/* FOOTER */}

      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        © 2026 LifeOS — A platform for documenting life and personal growth.
      </footer>

    </div>
  );
};

export default Index;