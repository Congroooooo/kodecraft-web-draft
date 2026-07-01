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
