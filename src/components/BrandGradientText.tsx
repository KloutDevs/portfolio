import type { ReactNode } from 'react';
import GradientText from './reactbits/GradientText';

export default function BrandGradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <GradientText colors={['#b7f542', '#2dd4bf', '#a78bfa', '#b7f542']} animationSpeed={8} className={className}>
      {children}
    </GradientText>
  );
}
