export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Experienced software engineer with a passion for clean code.",
    company: "TechCorp",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    isEmployer: true,
    following: ["2", "3"],
    followers: ["2", "4", "5"],
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    bio: "Product manager specializing in SaaS products.",
    company: "ProductFy",
    location: "New York, NY",
    website: "https://janesmith.io",
    isEmployer: true,
    following: ["1", "4"],
    followers: ["1", "3"],
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    bio: "UX/UI designer with 5+ years of experience.",
    company: "DesignHub",
    location: "Seattle, WA",
    isEmployer: false,
    following: ["1", "2"],
    followers: ["5"],
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    bio: "Data scientist passionate about AI and machine learning.",
    company: "DataMinds",
    location: "Austin, TX",
    isEmployer: true,
    following: ["5"],
    followers: ["2"],
    createdAt: new Date("2023-03-15"),
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    bio: "Full-stack developer specializing in React and Node.js.",
    location: "Chicago, IL",
    isEmployer: false,
    following: ["3"],
    followers: ["1", "4"],
    createdAt: new Date("2023-04-05"),
  },
];

export const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building high-quality user interfaces using React and TypeScript.",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    tags: ["React", "TypeScript", "Frontend", "Senior"],
    employerId: "1",
    createdAt: new Date("2023-05-10"),
    applicationDeadline: new Date("2023-06-10"),
    isRemote: true,
    jobType: "full-time",
  },
  {
    id: "2",
    title: "Product Manager",
    description:
      "Join our team as a Product Manager to lead the development of innovative SaaS products. You will work closely with engineering, design, and marketing teams.",
    company: "ProductFy",
    location: "New York, NY",
    salary: "$110k - $140k",
    tags: ["Product Management", "SaaS", "Leadership"],
    employerId: "2",
    createdAt: new Date("2023-05-15"),
    applicationDeadline: new Date("2023-06-15"),
    isRemote: false,
    jobType: "full-time",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    description:
      "We are seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. You should have experience with design tools and user research.",
    company: "DesignHub",
    location: "Seattle, WA",
    salary: "$90k - $120k",
    tags: ["UX", "UI", "Design", "Figma"],
    employerId: "3",
    createdAt: new Date("2023-05-20"),
    applicationDeadline: new Date("2023-06-20"),
    isRemote: true,
    jobType: "full-time",
  },
  {
    id: "4",
    title: "Data Scientist",
    description:
      "Join our data science team to build machine learning models and analyze large datasets. You should have experience with Python, SQL, and data visualization.",
    company: "DataMinds",
    location: "Austin, TX",
    salary: "$130k - $160k",
    tags: ["Python", "Machine Learning", "Data Science"],
    employerId: "4",
    createdAt: new Date("2023-05-25"),
    applicationDeadline: new Date("2023-06-25"),
    isRemote: false,
    jobType: "full-time",
  },
  {
    id: "5",
    title: "Backend Developer",
    description:
      "We are looking for a Backend Developer with experience in Node.js and SQL databases. You will be responsible for building and maintaining our APIs.",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$110k - $140k",
    tags: ["Node.js", "SQL", "Backend", "API"],
    employerId: "1",
    createdAt: new Date("2023-05-30"),
    applicationDeadline: new Date("2023-06-30"),
    isRemote: true,
    jobType: "full-time",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    description:
      "Join our team as a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You should have experience with AWS, Docker, and Kubernetes.",
    company: "CloudOps",
    location: "Remote",
    salary: "$120k - $150k",
    tags: ["DevOps", "AWS", "Docker", "Kubernetes"],
    employerId: "2",
    createdAt: new Date("2023-06-05"),
    applicationDeadline: new Date("2023-07-05"),
    isRemote: true,
    jobType: "full-time",
  },
  {
    id: "7",
    title: "Mobile Developer",
    description:
      "We are seeking a Mobile Developer with experience in React Native to build cross-platform mobile applications. You should have a strong understanding of JavaScript and mobile design patterns.",
    company: "MobileFirst",
    location: "Chicago, IL",
    salary: "$100k - $130k",
    tags: ["React Native", "Mobile", "JavaScript"],
    employerId: "3",
    createdAt: new Date("2023-06-10"),
    applicationDeadline: new Date("2023-07-10"),
    isRemote: false,
    jobType: "full-time",
  },
  {
    id: "8",
    title: "Technical Writer",
    description:
      "Join our team as a Technical Writer to create clear and comprehensive documentation for our products. You should have experience writing for technical audiences.",
    company: "DocuTech",
    location: "Portland, OR",
    salary: "$80k - $100k",
    tags: ["Technical Writing", "Documentation", "Content"],
    employerId: "4",
    createdAt: new Date("2023-06-15"),
    applicationDeadline: new Date("2023-07-15"),
    isRemote: true,
    jobType: "part-time",
  },
];

// Get user by ID
export const getUserById = (id) => {
  return mockUsers.find((user) => user.id === id);
};

// Get jobs by employer ID
export const getJobsByEmployerId = (employerId) => {
  return mockJobs.filter((job) => job.employerId === employerId);
};

// Get users a user is following
export const getFollowingUsers = (userId) => {
  const user = getUserById(userId);
  if (!user) return [];
  return mockUsers.filter((u) => user.following.includes(u.id));
};

// Get job by ID
export const getJobById = (id) => {
  return mockJobs.find((job) => job.id === id);
};

// Search jobs
export const searchJobs = (filters) => {
  return mockJobs.filter((job) => {
    // Search by query in title, description, company
    if (
      filters.query &&
      !job.title.toLowerCase().includes(filters.query.toLowerCase()) &&
      !job.description.toLowerCase().includes(filters.query.toLowerCase()) &&
      !job.company.toLowerCase().includes(filters.query.toLowerCase())
    ) {
      return false;
    }

    // Filter by location
    if (
      filters.location &&
      !job.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Filter by tags
    if (
      filters.tags &&
      filters.tags.length > 0 &&
      !filters.tags.some((tag) => job.tags.includes(tag))
    ) {
      return false;
    }

    // Filter by remote status
    if (filters.isRemote !== undefined && job.isRemote !== filters.isRemote) {
      return false;
    }

    // Filter by job type
    if (filters.jobType && job.jobType !== filters.jobType) {
      return false;
    }

    return true;
  });
};

// Current logged-in user (for demo purposes)
export const currentUser = mockUsers[0];
