import { useState, useEffect, useRef, useCallback } from "react";
import profilePhoto from "./sohan.jpg";
import resumePdf from "./assets/Chepuri_Sohan_Resume.pdf";
import ciscoPythonCert from "./assets/certs/cisco-python.png";
import infosysJavaCert from "./assets/certs/infosys-java.png";
import udemyDsaCert from "./assets/certs/udemy-dsa-python.png";
import ciscoEnglishCert from "./assets/certs/cisco-english.png";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const ME = {
  name: "Chepuri Sohan",
  firstName: "Sohan",
  lastName: "Chepuri",
  initials: "CS",
  degree: "B.Tech Information Technology",
  year: "3rd Year · Class of 2028",
  college: "Vidya Jyothi Institute of Technology (VJIT), Hyderabad",
  cgpa: "8.38",
  location: "Hyderabad, India",
  email: "sohansaichepuri@gmail.com",
  phone: "+91 63047 80113",
  github: "https://github.com/CHEPURISOHANSAI",
  linkedin: "https://www.linkedin.com/in/chepuri-sohan-1a1865381",
  bio: "Enthusiastic third-year B.Tech Information Technology student with strong programming, database, and web development skills. Seeking a software development or IT internship to apply technical knowledge, contribute to real-world projects, and gain industry experience.",
  tagline: "B.Tech IT Student · Web & IoT Systems Developer",
  resumeUrl: resumePdf,
  avatar: profilePhoto,
};

const SKILLS = [
  { name: "C",                   level: 88, cat: "Core"     },
  { name: "Python",              level: 86, cat: "Language" },
  { name: "Java",                level: 82, cat: "Core"     },
  { name: "HTML & CSS",          level: 92, cat: "Frontend" },
  { name: "SQL & DBMS",          level: 85, cat: "Database" },
];

const TECH = ["C","Python","Java","HTML","CSS","SQL","DBMS","ESP32","Arduino IDE","Operating Systems","Computer Networks","Bluetooth / IoT"];

const PROJECTS = [
  {
    title: "Intelligent Car with Accident Alert",
    year: "2024",
    desc: "ESP32-based smart vehicle with automated accident detection and obstacle avoidance. Integrates ultrasonic sensors, Bluetooth communication, and motor control programmed via Arduino IDE.",
    tags: ["ESP32","Arduino IDE","C","Bluetooth","Ultrasonic Sensor"],
    img: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=700&h=420&fit=crop&auto=format",
    live: "#", github: "https://github.com/CHEPURISOHANSAI",
  },
  {
    title: "Hotel Reservation System",
    year: "2024",
    desc: "Responsive hotel reservation website developed with clean HTML and CSS. Features dedicated user and admin login interfaces, an intuitive booking workflow, and live location detection to discover nearby rooms.",
    tags: ["HTML","CSS","JavaScript","Responsive Design","UI/UX"],
    img: "https://images.unsplash.com/photo-1568741046857-fc1d0486e285?w=700&h=420&fit=crop&auto=format",
    live: "#", github: "https://github.com/CHEPURISOHANSAI",
  },
];

const ACHIEVEMENTS = [
  { icon: "🚗", title: "ESP32 Intelligent Car Innovation",   sub: "Accident Alert & Driver Assistance IoT System",                  tag: "Hardware / IoT" },
  { icon: "🏨", title: "Hotel Reservation System",            sub: "Full responsive multi-tier booking platform",                    tag: "Web Dev"       },
  { icon: "🐍", title: "Cisco Python Essentials 1",          sub: "Cisco Networking Academy certified at VJIT",                     tag: "Certification" },
  { icon: "☕", title: "Infosys Springboard Java",            sub: "Object-Oriented Programming & Java foundations",                 tag: "Certification" },
  { icon: "⚡", title: "Udemy DSA Python (20 Hours)",         sub: "Comprehensive Data Structures & Algorithms Bootcamp",            tag: "Certification" },
  { icon: "🌐", title: "Cisco English for IT 1",              sub: "Professional technical IT communication certification",          tag: "Certification" },
  { icon: "⭐", title: "9.5 GPA in SSC & 92.1% Intermediate", sub: "Exceptional academic performance throughout schooling",         tag: "Academic"      },
];

const CERTS = [
  {
    name: "Python Essentials 1",
    issuer: "Cisco Networking Academy · VJIT",
    instructor: "P SWETHA",
    year: "Apr 2025",
    color: "#0ea5e9",
    emoji: "🐍",
    img: ciscoPythonCert,
    skills: "Python Programming, Algorithmic Thinking, Data Types, Control Structures, Functions",
  },
  {
    name: "Programming using Java",
    issuer: "Infosys Springboard",
    instructor: "Satheesha B. Nanjappa",
    year: "May 2026",
    color: "#007cc3",
    emoji: "☕",
    img: infosysJavaCert,
    skills: "Java, Object-Oriented Programming (OOP), Classes, Interfaces, Exception Handling",
    verifyUrl: "https://verify.onwingspan.com",
  },
  {
    name: "Data Structures and Algorithms Python: The Complete Bootcamp",
    issuer: "Udemy",
    instructor: "Shubham Sarda",
    year: "Nov 2025",
    color: "#a435f0",
    emoji: "⚡",
    img: udemyDsaCert,
    skills: "Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, Big-O Complexity",
    verifyUrl: "https://ude.my/UC-3a5f665d-cad6-49c3-b7a1-ddb54cb5dc33",
  },
  {
    name: "English for IT 1",
    issuer: "Cisco Networking Academy · VJIT",
    instructor: "GADELA SREENIVASA RAO",
    year: "Apr 2025",
    color: "#10b981",
    emoji: "🌐",
    img: ciscoEnglishCert,
    skills: "Technical Communication, IT Terminology, Professional Collaboration",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Technology — Information Technology",
    school: "Vidya Jyothi Institute of Technology (VJIT), Hyderabad",
    period: "Aug 2024 – Aug 2028", score: "8.38 / 10 CGPA",
    courses: ["Data Structures","DBMS","OOP","Operating Systems","Computer Networks"],
    current: true,
  },
  { degree: "Intermediate (MPC)", school: "Vertex Junior College, Hyderabad", period: "Apr 2022 – Apr 2024", score: "92.1%", courses: ["Mathematics", "Physics", "Chemistry"], current: false },
  { degree: "Secondary School Certificate (SSC)", school: "Geetha High School", period: "2022", score: "9.5 / 10 GPA", courses: [], current: false },
];

const LOOKING = [
  { icon: "💼", title: "6-Month Internship",    desc: "Starting June 2025. Full-stack, backend, or DevOps roles preferred." },
  { icon: "🚀", title: "PPO-Eligible Roles",    desc: "Open to internships with pre-placement offer potential." },
  { icon: "🏢", title: "Product Companies",     desc: "Prefer product-based startups where I can own features end-to-end." },
  { icon: "🌍", title: "Location / Remote",     desc: "Chennai, Bangalore, Hyderabad, Pune — or fully remote." },
];

