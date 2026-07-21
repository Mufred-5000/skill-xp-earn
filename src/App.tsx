import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  GraduationCap,
  Compass,
  ChartLine,
  CurrencyDollar,
  Sparkle,
  Users,
  Bell,
  Sun,
  Moon,
  User,
  SignOut,
  Coin,
  Trophy,
  Fire,
  TrendUp,
  X,
  List,
  SquaresFour,
  Swap,
  CaretDown,
  MapPin,
  Flag,
  Timer,
  CheckCircle,
  Plus,
  Gift,
  Diamond,
  Medal,
  BookOpen,
  Monitor,
  Gear,
  Lightning,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import LearnZone from "./components/LearnZone";
import Dashboards from "./components/Dashboards";
import RewardsAndAI from "./components/RewardsAndAI";

export interface GamificationState {
  xp: number;
  coins: number;
  level: number;
  streak: number;
  badges: string[];
  completedCourses: string[];
  certificates: string[];
  completedQuizzes: { quizId: string; score: number }[];
  impactScore: number;
  gigsCompleted: number;
  screenTime: number;
  dailyLogins: string[];
  theme: "dark" | "light";
  activeView: string;
  role: "learner" | "parent" | "school";
  offlineMode: boolean;
  lastLoginDate: string;
}

export interface GamificationContextType {
  state: GamificationState;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  addImpactScore: (amount: number) => void;
  completeCourse: (courseId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  completeGig: () => void;
  toggleTheme: () => void;
  setView: (view: string) => void;
  setRole: (role: "learner" | "parent" | "school") => void;
  toggleOffline: () => void;
  spendCoins: (amount: number) => boolean;
  addBadge: (badge: string) => void;
  isOffline: boolean;
}

const STORAGE_KEY = "earnhub_state";

const defaultState: GamificationState = {
  xp: 0,
  coins: 500,
  level: 1,
  streak: 0,
  badges: [],
  completedCourses: [],
  certificates: [],
  completedQuizzes: [],
  impactScore: 0,
  gigsCompleted: 0,
  screenTime: 0,
  dailyLogins: [],
  theme: "dark",
  activeView: "learn",
  role: "learner",
  offlineMode: false,
  lastLoginDate: "",
};

const XP_PER_LEVEL = 500;

function loadState(): GamificationState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed };
    }
  } catch {
    /* ignore */
  }
  return { ...defaultState };
}

function saveState(state: GamificationState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export const GamificationContext = createContext<GamificationContextType | null>(null);

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
}

