import CountUp from './reactbits/CountUp';

export default function ContributionsCount({ to, separator, suffix }: { to: number; separator: string; suffix: string }) {
  return (
    <span className="text-sm font-semibold text-accent">
      <CountUp to={to} separator={separator} duration={2} trigger="load" />
      {suffix}
    </span>
  );
}
