import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkle,
  CurrencyDollar,
  Ticket,
  Gift,
  Diamond,
  Star,
  Users,
  Play,
  ArrowRight,
  Check,
  X,
  Chat,
  Robot,
  Translate,
  Globe,
  Lightning,
  Trophy,
  Coin,
  Wallet,
  Medal,
  Plus,
  Warning,
  Calendar,
  CheckCircle,
  Target,
  MagnifyingGlass,
  Sliders,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { useGamification } from "../App";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
  color: string;
  category: "nft" | "voucher" | "merch" | "digital";
  stock?: number;
}

interface Gig {
  id: string;
  title: string;
  company: string;
  description: string;
  reward: number;
  duration: string;
  type: string;
  skills: string[];
}

const shopItems: ShopItem[] = [
  { id: "nft-art", name: "Digital Art NFT", description: "Unique generative art piece for your collection", price: 250, icon: Diamond, color: "from-purple-500 to-pink-400", category: "nft" },
  { id: "nft-cert", name: "Skill Certificate NFT", description: "Verifiable blockchain certificate of completion", price: 500, icon: Medal, color: "from-emerald-500 to-teal-400", category: "nft" },
  { id: "voucher-data", name: "Data Bundle Voucher", description: "1GB mobile data bundle - stay connected!", price: 150, icon: Ticket, color: "from-blue-500 to-cyan-400", category: "voucher", stock: 50 },
  { id: "voucher-airtime", name: "Airtime Voucher", description: "₦500 airtime credit for any network", price: 200, icon: Ticket, color: "from-amber-500 to-orange-400", category: "voucher", stock: 30 },
  { id: "merch-tshirt", name: "EarnHub T-Shirt", description: "Premium cotton t-shirt with logo", price: 800, icon: Gift, color: "from-emerald-500 to-teal-400", category: "merch", stock: 10 },
  { id: "merch-cap", name: "EarnHub Cap", description: "Stylish snapback cap with embroidered logo", price: 600, icon: Gift, color: "from-gray-500 to-slate-400", category: "merch", stock: 15 },
  { id: "digital-template", name: "Resume Template Pack", description: "Professional resume & CV templates", price: 100, icon: Star, color: "from-yellow-500 to-amber-400", category: "digital" },
  { id: "digital-course", name: "Premium Course Voucher", description: "Unlock any premium course", price: 1000, icon: Lightning, color: "from-red-500 to-pink-400", category: "digital", stock: 5 },
];

const gigs: Gig[] = [
  { id: "gig-1", title: "Social Media Poster", company: "TechStart Inc.", description: "Create 3 social media graphics for a new product launch. Must be creative and brand-aligned.", reward: 500, duration: "2 days", type: "Design", skills: ["Canva", "Graphic Design"] },
  { id: "gig-2", title: "Data Entry Clerk", company: "DataBridge Solutions", description: "Organize and digitize 50 pages of survey data into spreadsheets. Accuracy required.", reward: 350, duration: "3 days", type: "Data", skills: ["Excel", "Typing"] },
  { id: "gig-3", title: "Content Writer", company: "EduContent Africa", description: "Write 5 blog posts about digital literacy for young learners. 500 words each.", reward: 600, duration: "5 days", type: "Writing", skills: ["Writing", "Research"] },
  { id: "gig-4", title: "Logo Designer", company: "BrandWave Agency", description: "Design a minimalist logo for a local coffee shop brand. Include 3 concepts.", reward: 450, duration: "3 days", type: "Design", skills: ["Logo Design", "Illustrator"] },
  { id: "gig-5", title: "Video Editor", company: "Content Creators Hub", description: "Edit a 3-minute YouTube video with transitions, captions, and background music.", reward: 700, duration: "4 days", type: "Video", skills: ["Premiere Pro", "CapCut"] },
  { id: "gig-6", title: "Virtual Assistant", company: "RemoteHelp Pro", description: "Manage email inbox, schedule appointments, and organize files for 1 week.", reward: 550, duration: "7 days", type: "Admin", skills: ["Organization", "Communication"] },
];

