export interface ContributionDay {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Contributions {
  total: number;
  days: ContributionDay[];
}

// Reads the public contribution calendar of a GitHub user at build time.
// Returns null when GitHub is unreachable so the build never fails because of it.
export async function fetchContributions(user: string): Promise<Contributions | null> {
  try {
    const response = await fetch(`https://github.com/users/${user}/contributions`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    const days: ContributionDay[] = [];
    for (const match of html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g)) {
      days.push({ date: match[1], level: Number(match[2]) as ContributionDay['level'] });
    }
    if (days.length === 0) throw new Error('no contribution cells found');
    days.sort((a, b) => a.date.localeCompare(b.date));

    let total = 0;
    for (const match of html.matchAll(/>\s*(No|\d+) contributions? on /g)) {
      if (match[1] !== 'No') total += Number(match[1]);
    }
    return { total, days };
  } catch (error) {
    console.warn(`[contributions] could not load GitHub activity: ${(error as Error).message}`);
    return null;
  }
}
