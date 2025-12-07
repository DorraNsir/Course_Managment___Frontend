export interface Group {
  groupId: string;
  groupName: string;
  description:string;
  studentCount: number;
  courseCount: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  matiereName: string;
  teacherName: string;
  groupId: string;
  hasSubmission: boolean;
  fileUrl?: string;
  deadline: string;
}



export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction aux Bases de Données",
    description: "Concepts fondamentaux des systèmes de gestion de bases de données relationnelles, SQL et normalisation.",
    matiereName: "Informatique",
    teacherName: "Dr. Martin Dubois",
    groupId: "1",
    hasSubmission: true,
    deadline: "2025-01-15",
  },
];

export const subjects = [
  "Informatique",
  "Mathématiques",
  "Réseaux",
  "Systèmes",
  "Programmation",
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "student";
  groupIds: string[];
}


