import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignupWizard from "./pages/SignupWizard";
import NotFoundPage from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/UserProfile";
import TestDashboard from "./pages/TestDashboard";
import Feed from "./pages/Feed";
import CommunityPage from "./pages/Community";
import NetworkPage from "src/pages/Network";
import SkillsPage from "@/pages/Skills";
import NotificationPage from "@/pages/Notifications";
import MyApplications from "@/pages/MyApplications";
import LearningPage from "@/pages/Learning";
import RecommendedPage from "@/pages/Recommended";
import DetailPage from "@/pages/DetailPage";
import StartupPage from "@/pages/StartupPage";
import CandidatePool from "@/pages/CandidatePool";
import TeamCollaboration from "@/pages/TeamCollaboration";
import HiringAnalytics from "@/pages/HiringAnalytics";
import InvestorTracker from "@/pages/InvestorTracker";
import Settings from "@/pages/Setting";
import Report from "@/pages/Report";
import StartupListing from "@/pages/StartupListings";
import ForgotPassword from "@/pages/ForgetPassword";
import ProtectiveWrapper from "./components/ProtectiveWrapper";
import SignInModal from "@/components/SignInModal";
import JobHomePage from "./pages/job.pages/JobHomePage";
import About from "@/pages/About";
import ContactPage from "@/pages/Contact";
import StartupDetail from "@/pages/StartupDetail";
import LandingPage from "@/pages/LandingPage";
import SkillTest from "@/pages/SkillTest";
import Candidates from "./pages/Candidates";
import ContactCandidate from "@/pages/ContactCandidate";
import ViewReport from "@/pages/ViewReport";
import PostJobPage from "./pages/job.pages/PostJobPage";
import JobDetailsPage from "./pages/job.pages/JobDetailsPage";
import CompanyDetailPage from "./pages/CompanyDetails";
import Certificate from "@/pages/Certificates";
import JobFeed from "./components/job.feed.compnent/job.feed";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmailPage from "@/pages/CheckEmailPage";
import ApplyJobsPage from "@/pages/job.pages/ApplyJobsPage";
import ConnectionsPage from "@/pages/Connections";
import PublicProfile from "@/pages/PublicProfile";
import LoadingScreen from "./pages/LoadingScreen";
import MyJobs from "./pages/MyJobs";
import Applicants from "./pages/Applicants";

const AppRoutes = () => {
  const [role, setRole] = useState();
  const checkRole = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/check-auth/`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setRole(data.user.role);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Session check failed", error);
    }
  };

  useEffect(() => {
    // Check if user data exists in sessionStorage
    const storedUser = sessionStorage.getItem("user");

    if (storedUser != "undefined") {
      // If user data exists, set it from sessionStorage
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser?.role);
    } else {
      // If user data doesn't exist, fetch from the API
      checkRole();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInModal checkRole={checkRole} />} />
      <Route path="/signup" element={<SignupWizard />} />
      <Route
        path="/dashboard"
        element={
          <ProtectiveWrapper>
            <Dashboard userRole={role} />
          </ProtectiveWrapper>
        }
      />
      {/* Job Routes */}
      <Route path="/jobs" element={<JobHomePage />} />
      <Route
        path="/post-job"
        element={
          <ProtectiveWrapper>
            <PostJobPage />
          </ProtectiveWrapper>
        }
      />
      <Route path="/job/:jobId" element={<JobDetailsPage />} />
      <Route
        path="/job/:jobId/applicants"
        element={
          <ProtectiveWrapper>
            <Applicants />
          </ProtectiveWrapper>
        }
      />
      <Route path="/jobs/my-jobs" element={<MyJobs />} />

      {/* feed */}
      <Route path="/job-feeds" element={<JobFeed />} />

      <Route path="/check-email" element={<CheckEmailPage />} />

      <Route
        path="/profile"
        element={
          <ProtectiveWrapper>
            <ProfilePage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/test"
        element={
          <ProtectiveWrapper>
            <TestDashboard />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/feed"
        element={
          <ProtectiveWrapper>
            <Feed userRole={role} />
          </ProtectiveWrapper>
        }
      />

      <Route
        path="/details"
        element={
          <ProtectiveWrapper>
            <DetailPage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/recommended"
        element={
          <ProtectiveWrapper>
            <RecommendedPage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/startup"
        element={
          <ProtectiveWrapper>
            <StartupPage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectiveWrapper>
            <CommunityPage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/assessments"
        element={
          <ProtectiveWrapper>
            <SkillsPage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route path="/jobs">
        <Route index element={<JobHomePage />} />
        <Route path="recommended" element={<RecommendedPage />} />
        <Route path=":jobId" element={<DetailPage />} />
      </Route>
      <Route
        path="/applications"
        element={
          <ProtectiveWrapper>
            <MyApplications userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectiveWrapper>
            <NotificationPage userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/learning"
        element={
          <ProtectiveWrapper>
            <LearningPage userRole={role} />
          </ProtectiveWrapper>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectiveWrapper>
            <CandidatePool userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/collaboration"
        element={
          <ProtectiveWrapper>
            <TeamCollaboration userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectiveWrapper>
            <HiringAnalytics userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/investor-tracker"
        element={
          <ProtectiveWrapper>
            <InvestorTracker userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectiveWrapper>
            <Report userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectiveWrapper>
            <Settings userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/startup-listings"
        element={
          <ProtectiveWrapper>
            <StartupListing userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/startup-detial/:id"
        element={
          <ProtectiveWrapper>
            <StartupDetail userRole={role} />
          </ProtectiveWrapper>
        }
      />
      <Route path="/candidates/:id" element={<Candidates userRole={role} />} />

      <Route path="/verify-email" element={<VerifyEmail />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/skill-test" element={<SkillTest />} />
      <Route path="/skill-test/:id" element={<SkillTest />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route
        path="/candidates/:id/contact"
        element={<ContactCandidate userRole={role} />}
      />
      <Route path="/reports/:id" element={<ViewReport userRole={role} />} />
      <Route
        path="/network"
        element={
          <ProtectiveWrapper>
            <NetworkPage />
          </ProtectiveWrapper>
        }
      />
      <Route path="/network/:id" element={<NetworkPage />} />
      <Route path="/view-report" element={<ViewReport />} />
      <Route path="/network/company/:id" element={<CompanyDetailPage />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route
        path="/apply/:jobId"
        element={
          <ProtectiveWrapper>
            <ApplyJobsPage />
          </ProtectiveWrapper>
        }
      />
      <Route
        path="/connections"
        element={
          <ProtectiveWrapper>
            <ConnectionsPage />
          </ProtectiveWrapper>
        }
      />
      <Route path="/connections/:id" element={<ConnectionsPage />} />
      <Route path="/public-profile/:id" element={<PublicProfile />} />
      <Route path="/loading" element={<LoadingScreen />} />
    </Routes>
  );
};

export default AppRoutes;
