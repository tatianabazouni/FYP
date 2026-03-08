import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Archive,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  Flag,
  GripVertical,
  Plus,
  Share2,
  Sparkles,
  Target,
  Trophy,
  WandSparkles,
} from "lucide-react";

import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner, ErrorState, EmptyState } from "@/components/StateHelpers";

const PAGE_SIZE = 6;
const CATEGORIES = ["Health", "Career", "Personal"] as const;
type GoalCategory = (typeof CATEGORIES)[number];
type GoalFilter = "active" | "completed" | "archived";

type Milestone = {
  id: string;
  text: string;
  completed: boolean;
};

interface Goal {
  _id: string;
  title: string;
  description?: string;
  category: GoalCategory;
  progress: number;
  completed: boolean;
  archived?: boolean;
  deadline?: string;
  habitLink?: string;
  recurring?: "none" | "daily" | "weekly" | "monthly";
  smartReminder?: boolean;
  priority?: number;
  steps?: { text: string; completed: boolean }[];
  history?: string[];
  sharedWith?: string[];
}

const emptyWizard = {
  title: "",
  description: "",
  category: "Personal" as GoalCategory,
  deadline: "",
  recurring: "none" as Goal["recurring"],
  habitLink: "",
  smartReminder: true,
  priority: 3,
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<GoalFilter>("active");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizard, setWizard] = useState(emptyWizard);
  const [milestoneText, setMilestoneText] = useState("");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [completionCelebrationId, setCompletionCelebrationId] = useState<string | null>(null);

  const fetchGoals = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get<Goal[]>("/goals");
      setGoals(res.data.map((goal) => ({ ...goal, archived: goal.archived ?? false, history: goal.history ?? [] })));
    } catch (err: any) {
      setError(err.message || "Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const filteredGoals = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return goals
      .filter((goal) => {
        if (filter === "active") return !goal.completed && !goal.archived;
        if (filter === "completed") return goal.completed;
        return !!goal.archived;
      })
      .filter((goal) =>
        !lowered ? true : `${goal.title} ${goal.description || ""} ${goal.category}`.toLowerCase().includes(lowered)
      );
  }, [goals, filter, query]);

  const paginatedGoals = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredGoals.slice(start, start + PAGE_SIZE);
  }, [filteredGoals, page]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredGoals.length / PAGE_SIZE));
    if (page > maxPage) setPage(maxPage);
  }, [filteredGoals.length, page]);

  const wizardCompletion = useMemo(() => {
    const validTitle = wizard.title.trim().length > 2;
    const hasMilestones = milestones.length > 0;
    return [validTitle, !!wizard.category, !!wizard.deadline, hasMilestones].filter(Boolean).length * 25;
  }, [wizard, milestones]);

  const addMilestone = () => {
    if (!milestoneText.trim()) return;
    setMilestones((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: milestoneText.trim(), completed: false },
    ]);
    setMilestoneText("");
  };

  const createGoal = async (e: FormEvent) => {
    e.preventDefault();
    if (!wizard.title.trim()) return;

    const payload = {
      title: wizard.title,
      description: wizard.description,
      category: wizard.category,
      deadline: wizard.deadline || undefined,
      progress: 0,
      recurring: wizard.recurring,
      habitLink: wizard.habitLink,
      smartReminder: wizard.smartReminder,
      priority: wizard.priority,
      steps: milestones.map((step) => ({ text: step.text, completed: step.completed })),
    };

    try {
      await api.post("/goals", payload);
      setWizard(emptyWizard);
      setMilestones([]);
      setWizardStep(1);
      fetchGoals();
    } catch {
      setGoals((prev) => [
        {
          _id: crypto.randomUUID(),
          title: payload.title,
          description: payload.description,
          category: payload.category,
          deadline: payload.deadline,
          recurring: payload.recurring,
          habitLink: payload.habitLink,
          smartReminder: payload.smartReminder,
          priority: payload.priority,
          progress: 0,
          completed: false,
          archived: false,
          steps: payload.steps,
          history: ["Goal drafted in offline mode"],
        },
        ...prev,
      ]);
    }
  };

  const updateGoal = async (goalId: string, partial: Partial<Goal>, completionMessage?: string) => {
    const current = goals.find((goal) => goal._id === goalId);
    if (!current) return;

    const merged = {
      ...current,
      ...partial,
      history: [...(current.history || []), completionMessage || "Goal updated"],
    };

    setGoals((prev) => prev.map((goal) => (goal._id === goalId ? merged : goal)));

    try {
      await api.put(`/goals/${goalId}`, partial);
      if (partial.completed) {
        setCompletionCelebrationId(goalId);
        setTimeout(() => setCompletionCelebrationId(null), 1600);
      }
    } catch {
      setError("Could not sync latest goal changes. Changes are kept locally.");
    }
  };

  const reorderGoals = (dragId: string, targetId: string) => {
    if (dragId === targetId) return;
    setGoals((prev) => {
      const clone = [...prev];
      const dragIndex = clone.findIndex((g) => g._id === dragId);
      const targetIndex = clone.findIndex((g) => g._id === targetId);
      if (dragIndex < 0 || targetIndex < 0) return prev;
      const [moved] = clone.splice(dragIndex, 1);
      clone.splice(targetIndex, 0, moved);
      return clone;
    });
  };

  if (loading) return <LoadingSpinner message="Loading your goals..." />;
  if (error && goals.length === 0) return <ErrorState message={error} onRetry={fetchGoals} />;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Goals</h1>
        <p className="page-subtitle">Plan, prioritize, track, and celebrate every milestone.</p>
      </div>

      <form onSubmit={createGoal} className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Goal creation wizard</h2>
          <Badge variant="outline">{wizardCompletion}% complete</Badge>
        </div>

        {wizardStep === 1 && (
          <div className="grid md:grid-cols-2 gap-3">
            <Input placeholder="Goal title" value={wizard.title} onChange={(e) => setWizard((prev) => ({ ...prev, title: e.target.value }))} />
            <Input placeholder="Goal category (health/career/personal)" value={wizard.category} onChange={(e) => setWizard((prev) => ({ ...prev, category: (e.target.value || "Personal") as GoalCategory }))} />
            <Input placeholder="Description" className="md:col-span-2" value={wizard.description} onChange={(e) => setWizard((prev) => ({ ...prev, description: e.target.value }))} />
          </div>
        )}

        {wizardStep === 2 && (
          <div className="grid md:grid-cols-2 gap-3">
            <Input type="date" value={wizard.deadline} onChange={(e) => setWizard((prev) => ({ ...prev, deadline: e.target.value }))} />
            <Input placeholder="Linked habit (e.g. Morning run)" value={wizard.habitLink} onChange={(e) => setWizard((prev) => ({ ...prev, habitLink: e.target.value }))} />
            <Input placeholder="Recurring: none / daily / weekly / monthly" value={wizard.recurring} onChange={(e) => setWizard((prev) => ({ ...prev, recurring: (e.target.value || "none") as Goal["recurring"] }))} />
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Bell className="h-4 w-4" /> Smart reminders enabled by default.</div>
          </div>
        )}

        {wizardStep === 3 && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="Add milestone" value={milestoneText} onChange={(e) => setMilestoneText(e.target.value)} />
              <Button type="button" variant="secondary" onClick={addMilestone}><Plus className="h-4 w-4 mr-1" />Add</Button>
            </div>
            <div className="space-y-2">
              {milestones.map((step) => (
                <div key={step.id} className="flex items-center justify-between bg-muted rounded-lg px-3 py-2 text-sm">
                  <span>{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button type="button" variant="outline" disabled={wizardStep === 1} onClick={() => setWizardStep((s) => Math.max(1, s - 1))}>Back</Button>
            <Button type="button" variant="outline" disabled={wizardStep === 3} onClick={() => setWizardStep((s) => Math.min(3, s + 1))}>Next <ArrowRight className="h-4 w-4 ml-1" /></Button>
          </div>
          <Button type="submit"><WandSparkles className="h-4 w-4 mr-1" />Create goal</Button>
        </div>
      </form>

      <div className="glass-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div className="flex gap-2">
            {(["active", "completed", "archived"] as GoalFilter[]).map((item) => (
              <Button key={item} variant={filter === item ? "default" : "outline"} size="sm" onClick={() => setFilter(item)}>
                {item === "archived" ? <Archive className="h-4 w-4 mr-1" /> : null}
                {item}
              </Button>
            ))}
          </div>
          <Input className="md:w-72" placeholder="Filter goals..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        {paginatedGoals.length === 0 ? (
          <EmptyState title="No goals match this view" description="Try a different filter or create a new goal." />
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {paginatedGoals.map((goal) => (
              <motion.div
                key={goal._id}
                layout
                draggable
                onDragStart={(e) => e.dataTransfer.setData("goal-id", goal._id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => reorderGoals(e.dataTransfer.getData("goal-id"), goal._id)}
                className="glass-card p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold leading-tight">{goal.title}</p>
                    <p className="text-xs text-muted-foreground">{goal.description || "No description"}</p>
                  </div>
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="outline">{goal.category}</Badge>
                  <Badge variant="outline"><Flag className="h-3 w-3 mr-1" />Priority {goal.priority ?? 3}</Badge>
                  {goal.deadline ? <Badge variant="outline"><Calendar className="h-3 w-3 mr-1" />{goal.deadline.slice(0, 10)}</Badge> : null}
                  {goal.recurring && goal.recurring !== "none" ? <Badge>{goal.recurring}</Badge> : null}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Progress tracking</span><span>{goal.progress}%</span></div>
                  <Slider value={[goal.progress]} max={100} step={5} onValueChange={(value) => updateGoal(goal._id, { progress: value[0], completed: value[0] >= 100 }, value[0] >= 100 ? "Goal completed" : "Progress adjusted")} />
                  <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary transition-all" style={{ width: `${goal.progress}%` }} /></div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <button className="text-left" onClick={() => updateGoal(goal._id, { completed: !goal.completed, progress: goal.completed ? Math.min(goal.progress, 95) : 100 }, goal.completed ? "Re-opened" : "Completed")}>
                    {goal.completed ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                  </button>
                  <span className={goal.completed ? "line-through text-muted-foreground" : ""}>{goal.completed ? "Completed" : "In progress"}</span>
                  {goal.habitLink ? <Badge variant="secondary">Habit: {goal.habitLink}</Badge> : null}
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium">History</p>
                  {(goal.history || []).slice(-2).map((entry, idx) => <p key={`${goal._id}-${idx}`}>• {entry}</p>)}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateGoal(goal._id, { archived: !goal.archived }, goal.archived ? "Restored from archive" : "Archived")}>Archive</Button>
                  <Button size="sm" variant="outline" onClick={() => updateGoal(goal._id, { sharedWith: ["mentor@example.com"] }, "Shared with a connection")}><Share2 className="h-4 w-4 mr-1" />Share</Button>
                  <Button size="sm" variant="outline" onClick={() => updateGoal(goal._id, { history: [...(goal.history || []), "AI suggestion: split into weekly mini-sprints"] })}><Sparkles className="h-4 w-4 mr-1" />AI Suggest</Button>
                </div>

                {completionCelebrationId === goal._id ? (
                  <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-success text-sm font-medium">
                    <Trophy className="h-4 w-4" /> Goal completed! Celebration unlocked.
                  </motion.div>
                ) : null}
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="text-muted-foreground">Page {page} of {Math.max(1, Math.ceil(filteredGoals.length / PAGE_SIZE))}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page >= Math.ceil(filteredGoals.length / PAGE_SIZE)} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