/* ─────────────────────────────────────────────
   FEATURE ICONS (GITHUB, LINKEDIN, PHONE)
───────────────────────────────────────────── */
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   CUTE AI BOT LOGO / MASCOT
───────────────────────────────────────────── */
function CuteBotLogo({ size = 36, idPrefix = "cute" }: { size?: number; idPrefix?: string }) {
  const bgGradId = `${idPrefix}-bgGrad`;
  const earGradId = `${idPrefix}-earGrad`;
  const glowId = `${idPrefix}-glow`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "block" }}>
      <defs>
        <linearGradient id={bgGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id={earGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background circle badge with soft glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGradId})`} />

      {/* Sparkles / Stars in background */}
      <path d="M22 24L24 19L26 24L31 26L26 28L24 33L22 28L17 26Z" fill="#FDE047" opacity="0.9" />
      <circle cx="78" cy="22" r="2.5" fill="#FDE047" />
      <circle cx="82" cy="74" r="2" fill="#FDE047" opacity="0.8" />
      <path d="M78 28L79.5 24L81 28L85 29.5L81 31L79.5 35L78 31L74 29.5Z" fill="#FFFFFF" opacity="0.85" />

      {/* Antenna */}
      <rect x="47.5" y="16" width="5" height="12" rx="2.5" fill="#E2E8F0" />
      <circle cx="50" cy="14" r="5.5" fill="#F43F5E" filter={`url(#${glowId})`} />
      <circle cx="48.5" cy="12.5" r="2" fill="#FFFFFF" opacity="0.8" />

      {/* Cute Ears / Headphones */}
      <rect x="18" y="44" width="8" height="18" rx="4" fill={`url(#${earGradId})`} />
      <rect x="74" y="44" width="8" height="18" rx="4" fill={`url(#${earGradId})`} />

      {/* Head Chassis */}
      <rect x="23" y="26" width="54" height="48" rx="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

      {/* Visor / Face Screen Area */}
      <rect x="28" y="32" width="44" height="36" rx="15" fill="#0F172A" />

      {/* Glossy Reflection on Visor */}
      <path d="M33 36C38 34 50 34 60 36C65 37 68 39 68 41C58 39 44 39 33 42Z" fill="#FFFFFF" opacity="0.18" />

      {/* Kawaii Cute Eyes - Big glossy anime sparkle */}
      <ellipse cx="40" cy="48" rx="5.5" ry="6.5" fill="#38BDF8" />
      <circle cx="38.5" cy="45.5" r="2.2" fill="#FFFFFF" />
      <circle cx="42" cy="51" r="1.1" fill="#FFFFFF" />

      <ellipse cx="60" cy="48" rx="5.5" ry="6.5" fill="#38BDF8" />
      <circle cx="58.5" cy="45.5" r="2.2" fill="#FFFFFF" />
      <circle cx="62" cy="51" r="1.1" fill="#FFFFFF" />

      {/* Soft Rosy Blush Cheeks */}
      <ellipse cx="34" cy="56" rx="3.5" ry="2" fill="#FB7185" opacity="0.85" />
      <ellipse cx="66" cy="56" rx="3.5" ry="2" fill="#FB7185" opacity="0.85" />

      {/* Adorable Smiling Mouth */}
      <path d="M46.5 54.5C48 57 52 57 53.5 54.5" stroke="#F8FAFC" strokeWidth="2" strokeLinecap="round" />

      {/* Little heart emblem on chin */}
      <path d="M50 77C50 77 46 73.5 46 70.5C46 68.8 47.3 67.5 49 67.5C49.8 67.5 50 68.2 50 68.2C50 68.2 50.2 67.5 51 67.5C52.7 67.5 54 68.8 54 70.5C54 73.5 50 77 50 77Z" fill="#F43F5E" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   AI CHATBOT RESPONSES
───────────────────────────────────────────── */
function aiReply(msg: string): string {
  const m = msg.toLowerCase().trim();

  // Greetings & Casual
  if (m.match(/^(hi|hello|hey|howdy|hola|yo|sup|greetings)\b/) || m.match(/good (morning|afternoon|evening)/)) {
    return "Hey there! 👋 I'm Sohan's AI Companion. I'm trained to answer virtually anything about Chepuri Sohan — his **tech stack**, **projects**, **academic background at VJIT**, **coding skills**, **education**, **why you should connect or hire him**, or even tell you a tech joke! What's on your mind?";
  }
  if (m.match(/how are you|how do you do|how's it going|what's up/)) {
    return "I'm doing fantastic, thank you for asking! 🚀 Always ready to chat about software engineering, Sohan's projects, or technical opportunities. How can I help you today?";
  }

  // Identity & Bot Info
  if (m.match(/who made you|who created you|who built you/)) {
    return "I was created by **Chepuri Sohan** as an interactive AI companion for his portfolio! He designed my interface, trained my knowledge base, and gave me this cute look. ✨";
  }
  if (m.match(/who are you|what are you|your name|are you real|are you ai|are you a bot/)) {
    return "I'm **Sohan's AI Companion**! 🤖✨ Think of me as his 24/7 digital representative. I know his code, his projects, his academic journey at VJIT, and what makes him a passionate software developer. Feel free to quiz me!";
  }
  if (m.match(/help|menu|what can you do|options|topics|commands/)) {
    return "Here's what I can tell you about:\n\n• 💡 **Why Hire Sohan**: Top differentiators & engineering mindset\n• 🎓 **Education**: B.Tech at VJIT Aziznagar (Passout 2028), Vertex Junior College (2024), Geetha High School (2022)\n• 🛠️ **Tech Stack**: C, Python, Java, SQL, HTML/CSS, ESP32\n• 🚀 **Projects**: Intelligent Car with Accident Alert & Hotel Reservation System\n• 📜 **Certifications**: Cisco, Codetantra, Infosys Springboard\n• 📱 **Contact & Connect**: Direct phone (+91 63047 80113), LinkedIn, WhatsApp\n• 📄 **Resume**: Direct contact & profile download\n• 😄 **Fun**: Ask me for a tech joke!";
  }

  // Why Hire Sohan / Superpowers
  if (m.match(/why hire|why should we hire|why sohan|stand out|unique|different|value proposition|hire him/)) {
    return "**Why Chepuri Sohan is a standout addition to your engineering team:**\n\n1. 🚀 **High Builder Velocity**: Passionate about turning concepts into live, functional web applications with clean, responsive user interfaces.\n2. 🧠 **Strong Academic Foundation**: Graduated from Geetha High School (2022), completed intermediate at Vertex Junior College (2024), and currently pursuing B.Tech CSE at VJIT (Class of 2028).\n3. ⚡ **Dedicated Problem Solver**: Continuously practicing data structures and algorithms in Python, Java, and C.\n4. 🌐 **Modern Tech Stack**: Practical hands-on experience with React, TypeScript, modern CSS, and RESTful web architectures.\n5. 🤝 **Fast Learner & Team Player**: Energetic, curious, and committed to growing into a top-tier software engineer.";
  }

  // Strengths & Soft Skills
  if (m.match(/strength|best at|good at|superpower|soft skill|teamwork|leadership|communicate|collaborat/)) {
    return "**Sohan's Core Strengths:**\n\n• **Engineering Execution**: Translates ideas into clean, functional frontend applications with modern UX.\n• **Strong Fundamentals**: Clear concepts in Data Structures, Algorithms, Object-Oriented Programming, and Databases.\n• **Curiosity & Fast Learning**: Rapidly adopts new frameworks, tools, and best engineering practices.\n• **Clear Communication**: Values collaborative problem solving, code clarity, and teamwork.";
  }

  // Weaknesses / What is he currently learning
  if (m.match(/weakness|improve|growth|learning currently|what is he learning|studying|currently work/)) {
    return "Sohan is actively leveling up his skills in:\n\n• ☁️ **Cloud Computing**: Cloud infrastructure, services, and architecture\n• 🌐 **Computer Networking**: Network protocols, routing, and communication fundamentals\n• 📊 **Data Science**: Data analysis, statistical reasoning, and data manipulation";
  }

  // Work Experience / Past Jobs / Internships
  if (m.match(/work experience|prior experience|experience|past job|past internship|employment|has he worked/)) {
    return "Sohan is currently pursuing his B.Tech at Vidya Jyothi Institute of Technology (VJIT), graduating in 2028. He is actively building real-world projects, honing his coding fundamentals, and seeking exciting internship opportunities to contribute to high-impact teams.";
  }

  // Internship Details
  if (m.match(/intern|hire|job|available|availability|start date|when can he start|duration|ppo|placement|notice/)) {
    return "**Internship & Opportunity Details:**\n\n• **Candidate**: Chepuri Sohan (B.Tech CSE, VJIT Aziznagar, Class of 2028)\n• **Target Roles**: Software Engineering Intern, Frontend Developer, Web Development Intern\n• **Location**: Hyderabad, Bangalore, or Remote / Hybrid\n• **Direct Contact**: +91 63047 80113\n• **LinkedIn**: [linkedin.com/in/chepuri-sohan-1a1865381](https://www.linkedin.com/in/chepuri-sohan-1a1865381)";
  }

  // Relocation & Cities
  if (m.match(/relocate|relocation|location|city|cities|bangalore|bengaluru|chennai|hyderabad|pune|mumbai|remote|wfh/)) {
    return "Sohan is based in **Hyderabad, India**, and is open to in-office, hybrid, and remote opportunities across India (Hyderabad, Bangalore, Pune, etc.)!";
  }

  // Salary / Stipend
  if (m.match(/stipend|salary|compensation|pay|expected stipend/)) {
    return "Sohan is primarily focused on joining a high-growth engineering team where he can learn from seasoned mentors, solve real-world problems, and deliver genuine value.";
  }

  // Roles
  if (m.match(/role|roles|position|positions|title|what kind of job|sde/)) {
    return "Roles Sohan is best suited for:\n\n1. 💻 **Software Development Engineer (SDE) Intern**\n2. 🌐 **Frontend Developer (React, TypeScript, Tailwind CSS)**\n3. ⚙️ **Web Development Intern (Full-Stack / JavaScript / Python)**\n4. 🔍 **Problem Solving & Core Software Engineering**";
  }

  // Specific Project: Intelligent Car (ESP32)
  if (m.match(/car|intelligent car|accident|esp32|arduino|ultrasonic/)) {
    return "**Intelligent Car with Accident Alert & Driver Assistance System**:\n\n• **Overview**: An ESP32-powered smart IoT vehicle featuring real-time automated accident detection and obstacle avoidance.\n• **Tech Stack**: ESP32, Arduino IDE, C, Bluetooth Communication, Ultrasonic Sensors, Motor Drivers.\n• **Key Highlights**: Built-in obstacle avoidance, wireless smartphone control via Bluetooth, and instant alert mechanism on collision detection.";
  }

  // Specific Project: Hotel Reservation System
  if (m.match(/hotel|reservation|booking|hotel reservation system/)) {
    return "**Hotel Reservation System**:\n\n• **Overview**: Responsive hotel reservation website designed for seamless room booking.\n• **Tech Stack**: HTML, CSS, JavaScript, Responsive UI/UX.\n• **Key Features**: Dedicated user and admin login interfaces, room availability viewer, user-friendly reservation flow, and integrated live location feature to find nearby hotels.";
  }

  // All Projects
  if (m.match(/project|build|made|portfolio work|apps/)) {
    return "Sohan has built two featured technical projects:\n\n🚗 **Intelligent Car with Accident Alert & Driver Assistance** — ESP32, Arduino IDE, Bluetooth & Ultrasonic obstacle avoidance.\n🏨 **Hotel Reservation System** — Responsive multi-tier booking platform with User & Admin portals and live location nearby hotel finder.";
  }

  // Problem Solving & Programming
  if (m.match(/dsa|coding|problem|programming|languages/)) {
    return "**Sohan's Programming & Problem Solving Focus:**\n\n• **Core Languages**: C, Python, Java\n• **Fundamentals**: Data Structures, Object-Oriented Programming (OOP), DBMS & SQL\n• **Certifications**: Cisco, Codetantra, Infosys Springboard\n• **Philosophy**: Hands-on project building combined with strong computational fundamentals.";
  }

  // Frontend Skills
  if (m.match(/frontend|html|css|javascript|ui|ux/)) {
    return "**Frontend & Web Capabilities:**\n\n• **Core**: Semantic HTML5, modern responsive CSS3, Flexbox & Grid\n• **Interactive UI**: User & Admin dashboard interfaces, accessible booking workflows\n• **Languages**: JavaScript, TypeScript, React components\n• **Design**: Clean, modern aesthetic with mobile-first responsiveness.";
  }

  // Backend Skills
  if (m.match(/backend|sql|dbms|database/)) {
    return "**Backend, Systems & Database Capabilities:**\n\n• **Databases**: SQL, Relational Schema Design, Normalization, DBMS concepts\n• **Systems**: ESP32 microcontroller development, sensor integration\n• **Foundations**: Operating Systems, Computer Networks.";
  }

  // Database Skills
  if (m.match(/database|databases|sql|mysql|dbms/)) {
    return "**Database & Storage Experience:**\n\n• **SQL & DBMS**: Relational database modeling, querying, indexing, and transactional integrity.\n• Coursework and practical application in both academic projects and full-stack systems.";
  }

  // Programming Languages
  if (m.match(/java|python|c\b|languages/)) {
    return "**Programming Languages:**\n\n• **C**: Structured programming & microcontroller control\n• **Python**: Problem solving, script automation, and database scripting\n• **Java**: Core programming\n• **SQL**: Database design and data querying";
  }

  // DevOps, Cloud & Tools
  if (m.match(/devops|linux|arduino|esp32/)) {
    return "**Tools & Hardware Environments:**\n\n• **Microcontrollers & IoT**: ESP32, Arduino IDE, Ultrasonic Sensors, Bluetooth modules\n• **Operating Systems**: Linux / Windows";
  }

  // General Skills / Tech Stack
  if (m.match(/skill|tech|stack|tools/)) {
    return "**Sohan's Complete Tech Stack:**\n\n• **Languages**: C, Python, Java, SQL\n• **Web & UI**: HTML5, CSS3, JavaScript, React\n• **IoT & Hardware**: ESP32, Arduino IDE, Bluetooth, Ultrasonic Sensors\n• **Core Subjects**: DBMS, Operating Systems, Computer Networks\n• **Tools**: VS Code";
  }

  // Education & Academics
  if (m.match(/education|college|cgpa|gpa|marks|school|degree|vjit|vertex|geetha|intermediate|class 12|class 10/)) {
    return "**Chepuri Sohan's Educational Background:**\n\n🎓 **Bachelor of Technology — Information Technology (Aug 2024 – Aug 2028)**\n• **College**: Vidya Jyothi Institute of Technology (VJIT), Hyderabad\n• **CGPA**: 8.38 / 10\n• **Relevant Coursework**: Data Structures, DBMS, OOP, Operating Systems, Computer Networks\n\n🏫 **Intermediate (MPC) — Vertex Junior College, Hyderabad (Apr 2022 – Apr 2024)**\n• **Percentage**: 92.1%\n\n🏫 **Secondary School Certificate (SSC) — Geetha High School (2022)**\n• **GPA**: 9.5 / 10";
  }

  // Certifications
  if (m.match(/cert|cisco|infosys|springboard|udemy/)) {
    return "**Verified Certifications & Credentials:**\n\n1. 🐍 **Python Essentials 1** — Cisco Networking Academy at VJIT (Instructor: P Swetha, Apr 2025)\n2. ☕ **Programming using Java** — Infosys Springboard (Satheesha B. Nanjappa, May 2026, verifiable onwingspan.com)\n3. ⚡ **Data Structures & Algorithms Python (20 Hours)** — Udemy Bootcamp by Shubham Sarda (Nov 2025)\n4. 🌐 **English for IT 1** — Cisco Networking Academy at VJIT (Instructor: Gadela Sreenivasa Rao, Apr 2025)\n\n*Click on any certificate card in the Certifications section to view the full high-res certificate image and online verification!*";
  }

  // Hobbies & Interests
  if (m.match(/hobby|hobbies|free time|fun|interest|outside/)) {
    return "Outside of coursework and coding, Sohan enjoys:\n\n🚗 **IoT & Robotics Tinkering**: Prototyping hardware devices with ESP32 and Arduino.\n💻 **Web Design**: Experimenting with creative CSS layouts and UI designs.\n🧩 **Logic Puzzles**: Problem solving and algorithmic brain teasers.";
  }

  // Future Goals
  if (m.match(/goal|future|ambition|vision|career plan/)) {
    return "**Sohan's Ambition:**\n\nTo secure a software development or IT internship where he can contribute to real-world software, deepen his expertise across full-stack and embedded systems, and grow into a versatile technology leader.";
  }

  // GitHub Profile
  if (m.match(/\b(github|git profile|repo|repositories)\b/)) {
    return "**Sohan's GitHub Profile:**\n\n🐙 **Profile Link**: [github.com/CHEPURISOHANSAI](https://github.com/CHEPURISOHANSAI)\n• Check out Sohan's code repositories and technical projects!";
  }

  // LinkedIn Profile
  if (m.match(/\b(linkedin|connect|network)\b/)) {
    return "**Chepuri Sohan's LinkedIn Profile:**\n\n💼 **Profile Link**: [linkedin.com/in/chepuri-sohan-1a1865381](https://www.linkedin.com/in/chepuri-sohan-1a1865381)\n• Connect with Sohan on LinkedIn for discussions, project collaboration, and opportunities!";
  }

  // Mobile / Phone / WhatsApp
  if (m.match(/\b(phone|mobile|cell|call|whatsapp|telephone|number)\b/)) {
    return "**Chepuri Sohan's Contact Information:**\n\n📱 **Phone / Mobile**: [+91 63047 80113](tel:+916304780113)\n💬 **WhatsApp**: Available on [+91 63047 80113](https://wa.me/916304780113)\n📧 **Email**: [sohansaichepuri@gmail.com](mailto:sohansaichepuri@gmail.com)\n💼 **LinkedIn**: [linkedin.com/in/chepuri-sohan-1a1865381](https://www.linkedin.com/in/chepuri-sohan-1a1865381)\n⏰ Feel free to call, message, or WhatsApp!";
  }

  // Contact & Socials
  if (m.match(/contact|email|phone|reach|call|schedule|interview|linkedin|github/)) {
    return "**Get in Touch with Chepuri Sohan:**\n\n📧 **Email**: sohansaichepuri@gmail.com\n📱 **Phone / Mobile**: +91 63047 80113\n💬 **WhatsApp**: https://wa.me/916304780113\n💼 **LinkedIn**: https://www.linkedin.com/in/chepuri-sohan-1a1865381\n🐙 **GitHub**: https://github.com/CHEPURISOHANSAI\n🎓 **College**: VJIT Hyderabad (CGPA 8.38/10)\n\nHe responds promptly to all genuine inquiries!";
  }

  // Resume Download
  if (m.match(/resume|cv|download|pdf/)) {
    return "You can download Chepuri Sohan's official resume by clicking the **Download Resume** button in the hero section or using the link below:\n\n📄 **Download**: [Chepuri_Sohan_Resume.pdf](" + ME.resumeUrl + ")\n\nYou can also connect directly via phone (+91 63047 80113) or LinkedIn!";
  }

  // Jokes / Easter Eggs
  if (m.match(/joke|funny|laugh|humor/)) {
    const jokes = [
      "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛😄",
      "There are 10 types of people in this world: those who understand binary, and those who don't! 🤖",
      "Why did the JavaScript developer wear glasses?\nBecause they didn't C#! 👓😂",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺😄",
      "Why do Java programmers have to wear glasses?\nBecause they don't C#! (And because of all the boilerplate!) ☕😂"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Thanks & Gratitude
  if (m.match(/thank|thanks|great|nice|awesome|cool|helpful|good job/)) {
    return "You're very welcome! 😊 Glad I could help. If you want to connect with Sohan directly, reach out via WhatsApp/Call at **+91 63047 80113** or on [LinkedIn](https://www.linkedin.com/in/chepuri-sohan-1a1865381)!";
  }

  // Bye
  if (m.match(/bye|goodbye|cya|see you|later/)) {
    return "Goodbye! Thanks for stopping by Chepuri Sohan's portfolio. Have a wonderful day! 👋✨";
  }

  // Smart Fallback
  return "That's an interesting question! While I might not have the specific detail for that phrase, I'm fully trained on Sohan's:\n\n• 💡 **Why Connect with Sohan & Strengths**\n• 🎓 **Education at VJIT (2028), Vertex Junior College (2024), Geetha High School (2022)**\n• 🛠️ **Tech Stack & Skills** (React, Python, Java, C, Web Dev)\n• 🚀 **Projects & Applications**\n• 📱 **Contact Information** (+91 63047 80113, LinkedIn)\n\nWhat would you like to explore?";
}

/* ─────────────────────────────────────────────
   TYPED TEXT
───────────────────────────────────────────── */
function TypedText({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const target = items[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt.length < target.length)    t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), 65);
    else if (!del)                              t = setTimeout(() => setDel(true), 1800);
    else if (del && txt.length > 0)            t = setTimeout(() => setTxt(txt.slice(0, -1)), 38);
    else { setDel(false); setI((x) => (x + 1) % items.length); }
    return () => clearTimeout(t);
  }, [txt, del, i, items]);
  return <span className="cursor" style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: "inherit" }}>{txt}</span>;
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SH({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ marginBottom:"3rem" }}>
      <div className="sh-num">{num}</div>
      <h2 className="sh-title">{title}</h2>
      <div className="sh-rule" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHATBOT
