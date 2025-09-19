import { studyData } from "../data/studyData";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        🌍 Study Environmental Topics
      </h1>

      <div className="grid gap-6">
        {studyData.map((topic) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="overflow-hidden shadow-lg rounded-2xl">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-1">{topic.title}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {topic.description}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {topic.description}
                </p>
                <span className="inline-block mt-3 text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {topic.category}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
