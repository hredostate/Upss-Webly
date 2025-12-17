import { ReactNode } from 'react';
import { PatternedSection } from './PatternedSection';

const variants: Array<'angled' | 'banded' | 'cards' | 'spotlight'> = [
  'angled',
  'cards',
  'banded',
  'spotlight',
  'cards',
];

export function SectionPatternGrid({ children }: { children: ReactNode[] }) {
  return (
    <div className="space-y-0">
      {children.map((child, index) => (
        <PatternedSection key={index} index={index} variant={variants[index % variants.length]}>
          {child}
        </PatternedSection>
      ))}
    </div>
  );
}

