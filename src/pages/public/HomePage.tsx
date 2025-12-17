import React, { useEffect, useMemo, useState } from 'react';
import { CmsClient } from '../../api/cmsClient';
import { Section } from '../../types';
import { SectionRenderer } from '../../components/SectionRenderer';
import { SectionPatternGrid } from '../../components/patterns/SectionPatternGrid';
import { SectionsScaffold } from '../../components/skeletons/SectionSkeleton';
import { normalizeSections } from '../../lib/normalizeSections';

const HomePage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(() => {
    const cached = sessionStorage.getItem('upss-home-sections');
    if (cached) {
      try {
        return JSON.parse(cached) as Section[];
      } catch (err) {
        console.warn('Unable to hydrate cached home sections', err);
      }
    }
    return [];
  });
  const [loading, setLoading] = useState(() => sections.length === 0);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Attempt to fetch from API
        const page = await CmsClient.getPageBySlug('home');
        const sectionsData = await CmsClient.getSectionsForPage(page.id);
        setSections(sectionsData);
        sessionStorage.setItem('upss-home-sections', JSON.stringify(sectionsData));
      } catch (err) {
        console.warn("Failed to fetch from API, falling back to mock data.");
        // Fallback to mock data if API fails (for development/demo purposes without backend running)
        setSections(CmsClient.getMockHomeSections());
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const normalizedSections = useMemo(() => normalizeSections(sections), [sections]);

  return (
    <div className="flex flex-col w-full font-sans text-gray-900 fade-in">
      {loading && sections.length === 0 ? (
        <SectionsScaffold />
      ) : (
        <SectionPatternGrid>
          {normalizedSections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </SectionPatternGrid>
      )}
    </div>
  );
};

export default HomePage;