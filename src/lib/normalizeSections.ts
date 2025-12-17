import { Section } from '../types';

export function normalizeSections(sections: Section[]): Section[] {
  let heroSeen = false;

  return sections.map((section, index) => {
    if (section.type === 'HERO') {
      if (!heroSeen) {
        heroSeen = true;
        return section;
      }

      return {
        ...section,
        type: 'INTRO_HEADER',
        contentJson: {
          ...(section.contentJson || {}),
          eyebrow: (section.contentJson as any)?.eyebrow || 'Highlights',
        },
      } as Section;
    }

    if (index === 0) {
      return {
        ...section,
        type: 'CONTENT_LEAD',
        content: section.content || (section.subtitle as string) || section.title,
      } as Section;
    }

    return section;
  });
}
