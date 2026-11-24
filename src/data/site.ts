export const site = {
  name: 'Klout',
  handle: 'KloutDevs',
  url: 'https://github.com/KloutDevs',
  location: { latitude: -27.3671, longitude: -55.8961 },
  // Only links listed here are rendered in the contact card.
  contactLinks: [{ id: 'github', href: 'https://github.com/KloutDevs' }],
  featuredRepo: {
    name: 'grafana-session-replay-app',
    href: 'https://github.com/KloutDevs/grafana-session-replay-app',
    tags: ['TypeScript', 'Grafana', 'rrweb', 'Loki'],
  },
  stack: ['TypeScript', 'React', 'Node.js', 'Go', 'Rust', 'Astro', 'Tailwind CSS', 'Docker'],
} as const;