───────────────────────────────────────────── */
interface Msg { role: "user" | "ai"; text: string; }

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role:"ai", text:"Hi there! 👋 I'm Sohan's AI Companion. Ask me anything about his **education at VJIT**, **Vertex Junior College**, **Geetha High School**, **skills**, **projects**, or pick a prompt below!" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);

  const sendPrompt = useCallback((promptText: string) => {
    const t = promptText.trim();
    if (!t) return;
    setInput("");
    setMsgs(p => [...p, { role:"user", text:t }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { role:"ai", text:aiReply(t) }]);
    }, 600 + Math.random() * 400);
  }, []);

  const send = useCallback(() => {
    sendPrompt(input);
  }, [input, sendPrompt]);

  const fmt = (text: string) => text.split("\n").map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return <span key={i}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color:"var(--ink)" }}>{p}</strong> : p)}{i < arr.length - 1 && <br />}</span>;
  });

  const promptChips = [
    "🎓 Education & College",
    "💡 Why connect with Sohan?",
    "📱 Mobile Number",
    "💼 LinkedIn Profile",
    "🐙 GitHub Profile",
    "🚀 Top Projects",
    "🛠️ Full Tech Stack",
    "⚡ Technical Skills",
    "📄 Resume & Contact",
    "😄 Tell me a joke",
  ];

  return (
    <>
      {/* Floating button */}
      <div className="chat-fab-wrap" style={{ position:"fixed", bottom:24, right:24, zIndex:1000 }}>
        {!open && (
          <div className="chat-tooltip">
            <span>Ask AI Buddy!</span>
            <span style={{ fontSize:"0.9rem" }}>✨</span>
          </div>
        )}
        <button
          className="chat-btn"
          onClick={() => setOpen(o => !o)}
          title={open ? "Close Chat" : "Chat with AI Companion"}
          aria-label="Toggle AI Chat"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <CuteBotLogo size={42} idPrefix="btn-cute" />
          )}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel fi" style={{
          position:"fixed", bottom:92, right:24, zIndex:999,
          width:360, height:520, display:"flex", flexDirection:"column", overflow:"hidden",
        }}>
          {/* Header */}
          <div style={{ padding:"12px 16px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"linear-gradient(to bottom, #ffffff, #fafafa)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ position:"relative" }}>
                <CuteBotLogo size={38} idPrefix="hdr-cute" />
                <div style={{ position:"absolute", bottom:0, right:0, width:10, height:10, borderRadius:"50%", background:"#10b981", border:"2px solid #fff" }} />
              </div>
              <div>
                <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".88rem", color:"var(--ink)", display:"flex", alignItems:"center", gap:5 }}>
                  Sohan's AI Companion <span style={{ fontSize:".8rem" }}>✨</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ fontFamily:"var(--mono)", fontSize:".62rem", color:"#10b981", fontWeight:600 }}>Active</span>
                  <span style={{ fontFamily:"var(--font)", fontSize:".62rem", color:"var(--muted)" }}>· Trained on Sohan's Profile</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)", padding:4, display:"flex", alignItems:"center", borderRadius:6 }}
              title="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 12px 6px", display:"flex", flexDirection:"column", gap:10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-end", justifyContent: m.role==="user" ? "flex-end":"flex-start" }}>
                {m.role === "ai" && (
                  <div style={{ flexShrink:0, marginBottom:2 }}>
                    <CuteBotLogo size={24} idPrefix={`msg-cute-${i}`} />
                  </div>
                )}
                <div className={m.role==="user" ? "chat-user":"chat-ai"}
                  style={{ maxWidth: m.role==="user" ? "82%" : "84%", padding:"10px 14px", fontFamily:"var(--font)", fontSize:".82rem", lineHeight:1.55 }}>
                  {fmt(m.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display:"flex", gap:8, alignItems:"flex-end" }}>
                <div style={{ flexShrink:0, marginBottom:2 }}>
                  <CuteBotLogo size={24} idPrefix="typing-cute" />
                </div>
                <div className="chat-ai" style={{ padding:"11px 16px", display:"flex", gap:5, alignItems:"center" }}>
                  {[0,1,2].map(i => <div key={i} className="typing-dot" style={{ width:5, height:5, borderRadius:"50%", background:"var(--subtle)" }}/>)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div style={{ padding:"8px 12px 4px", display:"flex", gap:6, overflowX:"auto", scrollbarWidth:"none", borderTop:"1px solid var(--border-subtle, rgba(0,0,0,0.05))" }}>
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                className="chat-chip"
                onClick={() => sendPrompt(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding:"8px 12px 12px", borderTop:"1px solid var(--border)", display:"flex", gap:7, background:"var(--white)" }}>
            <input className="input" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && send()} placeholder="Ask anything about Sohan..."
              style={{ fontSize:".82rem", padding:"8px 12px", borderRadius:10 }} />
            <button onClick={send} disabled={!input.trim()} style={{
              width:36, height:36, borderRadius:10,
              background: input.trim() ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "var(--border)",
              border:"none", cursor: input.trim() ? "pointer":"not-allowed",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s",
              boxShadow: input.trim() ? "0 2px 8px rgba(99,102,241,.35)" : "none"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#fff":"var(--subtle)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   CERT CAROUSEL
───────────────────────────────────────────── */
function CertCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof CERTS[0] | null>(null);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  const CARD_W = 360;
  const GAP = 20;

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(idx, CERTS.length - 1));
    setActive(clamped);
    const offset = clamped * (CARD_W + GAP);
    el.scrollTo({ left: offset, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (CARD_W + GAP));
    setActive(Math.max(0, Math.min(idx, CERTS.length - 1)));
  };

  // Drag-to-scroll (desktop)
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current - (e.clientX - dragStart.current);
  };
  const onMouseUp = () => { setIsDragging(false); onScroll(); };

  // Handle ESC key to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, var(--off), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, var(--off), transparent)", zIndex: 2, pointerEvents: "none" }} />

      {/* Scroll track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          display: "flex",
          gap: GAP,
          overflowX: "auto",
          paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
          paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
          paddingBottom: 24,
          paddingTop: 8,
          scrollbarWidth: "none",
          cursor: isDragging ? "grabbing" : "grab",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        } as React.CSSProperties}
      >
        {CERTS.map((c, i) => (
          <div
            key={i}
            onClick={() => { scrollTo(i); setSelectedCert(c); }}
            style={{
              flexShrink: 0,
              width: CARD_W,
              borderRadius: 14,
              overflow: "hidden",
              border: `1px solid ${active === i ? c.color + "55" : "var(--border)"}`,
              background: "var(--white)",
              boxShadow: active === i ? `0 12px 40px ${c.color}22` : "0 2px 12px rgba(0,0,0,.05)",
              transform: active === i ? "translateY(-4px) scale(1.01)" : "scale(1)",
              transition: "all .35s cubic-bezier(.22,1,.36,1)",
              scrollSnapAlign: "center",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            {/* Certificate image with click to enlarge */}
            <div
              onClick={(e) => { e.stopPropagation(); setSelectedCert(c); }}
              title="Click to view full certificate"
              style={{ height: 220, background: "#f8fafc", overflow: "hidden", position: "relative", cursor: "zoom-in" }}
            >
              <img
                src={c.img}
                alt={c.name}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px", transition: "transform .4s", transform: active === i ? "scale(1.02)" : "scale(1)" }}
              />
              {/* Overlay badge */}
              <div style={{
                position: "absolute", top: 12, left: 12,
                background: "rgba(255,255,255,.92)",
                backdropFilter: "blur(6px)",
                border: `1px solid ${c.color}44`,
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ fontSize: ".85rem" }}>{c.emoji}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: ".62rem", color: "var(--muted)", letterSpacing: ".06em" }}>{c.year}</span>
              </div>

              {/* View badge */}
              <div style={{
                position: "absolute", bottom: 10, right: 10,
                background: "rgba(9,9,11,.75)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                borderRadius: 6,
                padding: "3px 9px",
                fontSize: ".66rem",
                fontFamily: "var(--mono)",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span>🔍 View Full</span>
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: ".95rem", color: "var(--ink)", marginBottom: 3, lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontFamily: "var(--font)", fontSize: ".8rem", color: "var(--muted)" }}>{c.issuer}</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: c.color + "18", border: `1px solid ${c.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>
                  {c.emoji}
                </div>
              </div>

              {/* Skills covered */}
              <div style={{ marginTop: ".75rem", fontFamily: "var(--font)", fontSize: ".75rem", color: "var(--muted)", lineHeight: 1.45 }}>
                {c.skills}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 8, marginTop: "1rem" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedCert(c); }}
                  className="btn btn-ghost"
                  style={{ flex: 1, padding: "6px 12px", fontSize: ".76rem", justifyContent: "center" }}
                >
                  🔍 View Certificate
                </button>
                {c.verifyUrl && (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn btn-ink"
                    style={{ padding: "6px 12px", fontSize: ".76rem" }}
                  >
                    Verify ↗
                  </a>
                )}
              </div>

              {/* Color accent line */}
              <div style={{ height: 2, background: c.color, borderRadius: 1, marginTop: "1rem", width: active === i ? "100%" : "30%", transition: "width .5s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        {CERTS.map((c, i) => (
          <button key={i} onClick={() => scrollTo(i)} style={{
            width: active === i ? 24 : 7, height: 7,
            borderRadius: 999, border: "none", cursor: "pointer",
            background: active === i ? c.color : "var(--border)",
            transition: "all .3s ease", padding: 0,
          }} />
        ))}
      </div>

      {/* Arrow buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1.25rem" }}>
        <button onClick={() => scrollTo(active - 1)} disabled={active === 0} style={{
          width: 38, height: 38, borderRadius: "50%",
          border: "1px solid var(--border)", background: "var(--white)",
          cursor: active === 0 ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: active === 0 ? "var(--border)" : "var(--ink)",
          transition: "all .18s",
        }}
          onMouseEnter={e => { if (active > 0) e.currentTarget.style.borderColor="var(--border-2)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button onClick={() => scrollTo(active + 1)} disabled={active === CERTS.length - 1} style={{
          width: 38, height: 38, borderRadius: "50%",
          border: "1px solid var(--border)", background: "var(--white)",
          cursor: active === CERTS.length - 1 ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: active === CERTS.length - 1 ? "var(--border)" : "var(--ink)",
          transition: "all .18s",
        }}
          onMouseEnter={e => { if (active < CERTS.length - 1) e.currentTarget.style.borderColor="var(--border-2)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="fi"
          onClick={() => setSelectedCert(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(9, 9, 11, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--white)",
              borderRadius: 16,
              maxWidth: 820,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.3rem" }}>{selectedCert.emoji}</span>
                <div>
                  <div style={{ fontFamily: "var(--font)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>{selectedCert.name}</div>
                  <div style={{ fontFamily: "var(--font)", fontSize: ".8rem", color: "var(--muted)" }}>{selectedCert.issuer} · {selectedCert.year}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                style={{ background: "var(--off)", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: ".85rem", fontWeight: 600 }}
              >
                ✕ Close
              </button>
            </div>

            {/* Certificate High-Res Image */}
            <div style={{ padding: "20px", background: "#f8fafc", textAlign: "center" }}>
              <img
                src={selectedCert.img}
                alt={selectedCert.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "62vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  margin: "0 auto",
                  display: "block",
                }}
              />
            </div>

            {/* Modal Footer / Details */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: ".82rem", color: "var(--muted)" }}>
                <strong>Instructor / Signatory:</strong> {selectedCert.instructor}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ink"
                    style={{ padding: "8px 18px", fontSize: ".8rem" }}
                  >
                    Verify Online ↗
                  </a>
                )}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="btn btn-ghost"
                  style={{ padding: "8px 16px", fontSize: ".8rem" }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(x => ({ ...x, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage =
`Hi Chepuri Sohan! I am reaching out from your portfolio website:

