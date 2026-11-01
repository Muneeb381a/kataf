/** What every Kataf Academy course includes, and how admission works. */
export const includes = [
  {
    t: "Learn by building",
    d: "Every module ends with something you make yourself, and every course ends with a project.",
  },
  {
    t: "Certificate on completion",
    d: "When you finish the course and its final project, you receive a Kataf Academy certificate with a unique ID. Anyone can check it online.",
  },
  {
    t: "Internship",
    d: "After the course, you move on to an internship and work on real projects with our team.",
  },
  {
    t: "A portfolio you can show",
    d: "You leave with finished work to put in front of employers and clients.",
  },
];

export const internshipSteps = [
  { t: "Finish the course", d: "Complete every module and the final project." },
  { t: "Get your certificate", d: "Awarded on completion, with a unique ID you can verify online." },
  { t: "Join the internship", d: "Work on real tasks alongside the team. Dates and terms are explained at admission." },
  { t: "Leave with experience", d: "Real work you can describe in an interview and show in your portfolio." },
];

export const admission = [
  { t: "Ask", d: "Message us or send the form. Ask anything first, with no commitment." },
  { t: "Get the details", d: "We reply with the fee, the next batch date and what to bring, before you decide." },
  { t: "Join", d: "Confirm your seat and start with the rest of the batch." },
];

/** What an intern in each course could work on. Terms (dates, stipend) are explained at admission, not promised here. */
export const internshipRoles: Record<string, { role: string; summary: string; tasks: [string, string, string]; practise: string }> = {
  "graphic-designing": {
    role: "Design intern",
    summary: "Work with the team on design jobs for real businesses.",
    tasks: [
      "Social media posts and brand kits for client businesses",
      "Print-ready files for visiting cards, flyers and flex",
      "Layouts reviewed and corrected with a senior designer",
    ],
    practise: "Briefs, deadlines and client feedback",
  },
  "web-development": {
    role: "Frontend intern",
    summary: "Build and fix real pages that people will visit.",
    tasks: [
      "Build and fix pages on client websites",
      "Make layouts work properly on small phones",
      "Hand over code through Git, reviewed by the team",
    ],
    practise: "Real briefs, code review and deadlines",
  },
  "backend-development": {
    role: "Backend intern",
    summary: "Work on the server side of real business systems.",
    tasks: [
      "Build API endpoints and database features",
      "Add validation and fix bugs in business systems",
      "Test and release changes together with the team",
    ],
    practise: "Databases, security and working in a team repository",
  },
  "full-stack-development": {
    role: "Full stack intern",
    summary: "Take a feature from the screen all the way to the database.",
    tasks: [
      "Build one feature end to end, screen to database",
      "Work on the kind of systems built for presses, shops and clinics",
      "Join reviews and release to a live app",
    ],
    practise: "Shipping, reviews and owning a piece of the product",
  },
  ai: {
    role: "AI intern",
    summary: "Turn what you learned into tools a team can actually use.",
    tasks: [
      "Build small automations that save a team time",
      "Prototype an assistant using AI APIs",
      "Test it on real examples and report where it fails",
    ],
    practise: "Testing honestly and using AI responsibly",
  },
  "digital-marketing": {
    role: "Marketing intern",
    summary: "Plan, run and report on real campaigns.",
    tasks: [
      "Plan a content calendar for a real business",
      "Help run and report a small ad campaign",
      "Write copy and prepare posts, checked by a lead",
    ],
    practise: "Numbers, deadlines and client communication",
  },
};

export const internshipGets = [
  "Real tasks on real projects, not practice exercises",
  "Feedback from the team on your work",
  "Work you can talk about in an interview",
  "A stronger portfolio to show employers and clients",
];

export const internshipQualify = [
  "Complete every module of your course",
  "Finish the final project",
  "Receive your certificate with its verifiable ID",
  "Talk to us about dates and terms. We explain them at admission, before you pay.",
];
