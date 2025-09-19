import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Leaf, Star, Trophy, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DashboardProps {
  userData: {
    name: string;
    ecoPoints: number;
    level: number;
    school: string;
    completedLessons: number;
    totalLessons: number;
    completedChallenges: number;
    totalChallenges: number;
    badgesEarned: number;
    schoolRank: number;
  };
}

export function Dashboard({ userData }: DashboardProps) {
  const progressPercentage = (userData.completedLessons / userData.totalLessons) * 100;
  const challengeProgress = (userData.completedChallenges / userData.totalChallenges) * 100;

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
        <div className="relative z-10">
          <h1 className="text-white mb-2">Welcome back, {userData.name}!</h1>
          <p className="text-white/90 mb-4">Ready to save the planet today?</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              <span className="text-white">{userData.ecoPoints} Eco Points</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Level {userData.level}
            </Badge>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1652554928610-56b95ea677f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwZW52aXJvbm1lbnQlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MDkzODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students learning"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl">{userData.badgesEarned}</div>
            <p className="text-muted-foreground">Badges Earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl">#{userData.schoolRank}</div>
            <p className="text-muted-foreground">School Rank</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Lessons Completed</span>
                <span>{userData.completedLessons}/{userData.totalLessons}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {userData.totalLessons - userData.completedLessons} lessons remaining
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              Challenge Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Challenges Completed</span>
                <span>{userData.completedChallenges}/{userData.totalChallenges}</span>
              </div>
              <Progress value={challengeProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Keep up the great work!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* School Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3>Your School</h3>
              <p className="text-muted-foreground">{userData.school}</p>
            </div>
            <Badge variant="outline">Rank #{userData.schoolRank}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}