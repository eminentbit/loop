export const jobsData = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      description:
        "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React and related technologies.",
      jobType: "Full-time",
      location: "Remote",
      salary: "$120K-$150K",
      skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "TechCorp Inc.",
      },
      postedAt: "2023-04-25T10:30:00Z",
      likes: 24,
      comments: [
        {
          id: "c1",
          author: {
            name: "Mike Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Is this position open to candidates outside the US?",
          postedAt: "2023-04-25T14:22:00Z",
          replies: [
            {
              id: "r1",
              author: {
                name: "Sarah Johnson",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content:
                "Yes, we're open to candidates worldwide as long as they can overlap with EST business hours for at least 4 hours.",
              postedAt: "2023-04-25T15:10:00Z",
            },
            {
              id: "r2",
              author: {
                name: "Alex Chen",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content: "That's great to hear! Do you offer visa sponsorship for those who want to relocate?",
              postedAt: "2023-04-25T16:05:00Z",
            },
          ],
        },
        {
          id: "c2",
          author: {
            name: "Jessica Lee",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "What's the tech stack for this position? Are you using any specific frameworks?",
          postedAt: "2023-04-26T09:15:00Z",
          replies: [],
        },
      ],
    },
    {
      id: "2",
      title: "UX/UI Designer",
      description:
        "Join our design team to create beautiful, intuitive interfaces for our products. You'll work closely with product managers and developers to bring designs from concept to implementation.",
      jobType: "Full-time",
      location: "New York, NY",
      salary: "$90K-$120K",
      skills: ["Figma", "Adobe XD", "UI Design", "Prototyping", "User Research"],
      author: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "DesignHub",
      },
      postedAt: "2023-04-24T09:15:00Z",
      likes: 18,
      comments: [
        {
          id: "c3",
          author: {
            name: "Jessica Lee",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Is there a portfolio requirement for this position?",
          postedAt: "2023-04-24T11:45:00Z",
          replies: [
            {
              id: "r3",
              author: {
                name: "Alex Chen",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content:
                "Yes, we require a portfolio showcasing at least 3-5 projects. We're particularly interested in seeing your process and problem-solving approach.",
              postedAt: "2023-04-24T13:20:00Z",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Backend Developer (Node.js)",
      description:
        "We're seeking an experienced Backend Developer with strong Node.js skills to help build and maintain our API services and server infrastructure.",
      jobType: "Contract",
      location: "Remote",
      salary: "$70-$90/hour",
      skills: ["Node.js", "Express", "MongoDB", "AWS", "Docker"],
      author: {
        name: "David Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        company: "ServerStack",
      },
      postedAt: "2023-04-23T16:45:00Z",
      likes: 12,
      comments: [],
    },
  ]
  