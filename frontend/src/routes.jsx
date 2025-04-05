import { Route, Routes } from "react-router-dom";
import SignupWizard from "./pages/SignupWizard";
import NotFoundPage from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/Jobs";
import ProfilePage from "./pages/UserProfile";
import TestDashboard from "./pages/TestDashboard";
import Feed from "./pages/Feed";
import CommunityPage from "./pages/Community";
import NetworkPage from "./pages/Network";
import SkillsPage from "./pages/Skills";
import NotificationPage from "./pages/Notifications";
import MyApplications from "@/pages/MyApplications";
import LearningPage from "./pages/Learning";
import RecommendedPage from "@/pages/Recommended";
import DetailPage from "@/pages/DetailPage";
import LandingPage from "@/pages/LandingPage";
import StartupPage from "@/pages/StartupPage";
import CandidatePool from "@/pages/CandidatePool";
import TeamCollaboration from "@/pages/TeamCollaboration";
import HiringAnalytics from "@/pages/HiringAnalytics";
import InvestorTracker from "@/pages/InvestorTracker";
import Settings from "@/pages/Setting";
import Report from "@/pages/Report";
import StartupListing from "@/pages/StartupListings";
const AppRoutes = () => {
  const role = "recruiter";
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<SignupWizard />} />
      <Route path="/signup" element={<SignupWizard />} />
      <Route path="/dashboard" element={<Dashboard userRole={role} />} />
      <Route path="/jobs" element={<JobsPage userRole={role} />} />
      <Route path="/profile" element={<ProfilePage userRole={role} />} />
      <Route path="/test" element={<TestDashboard />} />
      <Route path="/feed" element={<Feed userRole={role} />} />
      <Route path="/network" element={<NetworkPage userRole={role} />} />
      <Route
        path="/recommended"
        element={<RecommendedPage userRole={role} />}
      />
      <Route path="/startup" element={<StartupPage userRole={role} />} />
      <Route path="/community" element={<CommunityPage userRole={role} />} />
      <Route path="/assessments" element={<SkillsPage userRole={role} />} />
      <Route path="/jobs">
        <Route
          path="/jobs/recommended"
          element={<RecommendedPage userRole={"jobseeker"} />}
        />
        <Route path="/jobs/:jobId" element={<DetailPage userRole={role} />} />
      </Route>
      <Route
        path="/applications"
        element={<MyApplications userRole={role} />}
      />
      <Route
        path="/notifications"
        element={<NotificationPage userRole={role} />}
      />
      <Route path="/learning" element={<LearningPage userRole={role} />} />
      <Route path="/candidates" element={<CandidatePool userRole={role} />} />
      <Route path="/collaboration"element={<TeamCollaboration userRole={role} />}/>
      <Route path="/analytics" element={<HiringAnalytics userRole={role} />} />
      <Route path="/investor-tracker" element={<InvestorTracker userRole={role} />} />
      <Route path="/reports" element={<Report userRole={role} />} />
      <Route path="/settings" element={<Settings userRole={role} />} />
      <Route path="/startup-listings" element={<StartupListing userRole={role} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
