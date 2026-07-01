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
