export const site = {
  name: 'Klout',
  handle: 'KloutDevs',
  url: 'https://github.com/KloutDevs',
  location: { latitude: -27.3671, longitude: -55.8961 },
  // Only links listed here are rendered in the contact card.
  // Taken from the social accounts listed on the public GitHub profile.
  contactLinks: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/KloutDevs', icon: 'brands/github' },
    { id: 'x', label: 'X', href: 'https://x.com/_kloutst', icon: 'brands/x' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/nahuel-schmidt-720b57263/', icon: 'brands/linkedin' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/s_nahuuu/', icon: 'brands/instagram' },
  ],
  // Featured projects, in carousel order. All of them are public repositories.
  featured: [
    {
      id: 'sessionReplay',
      image: 'session-replay',
      title: 'Grafana Session Replay',
      href: 'https://github.com/KloutDevs/grafana-session-replay-app',
      tags: ['TypeScript', 'Grafana', 'rrweb', 'Loki'],
    },
    {
      id: 'cursorBridge',
      image: 'cursor-bridge',
      title: 'Cursor Bridge',
      href: 'https://github.com/KloutDevs/cursor-bridge',
      tags: ['TypeScript', 'MCP', 'VS Code', 'Cursor'],
    },
    {
      id: 'huskySkill',
      image: 'husky-skill',
      title: 'Husky Skill',
      href: 'https://github.com/KloutDevs/husky-skill',
      tags: ['Shell', 'Git hooks', 'POSIX', 'Agent skill'],
    },
    {
      id: 'voiceLab',
      image: 'voice-lab',
      title: 'Voice Lab',
      href: 'https://github.com/KloutDevs/voice-lab',
      tags: ['JavaScript', 'Vosk', 'Speech to text'],
    },
  ],
  // Sections of the site. `slug` is appended to the locale root; pages are added as they are built.
  nav: [
    { id: 'home', slug: '' },
    { id: 'projects', slug: 'projects' },
    { id: 'about', slug: 'about' },
    { id: 'contact', slug: 'contact' },
  ],
  // `color` is the brand color; very dark marks use the default ink color.
  stack: [
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    { name: 'React', icon: 'react', color: '#61DAFB' },
    { name: 'Node.js', icon: 'nodedotjs', color: '#5FA04E' },
    { name: 'Go', icon: 'go', color: '#00ADD8' },
    { name: 'Rust', icon: 'rust', color: '#ededee' },
    { name: 'Astro', icon: 'astro', color: '#BC52EE' },
    { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4' },
    { name: 'Docker', icon: 'docker', color: '#2496ED' },
  ],
} as const;
