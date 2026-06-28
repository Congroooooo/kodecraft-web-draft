export const navigationLinks = [
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#culture', label: 'Culture' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
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
