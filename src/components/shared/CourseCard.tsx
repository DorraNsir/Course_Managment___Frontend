import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/lib/mockData";

interface CourseCardProps {
  course: Course;
  actionLabel?: string;
  onAction?: () => void;
  showTeacher?: boolean;
}

export const CourseCard = ({
  course,
  actionLabel = "Voir",
  onAction,
  showTeacher = true,
}: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
            </div>
            <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
            {course.description}
          </p>
          <div className="space-y-2 text-sm">
            {showTeacher && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{course.teacherName}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
             <span>{course?.deadline?.split("T")[0] ?? "Pas de date limite"}</span>

            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>
                {course.hasSubmission
                  ? "Avec remise de travail"
                  : "Sans remise de travail"}
              </span>
            </div>
          </div>
        </CardContent>
        {onAction && (
          <CardFooter>
            <Button onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
