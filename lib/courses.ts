export type CourseModule = { name: string; topics: string[] };

export type Course = {
  slug: string;
  num: string;
  name: string;
  /** one line for lists */
  short: string;
  tagline: string;
  seoDescription: string;
  whoFor: string;
  prerequisite: string;
  level: string;
  /** Beginner: start from zero. Advanced: professional tracks. */
  track: "beginner" | "advanced";
  /** Set when the fee is final, e.g. "PKR 25,000". Until then the site says it is shared on WhatsApp. */
  fee?: string;
  /** e.g. "3 months". Leave unset until confirmed. */
  duration?: string;
  /** Internship offered after the course. */
  internship: boolean;
  outcomes: [string, string, string];
  modules: CourseModule[];
  projects: string[];
  tools: string[];
  faqs: { q: string; a: string }[];
};

/** Asked on every course page. Fee, dates and duration are deliberately not stated: they change by batch. */
export const commonCourseFaqs = [
  {
    q: "Is this only lectures?",
    a: "No. We do not just teach, we give you full hands-on experience. In every session you work on real tasks yourself, and every module ends with something you build.",
  },
  {
    q: "What is the fee, and when does the next batch start?",
    a: "Fee and batch dates change from batch to batch, so we share them on WhatsApp. Send the admission form and we reply with the current details.",
  },
  {
    q: "Do I need my own laptop?",
    a: "For design, coding and AI courses, yes, you will practise a lot between classes. Tell us what you have and we will say whether it is enough.",
  },
  {
    q: "Will I build real projects?",
    a: "You build. Every module ends with something you make yourself, and the course finishes with a project for your portfolio.",
  },
];

