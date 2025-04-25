import Navbar from "../components/landing-page-components/Navbar";
import Hero from "../components/landing-page-components/Hero";
import Stats from "../components/landing-page-components/Stats";
import HowItWorks from "../components/landing-page-components/HowItWorks";
import Features from "../components/landing-page-components/Features";
import FeaturedJobs from "../components/landing-page-components/FeaturedJobs";
import Testimonials from "../components/landing-page-components/Testimonial";
// import MobileApp from "../components/landing-page-components/MobileApp";
import Newsletter from "../components/landing-page-components/NewsLetter";
import CTA from "../components/landing-page-components/CTA";
import Footer from "../components/landing-page-components/Footer";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <FeaturedJobs />
        <Testimonials />
        {/* <MobileApp />  This component can be uncommented when the mobile app for looop is avalble */}
        <Newsletter />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
