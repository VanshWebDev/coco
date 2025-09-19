import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  school: string;
  ecoPoints: number;
  rank: number;
  change: number; // positive for up, negative for down, 0 for no change
  badgesCount: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  viewType: 'individual' | 'school';
  onViewChange: (view: 'individual' | 'school') => void;
}

export function Leaderboard({ leaderboard, viewType, onViewChange }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            {rank}
          </div>
        );
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 text-green-600 text-xs">
          <TrendingUp className="w-3 h-3" />
          +{change}
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-red-600 text-xs">
          <TrendingUp className="w-3 h-3 rotate-180" />
          {change}
        </div>
      );
    }
    return <div className="text-muted-foreground text-xs">—</div>;
  };

  const topThree = leaderboard.slice(0, 3);
  const restOfLeaderboard = leaderboard.slice(3);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1>Leaderboard</h1>
        <div className="flex gap-2">
          <Badge
            variant={viewType === 'individual' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onViewChange('individual')}
          >
            Students
          </Badge>
          <Badge
            variant={viewType === 'school' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onViewChange('school')}
          >
            Schools
          </Badge>
        </div>
      </div>

      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">🏆 Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end gap-4 mb-6">
            {topThree.map((entry, index) => {
              const heights = ['h-16', 'h-20', 'h-14']; // 2nd, 1st, 3rd
              const order = [1, 0, 2]; // Rearrange for podium effect
              const actualIndex = order[index];
              const actualEntry = topThree[actualIndex];
              
              if (!actualEntry) return null;

              return (
                <div key={actualEntry.id} className="flex flex-col items-center">
                  <div className="mb-2">
                    <Avatar className={actualEntry.isCurrentUser ? 'ring-2 ring-primary' : ''}>
                      <AvatarFallback>
                        {actualEntry.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center mb-2">
                    <div className="text-sm font-medium">{actualEntry.name}</div>
                    <div className="text-xs text-muted-foreground">{actualEntry.ecoPoints} pts</div>
                  </div>
                  <div className={`${heights[index]} w-16 bg-gradient-to-t from-primary/20 to-primary/10 rounded-t-lg flex items-end justify-center pb-2`}>
                    {getRankIcon(actualEntry.rank)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Rest of Leaderboard */}
      <div className="space-y-2">
        {restOfLeaderboard.map((entry) => (
          <Card key={entry.id} className={entry.isCurrentUser ? 'ring-2 ring-primary' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {getRankIcon(entry.rank)}
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {entry.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{entry.name}</span>
                    {entry.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.school}</p>
                </div>

                <div className="text-right">
                  <div className="font-medium">{entry.ecoPoints.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">eco points</div>
                </div>

                <div className="text-center min-w-[60px]">
                  {getChangeIndicator(entry.change)}
                  <div className="text-xs text-muted-foreground mt-1">
                    {entry.badgesCount} badges
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current User Position (if not in top 10) */}
      {!leaderboard.slice(0, 10).some(entry => entry.isCurrentUser) && (
        <Card className="ring-2 ring-primary">
          <CardContent className="p-4">
            <div className="text-center text-sm text-muted-foreground mb-2">Your Position</div>
            {/* This would show the current user's position even if they're not in top 10 */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}