function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GamificationState>(loadState);

  useEffect(() => {
    const today = new Date().toDateString();
    setState((prev) => {
      if (prev.lastLoginDate !== today) {
        const newStreak = prev.lastLoginDate === new Date(Date.now() - 86400000).toDateString() ? prev.streak + 1 : 1;
        const newState = {
          ...prev,
          streak: newStreak,
          dailyLogins: [...prev.dailyLogins.slice(-29), today],
          lastLoginDate: today,
          coins: prev.coins + (newStreak > 1 ? 10 * newStreak : 0),
          xp: prev.xp + 20,
        };
        saveState(newState);
        return newState;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const addXP = useCallback((amount: number) => {
    setState((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      const leveledUp = newLevel > prev.level;
      if (leveledUp) {
        setTimeout(() => toast.success(`Leveled up to Level ${newLevel}!`, { icon: <Trophy weight="fill" /> }), 100);
      }
      return { ...prev, xp: newXP, level: newLevel, coins: prev.coins + (leveledUp ? 100 : 0) };
    });
  }, []);

  const addCoins = useCallback((amount: number) => {
    setState((prev) => {
      const newCoins = prev.coins + amount;
      if (amount > 0) {
        setTimeout(() => toast.success(`+${amount} coins earned!`, { icon: <Coin weight="fill" /> }), 100);
      }
      return { ...prev, coins: newCoins };
    });
  }, []);

  const spendCoins = useCallback((amount: number): boolean => {
    let success = false;
    setState((prev) => {
      if (prev.coins >= amount) {
        success = true;
        return { ...prev, coins: prev.coins - amount };
      }
      return prev;
    });
    return success;
  }, []);

  const addImpactScore = useCallback((amount: number) => {
    setState((prev) => {
      const newState = { ...prev, impactScore: prev.impactScore + amount, coins: prev.coins + amount };
      setTimeout(() => toast.success(`+${amount} impact points! Community hero!`, { icon: <Sparkle weight="fill" /> }), 100);
      return newState;
    });
  }, []);

  const completeCourse = useCallback((courseId: string) => {
    setState((prev) => {
      if (prev.completedCourses.includes(courseId)) return prev;
      const certId = `cert-${courseId}-${Date.now()}`;
      const newState = {
        ...prev,
        completedCourses: [...prev.completedCourses, courseId],
        certificates: [...prev.certificates, certId],
        xp: prev.xp + 300,
        coins: prev.coins + 150,
      };
      const newLevel = Math.floor(newState.xp / XP_PER_LEVEL) + 1;
      newState.level = newLevel;
      setTimeout(() => toast.success("Course completed! Certificate unlocked!", { icon: <GraduationCap weight="fill" /> }), 100);
      return newState;
    });
  }, []);

  const completeQuiz = useCallback((quizId: string, score: number) => {
    setState((prev) => {
      if (prev.completedQuizzes.some((q) => q.quizId === quizId)) return prev;
      const coinsEarned = Math.round(score * 2);
      return {
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, { quizId, score }],
        xp: prev.xp + score * 5,
        coins: prev.coins + coinsEarned,
      };
    });
  }, []);

  const completeGig = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gigsCompleted: prev.gigsCompleted + 1,
      xp: prev.xp + 200,
      coins: prev.coins + 500,
    }));
    setTimeout(() => toast.success("Gig completed! +500 coins earned!", { icon: <CurrencyDollar weight="fill" /> }), 100);
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }));
  }, []);

  const setView = useCallback((view: string) => {
    setState((prev) => ({ ...prev, activeView: view }));
  }, []);

  const setRole = useCallback((role: "learner" | "parent" | "school") => {
    setState((prev) => ({ ...prev, role, activeView: "dashboard" }));
  }, []);

  const toggleOffline = useCallback(() => {
    setState((prev) => ({ ...prev, offlineMode: !prev.offlineMode }));
    setState((prev) => {
      if (prev.offlineMode) {
        setTimeout(() => toast.info("Offline mode activated. Content cached locally.", { icon: <Monitor weight="fill" /> }), 100);
      } else {
        setTimeout(() => toast.success("Back online! Syncing progress...", { icon: <TrendUp weight="fill" /> }), 100);
      }
      return prev;
    });
  }, []);

  const addBadge = useCallback((badge: string) => {
    setState((prev) => {
      if (prev.badges.includes(badge)) return prev;
      return { ...prev, badges: [...prev.badges, badge] };
    });
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        state,
        addXP,
        addCoins,
        addImpactScore,
        completeCourse,
        completeQuiz,
        completeGig,
        toggleTheme,
        setView,
        setRole,
        toggleOffline,
        spendCoins,
        addBadge,
        isOffline: state.offlineMode,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

const navItems = [
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "dashboard", label: "Dashboard", icon: ChartLine },
  { id: "rewards", label: "Rewards & AI", icon: Sparkle },
];

function PremiumNav() {
  const { state, setView, toggleTheme, toggleOffline, isOffline } = useGamification();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg">
              <GraduationCap size={18} weight="fill" className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient-emerald">Earn</span>
              <span className="text-foreground">Hub</span>
            </span>
          </div>
          <div className="hidden lg:flex ml-8 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    state.activeView === item.id
                      ? "bg-primary/15 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={18} weight={state.activeView === item.id ? "fill" : "regular"} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 mr-2">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">
              <Coin size={16} weight="fill" />
              {state.coins}
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <Trophy size={16} weight="fill" />
              Lvl {state.level}
            </div>
            {state.streak > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-600 dark:text-orange-400">
                <Fire size={16} weight="fill" />
                {state.streak}
              </div>
            )}
          </div>

          <button
            onClick={toggleOffline}
            className={`rounded-lg p-2 transition-colors ${
              isOffline ? "bg-amber-500/15 text-amber-500" : "text-muted-foreground hover:bg-muted"
            }`}
            title={isOffline ? "Online Mode" : "Offline Mode"}
          >
            <Monitor size={18} weight={isOffline ? "fill" : "regular"} />
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
          >
            {state.theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted">
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 overflow-hidden lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      state.activeView === item.id
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={20} weight={state.activeView === item.id ? "fill" : "regular"} />
                    {item.label}
                  </button>
                );
              })}
              <div className="flex gap-3 pt-2 sm:hidden">
                <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400">
                  <Coin size={14} weight="fill" />
                  {state.coins}
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <Trophy size={14} weight="fill" />
                  Lvl {state.level}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function App() {
  const { state, isOffline } = useGamification();

  const renderView = () => {
    switch (state.activeView) {
      case "learn":
        return <LearnZone />;
      case "dashboard":
        return <Dashboards />;
      case "rewards":
        return <RewardsAndAI />;
      default:
        return <LearnZone />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isOffline && (
        <div className="flex items-center justify-center gap-2 bg-amber-500/10 px-4 py-2 text-sm text-amber-600 dark:text-amber-400">
          <Monitor size={16} weight="fill" />
          Offline Mode - Content cached locally. Changes will sync when back online.
        </div>
      )}
      <PremiumNav />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.activeView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <GamificationProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="dark"
        toastOptions={{
          style: { border: "1px solid oklch(0.25 0.06 160 / 0.3)" },
        }}
      />
      <App />
    </GamificationProvider>
  );
}