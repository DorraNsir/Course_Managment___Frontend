import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Group } from "@/lib/mockData";
import { useUsers } from "@/hooks/users/useUsers";
import { useCoursesByTeacherAndGroup } from "@/hooks/courses/useGetCoursesByTeacherId";

interface GroupCardProps {
  group: Group;
  onViewCourses: () => void;
}

export const GroupCard = ({ group, onViewCourses }: GroupCardProps) => {
  const userId =localStorage.getItem("userId")
  const{data:users}=useUsers();
  const {data:courses}=useCoursesByTeacherAndGroup(Number(userId),group.groupId)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <h3 className="font-semibold text-lg">{group.groupName}_{group.description}</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm">{users?.filter(u => u.groupId === group.groupId).length} étudiants</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">{courses?.length } cours</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onViewCourses} className="w-full">
            Voir les cours
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
