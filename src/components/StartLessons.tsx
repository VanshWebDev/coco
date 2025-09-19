import { studyData } from "../data/studyData";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function StudyPage() {
  const category = useSelector((state: RootState) => state.counter.value);

  // Filter topics based on selected category
  const filteredTopics = category
    ? studyData.filter((topic) => topic.category === category)
    : studyData;

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        🌍 Study Environmental Topics
        {category && ` - ${category}`}
      </h1>

      {filteredTopics.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No topics found for <span className="font-semibold">{category}</span>.
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredTopics.map((topic) => (
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
                  <span className="inline-block mt-3 text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {topic.category}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
