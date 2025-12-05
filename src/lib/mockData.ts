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
  subject: string;
  teacher: string;
  groupId: string;
  hasSubmission: boolean;
  fileUrl?: string;
  createdAt: string;
}



export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction aux Bases de Données",
    description: "Concepts fondamentaux des systèmes de gestion de bases de données relationnelles, SQL et normalisation.",
    subject: "Informatique",
    teacher: "Dr. Martin Dubois",
    groupId: "1",
    hasSubmission: true,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Algorithmique Avancée",
    description: "Étude des algorithmes de tri, recherche, graphes et complexité algorithmique.",
    subject: "Informatique",
    teacher: "Dr. Martin Dubois",
    groupId: "1",
    hasSubmission: true,
    createdAt: "2025-01-20",
  },
  {
    id: "3",
    title: "Mathématiques Discrètes",
    description: "Logique, ensembles, relations, graphes et théorie des nombres.",
    subject: "Mathématiques",
    teacher: "Prof. Sophie Laurent",
    groupId: "1",
    hasSubmission: false,
    createdAt: "2025-01-18",
  },
  {
    id: "4",
    title: "Réseaux TCP/IP",
    description: "Architecture des réseaux, protocoles TCP/IP, routage et adressage.",
    subject: "Réseaux",
    teacher: "Dr. Martin Dubois",
    groupId: "2",
    hasSubmission: true,
    createdAt: "2025-01-22",
  },
  {
    id: "5",
    title: "Sécurité des Réseaux",
    description: "Cryptographie, pare-feu, VPN et détection d'intrusions.",
    subject: "Réseaux",
    teacher: "Dr. Martin Dubois",
    groupId: "2",
    hasSubmission: true,
    createdAt: "2025-01-25",
  },
  {
    id: "6",
    title: "Programmation Orientée Objet",
    description: "Concepts POO avec Java : classes, héritage, polymorphisme et interfaces.",
    subject: "Informatique",
    teacher: "Prof. Claire Martin",
    groupId: "3",
    hasSubmission: true,
    createdAt: "2025-01-19",
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

export const mockUsers: User[] = [
  {
    id: "t1",
    name: "Prof. Ahmed Benali",
    email: "ahmed.benali@itbs.edu",
    role: "teacher",
    groupIds: ["7", "2"],
  },
  {
    id: "t2",
    name: "Prof. Fatima Zahra",
    email: "fatima.zahra@itbs.edu",
    role: "teacher",
    groupIds: ["7"],
  },
  {
    id: "s1",
    name: "Youssef Alami",
    email: "youssef.alami@student.itbs.edu",
    role: "student",
    groupIds: ["1"],
  },
  {
    id: "s2",
    name: "Salma Bennis",
    email: "salma.bennis@student.itbs.edu",
    role: "student",
    groupIds: ["1"],
  },
  {
    id: "s3",
    name: "Mehdi Tazi",
    email: "mehdi.tazi@student.itbs.edu",
    role: "student",
    groupIds: ["2"],
  },
  {
    id: "s4",
    name: "Amina El Fassi",
    email: "amina.elfassi@student.itbs.edu",
    role: "student",
    groupIds: ["2"],
  },
  {
    id: "s5",
    name: "Omar Idrissi",
    email: "omar.idrissi@student.itbs.edu",
    role: "student",
    groupIds: ["3"],
  },
];
