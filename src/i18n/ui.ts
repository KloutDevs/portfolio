export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
  es: {
    htmlLang: 'es',
    metaTitle: 'Klout — Desarrollador full stack',
    metaDescription:
      'Portfolio de Klout, desarrollador full stack en Posadas, Misiones. Sistemas web, herramientas para agentes de IA, tiempo real y observabilidad.',
    switchLabel: 'Cambiar idioma',
    profile: {
      role: 'Desarrollador full stack',
      bio: 'Soy desarrollador full stack en Posadas, Misiones. Me gusta construir sistemas que se conectan entre sí y automatizar lo repetitivo: aplicaciones web, herramientas para agentes de IA, tiempo real y observabilidad.',
      github: 'Ver GitHub',
    },
    featured: {
      label: 'Proyecto destacado',
      title: 'Grafana Session Replay',
      description:
        'Plugin de Grafana que reproduce sesiones del navegador (Faro y rrweb) guardadas en Loki, en formato JSON o logfmt.',
      source: 'Ver código',
    },
    stack: {
      title: 'Stack',
      subtitle: 'Con lo que trabajo a diario.',
    },
    contributions: {
      title: 'Contribuciones en GitHub',
      summary: (count: number) => `${count.toLocaleString('es-AR')} contribuciones en el último año`,
      note: 'Solo actividad pública.',
      unavailable: 'No se pudo cargar la actividad de GitHub en esta compilación.',
      less: 'Menos',
      more: 'Más',
      ariaLabel: (count: number) => `Mapa de actividad de GitHub: ${count.toLocaleString('es-AR')} contribuciones en el último año`,
    },
    location: {
      title: 'Ubicación',
      place: 'Posadas, Misiones, Argentina',
      timezone: 'ART (UTC−3)',
    },
    contact: {
      title: 'Contacto',
      text: 'Para proyectos o colaboraciones, estos son los canales.',
      github: 'GitHub',
    },
    footer: '© 2026 Klout',
  },
  en: {
    htmlLang: 'en',
    metaTitle: 'Klout — Full-stack developer',
    metaDescription:
      'Portfolio of Klout, a full-stack developer in Posadas, Misiones, Argentina. Web systems, AI agent tooling, realtime and observability.',
    switchLabel: 'Change language',
    profile: {
      role: 'Full-stack developer',
      bio: 'I am a full-stack developer based in Posadas, Misiones. I like building systems that talk to each other and automating repetitive work: web apps, AI agent tooling, realtime and observability.',
      github: 'View GitHub',
    },
    featured: {
      label: 'Featured project',
      title: 'Grafana Session Replay',
      description:
        'A Grafana app plugin that replays browser sessions (Faro and rrweb) stored in Loki, in JSON or logfmt.',
      source: 'View source',
    },
    stack: {
      title: 'Tech stack',
      subtitle: 'What I work with every day.',
    },
    contributions: {
      title: 'GitHub contributions',
      summary: (count: number) => `${count.toLocaleString('en-US')} contributions in the last year`,
      note: 'Public activity only.',
      unavailable: 'GitHub activity could not be loaded in this build.',
      less: 'Less',
      more: 'More',
      ariaLabel: (count: number) => `GitHub activity map: ${count.toLocaleString('en-US')} contributions in the last year`,
    },
    location: {
      title: 'Location',
      place: 'Posadas, Misiones, Argentina',
      timezone: 'ART (UTC−3)',
    },
    contact: {
      title: 'Contact',
      text: 'For projects or collaborations, reach out through these channels.',
      github: 'GitHub',
    },
    footer: '© 2026 Klout',
  },
} as const;

export function getUi(locale: Locale) {
  return ui[locale];
}

export function pathFor(locale: Locale): string {
  return locale === 'es' ? '/' : '/en/';
}
