import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import GroupCourses from "./pages/teacher/GroupCourses";
import AddCourse from "./pages/teacher/AddCourse";
import StudentDashboard from "./pages/student/StudentDashboard";
import CourseDetail from "./pages/student/CourseDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import GroupManagement from "./pages/admin/GroupManagement";
import GroupDetails from "./pages/admin/GroupDetails";
import AssignGroups from "./pages/admin/AssignGroups";
import NotFound from "./pages/NotFound";
import MatiereManagement from "./pages/admin/MatiereManagment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/group/:id" element={<GroupCourses />} />
        <Route path="/teacher/add-course" element={<AddCourse />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/course/:id" element={<CourseDetail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/groups" element={<GroupManagement />} />
        <Route path="/admin/groups/:id" element={<GroupDetails />} />
        <Route path="/admin/matieres" element={<MatiereManagement />} />
        <Route path="/admin/assign" element={<AssignGroups />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
