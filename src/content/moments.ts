import boracay1 from '../assets/SHOWCASE/boracay1.jpg'
import boracay2 from '../assets/SHOWCASE/boracay2.jpg'
import boracay3 from '../assets/SHOWCASE/boracay3.jpg'
import boracay4 from '../assets/SHOWCASE/boracay4.jpg'
import boracay10 from '../assets/SHOWCASE/boracay10.jpg'
import boracay11 from '../assets/SHOWCASE/boracay11.jpg'
import calatagan3 from '../assets/SHOWCASE/calatagan3.jpg'
import calatagan4 from '../assets/SHOWCASE/calatagan4.jpg'
import calatagan5 from '../assets/SHOWCASE/calatagan5.jpg'
import calatagan6 from '../assets/SHOWCASE/calatagan6.jpg'
import carlo1 from '../assets/SHOWCASE/carlo1.jpg'
import carlo2 from '../assets/SHOWCASE/carlo2.jpg'
import carlo3 from '../assets/SHOWCASE/carlo3.jpg'
import carlo4 from '../assets/SHOWCASE/carlo4.jpg'
import carlo5 from '../assets/SHOWCASE/carlo5.jpg'
import christmas1 from '../assets/SHOWCASE/christmas1.jpg'
import christmas2 from '../assets/SHOWCASE/christmas2.jpg'
import christmas3 from '../assets/SHOWCASE/christmas3.jpg'
import christmas4 from '../assets/SHOWCASE/christmas4.jpg'
import christmast5 from '../assets/SHOWCASE/christmast5.jpg'
import christmast6 from '../assets/SHOWCASE/christmast6.jpg'
import christmast7 from '../assets/SHOWCASE/christmast7.jpg'
import christmast8 from '../assets/SHOWCASE/christmast8.jpg'
import christmast9 from '../assets/SHOWCASE/christmast9.jpg'
import christmast10 from '../assets/SHOWCASE/christmast10.jpg'
import christmast11 from '../assets/SHOWCASE/christmast11.jpg'
import christmast12 from '../assets/SHOWCASE/christmast12.jpg'
import christmast13 from '../assets/SHOWCASE/christmast13.jpg'
import columbia1 from '../assets/SHOWCASE/columbia1.jpg'
import columbia2 from '../assets/SHOWCASE/columbia2.jpg'
import discuss1 from '../assets/SHOWCASE/discuss1.jpg'
import discuss2 from '../assets/SHOWCASE/discuss2.jpg'
import discuss3 from '../assets/SHOWCASE/discuss3.jpg'
import discuss4 from '../assets/SHOWCASE/discuss4.jpg'
import discuss5 from '../assets/SHOWCASE/discuss5.jpg'
import discuss6 from '../assets/SHOWCASE/discuss6.jpg'
import discuss7 from '../assets/SHOWCASE/discuss7.jpg'
import hilton1 from '../assets/SHOWCASE/hilton1.jpg'
import hilton2 from '../assets/SHOWCASE/hilton2.jpg'
import hilton3 from '../assets/SHOWCASE/hilton3.jpg'
import hilton4 from '../assets/SHOWCASE/hilton4.jpg'
import lans1 from '../assets/SHOWCASE/lans1.jpg'
import lans2 from '../assets/SHOWCASE/lans2.jpg'
import loui1 from '../assets/SHOWCASE/loui1.jpg'
import loui2 from '../assets/SHOWCASE/loui2.jpg'
import loui3 from '../assets/SHOWCASE/loui3.jpg'
import loui4 from '../assets/SHOWCASE/loui4.jpg'
import mark1 from '../assets/SHOWCASE/mark1.jpg'
import mark2 from '../assets/SHOWCASE/mark2.jpg'
import mark3 from '../assets/SHOWCASE/mark3.jpg'
import mark4 from '../assets/SHOWCASE/mark4.jpg'
import mc1 from '../assets/SHOWCASE/mc1.jpg'
import mc2 from '../assets/SHOWCASE/mc2.jpg'
import mc3 from '../assets/SHOWCASE/mc3.jpg'
import moa1 from '../assets/SHOWCASE/moa1.jpg'
import moa2 from '../assets/SHOWCASE/moa2.jpg'
import moa3 from '../assets/SHOWCASE/moa3.jpg'
import moa4 from '../assets/SHOWCASE/moa4.jpg'
import moa5 from '../assets/SHOWCASE/moa5.jpg'
import moa6 from '../assets/SHOWCASE/moa6.jpg'
import moa7 from '../assets/SHOWCASE/moa7.jpg'
import moa8 from '../assets/SHOWCASE/moa8.jpg'
import moa9 from '../assets/SHOWCASE/moa9.jpg'
import nicko1 from '../assets/SHOWCASE/nicko1.jpg'
import nicko2 from '../assets/SHOWCASE/nicko2.jpg'
import nicko3 from '../assets/SHOWCASE/nicko3.jpg'
import nicko4 from '../assets/SHOWCASE/nicko4.jpg'
import nicko5 from '../assets/SHOWCASE/nicko5.jpg'
import nicko6 from '../assets/SHOWCASE/nicko6.jpg'
import rafael1 from '../assets/SHOWCASE/rafael1.jpg'
import rafael2 from '../assets/SHOWCASE/rafael2.jpg'
import rafael3 from '../assets/SHOWCASE/rafael3.jpg'
import rafael4 from '../assets/SHOWCASE/rafael4.jpg'
import rafael5 from '../assets/SHOWCASE/rafael5.jpg'
import rafael6 from '../assets/SHOWCASE/rafael6.jpg'
import rafael7 from '../assets/SHOWCASE/rafael7.jpg'
import rafael8 from '../assets/SHOWCASE/rafael8.jpg'
import rafael9 from '../assets/SHOWCASE/rafael9.jpg'
import rafael10 from '../assets/SHOWCASE/rafael10.jpg'
import tagaytay1 from '../assets/SHOWCASE/tagaytay1.jpg'
import tagaytay2 from '../assets/SHOWCASE/tagaytay2.jpg'
import tagaytay3 from '../assets/SHOWCASE/tagaytay3.jpg'
import teamDinner1 from '../assets/SHOWCASE/teamDinner1.jpg'
import teamDinner2 from '../assets/SHOWCASE/teamDinner2.jpg'
import teamDinner3 from '../assets/SHOWCASE/teamDinner3.jpg'
import workation1 from '../assets/SHOWCASE/workation1.jpg'
import workation2 from '../assets/SHOWCASE/workation2.jpg'
import workation3 from '../assets/SHOWCASE/workation3.jpg'
import workation4 from '../assets/SHOWCASE/workation4.jpg'
import workation5 from '../assets/SHOWCASE/workation5.jpg'
import workation6 from '../assets/SHOWCASE/workation6.jpg'
import workation7 from '../assets/SHOWCASE/workation7.jpg'
import workation8 from '../assets/SHOWCASE/workation8.jpg'
import workation9 from '../assets/SHOWCASE/workation9.jpg'
import workation10 from '../assets/SHOWCASE/workation10.jpg'
import workation11 from '../assets/SHOWCASE/workation11.jpg'
import workation12 from '../assets/SHOWCASE/workation12.jpg'
import workation13 from '../assets/SHOWCASE/workation13.jpg'
import workation14 from '../assets/SHOWCASE/workation14.jpg'
import workation15 from '../assets/SHOWCASE/workation15.jpg'
import workation16 from '../assets/SHOWCASE/workation16.jpg'

