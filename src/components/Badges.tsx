import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Lock, CheckCircle, Star, Leaf, Recycle, TreePine, Droplets, Sun } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  category: string;
  earnedDate?: string;
  points: number;
}

interface BadgesProps {
  badges: BadgeItem[];
}

export function Badges({ badges }: BadgesProps) {
  const categories = [...new Set(badges.map(badge => badge.category))];
  const earnedBadges = badges.filter(b => b.earned);
  const totalBadges = badges.length;

  const getBadgeIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'leaf': <Leaf className="w-6 h-6" />,
      'recycle': <Recycle className="w-6 h-6" />,
      'tree': <TreePine className="w-6 h-6" />,
      'water': <Droplets className="w-6 h-6" />,
      'energy': <Sun className="w-6 h-6" />,
      'star': <Star className="w-6 h-6" />,
    };
    return iconMap[iconName] || <Star className="w-6 h-6" />;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Rare':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Epic':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Legendary':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1>Achievements</h1>
        <Badge variant="outline">
          {earnedBadges.length}/{totalBadges} Earned
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Badges Collected</span>
              <span>{earnedBadges.length}/{totalBadges}</span>
            </div>
            <Progress value={(earnedBadges.length / totalBadges) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Total Points from Badges</span>
              <span>{earnedBadges.reduce((sum, badge) => sum + badge.points, 0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges by Category */}
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h2 className="text-lg">{category}</h2>
          <div className="grid grid-cols-2 gap-4">
            {badges
              .filter(badge => badge.category === category)
              .map(badge => (
                <Card 
                  key={badge.id} 
                  className={`relative overflow-hidden ${
                    badge.earned 
                      ? 'ring-2 ring-green-200 bg-green-50/50' 
                      : 'opacity-75 grayscale'
                  }`}
                >
                  <CardContent className="p-4">
                    {/* Badge Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      badge.earned 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {badge.earned ? (
                        getBadgeIcon(badge.icon)
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>

                    {/* Badge Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm leading-tight">{badge.name}</h3>
                        {badge.earned && (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 ml-1" />
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {badge.description}
                      </p>

                      {/* Rarity and Points */}
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRarityColor(badge.rarity)}`}
                        >
                          {badge.rarity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {badge.points} pts
                        </span>
                      </div>

                      {/* Progress Bar for Incomplete Badges */}
                      {!badge.earned && badge.progress !== undefined && badge.maxProgress && (
                        <div className="space-y-1">
                          <Progress 
                            value={(badge.progress / badge.maxProgress) * 100} 
                            className="h-1" 
                          />
                          <p className="text-xs text-muted-foreground">
                            {badge.progress}/{badge.maxProgress}
                          </p>
                        </div>
                      )}

                      {/* Earned Date */}
                      {badge.earned && badge.earnedDate && (
                        <p className="text-xs text-green-600">
                          Earned {badge.earnedDate}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}