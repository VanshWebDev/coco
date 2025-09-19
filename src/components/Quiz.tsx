import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface QuizProps {
  quiz: Quiz;
  onQuizComplete: (score: number, totalPoints: number) => void;
}

export function Quiz({ quiz, onQuizComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      calculateScore();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
        earnedPoints += question.points;
      }
    });

    onQuizComplete(earnedPoints, totalPoints);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const getScoreData = () => {
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
        earnedPoints += question.points;
      }
    });

    return { correctAnswers, totalPoints, earnedPoints };
  };

  if (!quizStarted) {
    return (
      <div className="space-y-6 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <Badge variant="secondary" className="w-fit">
              {quiz.difficulty}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{quiz.description}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Questions:</span>
                <span>{quiz.questions.length}</span>
              </div>
              {quiz.timeLimit && (
                <div className="flex justify-between text-sm">
                  <span>Time Limit:</span>
                  <span>{quiz.timeLimit} minutes</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Total Points:</span>
                <span>{quiz.questions.reduce((sum, q) => sum + q.points, 0)}</span>
              </div>
            </div>

            <Button onClick={() => setQuizStarted(true)} className="w-full">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const { correctAnswers, totalPoints, earnedPoints } = getScoreData();
    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);

    return (
      <div className="space-y-6 pb-20">
        <Card>
          <CardHeader className="text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <CardTitle>Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-6">
              <div className="text-3xl font-bold text-green-600">
                {percentage}%
              </div>
              <p className="text-muted-foreground">
                You got {correctAnswers} out of {quiz.questions.length} questions correct
              </p>
              <div className="text-xl">
                <span className="text-green-600">{earnedPoints}</span>
                <span className="text-muted-foreground">/{totalPoints} points earned</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={resetQuiz} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button onClick={() => {}} className="w-full">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <div className="space-y-4">
          <h2>Review Answers</h2>
          {quiz.questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={question.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-muted-foreground">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {question.explanation}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{currentQuestion.points} points</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="w-6 h-6 rounded-full border flex items-center justify-center mr-3 flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
              </Button>
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
            className="w-full mt-6"
          >
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}