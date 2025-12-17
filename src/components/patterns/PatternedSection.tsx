import { ReactNode } from 'react';

interface PatternedSectionProps {
  variant: 'angled' | 'banded' | 'cards' | 'spotlight';
  index: number;
  children: ReactNode;
}

const variantClassMap: Record<PatternedSectionProps['variant'], string> = {
  angled: 'relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white',
  banded: 'bg-primary-900 text-white',
  cards: 'bg-gradient-to-b from-slate-50 via-white to-slate-50',
  spotlight: 'bg-white',
};

export function PatternedSection({ variant, index, children }: PatternedSectionProps) {
  const variantClass = variantClassMap[variant];

  return (
    <section className={`${variantClass} py-16 md:py-24`}> 
      {variant === 'angled' && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary-50/60 to-transparent" />
      )}
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-500 ${
            index % 2 === 0 ? 'md:-translate-y-2 md:translate-x-1' : 'md:translate-y-2 md:-translate-x-1'
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

