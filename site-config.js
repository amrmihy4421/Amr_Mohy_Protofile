/* Edit verified personal details and portfolio entries here. */
window.portfolioData = {
  personal: {
    name: "Amr Mohy",
    title: "Full Stack Developer",
    location: "Based in Egypt · Working worldwide",
    email: "amrmohy4421@gmail.com",
    linkedin: "https://www.linkedin.com/in/amr-mohy-148041369?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "https://github.com/amrmihy4421",
    portrait: "assets/amr-mohy-portrait.jpeg"
  },
  education: {
    university: "Damietta University",
    program: "Computer Science and Artificial Intelligence",
    startYear: "2022",
    endYear: "2026"
  },
  kiraStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "PostgreSQL", "Cloudinary", "Vercel", "Git", "GitHub"],
  skills: [
    { number: "01", title: "Frontend", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive design", "Flexbox & CSS Grid", "DOM manipulation", "Client-side state & UI interactions", "UI implementation", "Cross-browser fundamentals", "Accessibility fundamentals"] },
    { number: "02", title: "Backend Development", items: ["Node.js", "Express.js", "Python", "Flask", "REST API development", "REST API integration", "Authentication & session management", "Authorization", "Middleware", "Server-side validation", "Error handling", "Business logic", "API integration"] },
    { number: "03", title: "Databases", items: ["PostgreSQL", "MySQL", "SQL", "Relational data modeling", "Database relationships", "Constraints & foreign keys", "Indexes", "Transactions", "Data integrity"] },
    { number: "04", title: "AI & LLM Integration", items: ["Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "Groq API integration", "LLM application development", "AI application fundamentals", "AI chatbot development"] },
    { number: "05", title: "Search & Knowledge Retrieval", items: ["Qdrant", "Vector search", "Semantic search", "Embeddings", "Sentence Transformers", "PDF text extraction", "LangSmith"] },
    { number: "06", title: "Deployment & media", items: ["Vercel", "Cloudinary", "Environment configuration", "Production deployment", "Image upload workflows"] },
    { number: "07", title: "Tools & practices", items: ["Git", "GitHub", "Visual Studio Code", "npm", "Debugging", "Modular code organization", "Input validation", "Role-based access control", "Application troubleshooting"] }
  ],
  projects: [
    {
      number: "01", title: "KiRA Women’s Wear", type: "E-commerce web application", role: "Full Stack Developer · Client project",
      description: "A full-stack e-commerce experience designed for a women’s fashion retailer, integrating product browsing, search, shopping workflows, store administration, and database-backed operations.",
      challenges: ["Integrating the main application layers", "Managing products, images, and orders", "Delivering a usable shopping experience"],
      solutions: ["Connected the frontend to backend APIs and a relational database", "Integrated product and media management workflows", "Deployed the application for real-world access"],
      result: "Delivered a live, end-to-end retail web application that demonstrates the practical application of full-stack development.",
      live: "https://kira-womens-wear.vercel.app",
      image: "assets/Kira website.png",
      imageAlt: "KiRA Women’s Wear store dashboard screenshot showing its admin navigation, product and order summary, and recently added pieces.",
      imagePlaceholder: ""
    },
    {
      number: "02",
      title: "DyspnEA",
      type: "AI application",
      role: "AI-Powered Respiratory Health Assistant",
      description: "A conversational respiratory-health assistant that retrieves context from PDF medical references with RAG, uses web search when local results are insufficient, and generates responses with OpenAI GPT-OSS-20B through Groq.",
      challenges: [
        "Grounding respiratory-health conversations in relevant medical reference material.",
        "Providing a fallback retrieval source when local reference search is insufficient."
      ],
      solutions: [
        "Extracted PDF text with pdfplumber, split it into overlapping chunks, generated embeddings, and stored vectors in Qdrant.",
        "Used paraphrase-multilingual-MiniLM-L12-v2 for semantic retrieval, with web search as a fallback below the configured similarity threshold.",
        "Generated context-aware responses with OpenAI GPT-OSS-20B through the Groq API and handled chat requests through Flask's /chat endpoint.",
        "Implemented authentication, guest access, sessions, conversation history, medical profiles, language and theme controls, and a daily message limit.",
        "Added client-side handling for questions, responses, sources, and previous conversations; used LangSmith for RAG tracing and observability."
      ],
      result: "A conversational web application that combines local medical-document retrieval with fallback web search.",
      image: "assets/DyspnEA.jpeg",
      imageAlt: "DyspnEA health assistant chat interface with suggested prompts and a previous-chats sidebar.",
      imagePlaceholder: ""
    }
  ],
  services: [
    { number: "01", title: "Business websites", description: "Professional, responsive websites that establish a strong online presence and communicate your business clearly.", keywords: "Business website · Responsive website · Custom website" },
    { number: "02", title: "E-commerce development", description: "Online stores with product catalogs, categories, search, shopping carts, checkout workflows, and product management.", keywords: "Online store · Product catalog · Shopping cart" },
    { number: "03", title: "Full stack web applications", description: "Custom applications connecting frontend interfaces, backend logic, databases, and external services.", keywords: "Full stack · Custom application · End-to-end development" },
    { number: "04", title: "Backend & API development", description: "RESTful APIs, server-side business logic, authentication, authorization, database integration, and third-party service connections.", keywords: "Node.js · Express.js · REST APIs" },
    { number: "05", title: "Database design & integration", description: "Structured schemas, relational data modeling, SQL integration, and reliable data-handling workflows.", keywords: "PostgreSQL · MySQL · SQL" },
    { number: "06", title: "Deployment & launch", description: "Deployment configuration, environment variables, production setup, and application publishing on suitable hosting platforms.", keywords: "Vercel · Configuration · Production launch" },
    { number: "07", title: "AI application integration", description: "Connecting suitable AI capabilities to web applications, including retrieval-based workflows where appropriate.", keywords: "AI integration · RAG fundamentals · AI-powered applications" }
  ],
  experienceEntries: [
    {
      number: "01",
      category: "Professional training",
      title: "Backend Development Trainee",
      organization: "Information Technology Industry Development Agency (ITIDA)",
      period: "September 2026 – October 2026",
      description: "Participated in backend development training focused on server-side programming, API development, and database integration.",
      detailLabel: "Relevant technical areas",
      highlights: [
        "Developed practical skills in server-side application development with Node.js and Express.js.",
        "Built RESTful APIs for application logic and client-server communication.",
        "Used PostgreSQL and SQL for relational data management and CRUD operations.",
        "Worked with backend application logic, data management, and frontend-to-backend integration.",
        "Covered authentication and authorization, input validation, and error handling in training workflows."
      ],
      technologies: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "SQL", "Authentication", "Authorization", "Input validation", "Error handling"]
    },
    {
      number: "02",
      category: "Professional training",
      title: "Frontend Development Trainee",
      organization: "National Telecommunication Institute (NTI)",
      period: "October 2026 – December 2026",
      status: "In Progress",
      description: "Currently developing frontend web development skills through structured training and practical exercises.",
      detailLabel: "Current learning areas",
      highlights: [
        "Developing responsive web interfaces using HTML5, CSS3, and JavaScript.",
        "Practicing Flexbox and CSS Grid for adaptable user interfaces.",
        "Implementing interactive features with JavaScript and DOM manipulation.",
        "Learning to structure, style, and maintain accessible, user-friendly web pages.",
        "Strengthening frontend skills through hands-on exercises and practical projects."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive design", "Flexbox", "CSS Grid", "DOM manipulation"]
    },
    {
      number: "03",
      category: "Training certificate",
      title: "AI Hackathons Training Certificate",
      organization: "ITIDA × Orange Digital Center × Instant",
      period: "August 16–20, 2026",
      description: "Completed a 40-hour AI training and project-development program, including practical AI agent exercises and Grok API integration.",
      detailLabel: "Program highlights",
      highlights: [
        "Explored AI agents and practical applications for intelligent task execution.",
        "Worked with the Grok API, including API requests and AI-generated response handling.",
        "Explored practical applications of AI agents in software workflows."
      ],
      technologies: ["AI agents", "Grok API", "API integration", "Response handling"],
      certificate: "assets/AI.jpeg",
      certificateAlt: "AI Hackathons certificate of attendance and performance awarded to Amr Mohy for participation from August 16 to 20, 2026."
    }
  ]
};
