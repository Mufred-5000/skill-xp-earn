import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChartLine,
  Users,
  Gear,
  User,
  Medal,
  CheckCircle,
  Timer,
  Trophy,
  Star,
  Target,
  Fire,
  BookOpen,
  Calendar,
  ArrowUp,
  ArrowDown,
  Clock,
  Sparkle,
  GraduationCap,
  Video,
  ArrowRight,
  CaretUp,
  CaretDown,
  Coin,
  Lightning,
  TrendUp,
} from "@phosphor-icons/react";
import { useGamification } from "../App";

const chartData = [
  { day: "Mon", xp: 45, coins: 20 },
  { day: "Tue", xp: 80, coins: 35 },
  { day: "Wed", xp: 120, coins: 50 },
  { day: "Thu", xp: 60, coins: 25 },
  { day: "Fri", xp: 150, coins: 70 },
  { day: "Sat", xp: 200, coins: 100 },
  { day: "Sun", xp: 90, coins: 40 },
];

const maxXP = Math.max(...chartData.map((d) => d.xp));

function StatCard({ icon: Icon, label, value, color, trend }: { icon: React.ElementType; label: string; value: string | number; color: string; trend?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/50 bg-card p-5 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
          <Icon size={18} weight="fill" className="text-white" />
        </div>
        {trend !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            {trend >= 0 ? <ArrowUp size={12} weight="fill" /> : <ArrowDown size={12} weight="fill" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function LearnerDashboard() {
  const { state, addXP, addCoins, completeCourse, completeQuiz, completeGig } = useGamification();
  const [showAllBadges, setShowAllBadges] = useState(false);

  const xpForNext = 500 - (state.xp % 500);
  const progressPercent = ((state.xp % 500) / 500) * 100;

  const badges = [
    { name: "Quick Starter", icon: Lightning, earned: state.streak >= 1 },
    { name: "Dedicated", icon: Fire, earned: state.streak >= 3 },
    { name: "Scholar", icon: GraduationCap, earned: state.completedCourses.length >= 1 },
    { name: "Quiz Master", icon: Medal, earned: state.completedQuizzes.length >= 3 },
    { name: "Earner", icon: Coin, earned: state.coins >= 1000 },
    { name: "Gig Pro", icon: Target, earned: state.gigsCompleted >= 2 },
    { name: "Rising Star", icon: Star, earned: state.level >= 3 },
    { name: "Impact Maker", icon: Sparkle, earned: state.impactScore >= 100 },
  ];

  const recentActivity = [
    { action: "Completed lesson", detail: "Web Development Basics", time: "2 hours ago", xp: 20 },
    { action: "Earned badge", detail: "Quick Starter", time: "1 day ago", xp: 50 },
    { action: "Completed quiz", detail: "Digital Skills Quiz", time: "2 days ago", xp: 100 },
    { action: "Submitted project", detail: "Personal Blog Page", time: "3 days ago", xp: 100 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learner Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Track your progress, achievements, and learning journey.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Trophy} label="Current Level" value={`Level ${state.level}`} color="bg-gradient-to-br from-emerald-500 to-teal-400" />
        <StatCard icon={Coin} label="Total Coins" value={state.coins} color="bg-gradient-to-br from-amber-500 to-orange-400" />
        <StatCard icon={Fire} label="Day Streak" value={`${state.streak} days`} color="bg-gradient-to-br from-red-500 to-pink-400" />
        <StatCard icon={GraduationCap} label="Courses Completed" value={state.completedCourses.length} color="bg-gradient-to-br from-blue-500 to-cyan-400" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <h3 className="mb-4 font-semibold">Weekly XP Progress</h3>
            <div className="flex items-end justify-between gap-2 h-40">
              {chartData.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                  <div className="relative w-full flex items-end justify-center" style={{ height: "120px" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.xp / maxXP) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-5/6 rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <h3 className="mb-4 font-semibold">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle size={14} weight="fill" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-emerald-500">+{item.xp} XP</span>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <h3 className="mb-4 font-semibold">Level Progress</h3>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Level {state.level}</span>
              <span className="text-muted-foreground">{xpForNext} XP to next level</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{state.xp} / {state.xp + xpForNext} XP</p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Badges</h3>
              <button onClick={() => setShowAllBadges(!showAllBadges)} className="text-xs text-primary hover:underline">
                {showAllBadges ? "Show less" : "View all"}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {(showAllBadges ? badges : badges.slice(0, 4)).map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className={`flex flex-col items-center gap-1 rounded-xl p-3 text-center transition-all ${badge.earned ? "bg-emerald-500/10" : "bg-muted opacity-50"}`}>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${badge.earned ? "bg-emerald-500 text-white" : "bg-muted-foreground/20 text-muted-foreground"}`}>
                      <Icon size={14} weight="fill" />
                    </div>
                    <span className="text-xs font-medium">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6">
            <h3 className="mb-2 font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={() => addXP(10)} className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-3 text-sm transition-all hover:bg-muted">
                <span className="flex items-center gap-2"><Lightning size={16} /> Daily Bonus</span>
                <span className="text-emerald-500">+10 XP</span>
              </button>
              <button onClick={() => { completeGig(); }} className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-3 text-sm transition-all hover:bg-muted">
                <span className="flex items-center gap-2"><Target size={16} /> Quick Task</span>
                <span className="text-amber-500">+500 Coins</span>
              </button>
              <button onClick={() => { addCoins(100); }} className="flex w-full items-center justify-between rounded-xl bg-card px-4 py-3 text-sm transition-all hover:bg-muted">
                <span className="flex items-center gap-2"><Coin size={16} /> Claim Reward</span>
                <span className="text-emerald-500">+100 Coins</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentDashboard() {
  const { state } = useGamification();

  const weeklyStats = [
    { label: "Active Hours", value: "12.5h", change: "+15%", positive: true },
    { label: "Courses Attempted", value: "3", change: "+1", positive: true },
    { label: "Quizzes Passed", value: "4/5", change: "80%", positive: true },
    { label: "Screen Time", value: "14h", change: "-2h", positive: true },
  ];

  const childProgress = [
    { course: "Digital Skills", progress: 75, lastActivity: "2 hours ago", status: "Active" },
    { course: "Financial Literacy", progress: 40, lastActivity: "1 day ago", status: "Paused" },
    { course: "Business Skills", progress: 10, lastActivity: "3 days ago", status: "Started" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Monitor your child's learning journey and progress.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {weeklyStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border/50 bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            <span className={`text-xs font-medium ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>{stat.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6">
        <h3 className="mb-4 font-semibold">Course Progress</h3>
        <div className="space-y-4">
          {childProgress.map((course, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{course.course}</p>
                  <p className="text-xs text-muted-foreground">Last activity: {course.lastActivity}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{course.status}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                />
              </div>
              <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 font-semibold">Achievement Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total XP Earned</span>
              <span className="font-bold text-emerald-500">{state.xp.toLocaleString()}</span>
            </div>
            <div className="border-t border-border/30" />
            <div className="flex items-center justify-between">
              <span className="text-sm">Badges Earned</span>
              <span className="font-bold">{state.badges.length}</span>
            </div>
            <div className="border-t border-border/30" />
            <div className="flex items-center justify-between">
              <span className="text-sm">Certificates</span>
              <span className="font-bold">{state.certificates.length}</span>
            </div>
            <div className="border-t border-border/30" />
            <div className="flex items-center justify-between">
              <span className="text-sm">Day Streak</span>
              <span className="font-bold flex items-center gap-1"><Fire size={14} weight="fill" className="text-orange-500" /> {state.streak}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 font-semibold">Screen Time</h3>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <p className="text-3xl font-bold">14h</p>
              <p className="text-sm text-muted-foreground">This week</p>
              <span className="flex items-center justify-center gap-1 mt-1 text-xs font-medium text-emerald-500">
                <ArrowDown size={12} weight="fill" /> 2h less than last week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SchoolDashboard() {
  const { state } = useGamification();

  const classStats = [
    { label: "Total Students", value: "245", change: "+12 this month" },
    { label: "Active Learners", value: "187", change: "76% engagement" },
    { label: "Avg. Course Completion", value: "68%", change: "+5% from last month" },
    { label: "Total Certificates", value: "156", change: "+23 this week" },
  ];

  const topStudents = [
    { name: "Amara O.", xp: 2450, level: 5, course: "Digital Skills" },
    { name: "Kofi M.", xp: 2100, level: 4, course: "Business Skills" },
    { name: "Aisha B.", xp: 1890, level: 4, course: "Financial Literacy" },
    { name: "Chidi E.", xp: 1650, level: 3, course: "Vocational Skills" },
    { name: "Zara K.", xp: 1400, level: 3, course: "Digital Skills" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">School Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Institutional analytics, student performance, and curriculum insights.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {classStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border/50 bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            <span className="text-xs text-muted-foreground">{stat.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 font-semibold">Top Performing Students</h3>
          <div className="space-y-3">
            {topStudents.map((student, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-border/30 pb-3 last:border-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-400 text-xs font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.course} · Level {student.level}</p>
                </div>
                <span className="text-xs font-medium text-emerald-500">{student.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 font-semibold">Curriculum Overview</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Digital Skills</span>
                <span className="text-muted-foreground">82% completion</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Vocational Skills</span>
                <span className="text-muted-foreground">65% completion</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-purple-500 to-pink-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Business Skills</span>
                <span className="text-muted-foreground">58% completion</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Financial Literacy</span>
                <span className="text-muted-foreground">71% completion</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[71%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboards() {
  const { state, setRole } = useGamification();
  const [activeTab, setActiveTab] = useState<"learner" | "parent" | "school">(state.role);

  const handleTabChange = (tab: "learner" | "parent" | "school") => {
    setActiveTab(tab);
    setRole(tab);
  };

  const tabs = [
    { id: "learner" as const, label: "Learner", icon: User },
    { id: "parent" as const, label: "Parent", icon: Users },
    { id: "school" as const, label: "School", icon: Gear },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 rounded-2xl bg-muted p-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={16} weight={activeTab === tab.id ? "fill" : "regular"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "learner" && <LearnerDashboard />}
      {activeTab === "parent" && <ParentDashboard />}
      {activeTab === "school" && <SchoolDashboard />}
    </div>
  );
}