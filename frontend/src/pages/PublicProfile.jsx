import PublicProfile from "src/components/PublicProfile";
import Navbar from "src/components/job.page.component/ui/Navbar";

export default function App() {
    return (
        <>
            <Navbar />
            <PublicProfile profile={sampleProfile} />
        </>
    );
}

const sampleProfile = {
  name: "Alice Doe",
  title: "Founder at Nexcellus | Career & Educational Coach | HR Content Creator",
  location: "Niamey, Niger",
  email: "madougou.hassane@example.com",
  photoUrl: "https://via.placeholder.com/150",
  about:
    "I empower French-speaking professionals to accelerate their career journeys. With over 8 years of hands-on experience in coaching and training, I help mid-career managers and recent graduates to craft a winning job search strategy (CV, LinkedIn, interviews), design a tailored career development roadmap, and strengthen professional posture and soft skills.",
  services: [
    "Job Search Strategy: High-impact CV & LinkedIn optimization, mock interviews",
    "Career Development Planning: Competency assessments & action plans",
    "Workshops & Trainings: In-person/e-learning on soft skills",
    "Personal Branding & Storytelling: Unique value proposition & visibility",
  ],
  skills: [
    "Career Coaching",
    "Interview Design",
    "Competency Mapping",
    "Personal Branding",
    "Workshop Facilitation",
  ],
  featured: [
    "Webinar “Mastering Virtual Interviews” – Replay & Toolkit",
    "Guest Article: “Top 5 LinkedIn Mistakes to Avoid”",
    "Podcast: “From Paper CV to Digital Profile”",
  ],
  activity: [
    "Post: “10 Practical Tips to Showcase Your Skillset” (150 🔄, 600 👍)",
    "Shared: Infographic on in-demand soft skills for 2025",
    "Commented: Insights on “Reinventing Your Career After 40”",
  ],
  experience: [
    {
      role: "Founder & Career Coach",
      company: "Nexcellus",
      location: "Niamey, Niger",
      dates: "Jan 2018 – Present",
      bullets: [
        "Designed end-to-end training programs on job search & career development.",
        "Coached 1,200+ clients to achieve tangible milestones.",
        "Partnered with universities & NGOs for employability workshops.",
      ],
    },
    {
      role: "Learning & Development Consultant",
      company: "X Consulting Agency",
      location: "Niamey, Niger",
      dates: "Sep 2015 – Dec 2017",
      bullets: [
        "Developed competency frameworks & e-learning content.",
        "Trained trainers and implemented evaluation systems.",
      ],
    },
  ],
  education: [
    { degree: "Master’s in Instructional Design", school: "University of Niamey", year: "2015" },
    { degree: "Bachelor’s in Education Sciences", school: "Abdou Moumouni University", year: "2013" },
  ],
  projects: [
    { title: "JobPro360 e-Coaching Platform", description: "Interactive digital learning path with videos, quizzes & live sessions." },
    { title: "“CV & LinkedIn Bootcamp” Series", description: "10 hands-on workshops for 300 ICT University students." },
    { title: "“Leadership for Women” Coaching", description: "Empowerment program for 50 young professionals." },
  ],
};

