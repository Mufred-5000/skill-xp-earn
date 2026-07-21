import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  BookOpenText,
  Code,
  Briefcase,
  CurrencyDollar,
  CheckCircle,
  Play,
  Upload,
  ArrowRight,
  Trophy,
  Timer,
  Star,
  Target,
  Lightning,
  Scroll,
  GraduationCap,
  CaretDown,
  X,
  Plus,
  Check,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useGamification } from "../App";

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
  lessons: Lesson[];
  level: string;
  duration: string;
  xp: number;
  coins: number;
}

interface Lesson {
  title: string;
  content: string;
  duration: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const courses: Course[] = [
  {
    id: "digital-skills",
    title: "Digital Skills",
    category: "Digital",
    description: "Master essential digital tools, coding basics, and online productivity.",
    icon: Code,
    color: "from-blue-500 to-cyan-400",
    level: "Beginner",
    duration: "4 weeks",
    xp: 300,
    coins: 150,
    lessons: [
      { title: "Introduction to Digital Literacy", content: "Learn the fundamentals of digital literacy, including navigating operating systems, file management, and understanding basic software applications. The digital world is vast, and this lesson gives you a solid foundation.", duration: "15 min" },
      { title: "Web Development Basics", content: "Explore HTML, CSS, and JavaScript fundamentals. Build your first web page with modern styling and interactive elements. Understand how the internet works from frontend to backend.", duration: "25 min" },
      { title: "Data Analysis with Spreadsheets", content: "Learn to organize, analyze, and visualize data using spreadsheet tools. Master formulas, pivot tables, charts, and data-driven decision making.", duration: "20 min" },
      { title: "Digital Communication & Collaboration", content: "Master tools like email, video conferencing, project management platforms, and collaborative document editing. Work effectively in remote teams.", duration: "15 min" },
    ],
  },
  {
    id: "vocational-skills",
    title: "Vocational Skills",
    category: "Vocational",
    description: "Hands-on trade skills from graphic design to photography and craftsmanship.",
    icon: Briefcase,
    color: "from-purple-500 to-pink-400",
    level: "All Levels",
    duration: "6 weeks",
    xp: 350,
    coins: 180,
    lessons: [
      { title: "Graphic Design Fundamentals", content: "Learn design principles, color theory, typography, and layout. Use tools like Canva and Figma to create stunning visuals for brands, social media, and print.", duration: "20 min" },
      { title: "Photography & Video Production", content: "Master composition, lighting, editing, and storytelling through photos and videos. Learn to use both smartphones and professional equipment.", duration: "25 min" },
      { title: "Fashion Design & Tailoring", content: "Explore fabric types, pattern making, stitching techniques, and fashion illustration. Turn your creative ideas into wearable art.", duration: "30 min" },
      { title: "Culinary Arts & Baking", content: "Discover cooking techniques, recipe development, plating, and food business basics. From local cuisine to international dishes.", duration: "20 min" },
    ],
  },
  {
    id: "business-skills",
    title: "Business Skills",
    category: "Business",
    description: "Entrepreneurship, marketing, finance, and business management mastery.",
    icon: CurrencyDollar,
    color: "from-amber-500 to-orange-400",
    level: "Intermediate",
    duration: "5 weeks",
    xp: 400,
    coins: 200,
    lessons: [
      { title: "Entrepreneurship 101", content: "Learn how to identify business opportunities, write a business plan, register your company, and understand the entrepreneurial mindset needed to succeed.", duration: "20 min" },
      { title: "Digital Marketing Strategies", content: "Master SEO, social media marketing, content creation, email campaigns, and paid advertising. Drive traffic and convert leads into customers.", duration: "25 min" },
      { title: "Financial Literacy & Management", content: "Understand budgeting, saving, investing, tax basics, and financial planning. Build wealth through smart money management.", duration: "20 min" },
      { title: "Sales & Customer Relations", content: "Develop sales techniques, negotiation skills, customer service excellence, and relationship management. Close deals and retain clients.", duration: "15 min" },
    ],
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    category: "Financial",
    description: "Personal finance, investment, and wealth-building strategies for life.",
    icon: CurrencyDollar,
    color: "from-emerald-500 to-teal-400",
    level: "Beginner",
    duration: "3 weeks",
    xp: 250,
    coins: 120,
    lessons: [
      { title: "Personal Finance Basics", content: "Learn to budget, track expenses, build an emergency fund, and understand the difference between needs and wants. Take control of your financial life.", duration: "15 min" },
      { title: "Savings & Investment", content: "Explore savings accounts, fixed deposits, stocks, bonds, mutual funds, and real estate. Start building your investment portfolio today.", duration: "20 min" },
      { title: "Digital Banking & Mobile Money", content: "Master mobile banking, USSD codes, digital wallets, and online transfers. Learn to manage money safely in the digital age.", duration: "15 min" },
      { title: "Building Credit & Loans", content: "Understand credit scores, loan types, interest rates, and responsible borrowing. Build a strong credit history for future opportunities.", duration: "15 min" },
    ],
  },
];

const quizData: Record<string, QuizQuestion[]> = {
  "digital-skills": [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], correct: 0 },
    { question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correct: 2 },
    { question: "What is the correct file extension for JavaScript?", options: [".java", ".js", ".script", ".txt"], correct: 1 },
    { question: "Which tag is used for the largest heading in HTML?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2 },
    { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1 },
  ],
  "vocational-skills": [
    { question: "What color model is used for print design?", options: ["RGB", "CMYK", "HEX", "HSL"], correct: 1 },
    { question: "What is the rule of thirds in photography?", options: ["A legal rule", "A composition guideline", "A camera setting", "A lens type"], correct: 1 },
    { question: "Which fabric is made from cotton?", options: ["Polyester", "Nylon", "Denim", "Acrylic"], correct: 2 },
    { question: "What does 'mise en place' mean in culinary arts?", options: ["Cooking method", "Everything in its place", "Serving style", "Kitchen tool"], correct: 1 },
    { question: "Which design principle refers to the distribution of visual weight?", options: ["Balance", "Contrast", "Emphasis", "Rhythm"], correct: 0 },
  ],
  "business-skills": [
    { question: "What is a business model?", options: ["A company's logo", "How a company creates value", "A type of employee", "A marketing tool"], correct: 1 },
    { question: "What does ROI stand for?", options: ["Return on Investment", "Rate of Interest", "Revenue on Income", "Risk of Inflation"], correct: 0 },
    { question: "Which marketing channel has the highest reach?", options: ["Email", "Social Media", "TV", "Billboards"], correct: 1 },
    { question: "What is a SWOT analysis used for?", options: ["Stock trading", "Strategic planning", "Website design", "Employee training"], correct: 1 },
    { question: "What is the primary goal of a business?", options: ["To pay taxes", "To create value for stakeholders", "To hire employees", "To build offices"], correct: 1 },
  ],
  "financial-literacy": [
    { question: "What is a budget?", options: ["A loan", "A spending plan", "A savings account", "An investment"], correct: 1 },
    { question: "What does APR stand for?", options: ["Annual Percentage Rate", "Annual Payment Return", "Account Performance Ratio", "Applied Payment Rate"], correct: 0 },
    { question: "Which is a safe investment option?", options: ["Cryptocurrency", "Government bonds", "Penny stocks", "Binary options"], correct: 1 },
    { question: "What is compound interest?", options: ["Interest paid once", "Interest on interest", "A fixed interest rate", "A loan fee"], correct: 1 },
    { question: "What is an emergency fund?", options: ["A credit card", "Money saved for unexpected expenses", "A type of insurance", "A loan application"], correct: 1 },
  ],
};