function ImpactWallet() {
  const { state, addImpactScore, addCoins } = useGamification();
  const [donationAmount, setDonationAmount] = useState(50);

  const impactProjects = [
    { name: "Plant Trees", description: "Plant 10 trees in your community", impact: 10, cost: 50 },
    { name: "School Supplies", description: "Provide school supplies for 1 child", impact: 25, cost: 100 },
    { name: "Tech Lab", description: "Support a local tech lab for 1 day", impact: 50, cost: 200 },
    { name: "Scholarship", description: "Fund 1 week of learning for a student", impact: 100, cost: 500 },
  ];

  const handleDonate = (cost: number, impact: number) => {
    if (state.coins >= cost) {
      addCoins(-cost);
      addImpactScore(impact);
      toast.success("Donation successful! Thanks for giving back.");
    } else {
      toast.error("Not enough coins! Complete more tasks to earn.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Impact Wallet</h3>
            <p className="text-sm text-muted-foreground">Turn your earnings into real-world impact</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">
            <Sparkle size={18} weight="fill" className="text-emerald-500" />
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{state.impactScore}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {impactProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border/50 bg-card p-4"
            >
              <h4 className="font-medium text-sm">{project.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-500">+{project.impact} Impact</span>
                <button
                  onClick={() => handleDonate(project.cost, project.impact)}
                  disabled={state.coins < project.cost}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  {project.cost} Coins
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AITutor() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hi! I'm your AI Tutor. Ask me anything about your courses, or let me help you with a project!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Explain HTML forms",
    "How to start a business?",
    "What is compound interest?",
    "Design principles tips",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    const responses: Record<string, string> = {
      "html": "HTML (HyperText Markup Language) is the standard language for creating web pages. It uses tags to structure content like headings, paragraphs, links, and images. Forms use <form>, <input>, and <button> tags to collect user data.",
      "business": "Starting a business begins with identifying a problem to solve. Create a business plan, register your company, understand your target market, and start small. Focus on delivering value and iterate based on feedback.",
      "compound interest": "Compound interest is interest calculated on the initial principal plus accumulated interest. It's 'interest on interest' — the reason your savings grow exponentially over time. Start early to maximize the power of compounding!",
      "design": "Key design principles: Balance (visual weight distribution), Contrast (making elements stand out), Alignment (creating order), Repetition (consistency), and Proximity (grouping related items). These create professional, effective designs.",
    };

    setTimeout(() => {
      const matchedKey = Object.keys(responses).find((k) => userMsg.toLowerCase().includes(k));
      const reply = matchedKey
        ? responses[matchedKey]
        : "That's a great question! I'd suggest checking our course materials for a detailed answer. You can also try the project sandbox to practice hands-on!";
      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden h-[400px] flex flex-col">
        <div className="border-b border-border/50 px-4 py-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400">
            <Sparkle size={16} weight="fill" className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">AI Tutor</p>
            <p className="text-xs text-muted-foreground">Powered by EarnHub</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm">
                <span className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border/50 p-4">
          <div className="flex gap-2 mb-3">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-all hover:bg-muted/80 hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask anything..."
              className="flex-1 rounded-xl border border-border/50 bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-primary/50"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="rounded-xl bg-primary px-4 py-2.5 text-white transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              <ArrowRight size={18} weight="fill" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GigBoard() {
  const { completeGig, addXP, addCoins } = useGamification();
  const [activeGig, setActiveGig] = useState<string | null>(null);
  const [appliedGigs, setAppliedGigs] = useState<string[]>([]);

  const handleApply = (gigId: string) => {
    setAppliedGigs((prev) => [...prev, gigId]);
    setActiveGig(null);
    toast.success("Applied to gig! Complete it to earn rewards.");
  };

  const handleComplete = (gigId: string) => {
    completeGig();
    addXP(200);
    toast.success("Gig completed! +200 XP, +500 Coins");
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {gigs.map((gig, i) => (
          <motion.div
            key={gig.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-2xl border border-border/50 bg-card p-5 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{gig.title}</h3>
                <p className="text-xs text-muted-foreground">{gig.company}</p>
              </div>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                {gig.reward} coins
              </span>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">{gig.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {gig.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary/5 px-2.5 py-1 text-xs text-primary">{skill}</span>
              ))}
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{gig.type}</span>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{gig.duration}</span>
            </div>
            <div className="flex gap-2">
              {appliedGigs.includes(gig.id) ? (
                <button
                  onClick={() => handleComplete(gig.id)}
                  className="flex-1 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-600"
                >
                  <Check size={16} weight="fill" className="inline mr-1" /> Complete
                </button>
              ) : (
                <button
                  onClick={() => handleApply(gig.id)}
                  className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Apply Now
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RewardsShop() {
  const { state, spendCoins, addXP } = useGamification();
  const [category, setCategory] = useState<string | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const categories = ["all", "nft", "voucher", "merch", "digital"];
  const filtered = category && category !== "all" ? shopItems.filter((item) => item.category === category) : shopItems;

  const handlePurchase = (item: ShopItem) => {
    if (purchasedItems.includes(item.id)) {
      toast.info("You already own this item!");
      return;
    }
    if (state.coins < item.price) {
      toast.error("Not enough coins! Complete courses and gigs to earn more.");
      return;
    }
    const success = spendCoins(item.price);
    if (success) {
      setPurchasedItems((prev) => [...prev, item.id]);
      addXP(50);
      toast.success(`${item.name} purchased! +50 XP`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === "all" ? null : cat)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              (cat === "all" && !category) || category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item, i) => {
          const Icon = item.icon;
          const owned = purchasedItems.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-2xl border p-5 transition-all ${
                owned ? "border-emerald-500/30 bg-emerald-500/5" : "border-border/50 bg-card hover:shadow-lg"
              }`}
            >
              <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}>
                <Icon size={22} weight="fill" className="text-white" />
              </div>
              <h3 className="mb-1 font-semibold">{item.name}</h3>
              <p className="mb-3 text-xs text-muted-foreground">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <Coin size={14} weight="fill" /> {item.price}
                </span>
                {item.stock !== undefined && (
                  <span className="text-xs text-muted-foreground">{item.stock} left</span>
                )}
              </div>
              <button
                onClick={() => handlePurchase(item)}
                disabled={owned}
                className={`mt-3 w-full rounded-xl py-2.5 text-sm font-medium transition-all ${
                  owned
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {owned ? "Owned" : "Buy Now"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function RewardsAndAI() {
  const [activeTab, setActiveTab] = useState<"shop" | "gigs" | "tutor" | "impact">("shop");

  const tabs = [
    { id: "shop" as const, label: "Rewards Shop", icon: Gift },
    { id: "gigs" as const, label: "Gig Board", icon: CurrencyDollar },
    { id: "tutor" as const, label: "AI Tutor", icon: Sparkle },
    { id: "impact" as const, label: "Impact Wallet", icon: Wallet },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rewards & AI</h1>
        <p className="mt-1 text-muted-foreground">Spend your coins, find gigs, learn with AI, and make an impact.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto rounded-2xl bg-muted p-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={16} weight={activeTab === tab.id ? "fill" : "regular"} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === "shop" && <RewardsShop />}
          {activeTab === "gigs" && <GigBoard />}
          {activeTab === "tutor" && <AITutor />}
          {activeTab === "impact" && <ImpactWallet />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}