export type MomentType = 'event' | 'tech-talk' | 'blog'

export type Moment = {
  id: string
  type: MomentType
  title: string
  description: string
  images: string[]
  dateLabel?: string
  location?: string
}

export const moments: Moment[] = [
  {
    id: 'zentra-friday-showcase',
    type: 'tech-talk',
    title: 'Friday Showcase: Zentra',
    description:
      "Fantastic turnout for today's Friday Showcase. Huge shoutout to Rafael for taking the stage and demoing Zentra, a specialized tool built for penetration testing and strengthening our security workflows.",
    images: [rafael1, rafael2, rafael3, rafael4, rafael5, rafael6],
  },
  {
    id: 'kalyx-friday-showcase',
    type: 'tech-talk',
    title: 'Friday Showcase: Kalyx',
    description:
      'Kudos to Nicko for showcasing Kalyx during Friday Showcase, delivering an awesome look into our web platform tailored for the GitLab marketplace ecosystem.',
    images: [nicko1, nicko2, nicko3, nicko4, nicko5, nicko6],
  },
  {
    id: 'multica-agent-orchestrator',
    type: 'tech-talk',
    title: 'Tech Talk Fridays: Multica + Multi-Agent Orchestrator',
    description:
      'A look back at our session diving into multi-agent systems and how orchestrating them effectively changes the development game. Huge thanks to Loui for leading the showcase.',
    images: [loui1, loui2, loui3, loui4],
  },
  {
    id: 'productivity-tooling-showcase',
    type: 'tech-talk',
    title: 'Showcase Friday: Productivity Tooling',
    description:
      'An awesome session looking at the tools and setups that keep our engineering workflows moving fast. Eliminating friction in the dev cycle is always a win.',
    images: [mark1, mark2, mark3, mark4],
  },
  {
    id: 'secure-autonomous-ai-agents',
    type: 'tech-talk',
    title: 'Tech Enrichment: Securing Autonomous AI Agents',
    description:
      'Thanks to Lance for sharing his insights on securing autonomous AI agents and best practices for building resilient agentic workflows.',
    images: [lans1, lans2],
  },
  {
    id: 'secure-coding-agentic-workflows',
    type: 'tech-talk',
    title: 'Friday TechTalk: Secure Coding in Agentic Workflows',
    description: 'Big thanks to John Rafael Masilungan for the great showcase on secure coding in agentic workflows.',
    images: [rafael7, rafael8, rafael9, rafael10],
  },
  {
    id: 'ui-ux-best-practices',
    type: 'tech-talk',
    title: 'Tech Talk Fridays: UI/UX Best Practices',
    description:
      'Carlo Rabe shared valuable insights on creating intuitive, user-friendly interfaces and how thoughtful design decisions can elevate the overall user experience.',
    images: [carlo1, carlo2, carlo3, carlo4, carlo5],
  },
  {
    id: 'tagaytay-tech-talk',
    type: 'tech-talk',
    title: 'Tech Talk in Tagaytay',
    description:
      'Knowledge shared is knowledge multiplied. Last April 2024, we hosted a Tech Talk in Tagaytay, where our team explored innovations and insights in the tech space.',
    images: [tagaytay1, tagaytay2, tagaytay3],
    dateLabel: 'April 2024',
    location: 'Tagaytay',
  },
  {
    id: 'focus-week-manila',
    type: 'tech-talk',
    title: 'Focus Week in Manila',
    description:
      'September 2024 was all about focus. Our team dedicated a week to learning, collaboration, and sharpening our skills, proving that growth happens when we invest in ourselves.',
    images: [moa1, moa2, moa3, moa4, moa5, moa6, moa7, moa8, moa9],
    dateLabel: 'September 2024',
    location: 'Lanson Place Mall of Asia, Manila',
  },
  {
    id: 'humble-beginnings-hilton',
    type: 'tech-talk',
    title: 'Where the Tech Journey Began',
    description:
      "Proof that great things can start small. This little corner, back in August 2023, is where our mission took root and our tech journey began.",
    images: [hilton1, hilton2, hilton3, hilton4],
    dateLabel: 'August 2023',
    location: 'Hilton Manila',
  },
  {
    id: 'miami-client-trip',
    type: 'event',
    title: 'Mountains, Beaches, and Global Connections',
    description:
      'Looking back at a great trip to Miami. Our team led client presentations and strategy sessions, then wrapped the week with a sunset boat ride and group dinner.',
    images: [workation1, workation2, workation3, workation4],
    location: 'Miami, Florida',
  },
  {
    id: 'ideas-and-insights',
    type: 'event',
    title: 'Ideas Heard, Discussed, and Refined',
    description:
      'We make space for ideas and insights to be heard, discussed, and refined. This strengthens how we build and deliver solutions.',
    images: [discuss1, discuss2, discuss3, discuss4, discuss5, discuss6, discuss7],
  },
  {
    id: 'team-macbook-upgrade',
    type: 'event',
    title: 'Empowering the Team With the Right Tools',
    description:
      'New MacBooks issued to boost productivity, creativity, and performance. Let us build, create, and innovate even better together.',
    images: [mc1, mc2, mc3],
  },
  {
    id: 'boracay-workflow-session',
    type: 'event',
    title: 'Ideas Flowing During Boracay Workcation',
    description:
      'Team KodeCraft discussed ways to improve workflows and solve project challenges during our Boracay workcation. Thankful for the team and the great ideas shared.',
    images: [workation5, workation6, workation7, workation8, workation9, workation10, workation11, workation12, workation13, workation14, workation15, workation16],
    location: 'Boracay',
  },
  {
    id: 'boracay-team-memories',
    type: 'event',
    title: 'From Office Desks to Sandy Shores',
    description:
      'Team KodeCraft made waves, left our mark, and created unforgettable memories in Boracay.',
    images: [boracay1, boracay2, boracay3, boracay4, boracay10, boracay11],
    location: 'Boracay',
  },
  {
    id: 'christmas-party',
    type: 'event',
    title: 'KodeCraft Christmas Party',
    description:
      'Some snapshots from our KodeCraft Christmas Party. It was a night full of laughter, joy, and holiday cheer. Thank you to everyone who joined the celebration.',
    images: [christmas1, christmas2, christmas3, christmas4, christmast5, christmast6, christmast7, christmast8, christmast9, christmast10, christmast11, christmast12, christmast13],
  },
  {
    id: 'team-dinner-small-wins',
    type: 'event',
    title: 'Team Dinner for Small Wins',
    description:
      "Team dinner to celebrate our small wins from the past months. Proud of what we have accomplished together and excited for what's next.",
    images: [teamDinner1, teamDinner2, teamDinner3],
  },
  {
    id: 'joffre-lakes-adventure',
    type: 'event',
    title: 'KodeCraft Adventures at Joffre Lakes',
    description:
      'KodeCraft employees know how to embrace every season in beautiful British Columbia, from turquoise summer waters to the first snow.',
    images: [columbia1, columbia2],
    location: 'Joffre Lakes, Canada',
  },
  {
    id: 'calatagan-company-outing',
    type: 'event',
    title: 'Company Outing at Stilts Calatagan',
    description:
      'Teamwork outside the office. Our recent company outing was all about bonding, relaxation, and building stronger connections.',
    images: [calatagan3, calatagan4, calatagan5, calatagan6],
    dateLabel: 'August 10-11, 2025',
    location: 'Stilts Calatagan Beach Resort',
  },
]

export const momentPageCopy = {
  '/events': {
    type: 'event',
    eyebrow: 'Events',
    kicker: 'Field notes',
    recentTitle: 'Recent Events',
    recentDescription: 'Stay close to the latest KodeCraft gatherings.',
    emptyTitle: 'No events yet.',
  },
  '/tech-talks': {
    type: 'tech-talk',
    eyebrow: 'Tech Talks',
    kicker: 'Engineering',
    recentTitle: 'Recent Tech Talks',
    recentDescription: 'Systems thinking, explained by builders.',
    emptyTitle: 'No tech talks yet.',
  },
  '/blog': {
    type: 'blog',
    eyebrow: 'Blog',
    kicker: 'News',
    recentTitle: 'Recent Articles',
    recentDescription: 'Stories and notes from the team.',
    emptyTitle: 'No blog posts yet.',
  },
} as const
