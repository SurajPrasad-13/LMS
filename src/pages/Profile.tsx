import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Award, Crown, Medal, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { LoaderOne } from "@/components/ui/loader";

const Profile = () => {
  const [courses, setcourses] = useState<any[]>([]);
  const [assignments, setassignments] = useState<any[]>([]);
  const [achievements, setachievements] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const updatedData = location.state as any[]; // Expecting an array based on EditProfile
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchInitialProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND_URL}/api/accounts/profiles/`
        );
        const result = await response.json();
        if (result && result.length > 0) {
          setProfileData(result[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (updatedData && updatedData.length > 0) {
      // Data from EditProfile.tsx
      setProfileData(updatedData[0]);
      setIsLoading(false);
    } else {
      // First time loading, fetch from API
      fetchInitialProfile();
    }

    // These can load independently
    coursesApiData();
    assignmentApiData();
    achievementApiData();
  }, [user]);

  const coursesApiData = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/courses/courses/`
      );
      const result = await response.json();
      setcourses(result);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const assignmentApiData = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/assignments/assignments/`
      );
      const result = await response.json();
      setassignments(result);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const achievementApiData = async () => {
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/achievements/achievements/`
      );
      const result = await response.json();
      setachievements(result);
    } catch (error) {
      console.error("Error fetching achievements:", error);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderOne />
      </div>
    );
  }

  const displayName = profileData?.user_name || user?.username;
  const displayEmail = user.email; // Assuming email comes from auth context
  const displayBio = profileData?.bio || "No bio available.";
  const displayImage = profileData?.profile_picture;
  const studentName =
    profileData?.full_name || user?.first_name + user?.last_name;

  return (
    <>
      <div className="text-center ">
        <h1 className=" text-xl sm:text-3xl pb-2  md:text-5xl text-transparent bg-clip-text bg-gradient-learning  font-extrabold">
          Your Journey with Sudo LMS AI
        </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:items-start justify-around w-full">
        {/* Left side User Study details */}
        <div className="md:w-[65%] ">
          <div className=" p-5 rounded-lg h-auto border my-5 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <h2 className="text-2xl">Enrolled courses</h2>
            <div>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-start space-x-3  mx-5 px-2 py-3 rounded-lg my-2 bg-muted/40  hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <p className=" font-medium">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      by: {course.instructor}{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
                    <Badge variant="outline"> {course.status} </Badge>
                    <Badge className="bg-orange-400 text-white hover:bg-white hover:text-black "> {course.level} </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" p-5 rounded-lg h-auto border my-5 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <h2 className="text-2xl">Assignments</h2>
            <div>
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex  items-start  px-2 py-3 rounded-lg my-2 bg-muted/40 hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <p className=" font-medium">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">
                      by: {assignment.instructor}{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
                    <Badge variant="outline"> {assignment.status} </Badge>
                    <Badge className="bg-orange-400 text-white hover:bg-white hover:text-black "> {assignment.type} </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" p-5 rounded-lg h-auto border my-5 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <h2 className="text-2xl">Achievements You Earned</h2>
            <div>
              {achievements
                .filter((ach) => ach.is_unlocked === true)
                .map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start  px-2 py-3 rounded-lg my-2 bg-muted/40 hover:bg-muted/80 transition-colors cursor-pointer w-full"
                  >
                    <div className="flex-1">
                      <p className=" font-medium">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.requirement}{" "}
                      </p>
                      <div className="flex items-center gap-1 my-1">
                        <Star className="w-4 h-4 text-orange-400 group-hover:fill-orange-400 transition-all duration-400" />
                        <span className="text-sm font-medium">
                          {achievement.points} XP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {getRarityIcon(achievement.rarity)}
                        <span className="ml-1 capitalize">
                          {achievement.rarity}
                        </span>
                      </Badge>
                      <Badge className="bg-orange-400 text-white hover:bg-white hover:text-black "> {achievement.category} </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* right side user details */}
        <Card className=" bg-gradient-to-bl from-orange-200 to-white w-[88vw] mx-auto sm:w-8/12  md:w-96 lg:w-120 md:mx-4 p-6 mt-5 hover:shadow-xl transition-shadow duration-200 ">
          {/* image and name */}
          <div className="flex flex-col items-center justify-start ">
            <div className=" bg-green-50 size-28   flex items-center justify-center  rounded-full">
              <img
                src={displayImage}
                alt={displayName}
                className="size-24 rounded-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>{user.first_name}</span> <span>{user.last_name} </span>
            </div>
          </div>

          <div className="py-1 text-lg">
            <div className="text-sm text-gray-400 ">UserName:</div>
            <p>{displayName ? displayName : user?.username || "N/A"}</p>
          </div>
          <div className="py-1">
            <div className="text-sm text-gray-400">Email:</div>
            {/* <p>{profileData?.email || "Add email"}</p> */}
            <p>{user?.email || "N/A"}</p>
          </div>
          <div className="py-1">
            <div className="text-sm text-gray-400">Bio:</div>
            <p>{displayBio || "Add Bio"}</p>
          </div>
          <div className="my-4 text-center">
            <Button>
              <NavLink to="editProfile">Edit Profile</NavLink>
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
