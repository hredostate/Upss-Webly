import React, { ReactNode } from 'react';
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
        React.isValidElement(child) && child.props['data-full-bleed'] ? (
          <div key={index} className="w-full">{child}</div>
        ) : (
          <PatternedSection key={index} index={index} variant={variants[index % variants.length]}>
            {child}
          </PatternedSection>
        )
      ))}
    </div>
  );
}

