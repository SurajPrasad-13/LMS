import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy,
  Star,
  Crown,
  Target,
  Zap,
  BookOpen,
  Clock,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Lock,
  Unlock,
  Medal,
  Gift,
  Sparkles,
  ChevronRight,
  Share2
} from "lucide-react";

export default function Achievements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const userStats = {
    totalPoints: 2847,
    level: 15,
    nextLevelPoints: 3200,
    rank: "Gold Scholar",
    streak: 12,
    totalAchievements: 28,
    rareAchievements: 5
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🚀",
      category: "milestone",
      points: 50,
      rarity: "common",
      isUnlocked: true,
      unlockedDate: "2024-01-15",
      progress: 100,
      requirement: "Complete 1 lesson"
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete 5 courses in one month",
      icon: "⚡",
      category: "speed",
      points: 200,
      rarity: "rare",
      isUnlocked: true,
      unlockedDate: "2024-01-28",
      progress: 100,
      requirement: "Complete 5 courses in 30 days"
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Get 100% on 10 quizzes",
      icon: "🎯",
      category: "performance",
      points: 150,
      rarity: "uncommon",
      isUnlocked: true,
      unlockedDate: "2024-02-05",
      progress: 100,
      requirement: "Score 100% on 10 quizzes"
    },
    {
      id: 4,
      title: "Night Owl",
      description: "Study for 3 hours after 10 PM",
      icon: "🦉",
      category: "dedication",
      points: 100,
      rarity: "uncommon",
      isUnlocked: true,
      unlockedDate: "2024-02-10",
      progress: 100,
      requirement: "Study 3+ hours after 10 PM"
    },
    {
      id: 5,
      title: "Consistency Master",
      description: "Maintain a 30-day learning streak",
      icon: "🔥",
      category: "consistency",
      points: 300,
      rarity: "epic",
      isUnlocked: false,
      progress: 40,
      requirement: "Study for 30 consecutive days"
    },
    {
      id: 6,
      title: "Code Warrior",
      description: "Complete 50 coding challenges",
      icon: "⚔️",
      category: "skill",
      points: 250,
      rarity: "rare",
      isUnlocked: false,
      progress: 72,
      requirement: "Complete 50 coding challenges"
    },
    {
      id: 7,
      title: "AI Collaborator",
      description: "Use AI tutor 100 times",
      icon: "🤖",
      category: "ai",
      points: 175,
      rarity: "uncommon",
      isUnlocked: false,
      progress: 68,
      requirement: "Ask AI tutor 100 questions"
    },
    {
      id: 8,
      title: "Community Helper",
      description: "Help 25 fellow students in forums",
      icon: "🤝",
      category: "community",
      points: 200,
      rarity: "rare",
      isUnlocked: false,
      progress: 32,
      requirement: "Provide helpful answers to 25 students"
    },
    {
      id: 9,
      title: "Speed Demon",
      description: "Complete a course in under 1 week",
      icon: "💨",
      category: "speed",
      points: 400,
      rarity: "legendary",
      isUnlocked: false,
      progress: 0,
      requirement: "Complete any course within 7 days"
    },
    {
      id: 10,
      title: "Knowledge Seeker",
      description: "Enroll in 20 different courses",
      icon: "📚",
      category: "exploration",
      points: 350,
      rarity: "epic",
      isUnlocked: false,
      progress: 60,
      requirement: "Enroll in 20 different courses"
    }
  ];

  const categories = [
    { id: "all", name: "All Achievements", count: achievements.length },
    { id: "milestone", name: "Milestones", count: achievements.filter(a => a.category === "milestone").length },
    { id: "performance", name: "Performance", count: achievements.filter(a => a.category === "performance").length },
    { id: "consistency", name: "Consistency", count: achievements.filter(a => a.category === "consistency").length },
    { id: "speed", name: "Speed", count: achievements.filter(a => a.category === "speed").length },
    { id: "community", name: "Community", count: achievements.filter(a => a.category === "community").length },
  ];

  const recentAchievements = achievements.filter(a => a.isUnlocked).slice(0, 3);

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || achievement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500 text-white";
      case "uncommon":
        return "bg-green-500 text-white";
      case "rare":
        return "bg-blue-500 text-white";
      case "epic":
        return "bg-purple-500 text-white";
      case "legendary":
        return "bg-gradient-achievement text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return <Award className="w-4 h-4" />;
      case "uncommon":
        return <Star className="w-4 h-4" />;
      case "rare":
        return <Medal className="w-4 h-4" />;
      case "epic":
        return <Crown className="w-4 h-4" />;
      case "legendary":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const levelProgress = ((userStats.totalPoints % 1000) / 1000) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-3xl md:text-4xl font-bold">Achievements</h1>
            <p className="text-muted-foreground text-sm md:text-lg">
              Track your learning milestones and unlock special rewards
            </p>
          </div>
          <Button className="bg-gradient-achievement text-[12px] md:text-[16px]">
            <Share2 className="w-4 h-4 mr-2" />
            Share Progress
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
            id="searchTerm"
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-orange-400" : ""}
            >
              {category.name}
              <Badge variant="outline" className="ml-2 bg-white">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level & Progress */}
        <Card className="glass-card p-6 lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-achievement rounded-2xl flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Level {userStats.level}</h2>
                  <p className="text-muted-foreground">{userStats.rank}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold text-orange-400">{userStats.totalPoints.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>{userStats.totalPoints - (userStats.level * 200)}/{userStats.nextLevelPoints - (userStats.level * 200)} XP</span>
              </div>
              <Progress value={levelProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {userStats.nextLevelPoints - userStats.totalPoints} points until next level
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-lg font-bold">{userStats.streak}</span>
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-4 h-4 text-orange-400" />
                  <span className="text-lg font-bold">{userStats.totalAchievements}</span>
                </div>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-lg font-bold">{userStats.rareAchievements}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rare Unlocks</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Unlocks</h3>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">+{achievement.points} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`glass-card p-6 hover-lift relative overflow-hidden ${
              achievement.isUnlocked ? "border-accent/50" : ""
            }`}
          >
            {/* Rarity Glow Effect */}
            {achievement.isUnlocked && achievement.rarity === "legendary" && (
              <div className="absolute inset-0 bg-gradient-achievement opacity-10 pointer-events-none"></div>
            )}
            
            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`text-3xl ${achievement.isUnlocked ? "" : "grayscale opacity-50"}`}>
                    {achievement.isUnlocked ? achievement.icon : "🔒"}
                  </div>
                  <div className="flex items-center gap-1">
                    {achievement.isUnlocked ? (
                      <Unlock className="w-4 h-4 text-success" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <Badge className={getRarityColor(achievement.rarity)}>
                  {getRarityIcon(achievement.rarity)}
                  <span className="ml-1 capitalize">{achievement.rarity}</span>
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={`text-lg font-semibold ${
                  achievement.isUnlocked ? "" : "text-muted-foreground"
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  achievement.isUnlocked ? "text-muted-foreground" : "text-muted-foreground/70"
                }`}>
                  {achievement.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                <p className="font-medium mb-1">Requirement:</p>
                <p>{achievement.requirement}</p>
              </div>

              {/* Progress */}
              {!achievement.isUnlocked && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium">{achievement.points} XP</span>
                </div>
                {achievement.isUnlocked && (
                  <div className="text-xs text-muted-foreground">
                    Unlocked {achievement.unlockedDate}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {achievement.isUnlocked ? (
                <Button variant="outline" className="w-full" size="sm">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              ) : (
                <Button variant="outline" className="w-full" size="sm" disabled>
                  <Target className="w-3 h-3 mr-1" />
                  {achievement.progress}% Complete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Achievement Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(1).map((category) => {
            const categoryAchievements = achievements.filter(a => a.category === category.id);
            const unlockedCount = categoryAchievements.filter(a => a.isUnlocked).length;
            const progressPercentage = (unlockedCount / categoryAchievements.length) * 100;
            
            return (
              <Card key={category.id} className="glass-card p-6 hover-lift">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">{category.id}</h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{unlockedCount}/{categoryAchievements.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.round(progressPercentage)}% Complete</span>
                    <span>{categoryAchievements.length - unlockedCount} remaining</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}