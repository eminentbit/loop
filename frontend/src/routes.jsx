import { Route, Routes } from "react-router-dom";
import SignupWizard from "./pages/SignupWizard";
import NotFoundPage from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/Jobs";
import ProfilePage from "./pages/UserProfile";
import TestDashboard from "./pages/TestDashboard";
import Feed from "./pages/Feed";
import CommunityPage from "./pages/Community";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupWizard />} />
      <Route path="/dashboard" element={<Dashboard userRole={"jobSeeker"} />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/test" element={<TestDashboard />} />
      <Route path="/feed" element={<Feed />} />
      <Route
        path="/community"
        element={<CommunityPage userRole={"jobseeker"} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
