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
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleRoute from "./components/auth/RoleRoute";
import UpdateCourse from "./pages/teacher/UpdateCourse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher/dashboard" element={<ProtectedRoute> <RoleRoute allowedRoles={["teacher"]}> <TeacherDashboard /> </RoleRoute></ProtectedRoute>} />
        <Route path="/teacher/group/:id" element={<ProtectedRoute> <RoleRoute allowedRoles={["teacher"]}> <GroupCourses /> </RoleRoute></ProtectedRoute>} />
        <Route path="/teacher/add-course/:id" element={<ProtectedRoute> <RoleRoute allowedRoles={["teacher"]}> <AddCourse /> </RoleRoute></ProtectedRoute>} />
        <Route path="/teacher/update-course/:id" element={<ProtectedRoute> <RoleRoute allowedRoles={["teacher"]}> <UpdateCourse /> </RoleRoute></ProtectedRoute>} />
        <Route path="/student/dashboard" element={<ProtectedRoute> <RoleRoute allowedRoles={["student"]}>  <StudentDashboard /> </RoleRoute></ProtectedRoute>} />
        <Route path="/student/course/:id" element={<ProtectedRoute> <RoleRoute allowedRoles={["student"]}> <CourseDetail /> </RoleRoute></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute> <RoleRoute allowedRoles={["admin"]}>  <AdminDashboard /> </RoleRoute></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute> <RoleRoute allowedRoles={["admin"]}> <UserManagement /> </RoleRoute></ProtectedRoute>} />
        <Route path="/admin/groups" element={<ProtectedRoute> <RoleRoute allowedRoles={["admin"]}>  <GroupManagement /> </RoleRoute></ProtectedRoute>} />
        <Route path="/admin/groups/:id" element={<ProtectedRoute> <RoleRoute allowedRoles={["admin"]}>  <GroupDetails /> </RoleRoute></ProtectedRoute>} />
        <Route path="/admin/matieres" element={<ProtectedRoute> <RoleRoute allowedRoles={["admin"]}> <MatiereManagement /> </RoleRoute></ProtectedRoute>} />
        <Route path="/admin/assign" element={<ProtectedRoute> <RoleRoute allowedRoles={["admin"]}> <AssignGroups /> </RoleRoute></ProtectedRoute>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
