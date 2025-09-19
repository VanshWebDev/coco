import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BookOpen, CheckCircle, Clock, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  completed: boolean;
  points: number;
  image: string;
  category: string;
}

interface LessonsProps {
  lessons: Lesson[];
  onStartLesson: (lessonId: string) => void;
}

export function Lessons({ lessons, onStartLesson }: LessonsProps) {
  const categories = [...new Set(lessons.map((lesson) => lesson.category))];
  const navigate = useNavigate();

  const startLsn = (name:string) => {
    navigate("lesson");
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1>Environmental Lessons</h1>
        <Badge variant="outline">
          {lessons.filter((l) => l.completed).length}/{lessons.length} Complete
        </Badge>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-lg">{category}</h2>
          <div className="space-y-4">
            {lessons
              .filter((lesson) => lesson.category === category)
              .map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={lesson.image}
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base leading-tight">
                            {lesson.title}
                          </CardTitle>
                          {lesson.completed && (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {lesson.description}
                        </p>

                        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {lesson.points} points
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                        </div>

                        {lesson.progress > 0 && !lesson.completed && (
                          <div className="mb-3">
                            <Progress value={lesson.progress} className="h-1" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {lesson.progress}% complete
                            </p>
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant={lesson.completed ? "outline" : "default"}
                          onClick={() => startLsn(lesson.category)}
                          className="w-full"
                        >
                          {lesson.completed ? (
                            "Review"
                          ) : lesson.progress > 0 ? (
                            "Continue"
                          ) : (
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              Start Lessonn
                            </div>
                          )}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
