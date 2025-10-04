import { useEffect, useState } from "react";
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
  Share2,
  Plus,
  Trash,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/Context/AuthContext"; // Import useAuth

export default function Achievements() {
  const [achievements, setachievements] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth(); // Get user from AuthContext

  const userStats = {
    totalPoints: 2847,
    level: 15,
    nextLevelPoints: 3200,
    rank: "Gold Scholar",
    streak: 12,
    totalAchievements: achievements.length,
    rareAchievements: achievements.filter((achiev) => achiev.rarity == "Rare")
      .length,
  };

  const icons = {
    "Perfect Score": "🎯",
    "Knowledge Seeker": "📚",
    "Speed Demon": "💨",
    "Community Helper": "🤝",
    "AI Collaborator": "🤖",
    "Code Warrior": "⚔️",
    "Consistency Master": "🔥",
    "Night Owl": "🦉",
    "Quick Learner": "⚡",
    "First Steps": "🚀",
  };

  const navigate = useNavigate();
  // api url
  const url = `${
    import.meta.env.VITE_API_BACKEND_URL
  }/api/achievements/achievements/`;

  // Get Achievements
  const achievementApiData = async () => {
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
      });
      const result = await response.json();
      if (!response.ok) {
        console.error(`Failed to fetch Achievements: ${result}`);
        setachievements([]);
      } else {
        console.log(result);
        setachievements(Array.isArray(result) ? result : []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setachievements([]);
    }
  };

  // Add Achievement
  const addAchievement = () => {
    navigate("achievementForm");
  };

  // update Achievement
  const editAchievements = (id) => {
    navigate(`editachievementForm/${id}`);
  };

  // Delete Achievement
  const deleteAchievement = async (id) => {
    try {
      const response = await fetch(`${url}${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`, // 🔑 attach access
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete operation failed:", errorData);
        return;
      }
      toast.success("Achievement Deleted", {
        hideProgressBar: true,
        icon: <Trash2 className="text-2xl text-red-500 " />,
        className: "text-red-500", // your custom icon here
      });

      console.log("Achievement with id", id, "deleted successfully");
      achievementApiData();
    } catch (error) {
      console.error("Failed to delete Achievement with", id);
    }
  };

  // Learning Streak ( GET )
  const [lrnStreak, setLrnStreak] = useState<any[]>([]);
  const learningStreak = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/streak/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Failed to Fetch Streak", result);
      }
      setLrnStreak(result);
      console.log("Learning streak", result);
    } catch (error) {
      console.error("Error in Fetching Streak", error);
    }
  };

  useEffect(() => {
    achievementApiData();
    learningStreak();
  }, []);

  const categories = [
    { id: "all", name: "All Achievements", count: achievements.length },
    {
      id: "milestone",
      name: "Milestones",
      count: achievements.filter((a) => a.category === "milestone").length,
    },
    {
      id: "performance",
      name: "Performance",
      count: achievements.filter((a) => a.category === "performance").length,
    },
    {
      id: "consistency",
      name: "Consistency",
      count: achievements.filter((a) => a.category === "consistency").length,
    },
    {
      id: "speed",
      name: "Speed",
      count: achievements.filter((a) => a.category === "speed").length,
    },
    {
      id: "community",
      name: "Community",
      count: achievements.filter((a) => a.category === "community").length,
    },
  ];

  const recentAchievements = achievements
    .filter((a) => a.is_unlocked)
    .slice(0, 3);

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.is_unlocked;
    const matchesCategory =
      selectedCategory === "all" || achievement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  // console.log(filteredAchievements)

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
            <h1 className="text-lg sm:text-3xl md:text-4xl font-bold">
              Achievements
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg">
              Track your learning milestones and unlock special rewards
            </p>
          </div>
          {user && user.role === "Admin" && (
            <Button
              onClick={addAchievement}
              className=" text-[12px] md:text-[16px] bg-gradient-learning p-2 -gap-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Achievement
            </Button>
          )}
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
              className={
                selectedCategory === category.id ? "bg-orange-400" : ""
              }
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
                <div className=" size-12 sm:size-16 bg-gradient-achievement rounded-2xl flex items-center justify-center">
                  <Crown className=" size-6 sm:size-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Level {userStats.level}
                  </h2>
                  <p className=" text-sm sm:text-[16px] text-muted-foreground">
                    {userStats.rank}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-xl  sm:text-2xl font-bold text-orange-400">
                  {userStats.totalPoints.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>
                  {userStats.totalPoints - userStats.level * 200}/
                  {userStats.nextLevelPoints - userStats.level * 200} XP
                </span>
              </div>
              <Progress value={levelProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {userStats.nextLevelPoints - userStats.totalPoints} points until
                next level
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
              <div className="text-center p-4 bg-muted/30 rounded-lg col-span-2 sm:col-span-1">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-lg font-bold">
                    {lrnStreak.current_streak}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg w-full">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-4 h-4 text-orange-400" />
                  <span className="text-lg font-bold">
                    {
                      filteredAchievements.filter(
                        (ach) => ach.is_unlocked == true
                      ).length
                    }{" "}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Achievements</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-lg font-bold">
                    {
                      filteredAchievements.filter((ach) => ach.rarity == "rare")
                        .length
                    }
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Rare Unlocks</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-3 ">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                <div className="text-2xl">
                  {achievement.is_unlocked ? icons[achievement.title] : "🔒"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      +{achievement.points} XP
                    </span>
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
            className={` group glass-card p-6 hover-lift relative overflow-hidden border  shadow ${
              achievement.is_unlocked ? "border-accent" : ""
            }`}
          >
            {/* Rarity Glow Effect */}
            {achievement.is_unlocked && achievement.rarity === "legendary" && (
              <div className="absolute inset-0 bg-gradient-achievement opacity-10 pointer-events-none"></div>
            )}

            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`text-3xl ${
                      achievement.is_unlocked ? "" : "grayscale opacity-50"
                    }`}
                  >
                    {achievement.is_unlocked ? icons[achievement.title] : "🔒"}
                  </div>
                  <div className="flex items-center gap-1">
                    {achievement.is_unlocked ? (
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
                <div className="flex items-start justify-between ">
                  <h3
                    className={`text-lg font-semibold ${
                      achievement.is_unlocked ? "" : "text-muted-foreground"
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  {user && user.role === "Admin" && (
                    <div className="flex items-center justify-end gap-4 mb-4  ">
                      <Button
                        onClick={() => {
                          editAchievements(achievement.id);
                        }}
                        className="bg-blue-200 hover:bg-blue-500 px-2 h-8"
                        title="Edit Course"
                      >
                        <Pencil />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteAchievement(achievement.id);
                        }}
                        className="bg-red-200 hover:bg-red-500 px-2 h-8"
                        title="Delete Course"
                      >
                        <Trash />
                      </Button>
                    </div>
                  )}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    achievement.is_unlocked
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {achievement.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                <p className="font-medium mb-1">Requirement:</p>
                <p>{achievement.requirement}</p>
              </div>

              {/* Progress */}
              {!achievement.is_unlocked && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {String(
                        (achievement.progress / achievement.points) * 100
                      ).slice(0, 4)}{" "}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(achievement.progress / achievement.points) * 100}
                    className="h-2"
                  />
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-orange-400 group-hover:fill-orange-400 transition-all duration-400" />
                  <span className="text-sm font-medium">
                    {achievement.points} XP
                  </span>
                </div>
                {achievement.is_unlocked && (
                  <div className="text-xs text-muted-foreground">
                    {/* Unlocked {achievement.unlocked_date.slice(0, 10)} */}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {achievement.is_unlocked ? (
                <Button
                  variant="outline"
                  className="w-full bg-orange-500 text-white "
                  size="sm"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              ) : (
                <Button variant="outline" className="w-full" size="sm" disabled>
                  <Target className="w-3 h-3 mr-1" />
                  {String(
                    (achievement.progress / achievement.points) * 100
                  ).slice(0, 4)}{" "}
                  % Complete
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
            const categoryAchievements = achievements.filter(
              (a) => a.category === category.id
            );
            const unlockedCount = categoryAchievements.filter(
              (a) => a.is_unlocked
            ).length;
            const progressPercentage =
              unlockedCount > 0
                ? (unlockedCount / categoryAchievements.length) * 100
                : 0;

            return (
              <Card key={category.id} className="glass-card p-6 hover-lift">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">
                      {category.id}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {unlockedCount}/{categoryAchievements.length}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.round(progressPercentage)}% Complete</span>
                    <span>
                      {categoryAchievements.length - unlockedCount} remaining
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}
