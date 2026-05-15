import mongoose from "mongoose";
import dotenv from "dotenv";
import Career from "../src/models/Career.js";
import connectDB from "../src/config/db.js";

dotenv.config();

const careersData = [
  {
    title: "Full Stack Developer",
    description: "Build end-to-end web applications using modern technologies. Work with both frontend and backend technologies to create scalable, responsive applications.",
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "REST APIs"],
    averageSalary: "$80,000 - $150,000",
    industryDemand: "High",
    jobTypes: ["Job", "Freelance", "Remote", "Startup"],
    roadmapTemplates: {
      threeMonths: {
        milestones: [
          { month: 1, skills: ["JavaScript Basics", "HTML/CSS"], projects: ["Portfolio Website"], resources: ["FreeCodeCamp", "MDN Docs"] },
          { month: 2, skills: ["React Fundamentals", "Props & State"], projects: ["Todo App", "Weather App"], resources: ["React Official Docs", "Scrimba"] },
          { month: 3, skills: ["Node.js", "Express", "MongoDB"], projects: ["REST API", "Blog Backend"], resources: ["Node.js Docs", "Mongoose"] }
        ]
      },
      sixMonths: {
        milestones: [
          { month: 1, skills: ["JavaScript ES6+", "HTML/CSS Responsive"], projects: ["Portfolio Website"], resources: ["FreeCodeCamp", "MDN"] },
          { month: 2, skills: ["React Fundamentals", "Components", "Hooks"], projects: ["Todo App", "Weather App", "Movie DB"], resources: ["React Docs", "Scrimba"] },
          { month: 3, skills: ["Node.js", "Express", "RESTful APIs"], projects: ["Simple API", "User Auth"], resources: ["Node Docs"] },
          { month: 4, skills: ["MongoDB", "Database Design", "Queries"], projects: ["Blog API", "E-commerce Backend"], resources: ["MongoDB University"] },
          { month: 5, skills: ["Full Stack Integration", "Authentication", "Deployment"], projects: ["Full Stack Todo", "Chat App"], resources: ["AWS", "Vercel"] },
          { month: 6, skills: ["Testing", "Performance", "Best Practices"], projects: ["Production App", "Portfolio Projects"], resources: ["Jest", "Testing Library"] }
        ]
      },
      oneYear: {
        milestones: [
          { month: 1, skills: ["JavaScript Advanced", "DOM API", "Async"], projects: ["Interactive Website"], resources: ["FreeCodeCamp", "JavaScript.info"] },
          { month: 2, skills: ["HTML/CSS Advanced", "Responsive Design", "Accessibility"], projects: ["Responsive Portfolio"], resources: ["Web.dev", "A11y Resources"] },
          { month: 3, skills: ["React Hooks", "Context API", "Component Patterns"], projects: ["State Management App"], resources: ["React Docs"] },
          { month: 4, skills: ["Advanced React", "React Router", "Performance"], projects: ["Multi-page App"], resources: ["Advanced React"] },
          { month: 5, skills: ["Node.js Advanced", "Express Middleware", "Security"], projects: ["Secure API"], resources: ["OWASP", "Node Best Practices"] },
          { month: 6, skills: ["MongoDB Advanced", "Indexing", "Aggregation"], projects: ["Complex Queries"], resources: ["MongoDB University"] },
          { month: 7, skills: ["Authentication & Authorization", "JWT", "OAuth"], projects: ["Secure Login System"], resources: ["Auth0", "JWT.io"] },
          { month: 8, skills: ["Testing", "Unit Tests", "Integration Tests"], projects: ["Fully Tested App"], resources: ["Jest", "Mocha"] },
          { month: 9, skills: ["DevOps Basics", "Docker", "CI/CD"], projects: ["Dockerized App"], resources: ["Docker Docs", "GitHub Actions"] },
          { month: 10, skills: ["Cloud Deployment", "AWS/Vercel", "Monitoring"], projects: ["Live Application"], resources: ["AWS Docs"] },
          { month: 11, skills: ["Performance Optimization", "Caching", "CDN"], projects: ["Fast App"], resources: ["Web.dev Performance"] },
          { month: 12, skills: ["Advanced Architecture", "Scalability", "Best Practices"], projects: ["Production App"], resources: ["System Design"] }
        ]
      }
    }
  },
  {
    title: "Data Scientist",
    description: "Analyze complex datasets and build machine learning models to derive insights and make data-driven decisions for businesses.",
    requiredSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization", "TensorFlow"],
    averageSalary: "$90,000 - $160,000",
    industryDemand: "High",
    jobTypes: ["Job", "Remote", "Startup"],
    roadmapTemplates: {
      threeMonths: {
        milestones: [
          { month: 1, skills: ["Python Basics", "NumPy", "Pandas"], projects: ["Data Analysis Project"], resources: ["DataCamp", "Kaggle"] },
          { month: 2, skills: ["Exploratory Data Analysis", "Visualization", "Matplotlib"], projects: ["Data Visualization"], resources: ["Matplotlib Docs"] },
          { month: 3, skills: ["Machine Learning Basics", "Scikit-learn", "Model Evaluation"], projects: ["First ML Model"], resources: ["Sklearn Docs"] }
        ]
      },
      sixMonths: {
        milestones: [
          { month: 1, skills: ["Python Advanced", "Data Structures"], projects: ["Data Cleaning"], resources: ["DataCamp"] },
          { month: 2, skills: ["SQL", "Database Queries"], projects: ["Database Analysis"], resources: ["Mode Analytics"] },
          { month: 3, skills: ["Statistics", "Probability", "Hypothesis Testing"], projects: ["Statistical Analysis"], resources: ["Coursera"] },
          { month: 4, skills: ["Machine Learning", "Supervised Learning"], projects: ["Regression & Classification"], resources: ["Andrew Ng Course"] },
          { month: 5, skills: ["Data Visualization", "Tableau/PowerBI"], projects: ["Dashboard Creation"], resources: ["Tableau Training"] },
          { month: 6, skills: ["Model Deployment", "APIs", "MLOps Basics"], projects: ["Deployed Model"], resources: ["Heroku", "AWS SageMaker"] }
        ]
      },
      oneYear: {
        milestones: [
          { month: 1, skills: ["Python Advanced", "OOP"], projects: ["Advanced Scripts"], resources: ["Real Python"] },
          { month: 2, skills: ["SQL Advanced", "Optimization"], projects: ["Complex Queries"], resources: ["SQL Docs"] },
          { month: 3, skills: ["Statistics Advanced", "Distributions"], projects: ["Statistical Modeling"], resources: ["StatQuest"] },
          { month: 4, skills: ["EDA & Visualization"], projects: ["Comprehensive EDA"], resources: ["Kaggle Competitions"] },
          { month: 5, skills: ["Supervised Learning Advanced"], projects: ["Multiple ML Models"], resources: ["Scikit-learn Docs"] },
          { month: 6, skills: ["Unsupervised Learning", "Clustering"], projects: ["Clustering Project"], resources: ["Andrew Ng Course"] },
          { month: 7, skills: ["Deep Learning", "Neural Networks"], projects: ["Neural Net Implementation"], resources: ["Fast.ai"] },
          { month: 8, skills: ["TensorFlow/PyTorch"], projects: ["Deep Learning Project"], resources: ["TensorFlow Docs"] },
          { month: 9, skills: ["NLP Basics", "Text Processing"], projects: ["NLP Project"], resources: ["NLP Specialization"] },
          { month: 10, skills: ["Time Series Analysis"], projects: ["Forecasting Model"], resources: ["Prophet Docs"] },
          { month: 11, skills: ["Model Deployment", "MLOps"], projects: ["Production ML Pipeline"], resources: ["MLflow", "Kubernetes"] },
          { month: 12, skills: ["Advanced Topics", "Research"], projects: ["Research Paper Implementation"], resources: ["ArXiv", "Papers with Code"] }
        ]
      }
    }
  },
  {
    title: "UX/UI Designer",
    description: "Create beautiful and intuitive user interfaces and experiences. Design user flows, wireframes, and high-fidelity mockups for web and mobile applications.",
    requiredSkills: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Thinking", "CSS"],
    averageSalary: "$70,000 - $130,000",
    industryDemand: "High",
    jobTypes: ["Job", "Freelance", "Remote"],
    roadmapTemplates: {
      threeMonths: {
        milestones: [
          { month: 1, skills: ["Design Fundamentals", "Color Theory", "Typography"], projects: ["Design System"], resources: ["Interaction Design Foundation"] },
          { month: 2, skills: ["Figma Basics", "Wireframing", "Prototyping"], projects: ["Website Wireframes"], resources: ["Figma Tutorials"] },
          { month: 3, skills: ["User Research", "Usability Testing", "Design Thinking"], projects: ["UX Research Project"], resources: ["Don Norman Books"] }
        ]
      },
      sixMonths: {
        milestones: [
          { month: 1, skills: ["Design Principles", "Visual Hierarchy"], projects: ["Design Comps"], resources: ["Design of Everyday Things"] },
          { month: 2, skills: ["Figma Advanced", "Components", "Variables"], projects: ["Design System"], resources: ["Figma Docs"] },
          { month: 3, skills: ["User Research Methods"], projects: ["User Interviews"], resources: ["UX Research Methods"] },
          { month: 4, skills: ["Information Architecture", "Wireframing"], projects: ["Complex Wireframes"], resources: ["A List Apart"] },
          { month: 5, skills: ["Visual Design", "Prototyping"], projects: ["High-fidelity Mockups"], resources: ["Dribbble"] },
          { month: 6, skills: ["Interaction Design", "Animation"], projects: ["Interactive Prototypes"], resources: ["Interaction Design"] }
        ]
      },
      oneYear: {
        milestones: [
          { month: 1, skills: ["Design Philosophy", "History"], projects: ["Design Analysis"], resources: ["Design Books"] },
          { month: 2, skills: ["Visual Design Advanced"], projects: ["Brand System"], resources: ["Brand Guidelines"] },
          { month: 3, skills: ["User Research Advanced"], projects: ["User Personas"], resources: ["Research Methods"] },
          { month: 4, skills: ["Information Architecture", "Navigation"], projects: ["IA Frameworks"], resources: ["James Garrett"] },
          { month: 5, skills: ["Interaction Design", "Motion"], projects: ["Animated Prototypes"], resources: ["Motion Design"] },
          { month: 6, skills: ["Usability Testing"], projects: ["User Testing Sessions"], resources: ["Validate Assumptions"] },
          { month: 7, skills: ["Accessibility Design", "WCAG"], projects: ["Accessible Designs"], resources: ["WebAIM"] },
          { month: 8, skills: ["Design Systems", "Component Libraries"], projects: ["Scalable System"], resources: ["Design Systems"] },
          { month: 9, skills: ["Front-end Basics", "HTML/CSS"], projects: ["Coded Designs"], resources: ["CSS Tricks"] },
          { month: 10, skills: ["Design Tools", "Prototyping"], projects: ["Advanced Prototypes"], resources: ["Tool Masterclass"] },
          { month: 11, skills: ["Design Leadership", "Mentoring"], projects: ["Design Documentation"], resources: ["Design Patterns"] },
          { month: 12, skills: ["Specialization", "Portfolio"], projects: ["Amazing Portfolio"], resources: ["Case Studies"] }
        ]
      }
    }
  },
  {
    title: "Cloud Architect",
    description: "Design and implement scalable cloud infrastructure solutions. Work with AWS, Azure, or Google Cloud to build robust and secure systems.",
    requiredSkills: ["AWS", "Azure", "Docker", "Kubernetes", "Linux", "Networking"],
    averageSalary: "$120,000 - $200,000",
    industryDemand: "High",
    jobTypes: ["Job", "Remote"],
    roadmapTemplates: {
      threeMonths: {
        milestones: [
          { month: 1, skills: ["Linux Basics", "Command Line", "Networking"], projects: ["Linux Server Setup"], resources: ["Linux Academy"] },
          { month: 2, skills: ["Docker Basics", "Containerization"], projects: ["Docker Container"], resources: ["Docker Docs"] },
          { month: 3, skills: ["AWS Fundamentals", "EC2", "S3"], projects: ["Simple AWS App"], resources: ["AWS Docs"] }
        ]
      },
      sixMonths: {
        milestones: [
          { month: 1, skills: ["Linux Advanced", "System Administration"], projects: ["Linux Administration"], resources: ["Linux Journey"] },
          { month: 2, skills: ["Networking Advanced", "TCP/IP", "DNS"], projects: ["Network Configuration"], resources: ["CompTIA"] },
          { month: 3, skills: ["Docker Advanced", "Docker Compose"], projects: ["Multi-container App"], resources: ["Docker Compose Docs"] },
          { month: 4, skills: ["Kubernetes Basics", "Containers Orchestration"], projects: ["Kubernetes Deployment"], resources: ["Kubernetes Docs"] },
          { month: 5, skills: ["AWS Services", "RDS", "Lambda", "CloudFront"], projects: ["Serverless App"], resources: ["AWS Whitepapers"] },
          { month: 6, skills: ["Cloud Security", "IAM", "Compliance"], projects: ["Secure Cloud Setup"], resources: ["AWS Security"] }
        ]
      },
      oneYear: {
        milestones: [
          { month: 1, skills: ["Systems Design", "Architecture Patterns"], projects: ["System Design"], resources: ["System Design Books"] },
          { month: 2, skills: ["Linux Advanced", "Kernel Concepts"], projects: ["Custom Linux Setup"], resources: ["Linux Kernel"] },
          { month: 3, skills: ["Advanced Networking", "Load Balancing"], projects: ["Network Design"], resources: ["Network Design"] },
          { month: 4, skills: ["Docker Advanced", "Registry", "Optimization"], projects: ["Optimized Containers"], resources: ["Docker Advanced"] },
          { month: 5, skills: ["Kubernetes Advanced", "Helm", "Operators"], projects: ["K8s Cluster"], resources: ["Kubernetes Advanced"] },
          { month: 6, skills: ["AWS Advanced", "EC2", "RDS", "Lambda"], projects: ["Complex AWS Setup"], resources: ["AWS Solutions"] },
          { month: 7, skills: ["Azure Basics", "Azure Services"], projects: ["Azure Deployment"], resources: ["Azure Docs"] },
          { month: 8, skills: ["GCP Basics", "Google Cloud Services"], projects: ["GCP Setup"], resources: ["GCP Docs"] },
          { month: 9, skills: ["Infrastructure as Code", "Terraform"], projects: ["IaC Infrastructure"], resources: ["Terraform Docs"] },
          { month: 10, skills: ["CI/CD Pipelines", "DevOps"], projects: ["Automated Pipelines"], resources: ["DevOps Handbook"] },
          { month: 11, skills: ["Monitoring & Logging", "Observability"], projects: ["Monitoring Setup"], resources: ["Prometheus", "ELK Stack"] },
          { month: 12, skills: ["High Availability", "Disaster Recovery"], projects: ["HA Architecture"], resources: ["AWS HA Solutions"] }
        ]
      }
    }
  },
  {
    title: "Mobile App Developer",
    description: "Develop native or cross-platform mobile applications for iOS and Android. Create engaging mobile experiences using React Native, Flutter, or native technologies.",
    requiredSkills: ["React Native", "Swift", "Kotlin", "Mobile UI", "APIs", "Git"],
    averageSalary: "$85,000 - $155,000",
    industryDemand: "High",
    jobTypes: ["Job", "Freelance", "Remote", "Startup"],
    roadmapTemplates: {
      threeMonths: {
        milestones: [
          { month: 1, skills: ["JavaScript/TypeScript Basics"], projects: ["Todo App"], resources: ["JavaScript Fundamentals"] },
          { month: 2, skills: ["React Basics", "Components"], projects: ["Simple App"], resources: ["React Docs"] },
          { month: 3, skills: ["React Native Setup", "Navigation"], projects: ["Multi-screen App"], resources: ["React Native Docs"] }
        ]
      },
      sixMonths: {
        milestones: [
          { month: 1, skills: ["JavaScript ES6+"], projects: ["JS Projects"], resources: ["Modern JavaScript"] },
          { month: 2, skills: ["React Fundamentals", "Hooks"], projects: ["React Components"], resources: ["React Docs"] },
          { month: 3, skills: ["React Native Basics"], projects: ["First Mobile App"], resources: ["React Native Docs"] },
          { month: 4, skills: ["Navigation", "State Management"], projects: ["Navigation App"], resources: ["React Navigation"] },
          { month: 5, skills: ["APIs", "Networking", "Authentication"], projects: ["API Integration"], resources: ["Axios Docs"] },
          { month: 6, skills: ["App Publishing", "Testing"], projects: ["Live App"], resources: ["App Store Docs"] }
        ]
      },
      oneYear: {
        milestones: [
          { month: 1, skills: ["JavaScript Advanced"], projects: ["Advanced JS"], resources: ["You Don't Know JS"] },
          { month: 2, skills: ["TypeScript Basics"], projects: ["Typed Code"], resources: ["TypeScript Docs"] },
          { month: 3, skills: ["React Advanced", "Performance"], projects: ["Optimized React"], resources: ["Advanced React"] },
          { month: 4, skills: ["React Native Advanced"], projects: ["Complex App"], resources: ["React Native Advanced"] },
          { month: 5, skills: ["State Management", "Redux/Context"], projects: ["Redux App"], resources: ["Redux Docs"] },
          { month: 6, skills: ["Navigation Advanced"], projects: ["Complex Navigation"], resources: ["React Navigation Advanced"] },
          { month: 7, skills: ["APIs & Backend", "GraphQL"], projects: ["GraphQL Integration"], resources: ["GraphQL Docs"] },
          { month: 8, skills: ["Testing", "Unit & Integration"], projects: ["Tested App"], resources: ["Jest", "React Testing Library"] },
          { month: 9, skills: ["Native Modules", "Swift/Kotlin"], projects: ["Native Integration"], resources: ["Swift Docs"] },
          { month: 10, skills: ["Performance Optimization"], projects: ["Fast App"], resources: ["Performance"] },
          { month: 11, skills: ["Security & Privacy"], projects: ["Secure App"], resources: ["OWASP Mobile"] },
          { month: 12, skills: ["Advanced Topics", "AR/VR"], projects: ["Advanced Features"], resources: ["Advanced Tech"] }
        ]
      }
    }
  },
  {
    title: "DevOps Engineer",
    description: "Build and maintain infrastructure, automate deployments, and ensure system reliability. Bridge the gap between development and operations.",
    requiredSkills: ["Docker", "Kubernetes", "Jenkins", "Linux", "Python", "AWS"],
    averageSalary: "$100,000 - $180,000",
    industryDemand: "High",
    jobTypes: ["Job", "Remote"],
    roadmapTemplates: {
      threeMonths: {
        milestones: [
          { month: 1, skills: ["Linux Basics", "Shell Scripting"], projects: ["Bash Scripts"], resources: ["Linux Academy"] },
          { month: 2, skills: ["Git", "Version Control"], projects: ["Git Workflow"], resources: ["Git Docs"] },
          { month: 3, skills: ["Docker Fundamentals"], projects: ["Containerized App"], resources: ["Docker Docs"] }
        ]
      },
      sixMonths: {
        milestones: [
          { month: 1, skills: ["Linux Advanced", "System Admin"], projects: ["Linux Administration"], resources: ["Linux Journey"] },
          { month: 2, skills: ["Shell Scripting Advanced"], projects: ["Automation Scripts"], resources: ["Bash Guide"] },
          { month: 3, skills: ["Git Advanced", "GitHub", "GitLab"], projects: ["Git Workflows"], resources: ["Git Advanced"] },
          { month: 4, skills: ["Docker Advanced", "Docker Compose"], projects: ["Docker Setup"], resources: ["Docker Docs"] },
          { month: 5, skills: ["CI/CD Basics", "Jenkins"], projects: ["CI/CD Pipeline"], resources: ["Jenkins Docs"] },
          { month: 6, skills: ["Cloud Basics", "AWS Fundamentals"], projects: ["AWS Deployment"], resources: ["AWS Docs"] }
        ]
      },
      oneYear: {
        milestones: [
          { month: 1, skills: ["Systems Design", "Architecture"], projects: ["Architecture Design"], resources: ["System Design"] },
          { month: 2, skills: ["Linux Advanced", "Kernel Tuning"], projects: ["Optimized Linux"], resources: ["Linux Advanced"] },
          { month: 3, skills: ["Python for DevOps"], projects: ["Python Automation"], resources: ["Python for DevOps"] },
          { month: 4, skills: ["Advanced Networking"], projects: ["Network Setup"], resources: ["Networking"] },
          { month: 5, skills: ["Docker Advanced", "Registry"], projects: ["Container Registry"], resources: ["Docker Registry"] },
          { month: 6, skills: ["Kubernetes Basics"], projects: ["K8s Deployment"], resources: ["Kubernetes Docs"] },
          { month: 7, skills: ["Kubernetes Advanced"], projects: ["K8s Cluster"], resources: ["Kubernetes Advanced"] },
          { month: 8, skills: ["CI/CD Advanced", "GitOps"], projects: ["Advanced CI/CD"], resources: ["GitOps"] },
          { month: 9, skills: ["Infrastructure as Code"], projects: ["Terraform Setup"], resources: ["Terraform Docs"] },
          { month: 10, skills: ["Monitoring & Logging"], projects: ["Observability Setup"], resources: ["ELK Stack"] },
          { month: 11, skills: ["Security & Compliance"], projects: ["Secure Infrastructure"], resources: ["OWASP"] },
          { month: 12, skills: ["Advanced Topics", "Service Mesh"], projects: ["Advanced Setup"], resources: ["Istio"] }
        ]
      }
    }
  }
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing careers
    await Career.deleteMany({});
    console.log("Cleared existing careers");

    // Insert new careers
    const result = await Career.insertMany(careersData);
    console.log(`✅ Successfully seeded ${result.length} careers`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();
