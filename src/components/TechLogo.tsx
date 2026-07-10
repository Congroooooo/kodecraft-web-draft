type TechLogoProps = {
  label: string
}

export function TechLogo({ label }: TechLogoProps) {
  const shortLabel = getLogoLabel(label)

  return (
    <span className="routing-logo" aria-hidden="true" data-label={shortLabel}>
      {getLogoGlyph(label, shortLabel)}
    </span>
  )
}

function getLogoLabel(label: string) {
  const labels: Record<string, string> = {
    'Agent Orchestration': 'AO',
    'Agent Trace Logging': 'TL',
    'GitLab CI/CD': 'GL',
    'Guardrail Validation': 'GV',
    'MCP Servers': 'MCP',
    'Tool-Use Pipelines': 'TP',
    pgvector: 'pgv',
    PostgreSQL: 'pg',
    Proxmox: 'PX',
    SolidJS: 'S',
    TigerBeetle: 'TB',
    TigerData: 'TD',
    TypeScript: 'TS',
    wasmCloud: 'WC',
  }

  return labels[label] ?? label.slice(0, 2)
}

function getLogoGlyph(label: string, fallback: string) {
  if (label === 'Rust') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="3" />
        <path d="M24 7.5v5M24 35.5v5M40.5 24h-5M12.5 24h-5M34.7 13.3l-3.5 3.5M16.8 31.2l-3.5 3.5M34.7 34.7l-3.5-3.5M16.8 16.8l-3.5-3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        <path d="M20 30V18h6.3c3 0 4.9 1.5 4.9 4 0 1.8-1 3-2.6 3.6l3.1 4.4h-4.2l-2.5-3.6h-1.2V30H20Zm3.8-6.4h2c1.3 0 2-.5 2-1.5s-.7-1.6-2-1.6h-2v3.1Z" fill="currentColor" />
      </svg>
    )
  }

  if (label === 'Axum') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 8 9 37h30L24 8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="3" />
        <path d="m18 29 6-10 6 10M21.5 25h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'TypeScript') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <rect width="38" height="38" x="5" y="5" fill="currentColor" rx="3" />
        <path d="M16 21h15M23.5 21v16M31 35c1.2 1.1 2.6 1.6 4.2 1.6 1.9 0 3.3-.9 3.3-2.4 0-1.4-.9-2-3.3-2.8-2.8-.9-4.4-2.1-4.4-4.6 0-2.7 2.2-4.5 5.3-4.5 1.7 0 3 .4 4.2 1.2" stroke="#07100b" strokeLinecap="round" strokeWidth="3" />
      </svg>
    )
  }

  if (label === 'React') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="3.8" fill="currentColor" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2.8" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2.8" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="currentColor" strokeWidth="2.8" transform="rotate(120 24 24)" />
      </svg>
    )
  }

  if (label === 'SolidJS') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M10 14c5-4 14-4 19 0 4 3 9 3 9 10 0 7-6 14-16 14-9 0-14-5-14-12 0-5 2-9 2-12Z" fill="currentColor" opacity="0.18" />
        <path d="M13 17c4-3 10-3 14 0 3 2 7 2 7 7 0 5-4 10-11 10-6 0-10-3-10-8 0-3 1.4-6 0-9Z" fill="currentColor" opacity="0.35" />
        <path d="M17 20c3-2 7-2 10 0 2 1.5 5 1.5 5 5 0 4-3.2 7-8 7-4.6 0-7.5-2.4-7.5-6.3 0-2.3 1-4.2.5-5.7Z" fill="currentColor" />
      </svg>
    )
  }

  if (label === 'PostgreSQL') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M17 28c-1-7 .5-14 7-14 6.5 0 8 6.6 7 14-1 7-4.5 10-7 10s-6-3-7-10Z" stroke="currentColor" strokeWidth="3" />
        <path d="M21 20c1.7-1.6 4.3-1.6 6 0M18 29c2 1 4.7 1.5 6 1.5S28 30 30 29M30 24l4 2-4 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    )
  }

  if (label === 'Playwright') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M13 14c0-3 2-5 5-5h12c3 0 5 2 5 5v20c0 3-2 5-5 5H18c-3 0-5-2-5-5V14Z" stroke="currentColor" strokeWidth="3" />
        <circle cx="19" cy="20" r="2.5" fill="currentColor" />
        <circle cx="29" cy="20" r="2.5" fill="currentColor" />
        <path d="M18 30c1.6 2 3.6 3 6 3s4.4-1 6-3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'Docker') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M9 25h26c0 7-5 12-13 12-7 0-12-4-13-12Z" fill="currentColor" opacity="0.9" />
        <path d="M12 17h5v5h-5v-5Zm7 0h5v5h-5v-5Zm7 0h5v5h-5v-5Zm-7-7h5v5h-5v-5Zm7 7h5v5h-5v-5Zm7 0h5v5h-5v-5Z" fill="currentColor" />
        <path d="M36 20c2.8-.2 4.8.8 6 3-2 .8-3.8.8-5.5.2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }

  if (label === 'Terraform') {
    return (
      <svg className="routing-logo-svg" fill="currentColor" viewBox="0 0 48 48">
        <path d="M8 8v12l10 5.8v-12L8 8Zm12 6.8v12l10 5.8v-12l-10-5.8Zm12 5.8v12l10-5.8v-12l-10 5.8ZM20 29.2v12L30 47V35l-10-5.8Z" />
      </svg>
    )
  }

  if (label === 'GitLab CI/CD') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="m24 38 8-12H16l8 12Z" fill="currentColor" />
        <path d="m10 26 6-18 8 18H10Zm28 0-6-18-8 18h14Z" fill="currentColor" opacity="0.72" />
        <path d="m10 26 14 12L38 26" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.5" />
      </svg>
    )
  }

  if (label === 'Vault') {
    return (
      <svg className="routing-logo-svg" fill="currentColor" viewBox="0 0 48 48">
        <path d="M24 7 10 15v18l14 8 14-8V15L24 7Zm0 5.2 8.6 4.8v11.1L24 33l-8.6-4.9V17l8.6-4.8Z" />
      </svg>
    )
  }

  if (label === 'Consul') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M11 24c0-7.2 5.8-13 13-13 4.4 0 8.3 2.2 10.7 5.5l-4.7 2.4c-1.3-1.8-3.5-2.9-6-2.9-4.4 0-8 3.6-8 8s3.6 8 8 8c2.5 0 4.7-1.1 6-2.9l4.7 2.4C32.3 34.8 28.4 37 24 37c-7.2 0-13-5.8-13-13Z" fill="currentColor" />
      </svg>
    )
  }

  if (label === 'Nomad') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 9 11 16.5v15L24 39l13-7.5v-15L24 9Z" stroke="currentColor" strokeWidth="3" />
        <path d="M18 30V18l12 12V18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'Claude') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 10c8 0 14 6 14 14s-6 14-14 14S10 32 10 24 16 10 24 10Z" stroke="currentColor" strokeWidth="3" />
        <path d="M30 19c-1.6-1.5-3.6-2.2-6-2.2-4.5 0-7.8 3-7.8 7.2s3.3 7.2 7.8 7.2c2.4 0 4.4-.7 6-2.2" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'Leptos') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M13 35 24 11l11 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M18.5 25h11" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'wasmCloud') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M12 24c0-6.4 5.2-11.5 11.5-11.5 4.4 0 8.3 2.5 10.2 6.1 4.2.3 7.3 3.4 7.3 7.2 0 4-3.3 7.2-7.5 7.2H18.5C14.9 33 12 29.1 12 24Z" stroke="currentColor" strokeWidth="3" />
        <path d="m18 26 4-5 4 4 4-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
      </svg>
    )
  }

  if (label === 'pgvector') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <circle cx="16" cy="18" r="3" fill="currentColor" />
        <circle cx="31" cy="15" r="3" fill="currentColor" />
        <circle cx="24" cy="31" r="3" fill="currentColor" />
        <path d="M18.5 19.5 28.5 16.5M18 20.5l5 8M29 18l-4 10" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" />
      </svg>
    )
  }

  if (label === 'MCP Servers') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <rect width="28" height="18" x="10" y="15" rx="3" stroke="currentColor" strokeWidth="3" />
        <path d="M17 21v6M24 19v10M31 21v6" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
    )
  }

  if (label === 'OpenAI') {
    return (
      <svg className="routing-logo-svg" fill="none" viewBox="0 0 48 48">
        <path d="M24 7c5 0 8 3 9 7 4 1 7 5 7 10s-3 8-7 10c-1 4-4 7-9 7s-8-3-10-7c-4-1-6-5-6-10s2-9 6-10c2-4 5-7 10-7Z" stroke="currentColor" strokeWidth="3" />
        <path d="M17 18l7-4 7 4v12l-7 4-7-4V18Z" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  }

  return <span className="routing-logo-text">{fallback}</span>
}