export const courses: Course[] = [
  {
    slug: "graphic-designing",
    track: "beginner",
    num: "01",
    name: "Graphic Designing",
    short: "Beginner level: design basics, Photoshop, Illustrator and Canva.",
    tagline: "Design logos, posters and brand kits that businesses pay for.",
    seoDescription:
      "Graphic Designing course at Kataf Academy: design basics, Photoshop, Illustrator, branding and print design, ending with a client-ready portfolio.",
    whoFor:
      "School and college students, press and shop staff who want to move into design, and anyone who wants to start freelance design work. You do not need to draw. You need to be willing to look closely.",
    prerequisite: "No experience needed. You start from zero.",
    level: "Beginner",
    internship: true,
    outcomes: [
      "Design a logo and brand kit from a blank page.",
      "Prepare files that print correctly at a real press.",
      "Show a portfolio you can send to clients.",
    ],
    modules: [
      { name: "Design basics", topics: ["Layout and grids", "Visual hierarchy", "Space and balance", "Reading a client brief"] },
      { name: "Colour and typography", topics: ["Colour theory and palettes", "Pairing fonts", "English and Urdu typography", "Readable text on posters"] },
      { name: "Photoshop essentials", topics: ["Photo editing and retouching", "Layers and masks", "Social media posts"] },
      { name: "Illustrator essentials", topics: ["Vector drawing", "Building a simple logo", "Icons", "Exporting for web and print"] },
      { name: "Canva and quick designs", topics: ["Templates done properly", "Brand colours and fonts", "Posts, banners and presentations"] },
      { name: "Your first portfolio", topics: ["Choosing your best work", "Presenting it clearly", "Setting up an online profile"] },
    ],
    projects: [
      "A logo for a local business",
      "A visiting card and flyer, ready to print",
      "A social media pack for a shop",
      "A starter portfolio of three pieces",
    ],
    tools: ["Photoshop", "Illustrator", "Figma", "Canva"],
    faqs: [
      {
        q: "I cannot draw. Can I still learn graphic design?",
        a: "Yes. Most professional design is layout, type and colour, not drawing. We teach those first.",
      },
      {
        q: "Will I learn to prepare files for printing?",
        a: "Yes. There is a full print design module: bleed, CMYK, safe margins and how to hand files to a press.",
      },
    ],
  },
  {
    slug: "web-development",
    track: "beginner",
    num: "02",
    name: "Web Development",
    short: "HTML, CSS and JavaScript: build and launch real websites.",
    tagline: "Build fast, good-looking websites from scratch, and put them online.",
    seoDescription:
      "Web Development (frontend) course at Kataf Academy: HTML, CSS, JavaScript, responsive design, Git and deployment, with a real website as your final project.",
    whoFor:
      "Beginners who want to become frontend developers, students looking for a first tech skill, and shop or clinic owners who want to understand how their own website is made.",
    prerequisite: "No experience needed. You should be comfortable using a computer.",
    level: "Beginner",
    internship: true,
    outcomes: [
      "Build a responsive website without a template.",
      "Write JavaScript that makes a page interactive.",
      "Publish your site on a real domain.",
    ],
    modules: [
      { name: "How the web works", topics: ["Browsers, servers and domains", "How a page loads", "Setting up your editor"] },
      { name: "HTML", topics: ["Semantic structure", "Forms and inputs", "Images, links and media", "Accessibility basics"] },
      { name: "CSS", topics: ["The box model", "Flexbox and Grid", "Responsive design for small phones", "Typography and spacing"] },
      { name: "JavaScript fundamentals", topics: ["Variables, functions, arrays", "The DOM and events", "Fetching data from an API", "Debugging in the browser"] },
      { name: "Git and GitHub", topics: ["Commits and branches", "Working from a repository", "Publishing your code"] },
      { name: "Tailwind CSS", topics: ["Utility-first styling", "Building components", "Design tokens"] },
      { name: "Deploying", topics: ["Hosting a site", "Connecting a domain", "Basic performance checks"] },
      { name: "Capstone", topics: ["A complete website for a real local business"] },
    ],
    projects: [
      "Personal portfolio site",
      "Responsive landing page for a shop",
      "A small interactive app in JavaScript",
      "Final website for a local business, hosted live",
    ],
    tools: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Git", "VS Code"],
    faqs: [
      {
        q: "Is this the same as Full Stack Development?",
        a: "No. This course covers what people see in the browser. Full Stack adds React, Next.js, backend and databases on top of it.",
      },
      {
        q: "Can I continue to Backend or Full Stack afterwards?",
        a: "Yes. This is the first step of that path, and we will tell you where to join next.",
      },
    ],
  },
  {
    slug: "backend-development",
    track: "advanced",
    num: "03",
    name: "Backend Development",
    short: "APIs, databases, logins and deployment.",
    tagline: "Build the server side: APIs, databases and secure logins.",
    seoDescription:
      "Backend Development course at Kataf Academy: Node.js, REST APIs, PostgreSQL, authentication, security and deployment, ending with a real API project.",
    whoFor:
      "People who already know basic JavaScript and want to build what runs behind a website or app: orders, users, payments and reports.",
    prerequisite: "Basic JavaScript. If you have finished our Web Development course, you are ready.",
    level: "Needs JS basics",
    internship: true,
    outcomes: [
      "Design and build a REST API.",
      "Store and query data in PostgreSQL.",
      "Add logins and protect user data.",
    ],
    modules: [
      { name: "Node.js and JavaScript on the server", topics: ["Running JavaScript outside the browser", "Modules and packages", "Async code and promises"] },
      { name: "HTTP and REST APIs", topics: ["Requests, responses, status codes", "Designing endpoints", "Validating input"] },
      { name: "Databases and SQL", topics: ["Tables and relations", "Writing queries", "PostgreSQL in practice", "Using an ORM"] },
      { name: "Authentication and security", topics: ["Passwords and sessions", "Roles and permissions", "Common attacks and how to block them"] },
      { name: "Files, email and payments", topics: ["Uploads", "Sending email", "How payment gateways work"] },
      { name: "Testing and deployment", topics: ["Testing an API", "Environment variables", "Deploying and reading logs"] },
      { name: "Capstone", topics: ["A complete API for a business system such as orders, stock or installments"] },
    ],
    projects: [
      "A notes or tasks API with logins",
      "A shop backend: products, orders and customers",
      "Final: a working business API with a database, deployed",
    ],
    tools: ["Node.js", "PostgreSQL", "REST", "Git", "Postman"],
    faqs: [
      {
        q: "I have never coded. Can I start here?",
        a: "Start with Web Development first. Backend assumes you can already write basic JavaScript.",
      },
    ],
  },
  {
    slug: "full-stack-development",
    track: "advanced",
    num: "04",
    name: "Full Stack Development",
    short: "Frontend, backend and database, built into one complete app.",
    tagline: "Learn frontend and backend together, and build a complete application.",
    seoDescription:
      "Full Stack Development course at Kataf Academy: HTML, CSS, JavaScript, React, Next.js, Node.js, PostgreSQL and deployment, with a complete app as your capstone.",
    whoFor:
      "Beginners who want one complete path to becoming a developer, and learners who want to build whole products by themselves, as a freelancer or inside a company.",
    prerequisite: "No experience needed. This is the longest path, and it starts from zero.",
    level: "Career track",
    internship: true,
    outcomes: [
      "Build a complete web app, frontend to database.",
      "Use React and Next.js the way teams do.",
      "Deploy an app that real users can log in to.",
    ],
    modules: [
      { name: "Web foundations", topics: ["HTML, CSS, responsive layout", "Tailwind CSS", "Git and GitHub"] },
      { name: "JavaScript and TypeScript", topics: ["Core JavaScript", "TypeScript basics", "Working with APIs"] },
      { name: "React", topics: ["Components and props", "State and hooks", "Forms and validation"] },
      { name: "Next.js", topics: ["Routing and layouts", "Server and client components", "Route handlers and forms"] },
      { name: "Backend and databases", topics: ["Node.js APIs", "PostgreSQL and SQL", "Using an ORM"] },
      { name: "Authentication and security", topics: ["Logins and sessions", "Roles", "Protecting data"] },
      { name: "Deployment", topics: ["Hosting, domains and environment variables", "Monitoring and fixing"] },
      { name: "Capstone", topics: ["A full application for a real business use case, built and presented"] },
    ],
    projects: [
      "Responsive personal site",
      "React app that talks to an API",
      "Full app with logins, a database and an admin screen",
      "Capstone: a business app such as a small ERP, deployed live",
    ],
    tools: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Git"],
    faqs: [
      {
        q: "Should I take Full Stack or Frontend and Backend separately?",
        a: "Full Stack is one connected path and the best choice if you want to build whole apps. Frontend and Backend separately suit you if you only want one side.",
      },
    ],
  },
  {
    slug: "ai",
    track: "beginner",
    num: "05",
    name: "AI Skills",
    short: "Use AI for work, automate tasks, and build with AI APIs.",
    tagline: "Use AI to work faster, then learn to build things with it.",
    seoDescription:
      "AI Skills course at Kataf Academy: prompting, AI tools for work, automation, and building assistants with AI APIs.",
    whoFor:
      "Students, freelancers and business owners who want to use AI properly in their work, and learners with some coding who want to build AI features into real products.",
    prerequisite: "The tools and prompting modules need no experience. The building modules assume basic programming.",
    level: "All levels",
    internship: true,
    outcomes: [
      "Write prompts that give reliable results.",
      "Automate repeated tasks with AI and no-code tools.",
      "Build a simple AI assistant for a business.",
    ],
    modules: [
      { name: "How AI models work", topics: ["What a language model is, in plain words", "What it does well and badly", "Why it makes mistakes"] },
      { name: "Prompting that works", topics: ["Giving clear instructions", "Context and examples", "Checking and correcting answers"] },
      { name: "AI tools for work", topics: ["Writing and research", "Design and images", "Coding help", "Presentations and documents"] },
      { name: "Automation", topics: ["Connecting AI to everyday tools", "Repeating tasks automatically", "Building a small workflow"] },
      { name: "Building with AI APIs", topics: ["Calling a model from code", "Handling responses", "Keeping costs under control"] },
      { name: "An assistant for a business", topics: ["Answering customer questions", "Using your own documents", "Testing it before it goes live"] },
      { name: "Using AI responsibly", topics: ["Privacy of customer data", "When not to trust it", "Telling clients honestly how you used it"] },
    ],
    projects: [
      "A prompt library for your own work",
      "An automated workflow that saves you a daily task",
      "A small AI assistant for a business use case",
    ],
    tools: ["ChatGPT", "Claude", "AI image tools", "No-code automation", "AI APIs"],
    faqs: [
      {
        q: "Do I need to know programming?",
        a: "Not for the first half. You learn to use AI tools and prompting without code. The module on building with APIs assumes basic programming.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    track: "beginner",
    num: "06",
    name: "Digital Marketing",
    short: "Get customers online with ads, content and analytics.",
    tagline: "Get customers online: social media, ads, search and WhatsApp.",
    seoDescription:
      "Digital Marketing course at Kataf Academy: social media, Meta ads, Google search, content, AI tools for marketing, WhatsApp and analytics.",
    whoFor:
      "Shop and business owners who want to bring in customers online, students who want a marketing career, and freelancers who want to run campaigns for clients.",
    prerequisite: "No experience needed.",
    level: "Beginner",
    internship: true,
    outcomes: [
      "Plan and run a campaign from start to finish.",
      "Read the numbers and know what is working.",
      "Use AI tools to write and design faster.",
    ],
    modules: [
      { name: "Marketing basics", topics: ["Audience and offer", "How customers decide", "Setting a goal and a budget"] },
      { name: "Social media", topics: ["Facebook, Instagram and TikTok", "Content calendars", "Posts and short video"] },
      { name: "Meta Ads", topics: ["Campaign structure", "Targeting", "Budgets and testing", "Reading results"] },
      { name: "Google and SEO", topics: ["Google Business Profile", "Search basics", "Search ads", "Local search"] },
      { name: "Content and copywriting", topics: ["Writing that sells", "Product and offer pages", "Using AI to draft and improve"] },
      { name: "WhatsApp marketing", topics: ["WhatsApp Business and catalogue", "Broadcast lists, used respectfully", "Following up on enquiries"] },
      { name: "Analytics and reporting", topics: ["What to measure", "Simple dashboards", "Reporting to a client"] },
      { name: "Freelancing and agency work", topics: ["Finding clients", "Proposals and pricing", "Managing several accounts"] },
    ],
    projects: [
      "A 30-day content calendar for a real business",
      "A live ad campaign with a small budget",
      "A one-page performance report",
    ],
    tools: ["Meta Business Suite", "Google Business Profile", "Google Analytics", "Canva", "AI writing tools"],
    faqs: [
      {
        q: "Is ad budget included in the fee?",
        a: "No. You will spend a small budget on your own practice campaign. We tell you a sensible amount before you start.",
      },
    ],
  },
  {
    slug: "video-editing",
    track: "beginner",
    num: "07",
    name: "Video Editing",
    short: "Cut, grade and publish videos for social media and clients.",
    tagline: "Edit videos people want to watch, and publish them.",
    seoDescription:
      "Video Editing course at Kataf Academy: editing, audio, colour, captions, short-form video and business videos, with hands-on projects and an internship.",
    whoFor:
      "Students, content creators and shop owners who want to make professional videos, and anyone who wants to start freelance editing work.",
    prerequisite: "No experience needed.",
    level: "Beginner",
    internship: true,
    outcomes: [
      "Edit a video from raw footage to a finished export.",
      "Clean up audio and add music, captions and titles.",
      "Deliver videos that clients can publish straight away.",
    ],
    modules: [
      { name: "Editing basics", topics: ["The timeline and cutting", "Pacing and story", "Organising a project"] },
      { name: "Audio", topics: ["Cleaning voice recordings", "Music and sound effects", "Voiceovers"] },
      { name: "Colour", topics: ["Correcting exposure and white balance", "Colour grading", "Matching shots"] },
      { name: "Titles, captions and motion", topics: ["Titles and lower thirds", "Captions", "Simple motion graphics"] },
      { name: "Short-form video", topics: ["Reels, TikTok and Shorts", "Vertical framing", "Hooks and retention"] },
      { name: "Business videos", topics: ["Product videos", "Ads and promos", "Event and wedding highlights"] },
      { name: "Export and freelancing", topics: ["Export settings by platform", "Delivering to clients", "Pricing and proposals"] },
    ],
    projects: [
      "A short social media video with captions",
      "A product promo for a local shop",
      "An event highlight reel",
      "A portfolio reel of your best work",
    ],
    tools: ["Premiere Pro", "DaVinci Resolve", "CapCut", "After Effects basics"],
    faqs: [
      {
        q: "Do I need a powerful computer?",
        a: "A mid-range laptop is enough to start. Tell us what you have and we will say whether it will cope.",
      },
    ],
  },
  {
    slug: "computer-essentials",
    track: "beginner",
    num: "08",
    name: "Computer Essentials",
    short: "Microsoft Word, Excel, PowerPoint, email and everyday computer skills.",
    tagline: "Learn the computer skills every office job asks for.",
    seoDescription:
      "Computer Essentials course at Kataf Academy: typing, Microsoft Word, Excel and PowerPoint, Google Workspace and email, all hands-on.",
    whoFor:
      "School and college students, job seekers, office staff and business owners who want to use a computer confidently for everyday work.",
    prerequisite: "No experience needed. You do not need to have used a computer before.",
    level: "Beginner",
    internship: true,
    outcomes: [
      "Write, format and print professional documents.",
      "Build spreadsheets with formulas, tables and charts.",
      "Create clear presentations and share files with others.",
    ],
    modules: [
      { name: "Computer and files", topics: ["Using Windows", "Files, folders and storage", "Printers and everyday setup"] },
      { name: "Typing and shortcuts", topics: ["Touch typing", "Keyboard shortcuts", "Working faster"] },
      { name: "Internet, email and safety", topics: ["Searching properly", "Professional email", "Passwords and online safety"] },
      { name: "Microsoft Word", topics: ["Formatting and styles", "CVs, letters and reports", "Tables, images and printing"] },
      { name: "Microsoft Excel", topics: ["Formulas and functions", "Tables, sorting and filters", "Charts and simple reports"] },
      { name: "Microsoft PowerPoint", topics: ["Slide design", "Presenting with confidence", "Charts and images"] },
      { name: "Google Workspace", topics: ["Docs, Sheets and Slides", "Sharing and working together", "Drive and forms"] },
    ],
    projects: [
      "A formatted CV and cover letter in Word",
      "An expense or sales tracker in Excel",
      "A ten-slide presentation",
      "A shared Google Docs and Sheets team project",
    ],
    tools: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Google Workspace"],
    faqs: [
      {
        q: "I have never used a computer. Can I join?",
        a: "Yes. The course starts with the very basics and builds up from there.",
      },
    ],
  },
  {
    slug: "graphic-designing-advanced",
    track: "advanced",
    num: "09",
    name: "Advanced Graphic Designing",
    short: "Brand systems, advanced Photoshop and Illustrator, InDesign, packaging and UI.",
    tagline: "Move from making designs to leading brand and campaign work.",
    seoDescription:
      "Advanced Graphic Designing course at Kataf Academy: brand identity systems, advanced Photoshop and Illustrator, InDesign layouts, packaging, Figma and client workflow, all hands-on.",
    whoFor:
      "Designers who already know the basics and want to work at a professional level: brand identities, packaging, editorial layouts and campaigns for real clients.",
    prerequisite: "You should already be comfortable with Photoshop and Illustrator. If you have finished our beginner Graphic Designing course, you are ready.",
    level: "Needs design basics",
    internship: true,
    outcomes: [
      "Design a complete brand identity system.",
      "Produce packaging and editorial layouts that are ready for production.",
      "Run a design project from brief to final delivery.",
    ],
    modules: [
      { name: "Brand identity systems", topics: ["Brand strategy and research", "Logo systems and variations", "Brand guidelines"] },
      { name: "Advanced Illustrator", topics: ["Custom lettering and logotypes", "Complex vector illustration", "Patterns and icon sets"] },
      { name: "Advanced Photoshop", topics: ["Compositing and manipulation", "Professional retouching", "Mockups and presentation"] },
      { name: "Layout with InDesign", topics: ["Grids and editorial layout", "Brochures, catalogues and books", "Preparing multi-page files"] },
      { name: "Packaging design", topics: ["Dielines and structure", "Labels and boxes", "Print finishes and production"] },
      { name: "Visual design in Figma", topics: ["Interface basics", "Design systems", "Social and web campaign visuals"] },
      { name: "Print production", topics: ["Colour management", "Working with presses", "Pre-press checks"] },
      { name: "Client workflow and pricing", topics: ["Briefs, rounds and approvals", "Proposals and pricing", "Presenting concepts"] },
    ],
    projects: [
      "A full brand identity with guidelines",
      "A packaging design with a dieline",
      "A multi-page brochure or catalogue",
      "A professional portfolio with case studies",
    ],
    tools: ["Photoshop", "Illustrator", "InDesign", "Figma"],
    faqs: [
      {
        q: "Do I need the beginner course first?",
        a: "Not if you already work comfortably in Photoshop and Illustrator. Tell us what you can do and we will suggest where to start.",
      },
    ],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
