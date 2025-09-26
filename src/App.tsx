import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Lessons } from "./components/Lessons";
import { Challenges } from "./components/Challenges";
import { Quiz } from "./components/Quiz";
import { Leaderboard } from "./components/Leaderboard";
import { Badges } from "./components/Badges";
import { Button } from "./components/ui/button";
import { Home, BookOpen, Target, Trophy, Award, Brain } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import StartLessons from "./components/StartLessons";
import Navbar from "./components/Navbar";

export default function App() {
  const [leaderboardView, setLeaderboardView] = useState<
    "individual" | "school"
  >("individual");

  // Mock user data
  const userData = {
    name: "Aashish",
    ecoPoints: 2450,
    level: 7,
    school: "Green Valley High School",
    completedLessons: 12,
    totalLessons: 20,
    completedChallenges: 8,
    totalChallenges: 15,
    badgesEarned: 14,
    schoolRank: 3,
  };

  // Mock lessons data
  const lessons = [
    {
      id: "1",
      title: "Climate Change Basics",
      description:
        "Understanding the science behind global warming and its impacts on our planet.",
      duration: "15 min",
      difficulty: "Beginner" as const,
      progress: 100,
      completed: true,
      points: 50,
      image:
        "https://images.unsplash.com/photo-1652554928610-56b95ea677f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZW52aXJvbm1lbnQlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MDkzODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Climate Science",
    },
    {
      id: "2",
      title: "Renewable Energy Sources",
      description:
        "Explore solar, wind, and other clean energy alternatives that power our future.",
      duration: "20 min",
      difficulty: "Intermediate" as const,
      progress: 60,
      completed: false,
      points: 75,
      image:
        "https://images.unsplash.com/photo-1652554928610-56b95ea677f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZW52aXJvbm1lbnQlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MDkzODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Energy",
    },
    {
      id: "3",
      title: "Plastic Pollution Crisis",
      description:
        "Learn about the devastating effects of plastic waste on marine ecosystems.",
      duration: "18 min",
      difficulty: "Beginner" as const,
      progress: 0,
      completed: false,
      points: 60,
      image:
        "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMHNlZ3JlZ2F0aW9ufGVufDF8fHx8MTc1ODA4NDg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Waste Management",
    },
    {
      id: "4",
      title: "Biodiversity and Ecosystems",
      description:
        "Discover the intricate relationships between species and their habitats.",
      duration: "25 min",
      difficulty: "Advanced" as const,
      progress: 0,
      completed: false,
      points: 100,
      image:
        "https://images.unsplash.com/photo-1652554928610-56b95ea677f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZW52aXJvbm1lbnQlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MDkzODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Biodiversity",
    },
  ];

  // Mock challenges data
  const challenges = [
    {
      id: "1",
      title: "Plant a Tree",
      description:
        "Plant a native tree species in your community and document its growth over time.",
      type: "individual" as const,
      difficulty: "Medium" as const,
      duration: "1 week",
      points: 200,
      completed: false,
      inProgress: true,
      image:
        "https://images.unsplash.com/photo-1733766903731-d171d1c1b0ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwcGxhbnRpbmclMjBlbnZpcm9ubWVudGFsJTIwYWN0aXZpdHl8ZW58MXx8fHwxNzU4MDkzODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      requirements: [
        "Find a suitable location",
        "Get permission if needed",
        "Purchase native tree seedling",
        "Take before/after photos",
      ],
      location: "Local park or community area",
    },
    {
      id: "2",
      title: "Waste Segregation Week",
      description:
        "Practice proper waste segregation at home for one week and track your results.",
      type: "individual" as const,
      difficulty: "Easy" as const,
      duration: "1 week",
      points: 100,
      completed: true,
      inProgress: false,
      image:
        "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMHNlZ3JlZ2F0aW9ufGVufDF8fHx8MTc1ODA4NDg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      requirements: [
        "Set up separate bins",
        "Learn local recycling guidelines",
        "Track daily waste types",
        "Submit daily photos",
      ],
    },
    {
      id: "3",
      title: "School Garden Project",
      description:
        "Create a sustainable garden at your school to grow vegetables and herbs.",
      type: "school" as const,
      difficulty: "Hard" as const,
      duration: "1 month",
      points: 500,
      completed: false,
      inProgress: false,
      image:
        "https://images.unsplash.com/photo-1652554928610-56b95ea677f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZW52aXJvbm1lbnQlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MDkzODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      requirements: [
        "Get school approval",
        "Form a team of 5+ students",
        "Design garden layout",
        "Secure funding/resources",
        "Document progress weekly",
      ],
    },
  ];

  // Mock quiz data
  const quiz = {
    id: "climate-quiz",
    title: "Climate Change Knowledge Check",
    description:
      "Test your understanding of climate science and environmental issues.",
    difficulty: "Medium" as const,
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        question: "What is the primary cause of recent climate change?",
        options: [
          "Natural weather cycles",
          "Greenhouse gas emissions from human activities",
          "Solar radiation changes",
          "Volcanic eruptions",
        ],
        correctAnswer: 1,
        explanation:
          "Human activities, particularly burning fossil fuels, have increased greenhouse gas concentrations in the atmosphere, leading to global warming.",
        points: 10,
      },
      {
        id: "q2",
        question:
          "Which gas is the most significant contributor to global warming?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"],
        correctAnswer: 2,
        explanation:
          "Carbon dioxide (CO2) is the most abundant greenhouse gas released by human activities and stays in the atmosphere for hundreds of years.",
        points: 10,
      },
      {
        id: "q3",
        question:
          "What percentage of waste should ideally be recycled or composted?",
        options: ["25%", "50%", "75%", "90%"],
        correctAnswer: 3,
        explanation:
          "Ideally, 90% or more of waste should be diverted from landfills through recycling, composting, and reuse programs.",
        points: 15,
      },
    ],
  };

  // Mock leaderboard data
  const leaderboard = [
    {
      id: "1",
      name: "Kajal",
      school: "Eco Academy",
      ecoPoints: 3200,
      rank: 1,
      change: 2,
      badgesCount: 18,
      isCurrentUser: false,
    },
    {
      id: "2",
      name: "Naman",
      school: "Green Valley High",
      ecoPoints: 2890,
      rank: 2,
      change: -1,
      badgesCount: 16,
      isCurrentUser: false,
    },
    {
      id: "3",
      name: "Aashish",
      school: "Green Valley High School",
      ecoPoints: 2450,
      rank: 3,
      change: 1,
      badgesCount: 14,
      isCurrentUser: true,
    },
    {
      id: "4",
      name: "Apeksha",
      school: "Sustainable Schools",
      ecoPoints: 2320,
      rank: 4,
      change: 0,
      badgesCount: 13,
      isCurrentUser: false,
    },
    {
      id: "5",
      name: "ujjwal",
      school: "Eco Academy",
      ecoPoints: 2100,
      rank: 5,
      change: 3,
      badgesCount: 12,
      isCurrentUser: false,
    },
  ];

  // Mock badges data
  const badges = [
    {
      id: "1",
      name: "First Steps",
      description: "Complete your first environmental lesson",
      icon: "leaf",
      earned: true,
      rarity: "Common" as const,
      category: "Learning",
      earnedDate: "Sept 10, 2025",
      points: 10,
    },
    {
      id: "2",
      name: "Tree Hugger",
      description: "Plant your first tree",
      icon: "tree",
      earned: true,
      rarity: "Rare" as const,
      category: "Action",
      earnedDate: "Sept 12, 2025",
      points: 50,
    },
    {
      id: "3",
      name: "Recycling Champion",
      description: "Complete a week of waste segregation",
      icon: "recycle",
      earned: true,
      rarity: "Rare" as const,
      category: "Action",
      earnedDate: "Sept 5, 2025",
      points: 75,
    },
    {
      id: "4",
      name: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      icon: "star",
      earned: false,
      progress: 3,
      maxProgress: 5,
      rarity: "Epic" as const,
      category: "Knowledge",
      points: 100,
    },
    {
      id: "5",
      name: "Water Guardian",
      description: "Complete all water conservation lessons",
      icon: "water",
      earned: false,
      progress: 2,
      maxProgress: 4,
      rarity: "Epic" as const,
      category: "Learning",
      points: 150,
    },
    {
      id: "6",
      name: "Solar Pioneer",
      description: "Master renewable energy concepts",
      icon: "energy",
      earned: false,
      rarity: "Legendary" as const,
      category: "Knowledge",
      points: 200,
    },
  ];

  const handleStartLesson = (lessonId: string) => {
    toast.success("Starting lesson! This would open the lesson content.");
  };

  const handleStartChallenge = (challengeId: string) => {
    toast.success("Challenge started! Good luck making a positive impact!");
  };

  const handleSubmitProof = (challengeId: string) => {
    toast.success("Proof submitted! Our team will review it soon.");
  };

  const handleQuizComplete = (score: number, totalPoints: number) => {
    toast.success(`Quiz completed! You earned ${score}/${totalPoints} points.`);
  };

  const navItems = [
    { id: "dashboard", label: "Home", icon: Home, path: "/" },
    { id: "lessons", label: "Learn", icon: BookOpen, path: "/lessons" },
    {
      id: "challenges",
      label: "Challenges",
      icon: Target,
      path: "/challenges",
    },
    { id: "quiz", label: "Quiz", icon: Brain, path: "/quiz" },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      path: "/leaderboard",
    },
    { id: "badges", label: "Badges", icon: Award, path: "/badges" },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <Navbar/>
        <div className="container mx-auto px-4 py-6 max-w-md">
          <Routes>
            <Route path="/" element={<Dashboard userData={userData} />} />
            <Route
              path="/lessons"
              element={
                <Lessons lessons={lessons} onStartLesson={handleStartLesson} />
              }
            />
            <Route
              path="/challenges"
              element={
                <Challenges
                  challenges={challenges}
                  onStartChallenge={handleStartChallenge}
                  onSubmitProof={handleSubmitProof}
                />
              }
            />
            <Route
              path="/quiz"
              element={<Quiz quiz={quiz} onQuizComplete={handleQuizComplete} />}
            />
            <Route
              path="/leaderboard"
              element={
                <Leaderboard
                  leaderboard={leaderboard}
                  viewType={leaderboardView}
                  onViewChange={setLeaderboardView}
                />
              }
            />
            <Route path="/badges" element={<Badges badges={badges} />} />
            <Route path="/lessons/lesson" element={<StartLessons />} />
          </Routes>
        </div>

        {/* Bottom Navigation */}
        <BottomNav navItems={navItems} />
      </div>
    </Router>
  );
}

function BottomNav({
  navItems,
}: {
  navItems: { id: string; label: string; icon: any; path: string }[];
}) {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container mx-auto max-w-md">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                asChild
                className={`flex-col h-auto py-2 px-2 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Link to={item.path}>
                  <IconComponent className="w-5 h-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