const projectIdeas = [
  { id: "blog-page", title: "Build a Personal Blog Page", description: "Create a responsive blog page with HTML & CSS", course: "digital-skills", coins: 100 },
  { id: "logo-design", title: "Design a Brand Logo", description: "Create a logo for a fictional brand using design tools", course: "vocational-skills", coins: 120 },
  { id: "business-plan", title: "Write a Mini Business Plan", description: "Draft a one-page business plan for a startup idea", course: "business-skills", coins: 150 },
  { id: "budget-tracker", title: "Create a Personal Budget", description: "Build a spreadsheet to track monthly income and expenses", course: "financial-literacy", coins: 80 },
];

function CourseCard({ course, index, onStart }: { course: Course; index: number; onStart: () => void }) {
  const Icon = course.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className={`h-2 w-full bg-gradient-to-r ${course.color}`} />
      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${course.color}`}>
            <Icon size={20} weight="fill" className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold">{course.title}</h3>
            <span className="text-xs text-muted-foreground">{course.level} | {course.duration}</span>
          </div>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{course.description}</p>
        <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Lightning size={14} weight="fill" className="text-amber-500" /> {course.xp} XP</span>
          <span className="flex items-center gap-1"><Target size={14} weight="fill" className="text-emerald-500" /> {course.coins} Coins</span>
          <span className="flex items-center gap-1"><BookOpenText size={14} /> {course.lessons.length} Lessons</span>
        </div>
        <button
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Play size={16} weight="fill" /> Start Learning
        </button>
      </div>
    </motion.div>
  );
}

function LessonViewer({ course, onBack, onComplete }: { course: Course; onBack: () => void; onComplete: () => void }) {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const { state, completeCourse, completeQuiz, addXP, addCoins } = useGamification();
  const isOffline = state.offlineMode;

  const lesson = course.lessons[currentLesson];
  const quiz = quizData[course.id] || [];

  const handleNextLesson = () => {
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      addXP(20);
      addCoins(5);
      toast.success("Lesson completed! +20 XP, +5 Coins");
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  const handleSubmitQuiz = (isOfflineSubmit: boolean = false) => {
    if (isOfflineSubmit) {
      toast.info("Quiz saved offline. Will sync when back online.");
      return;
    }
    const score = quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    const percentage = Math.round((score / quiz.length) * 100);
    setQuizScore(percentage);
    setQuizSubmitted(true);
    completeQuiz(course.id, percentage);
    if (percentage >= 60) {
      completeCourse(course.id);
      addXP(100);
      addCoins(50);
    }
    toast.success(`Quiz score: ${percentage}%! ${percentage >= 60 ? "Course passed! Certificate unlocked!" : "Keep trying!"}`);
  };

  if (showQuiz) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => { setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers([]); }} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
            <ArrowRight size={20} className="rotate-180" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Final Quiz: {course.title}</h2>
            <p className="text-sm text-muted-foreground">{quiz.length} questions | Pass: 60%</p>
          </div>
        </div>

        {quizSubmitted ? (
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="rounded-2xl border border-border/50 bg-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-400">
              {quizScore >= 60 ? <Trophy size={36} weight="fill" className="text-white" /> : <Target size={36} weight="fill" className="text-white" />}
            </div>
            <h3 className="mb-2 text-2xl font-bold">{quizScore >= 60 ? "Congratulations!" : "Keep Learning!"}</h3>
            <p className="mb-2 text-lg font-semibold text-primary">{quizScore}% Score</p>
            <p className="mb-6 text-sm text-muted-foreground">
              {quizScore >= 60 ? "You passed! Certificate unlocked and coins awarded." : "Review the material and try again."}
            </p>
            <div className="flex justify-center gap-3">
              {quizScore < 60 && (
                <button onClick={() => { setQuizSubmitted(false); setQuizAnswers([]); setQuizScore(0); }} className="rounded-xl bg-primary/10 px-6 py-2.5 font-medium text-primary hover:bg-primary/20">
                  Retry Quiz
                </button>
              )}
              <button onClick={onBack} className="rounded-xl bg-primary px-6 py-2.5 font-medium text-primary-foreground hover:bg-primary/90">
                Back to Courses
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {quiz.map((q, qi) => (
              <motion.div key={qi} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: qi * 0.05 }} className="rounded-xl border border-border/50 bg-card p-5">
                <p className="mb-3 font-medium">{qi + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[qi] === oi;
                    const isCorrect = quizSubmitted && oi === q.correct;
                    const isWrong = quizSubmitted && isSelected && oi !== q.correct;
                    return (
                      <button
                        key={oi}
                        onClick={() => handleQuizAnswer(qi, oi)}
                        className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                          isSelected ? "border-primary bg-primary/10" : "border-border/50 hover:border-primary/30"
                        } ${isCorrect ? "border-emerald-500 bg-emerald-500/10" : ""} ${isWrong ? "border-red-500 bg-red-500/10" : ""}`}
                      >
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                        }`}>{String.fromCharCode(65 + oi)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
            <div className="flex gap-3">
              <button
                onClick={() => handleSubmitQuiz(isOffline)}
                disabled={quizAnswers.length < quiz.length}
                className="flex-1 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {isOffline ? "Save Offline" : "Submit Quiz"}
              </button>
              {isOffline && (
                <button onClick={() => handleSubmitQuiz(false)} className="rounded-xl border border-border/50 px-6 py-3 font-medium transition-all hover:bg-muted">
                  Submit Now
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <p className="text-sm text-muted-foreground">Lesson {currentLesson + 1} of {course.lessons.length}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Timer size={14} /> {lesson.duration}
        </div>
      </div>

      <div className="flex gap-2">
        {course.lessons.map((l, i) => (
          <button
            key={i}
            onClick={() => setCurrentLesson(i)}
            className={`h-2 flex-1 rounded-full transition-all ${
              i === currentLesson ? "bg-primary" : i < currentLesson ? "bg-primary/40" : "bg-border"
            }`}
          />
        ))}
      </div>

      <motion.div key={currentLesson} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/50 bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">{lesson.title}</h3>
        <p className="leading-relaxed text-muted-foreground">{lesson.content}</p>
      </motion.div>

      <div className="flex justify-between">
        <button
          onClick={() => currentLesson > 0 && setCurrentLesson(currentLesson - 1)}
          disabled={currentLesson === 0}
          className="rounded-xl border border-border/50 px-5 py-2.5 font-medium transition-all hover:bg-muted disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextLesson}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          {currentLesson < course.lessons.length - 1 ? "Next Lesson" : "Take Quiz"} <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function ProjectSandbox({ onBack }: { onBack: () => void }) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { addXP, addCoins, completeGig } = useGamification();

  const handleSubmit = () => {
    setSubmitted(true);
    addXP(100);
    addCoins(80);
    completeGig();
    toast.success("Project submitted! +100 XP, +80 Coins");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
          <ArrowRight size={20} className="rotate-180" />
        </button>
        <h2 className="text-xl font-bold">Project Sandbox</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projectIdeas.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selectedProject === project.id ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/30"
            }`}
            onClick={() => { setSelectedProject(project.id); setSubmitted(false); }}
          >
            <h3 className="mb-1 font-medium">{project.title}</h3>
            <p className="mb-2 text-sm text-muted-foreground">{project.description}</p>
            <span className="text-xs font-medium text-amber-500">+{project.coins} coins</span>
          </motion.div>
        ))}
      </div>

      {selectedProject && !submitted && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 font-semibold">Submit Your Work</h3>
          <div className="mb-4 flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 p-8">
            <div className="text-center">
              <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag & drop your project file here, or click to browse</p>
            </div>
          </div>
          <button onClick={handleSubmit} className="w-full rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90">
            Submit Project
          </button>
        </motion.div>
      )}

      {submitted && (
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
          <CheckCircle size={40} weight="fill" className="mx-auto mb-2 text-emerald-500" />
          <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Project Submitted!</h3>
          <p className="text-sm text-muted-foreground">Your work is being reviewed. Coins have been added to your wallet.</p>
        </motion.div>
      )}
    </div>
  );
}

export default function LearnZone() {
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = ["Digital", "Vocational", "Business", "Financial"];
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || c.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (activeCourse) {
    return <LessonViewer course={activeCourse} onBack={() => setActiveCourse(null)} onComplete={() => setActiveCourse(null)} />;
  }

  if (showProjects) {
    return <ProjectSandbox onBack={() => setShowProjects(false)} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Zone</h1>
        <p className="mt-1 text-muted-foreground">Choose a skill path, complete lessons, and earn rewards.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border/50 bg-card px-9 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                filterCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} onStart={() => setActiveCourse(course)} />
        ))}
      </div>

      <div className="rounded-2xl border border-border/50 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Ready to build something?</h3>
            <p className="text-sm text-muted-foreground">Work on real projects and earn coins for your portfolio.</p>
          </div>
          <button
            onClick={() => setShowProjects(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <ArrowRight size={18} weight="fill" /> Go to Projects
          </button>
        </div>
      </div>
    </div>
  );
}