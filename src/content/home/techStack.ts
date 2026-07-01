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
