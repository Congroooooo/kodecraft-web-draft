export const navigationLinks = [
  { href: '/', label: 'Homepage' },
  {
    href: '/moments',
    label: 'Moments',
    children: [
      { href: '/events', label: 'Events' },
      { href: '/tech-talks', label: 'Tech Talks' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  { href: '/our-team', label: 'Our Team' },
  { href: '#contact', label: 'Contact' },
]

export const pageContent = {
  '/events': {
    eyebrow: 'Moments / Events',
    title: 'Events where builders meet.',
    description:
      'A dedicated space for KodeCraft gatherings, community sessions, and team events. Content and event listings can land here next.',
  },
  '/tech-talks': {
    eyebrow: 'Moments / Tech Talks',
    title: 'Technical talks from the team.',
    description:
      'Deep dives, internal demos, architecture notes, and engineering sessions will live here.',
  },
  '/blog': {
    eyebrow: 'Moments / Blog',
    title: 'Notes from engineers building real systems.',
    description:
      'Long-form engineering posts, product lessons, infrastructure decisions, and culture stories will live here.',
  },
}

export const faqItems = [
  {
    question: 'Do I need Rust experience to apply?',
    answer:
      "Strong Rust experience helps, but it's not a hard requirement. We care more about systems thinking, engineering judgment, and the ability to go deep on hard problems. If you've built serious software in any systems language and want to work in Rust, we'll invest in getting you there.",
  },
  {
    question: "What's the tech stack?",
    answer:
      "Rust and Axum on the backend. MCP servers for agent tool interfaces. PostgreSQL, TigerBeetle, and pgvector for data. HashiCorp stack (Terraform, Nomad, Vault, Consul) for infrastructure. SolidJS or React on the frontend. Claude and OpenAl for agent capabilities. You'll work across the stack depending on the problem.",
  },
  {
    question: 'What does day-to-day work look like?',
    answer:
      "You'll spend most of your time writing code-Rust services, MCP servers, agent orchestration, frontend features. We do architecture discussions on whiteboards, pair program on hard problems, and ship to production continuously. No standups that could've been a message. No Jira ticket factories.",
  },
  {
    question: 'Why Rust instead of Go or Python?',
    answer:
      'Agent workloads are bursty and unpredictable-an agent might fire off hundreds of tool calls in seconds. Rust gives us memory safety without garbage collection pauses, predictable latency, and fearless concurrency. If you want to write Rust that actually runs in production at scale, this is the place.',
  },
  {
    question: 'Where is the team?',
    answer:
      "Our office is in Tayabas, Philippines. We work together in-person-whiteboards, pair programming, and real-time architecture discussions. The energy of being in the same room is a core part of how we build. If you're in the area or willing to relocate, we'd love to talk.",
  },
  {
    question: "What's the interview process?",
    answer:
      "A technical conversation about systems you've built, a small take-home focused on Rust or systems design (not LeetCode), and a team conversation. The whole process takes about a week. We respect your time and won't waste it on brain teasers.",
  },
  {
    question: 'What kind of engineer are you looking for?',
    answer:
      "People who want to own systems, not just write features. Engineers who think about architecture, reliability, and performance-and who care about the craft. We don't hire for specific frameworks. We hire for judgment and the drive to build something that matters.",
  },
  {
    question: "What does 'agent-native' mean?",
    answer:
      "It means Al agents aren't bolted on-they're first-class participants in the architecture. You'll design systems where agents handle workflows, make tool calls via MCP, and operate autonomously within guardrails you build. The Rust infrastructure underneath has to be rock-solid because agent workloads are unforgiving.",
  },
]

export const teamMembers = [
  {
    name: 'Louigie T. Aductante',
    role: 'Sr. Software Engineer',
    image: 'https://kodecraft.tech/team/louigie-aductante.jpg',
  },
  {
    name: 'Syron C. Arapeles',
    role: 'QA & Technical Support',
  },
  {
    name: 'Gabriel A. Biler',
    role: 'Infrastructure Engineer Lead',
    image: 'https://kodecraft.tech/team/gabriel-biler.jpg',
  },
  {
    name: 'Von Maverick C. Billones',
    role: 'Jr. Software Engineer',
    image: 'https://kodecraft.tech/team/von-billones.jpg',
  },
  {
    name: 'Mark Louls B. Delos Santos',
    role: 'Jr. Software Engineer',
  },
  {
    name: 'Marla Victoria C. Depusoy',
    role: 'Praject Manager/QA Analyst',
    image: 'https://kodecraft.tech/team/maria-depusoy.jpg',
  },
  {
    name: 'John Leo D. Echevarla',
    role: 'Jr. Software Engineer',
  },
  {
    name: 'Marycris P. Encomlenda',
    role: 'Admin',
  },
  {
    name: 'Jed Benedict F. Loba',
    role: 'Jr. Infrastructure Engineer',
  },
  {
    name: 'Ralph Jahred D. Magpantay',
    role: 'Jr. Software Engineer',
  },
  {
    name: 'John Rafael P. Masilungan',
    role: 'Jr. Software Engineer',
  },
  {
    name: 'Herald Jhan C. Matlenzo',
    role: 'Jr. Software Engineer',
    image: 'https://kodecraft.tech/team/herald-matienzo.jpg',
  },
  {
    name: 'Mark Anthony V. Ortal',
    role: 'Sr. Software Engineer',
    image: 'https://kodecraft.tech/team/mark-ortal.jpg',
  },
  {
    name: 'John Carlo P. Rabe',
    role: 'Flutter Developer',
    image: 'https://kodecraft.tech/team/john-rabe.jpg',
  },
  {
    name: 'Adrielle Jolce B. Reyes',
    role: 'Product Strategist',
  },
  {
    name: 'David Jaynes A. Rogado',
    role: 'Sr. Software Engineer',
  },
  {
    name: 'Esmer Josef O. Santiago',
    role: 'Sr. Software Engineer',
    image: 'https://kodecraft.tech/team/esmer-santiago.jpg',
  },
  {
    name: 'Gabriel G. Santoc',
    role: 'Jr. Software Engineer',
  },
  {
    name: 'Joaquin Z. Martinez',
    role: 'Jr. Infrastructure Engineer',
  },
  {
    name: 'Johann Sebastian E. Catalla',
    role: 'Data Scientist / Quant Researcher & Developer',
  },
  {
    name: 'Lance Alexander P. Ventura',
    role: 'Jr. Al Engineer',
  },
  {
    name: 'Princess Nicole C. Oriola',
    role: 'Data Scientist / Quant Researcher & Developer',
  },
  {
    name: 'Nicko Balmes',
    role: 'Jr. QA Engineer',
  },
]

export const heroContent = {
  headlineLines: ['Where serious builders', 'shape what comes next.'],
  description:
    'We build agent-native products on Rust infrastructure. Join a team that values craft, ownership, and the kind of engineering judgment that compounds.',
  proofLabel: 'Live systems',
  proofText: 'Rust. Agents. Ownership.',
}

export const buildItems = [
  {
    index: '01',
    category: 'Agent Systems',
    title: 'Agent-native products',
    text: 'We design software where agents are part of the architecture from day one, with guardrails, workflows, and tool access built into the system.',
    caption: '“Which step still needs a human?”',
    tag: 'Architecture from day one.',
  },
  {
    index: '02',
    category: 'Rust Core',
    title: 'Production Rust infrastructure',
    text: 'Fast services, predictable latency, and strong ownership over the backend layer that keeps agent workloads reliable at scale.',
    caption: '“What is the p99 under load?”',
    tag: 'Predictable at scale.',
  },
  {
    index: '03',
    category: 'MCP Tooling',
    title: 'Interfaces agents can trust',
    text: 'MCP servers, typed tools, and operational surfaces that let agents work with real systems without turning safety into an afterthought.',
    caption: '“Can the agent touch prod safely?”',
    tag: 'Safety, not an afterthought.',
  },
  {
    index: '04',
    category: 'Product Craft',
    title: 'Full-stack product engineering',
    text: 'From interaction detail to deployment strategy, builders here own the entire path from idea to shipped product.',
    caption: '“Who owns the shipped result?”',
    tag: 'Idea to shipped product.',
  },
]

export const cultureItems = [
  'Ship meaningful work in your first week.',
  'Pair with senior engineers on hard systems.',
  'Make architecture decisions close to the code.',
  'Write, teach, and shape how the team thinks.',
]

export const first90DaysItems = [
  {
    eyebrow: '01 / Week One',
    title: 'Ship in Week One',
    text: "No months of onboarding. You'll push to production in your first week: real features, real Rust services, real agent infrastructure. We pair you with a senior engineer and hand you a meaningful problem from day one.",
    assetLabel: 'Production ship placeholder',
    layout: 'media-left',
  },
  {
    eyebrow: '02 / Month One',
    title: 'Own a System by Month One',
    text: "You'll take ownership of an MCP server, a Rust service, or an agent orchestration layer. Architecture decisions are made by the people who write the code, and that includes you.",
    assetLabel: 'System ownership placeholder',
    layout: 'media-right',
  },
  {
    eyebrow: '03 / Quarter End',
    title: 'Shape the Direction by Quarter End',
    text: "Write a blog post about what you learned. Propose a technical direction. Influence the product roadmap. By 90 days, you're not just contributing, you're driving.",
    assetLabel: 'Technical direction placeholder',
    layout: 'full-bleed',
  },
]

// Engineering blog posts — drives the scroll-scrubbed "From our engineers"
// section (copy left, cover image right; mirror of the "What we build" stage).
export const engineerPosts = [
  {
    index: '01',
    category: 'Rust',
    date: 'November 18, 2025',
    title: 'A Day Building MCP Servers in Rust',
    description:
      'What it actually looks like to design and build an MCP tool interface in Rust — from schema design to production deployment in a single day.',
    author: 'Gabriel A. Biler',
    role: 'Rust Engineer',
    tags: ['rust', 'mcp', 'agents', 'engineering'],
  },
  {
    index: '02',
    category: 'Culture',
    date: 'October 12, 2025',
    title: 'How We Onboard Engineers at KodeCraft',
    description:
      'What your first 30 days look like at a small agent-native product studio. Ship code in week one, write about it in week four.',
    author: 'Louigie T. Aductante',
    role: 'Full-Stack Engineer',
    tags: ['culture', 'engineering', 'onboarding'],
  },
  {
    index: '03',
    category: 'Infrastructure',
    date: 'September 5, 2025',
    title: 'Why We Chose Nomad Over Kubernetes',
    description:
      'Agent architectures already have enough moving parts. Here is why we picked Nomad for orchestration and what it means for our infrastructure.',
    author: 'Herald Jhan C. Matienzo',
    role: 'Infrastructure Engineer',
    tags: ['infrastructure', 'nomad', 'kubernetes', 'hashicorp'],
  },
  {
    index: '04',
    category: 'DevOps',
    date: 'August 10, 2025',
    title: 'Infrastructure for Agent Workloads: Our HashiCorp Stack',
    description:
      'Agent-driven systems demand infrastructure that handles unpredictable traffic, dynamic scaling, and zero-trust security. Here is how our HashiCorp stack delivers.',
    author: 'Herald Jhan C. Matienzo',
    role: 'Infrastructure Engineer',
    tags: ['infrastructure', 'hashicorp', 'agents', 'devops'],
  },
  {
    index: '05',
    category: 'Architecture',
    date: 'July 22, 2025',
    title: 'MCP and the Architecture of Agent-Native Products',
    description:
      'The Model Context Protocol is becoming the standard interface between agents and tools. Here is how we design MCP-first systems and why it changes how products get built.',
    author: 'Mark Anthony V. Ortal',
    role: 'Rust Engineer',
    tags: ['mcp', 'agents', 'architecture', 'rust'],
  },
  {
    index: '06',
    category: 'Performance',
    date: 'June 15, 2025',
    title: 'Why Rust Is the Right Foundation for Agent Infrastructure',
    description:
      'Agent workloads are bursty, unpredictable, and unforgiving. Here is why we chose Rust over Python and Node.js for the infrastructure layer that agents depend on.',
    author: 'Louigie T. Aductante',
    role: 'Full-Stack Engineer',
    tags: ['rust', 'agents', 'infrastructure', 'performance'],
  },
]

export const roles = [
  'Rust Engineer',
  'Full-Stack Engineer',
  'Infrastructure Engineer',
  'Frontend Engineer',
]

// Flat wall of everything we build with — drives the tech-stack tile grid.
export const techStackGrid = [
  'Rust',
  'Axum',
  'wasmCloud',
  'Tower',
  'TypeScript',
  'SolidJS',
  'React',
  'Leptos',
  'PostgreSQL',
  'TigerBeetle',
  'TigerData',
  'pgvector',
  'Terraform',
  'Nomad',
  'Vault',
  'Consul',
  'Boundary',
  'GitLab CI/CD',
  'Docker',
  'Proxmox',
  'MCP Servers',
  'Claude',
  'OpenAI',
  'Agent Orchestration',
  'Tool-Use Pipelines',
  'Playwright',
  'Agent Trace Logging',
  'Guardrail Validation',
]

// Two routing cards. Each chip falls through the panel and lights up the
// bucket (by category index) it belongs to as it lands.
export type TechRoutingCard = {
  eyebrow: string
  title: string
  description: string
  categories: string[]
  chips: { label: string; cat: number }[]
}

export const techRoutingCards: TechRoutingCard[] = [
  {
    eyebrow: 'Product surface',
    title: 'Typed end to end',
    description:
      'Every layer is owned by the people who write it. Strongly-typed frontends, Rust services, and a data tier built for correctness — each incoming piece routes to the layer that owns it, not a tangle in the middle.',
    categories: ['Frontend', 'Backend', 'Data'],
    chips: [
      { label: 'Rust', cat: 1 },
      { label: 'TypeScript', cat: 0 },
      { label: 'PostgreSQL', cat: 2 },
      { label: 'Axum', cat: 1 },
      { label: 'SolidJS', cat: 0 },
      { label: 'TigerBeetle', cat: 2 },
      { label: 'wasmCloud', cat: 1 },
      { label: 'React', cat: 0 },
      { label: 'pgvector', cat: 2 },
      { label: 'Tower', cat: 1 },
      { label: 'Leptos', cat: 0 },
      { label: 'TigerData', cat: 2 },
    ],
  },
  {
    eyebrow: 'Platform surface',
    title: 'From metal to agents',
    description:
      'The same discipline runs from the host up. Infrastructure as code, agent tooling that real systems can trust, and observability that proves it works — each tool lands in the surface it operates on.',
    categories: ['Infrastructure', 'Agent Tooling', 'Quality & Obs.'],
    chips: [
      { label: 'Terraform', cat: 0 },
      { label: 'MCP Servers', cat: 1 },
      { label: 'Playwright', cat: 2 },
      { label: 'Nomad', cat: 0 },
      { label: 'Claude', cat: 1 },
      { label: 'Agent Trace Logging', cat: 2 },
      { label: 'Vault', cat: 0 },
      { label: 'OpenAI', cat: 1 },
      { label: 'Guardrail Validation', cat: 2 },
      { label: 'Consul', cat: 0 },
      { label: 'Agent Orchestration', cat: 1 },
      { label: 'Docker', cat: 0 },
      { label: 'Tool-Use Pipelines', cat: 1 },
      { label: 'Boundary', cat: 0 },
      { label: 'GitLab CI/CD', cat: 0 },
      { label: 'Proxmox', cat: 0 },
    ],
  },
]