👤 Name: ${f.name}
📧 Email: ${f.email}${f.company ? `\n🏢 Company / College: ${f.company}` : ""}

💬 Message:
${f.message}`;

    const url = `https://wa.me/916304780113?text=${encodeURIComponent(formattedMessage)}`;
    setWhatsappUrl(url);
    setSent(true);

    // Open WhatsApp in new tab/window
    window.open(url, "_blank");
  };

  const resetForm = () => {
    setSent(false);
    setF({ name: "", email: "", company: "", message: "" });
  };

  if (sent) return (
    <div className="card-flat fi" style={{ padding: "2.5rem 1.5rem", textAlign: "center", borderRadius: 14 }}>
      <div style={{ fontSize: "2.2rem", marginBottom: ".5rem" }}>💬</div>
      <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--ink)", marginBottom: 6 }}>
        Connecting to WhatsApp...
      </div>
      <div style={{ color: "var(--muted)", fontSize: ".875rem", maxWidth: 460, margin: "0 auto 1.25rem", lineHeight: 1.55 }}>
        WhatsApp has been opened with your pre-filled message directly to <strong>+91 63047 80113</strong>. Simply click send in WhatsApp!
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ink"
          style={{ padding: "9px 20px", fontSize: ".85rem" }}
        >
          Open WhatsApp Again ↗
        </a>
        <button
          type="button"
          onClick={resetForm}
          className="btn btn-ghost"
          style={{ padding: "9px 20px", fontSize: ".85rem" }}
        >
          Send Another Message
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".85rem" }}>
        <input className="input" value={f.name} onChange={set("name")} placeholder="Your name" required />
        <input className="input" type="email" value={f.email} onChange={set("email")} placeholder="your@email.com" required />
      </div>
      <input className="input" value={f.company} onChange={set("company")} placeholder="Company / College (optional)" />
      <textarea className="input" value={f.message} onChange={set("message")} placeholder="Tell me about the role or opportunity..." required rows={5} style={{ resize: "vertical" as const }} />
      <button type="submit" className="btn btn-ink" style={{ alignSelf: "flex-start", padding: "11px 26px", display: "flex", alignItems: "center", gap: 8 }}>
        <span>Send via WhatsApp</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled]         = useState(false);
  const [active, setActive]             = useState("home");
  const [menuOpen, setMenuOpen]         = useState(false);
  const [skillsVisible, setSkillsVis]   = useState(false);
  const skillRef = useRef<HTMLElement>(null);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["home","about","skills","certifications","projects","education","looking","contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Skills bar IntersectionObserver
  useEffect(() => {
    if (!skillRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVis(true); }, { threshold:.2 });
    obs.observe(skillRef.current);
    return () => obs.disconnect();
  }, []);

  // Section reveal
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold:.1 });
    reveals.forEach(r => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  const navItems = [
    { id:"about",         label:"About"        },
    { id:"skills",        label:"Skills"       },
    { id:"certifications",label:"Certs"        },
    { id:"projects",      label:"Projects"     },
    { id:"education",     label:"Education"    },
    { id:"looking",       label:"Internship"   },
    { id:"contact",       label:"Contact"      },
  ];

  return (
    <div style={{ background:"var(--white)", minHeight:"100vh", color:"var(--ink)" }}>

      {/* ── Navbar ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        height:56, display:"flex", alignItems:"center", padding:"0 24px",
        justifyContent:"space-between",
        transition:"all .25s",
        ...(scrolled ? { background:"rgba(255,255,255,.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)" } : {}),
      }}>
        <button onClick={() => go("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:"var(--ink)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontWeight:500, fontSize:".72rem", color:"#fff", letterSpacing:".02em" }}>{ME.initials}</div>
          <span style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".9rem", color:"var(--ink)" }}>{ME.name}</span>
          <span className="tag tag-accent" style={{ fontSize:".6rem", padding:"2px 7px" }}>VJIT'28</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap:"1.75rem", alignItems:"center" }}>
          {navItems.slice(0,6).map(({ id, label }) => (
            <button key={id} onClick={() => go(id)} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"var(--font)", fontSize:".825rem", fontWeight:500,
              color: active===id ? "var(--accent)" : "var(--muted)",
              borderBottom: active===id ? "1px solid var(--accent)" : "1px solid transparent",
              paddingBottom:2, transition:"color .18s",
            }}
              onMouseEnter={e => { if (active!==id) (e.currentTarget.style.color="var(--ink-2)"); }}
              onMouseLeave={e => { if (active!==id) (e.currentTarget.style.color="var(--muted)"); }}
            >{label}</button>
          ))}

          {/* Quick social & phone icon links */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:4, borderLeft:"1px solid var(--border)", paddingLeft:10 }}>
            <a href={ME.github} target="_blank" rel="noreferrer" title="GitHub" style={{ width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)", border:"1px solid var(--border)", transition:"all .18s" }}
              onMouseEnter={e => { e.currentTarget.style.color="var(--ink)"; e.currentTarget.style.borderColor="var(--ink)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.borderColor="var(--border)"; }}>
              <GitHubIcon size={14} />
            </a>
            <a href={ME.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" style={{ width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)", border:"1px solid var(--border)", transition:"all .18s" }}
              onMouseEnter={e => { e.currentTarget.style.color="#0a66c2"; e.currentTarget.style.borderColor="#0a66c2"; }}
              onMouseLeave={e => { e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.borderColor="var(--border)"; }}>
              <LinkedInIcon size={14} />
            </a>
            <a href={`tel:${ME.phone.replace(/\s+/g, '')}`} title={`Call: ${ME.phone}`} style={{ width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)", border:"1px solid var(--border)", transition:"all .18s" }}
              onMouseEnter={e => { e.currentTarget.style.color="#10b981"; e.currentTarget.style.borderColor="#10b981"; }}
              onMouseLeave={e => { e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.borderColor="var(--border)"; }}>
              <PhoneIcon size={13} />
            </a>
          </div>

          <button onClick={() => go("contact")} className="btn btn-ink" style={{ padding:"7px 18px", fontSize:".8rem" }}>
            Hire Me
          </button>
        </div>

        {/* Mobile */}
        <button className="flex md:hidden" onClick={() => setMenuOpen(o => !o)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--ink)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="fi" style={{ position:"fixed", top:56, left:0, right:0, zIndex:99, background:"var(--white)", borderBottom:"1px solid var(--border)", padding:"1.25rem 24px", display:"flex", flexDirection:"column", gap:".9rem" }}>
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => go(id)} style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", fontFamily:"var(--font)", fontSize:".95rem", fontWeight:500, color: active===id ? "var(--accent)" : "var(--ink)" }}>{label}</button>
          ))}
          <div style={{ display:"flex", gap:8, paddingTop:".6rem", borderTop:"1px solid var(--border)" }}>
            <a href={ME.github} target="_blank" rel="noreferrer" className="social-pill" style={{ flex:1, justifyContent:"center", fontSize:".75rem" }}>
              <GitHubIcon size={14} /> GitHub
            </a>
            <a href={ME.linkedin} target="_blank" rel="noreferrer" className="social-pill" style={{ flex:1, justifyContent:"center", fontSize:".75rem" }}>
              <LinkedInIcon size={14} /> LinkedIn
            </a>
            <a href={`tel:${ME.phone.replace(/\s+/g, '')}`} className="social-pill" style={{ flex:1, justifyContent:"center", fontSize:".75rem" }}>
              <PhoneIcon size={13} /> Call
            </a>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px 0 60px" }}>
        <div className="container">
          <div className="hero-grid">
            {/* Top row: Matter on left, Photo on right (side-by-side on mobile, 2 columns on desktop) */}
            <div className="hero-top-row">
              {/* Matter (Left) */}
              <div className="hero-matter">
                {/* Status pill */}
                <div className="su" style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:".8rem", border:"1px solid var(--border)", borderRadius:999, padding:"4px 12px 4px 8px" }}>
                  <div className="live-dot" />
                  <span style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted)", letterSpacing:".05em" }}>Open to internship · 2025</span>
                </div>

                <div style={{ fontFamily:"var(--mono)", fontSize:".78rem", color:"var(--accent)", fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", marginBottom:".25rem" }}>
                  Hi, I'm
                </div>
                <h1 className="su d1 hero-name">
                  Chepuri Sohan
                </h1>

                <div className="su d2" style={{ fontFamily:"var(--font)", fontSize:"clamp(.88rem,1.8vw,1.15rem)", fontWeight:400, color:"var(--muted)", marginBottom:".85rem", minHeight:"1.7rem" }}>
                  <TypedText items={["3rd Year B.Tech IT Student 📚","IoT & Smart Systems Builder 🚗","Web Developer & UI Builder 💻","Problem Solver & Programmer ⚡","Cisco & Codetantra Certified 📜"]} />
                </div>

                {/* Meta row */}
                <div className="su d3" style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {[ME.college, "CGPA " + ME.cgpa, ME.location].map(t => (
                    <span key={t} className="tag" style={{ fontSize:".68rem" }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Photo on right side (stable, no bob, enlarged & good looking) */}
              <div className="su d2 hero-photo-col">
                <div className="avatar-ring avatar-responsive">
                  <div className="avatar-inner" style={{ width:"100%", height:"100%" }}>
                    <img src={ME.avatar} alt={ME.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 12%" }} />
                  </div>
                </div>
                {/* CGPA chip */}
                <div className="card-flat cgpa-badge">
                  <div style={{ fontFamily:"var(--mono)", fontSize:".55rem", color:"var(--subtle)", letterSpacing:".1em", textTransform:"uppercase" }}>CGPA</div>
                  <div style={{ fontFamily:"var(--font)", fontSize:"clamp(1.1rem,2.8vw,1.75rem)", fontWeight:800, color:"var(--ink)", lineHeight:1.1 }}>{ME.cgpa}</div>
                  <div style={{ fontFamily:"var(--mono)", fontSize:".55rem", color:"var(--subtle)" }}>out of 10</div>
                </div>
              </div>
            </div>

            {/* Actions & Bio (Below on mobile / Left bottom on desktop) */}
            <div className="hero-actions">
              <p className="su d4" style={{ fontFamily:"var(--font)", fontSize:"1rem", lineHeight:1.75, color:"var(--muted)", maxWidth:540, margin:"0 0 1.6rem" }}>{ME.bio}</p>

              <div className="su d5" style={{ display:"flex", gap:".75rem", flexWrap:"wrap" }}>
                <a href={ME.resumeUrl} download="Chepuri_Sohan_Resume.pdf" className="btn btn-ink" style={{ padding:"11px 24px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Resume
                </a>
                <button onClick={() => go("projects")} className="btn btn-ghost" style={{ padding:"11px 24px" }}>View Projects</button>
                <button onClick={() => go("contact")} className="btn btn-ghost" style={{ padding:"11px 24px" }}>Contact Me</button>
              </div>

              {/* Quick Connect: GitHub, LinkedIn, Mobile No (single line on phone & desktop) */}
              <div className="su d6 hero-connect-row">
                <span className="hero-connect-label">Connect:</span>
                <a href={ME.github} target="_blank" rel="noreferrer" className="social-pill" title={`${ME.name}'s GitHub Profile`}>
                  <GitHubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a href={ME.linkedin} target="_blank" rel="noreferrer" className="social-pill" title={`${ME.name}'s LinkedIn Profile`}>
                  <LinkedInIcon size={15} />
                  <span>LinkedIn</span>
                </a>
                <a href={`tel:${ME.phone.replace(/\s+/g, '')}`} className="social-pill" title={`Call ${ME.name}: ${ME.phone}`}>
                  <PhoneIcon size={14} />
                  <span>{ME.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section id="about" className="section reveal">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <SH num="01" title="About Me" />
              <p style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:"1.2rem", fontSize:".97rem" }}>{ME.bio}</p>
              <p style={{ color:"var(--muted)", lineHeight:1.8, fontSize:".97rem" }}>
                I believe in learning by building. Every project pushes me to go deeper — whether it's optimising a SQL query, animating a component, or debugging a Linux shell script at 2am. I enjoy working in teams and communicating clearly.
              </p>
              <div style={{ display:"flex", gap:".6rem", marginTop:"1.6rem" }}>
                {[
                  { href:ME.github,   label:"GitHub",   path:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                  { href:ME.linkedin, label:"LinkedIn",  path:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                ].map(({ href, label, path }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    style={{ width:36, height:36, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid var(--border)", color:"var(--muted)", transition:"all .18s", background:"var(--white)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border-2)"; e.currentTarget.style.color="var(--ink)"; e.currentTarget.style.background="var(--off)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--muted)"; e.currentTarget.style.background="var(--white)"; }}
                  ><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label={label}><path d={path}/></svg></a>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div style={{ display:"flex", flexDirection:"column", gap:".7rem" }}>
              {[
                { icon:"🎓", k:"College",   v:ME.college   },
                { icon:"📅", k:"Year",      v:ME.year      },
                { icon:"⭐", k:"CGPA",      v:`${ME.cgpa} / 10.0` },
                { icon:"📍", k:"Location",  v:ME.location  },
                { icon:"✉️", k:"Email",     v:ME.email     },
                { icon:"💼", k:"Status",    v:"Actively seeking internship / PPO — 2025" },
              ].map(({ icon, k, v }) => (
                <div key={k} className="card-flat" style={{ padding:"12px 16px", borderRadius:10, display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:"1rem", flexShrink:0 }}>{icon}</span>
                  <div>
                    <div className="label" style={{ fontSize:".6rem", marginBottom:1 }}>{k}</div>
                    <div style={{ fontFamily:"var(--font)", fontSize:".86rem", fontWeight:500, color:"var(--ink)" }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillRef as any} className="section section-alt reveal">
        <div className="container">
          <SH num="02" title="Skills" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              {SKILLS.map(s => (
                <div key={s.name} style={{ marginBottom:"1.1rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontFamily:"var(--font)", fontSize:".88rem", fontWeight:600, color:"var(--ink)" }}>{s.name}</span>
                      <span className="tag" style={{ fontSize:".6rem" }}>{s.cat}</span>
                    </div>
                    <span style={{ fontFamily:"var(--mono)", fontSize:".72rem", color:"var(--subtle)" }}>{s.level}%</span>
                  </div>
                  <div className="skill-track"><div className="skill-fill" style={{ width: skillsVisible ? `${s.level}%` : "0%" }} /></div>
                </div>
              ))}
            </div>
            <div>
              <div className="label" style={{ marginBottom:"1rem" }}>Full Tech Stack</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem", marginBottom:"1.8rem" }}>
                {TECH.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="card-flat" style={{ padding:"1.2rem", borderLeft:"3px solid var(--accent)" }}>
                <div className="label" style={{ marginBottom:8 }}>Currently Learning</div>
                <p style={{ fontFamily:"var(--font)", fontSize:".875rem", color:"var(--muted)", lineHeight:1.65, margin:"0 0 .6rem" }}>
                  Cloud Computing, Computer Networking, and Data Science
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".45rem" }}>
                  <span className="tag" style={{ background:"rgba(37,99,235,0.08)", color:"#2563eb", borderColor:"rgba(37,99,235,0.2)", fontWeight:600, padding:"4px 10px", fontSize:".8rem" }}>☁️ Cloud Computing</span>
                  <span className="tag" style={{ background:"rgba(16,185,129,0.08)", color:"#059669", borderColor:"rgba(16,185,129,0.2)", fontWeight:600, padding:"4px 10px", fontSize:".8rem" }}>🌐 Computer Networking</span>
                  <span className="tag" style={{ background:"rgba(168,85,247,0.08)", color:"#9333ea", borderColor:"rgba(168,85,247,0.2)", fontWeight:600, padding:"4px 10px", fontSize:".8rem" }}>📊 Data Science</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CERTS ── */}
      <section id="certifications" className="section reveal">
        <div className="container">
          <SH num="03" title="Certifications" />
        </div>
        <CertCarousel />
      </section>

      <div className="divider" />

      {/* ── PROJECTS ── */}
      <section id="projects" className="section section-alt reveal">
        <div className="container">
          <SH num="04" title="Projects" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.25rem" }}>
            {PROJECTS.map(p => (
              <article key={p.title} className="card" style={{ borderRadius:12, overflow:"hidden" }}>
                {/* Image */}
                <div style={{ height:175, background:"var(--off)", overflow:"hidden", position:"relative" }}>
                  <img src={p.img} alt={p.title} className="proj-img" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  <div style={{ position:"absolute", top:10, right:10 }}>
                    <span className="tag" style={{ fontSize:".6rem", background:"rgba(255,255,255,.9)", borderColor:"rgba(0,0,0,.08)" }}>{p.year}</span>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding:"1.1rem" }}>
                  <h3 style={{ fontFamily:"var(--font)", fontSize:"1.05rem", fontWeight:700, color:"var(--ink)", margin:"0 0 .4rem", letterSpacing:"-.01em" }}>{p.title}</h3>
                  <p style={{ fontFamily:"var(--font)", fontSize:".82rem", color:"var(--muted)", lineHeight:1.6, margin:"0 0 .9rem" }}>{p.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:.4*16+"px" }}>
                    {p.tags.map(t => <span key={t} className="tag" style={{ fontSize:".62rem" }}>{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── EDUCATION ── */}
      <section id="education" className="section reveal">
        <div className="container" style={{ maxWidth:760 }}>
          <SH num="05" title="Education" />
          <div style={{ position:"relative" }}>
            <div className="tl-line" style={{ position:"absolute", left:4, top:16, bottom:0, width:2, background:"var(--border)" }} />
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ display:"flex", gap:"1.5rem", marginBottom:"1.5rem" }}>
                <div style={{ flexShrink:0, paddingTop:14 }}>
                  <div className={`tl-dot ${e.current ? "active" : ""}`} />
                </div>
                <div className={`card${e.current ? " card-flat" : "-flat"}`} style={{ flex:1, padding:"1.2rem 1.4rem", borderRadius:12, borderLeft: e.current ? "3px solid var(--accent)" : "1px solid var(--border)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:6, marginBottom:6 }}>
                    <div>
                      <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".95rem", color:"var(--ink)" }}>{e.degree}</div>
                      <div style={{ fontFamily:"var(--font)", fontSize:".82rem", color:"var(--muted)" }}>{e.school}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--subtle)" }}>{e.period}</div>
                      <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".88rem", color:"var(--accent)" }}>{e.score}</div>
                    </div>
                  </div>
                  {e.courses.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:.4*16+"px", marginTop:".6rem" }}>
                      {e.courses.map(c => <span key={c} className="tag" style={{ fontSize:".6rem" }}>{c}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── LOOKING FOR ── */}
      <section id="looking" className="section section-alt reveal">
        <div className="container" style={{ maxWidth:860 }}>
          <SH num="06" title="Internship Goals" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"1rem", marginBottom:"2.5rem" }}>
            {LOOKING.map((l, i) => (
              <div key={i} className="card" style={{ padding:"1.25rem", borderRadius:12 }}>
                <div style={{ fontSize:"1.5rem", marginBottom:".7rem" }}>{l.icon}</div>
                <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".88rem", color:"var(--ink)", marginBottom:".4rem" }}>{l.title}</div>
                <p style={{ fontFamily:"var(--font)", fontSize:".78rem", color:"var(--muted)", lineHeight:1.6, margin:0 }}>{l.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="card-flat" style={{ padding:"2rem 2.5rem", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem", borderLeft:"4px solid var(--accent)" }}>
            <div>
              <div style={{ fontFamily:"var(--font)", fontWeight:800, fontSize:"1.2rem", color:"var(--ink)", marginBottom:4 }}>Ready to collaborate?</div>
              <div style={{ fontFamily:"var(--font)", fontSize:".875rem", color:"var(--muted)" }}>Available for a 6-month internship starting June 2025.</div>
            </div>
            <div style={{ display:"flex", gap:".75rem", flexShrink:0 }}>
              <a href={`mailto:${ME.email}`} className="btn btn-ink" style={{ padding:"10px 22px" }}>Email Me</a>
              <a href={ME.resumeUrl} download="Chepuri_Sohan_Resume.pdf" className="btn btn-ghost" style={{ padding:"10px 22px" }}>Download CV</a>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACT ── */}
      <section id="contact" className="section reveal">
        <div className="container" style={{ maxWidth:740 }}>
          <SH num="07" title="Contact & Connect" />
          <p style={{ fontFamily:"var(--font)", fontSize:".97rem", color:"var(--muted)", lineHeight:1.75, marginBottom:"2rem" }}>
            Recruiter or company looking to hire? Connect directly via GitHub, LinkedIn, or phone — or drop a message below. I respond to all inquiries within 24 hours.
          </p>

          {/* Direct Feature Cards: GitHub, LinkedIn, Mobile No */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:"1rem", marginBottom:"2.5rem" }}>
            {/* GitHub Card */}
            <div className="contact-card">
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"var(--ink)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>
                    <GitHubIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".92rem", color:"var(--ink)" }}>GitHub</div>
                    <div style={{ fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--muted)" }}>@CHEPURISOHANSAI</div>
                  </div>
                </div>
                <p style={{ fontFamily:"var(--font)", fontSize:".8rem", color:"var(--muted)", margin:"0 0 .5rem", lineHeight:1.5 }}>
                  Explore code repositories, web projects & coding experiments.
                </p>
              </div>
              <a href={ME.github} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding:"8px 14px", fontSize:".78rem", justifyContent:"center", width:"100%" }}>
                View GitHub ↗
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="contact-card">
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"#0a66c2", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>
                    <LinkedInIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".92rem", color:"var(--ink)" }}>LinkedIn</div>
                    <div style={{ fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--muted)" }}>in/chepuri-sohan-1a1865381</div>
                  </div>
                </div>
                <p style={{ fontFamily:"var(--font)", fontSize:".8rem", color:"var(--muted)", margin:"0 0 .5rem", lineHeight:1.5 }}>
                  Connect with Sohan for professional opportunities & networking.
                </p>
              </div>
              <a href={ME.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding:"8px 14px", fontSize:".78rem", justifyContent:"center", width:"100%" }}>
                Connect on LinkedIn ↗
              </a>
            </div>

            {/* Mobile / Phone Card */}
            <div className="contact-card">
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:"#10b981", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>
                    <PhoneIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"var(--font)", fontWeight:700, fontSize:".92rem", color:"var(--ink)" }}>Mobile & Call</div>
                    <div style={{ fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--muted)" }}>Direct Line & WhatsApp</div>
                  </div>
                </div>
                <div style={{ fontFamily:"var(--mono)", fontWeight:600, fontSize:".85rem", color:"var(--ink)", margin:"0 0 .5rem" }}>
                  {ME.phone}
                </div>
              </div>
              <div style={{ display:"flex", gap:6, width:"100%" }}>
                <a href={`tel:${ME.phone.replace(/\s+/g, '')}`} className="btn btn-ink" style={{ flex:1, padding:"8px 10px", fontSize:".75rem", justifyContent:"center" }}>
                  Call Now
                </a>
                <a href={`https://wa.me/${ME.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ flex:1, padding:"8px 10px", fontSize:".75rem", justifyContent:"center" }}>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="label" style={{ marginBottom:"1rem" }}>Or Send a Direct Message via WhatsApp</div>
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop:"1px solid var(--border)", padding:"1.75rem 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1.25rem" }}>
        <div>
          <div style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--subtle)" }}>
            © 2025 {ME.name} · {ME.degree}
          </div>
          <div style={{ fontFamily:"var(--mono)", fontSize:".65rem", color:"var(--muted)", marginTop:3 }}>
            VJIT Hyderabad · Class of 2028
          </div>
        </div>

        {/* Footer social & contact links */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <a href={ME.github} target="_blank" rel="noreferrer" className="social-pill" style={{ padding:"5px 12px", fontSize:".75rem" }}>
            <GitHubIcon size={14} />
            <span>GitHub</span>
          </a>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" className="social-pill" style={{ padding:"5px 12px", fontSize:".75rem" }}>
            <LinkedInIcon size={14} />
            <span>LinkedIn</span>
          </a>
          <a href={`tel:${ME.phone.replace(/\s+/g, '')}`} className="social-pill" style={{ padding:"5px 12px", fontSize:".75rem" }}>
            <PhoneIcon size={13} />
            <span>{ME.phone}</span>
          </a>
        </div>

        <div style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--subtle)", display:"flex", alignItems:"center", gap:8 }}>
          <div className="live-dot" />
          Open to opportunities
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
