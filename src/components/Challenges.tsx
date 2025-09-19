import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CheckCircle, Clock, MapPin, Users, Camera, Leaf } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group' | 'school';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  points: number;
  completed: boolean;
  inProgress: boolean;
  image: string;
  requirements: string[];
  location?: string;
}

interface ChallengesProps {
  challenges: Challenge[];
  onStartChallenge: (challengeId: string) => void;
  onSubmitProof: (challengeId: string) => void;
}

export function Challenges({ challenges, onStartChallenge, onSubmitProof }: ChallengesProps) {
  const activechallenges = challenges.filter(c => c.inProgress);
  const availableChallenges = challenges.filter(c => !c.inProgress && !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return <Users className="w-4 h-4" />;
      case 'group':
        return <Users className="w-4 h-4" />;
      case 'school':
        return <Users className="w-4 h-4" />;
      default:
        return <Leaf className="w-4 h-4" />;
    }
  };

  const ChallengeCard = ({ challenge, actionButton }: { challenge: Challenge; actionButton: React.ReactNode }) => (
    <Card key={challenge.id} className="overflow-hidden">
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0">
          <ImageWithFallback
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base leading-tight">
                {challenge.title}
              </CardTitle>
              {challenge.completed && (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {challenge.description}
            </p>
            
            <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {challenge.duration}
              </div>
              <div className="flex items-center gap-1">
                {getChallengeIcon(challenge.type)}
                {challenge.type}
              </div>
              {challenge.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {challenge.location}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {challenge.points} points
              </Badge>
            </div>

            {challenge.requirements.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium mb-1">Requirements:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {challenge.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {actionButton}
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1>Eco Challenges</h1>
        <Badge variant="outline">
          {completedChallenges.length}/{challenges.length} Complete
        </Badge>
      </div>

      {activechallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg">Active Challenges</h2>
          {activechallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              actionButton={
                <Button
                  size="sm"
                  onClick={() => onSubmitProof(challenge.id)}
                  className="w-full"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Submit Proof
                </Button>
              }
            />
          ))}
        </div>
      )}

      {availableChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg">Available Challenges</h2>
          {availableChallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              actionButton={
                <Button
                  size="sm"
                  onClick={() => onStartChallenge(challenge.id)}
                  className="w-full"
                >
                  Start Challenge
                </Button>
              }
            />
          ))}
        </div>
      )}

      {completedChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg">Completed Challenges</h2>
          {completedChallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              actionButton={
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  Completed
                </Button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}