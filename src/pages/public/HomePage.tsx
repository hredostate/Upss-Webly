import React, { useEffect, useState } from 'react';
import { CmsClient } from '../../api/cmsClient';
import { Section } from '../../types';
import { SectionRenderer } from '../../components/SectionRenderer';

const HomePage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Attempt to fetch from API
        const page = await CmsClient.getPageBySlug('home');
        const sectionsData = await CmsClient.getSectionsForPage(page.id);
        setSections(sectionsData);
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-800"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full font-sans text-gray-900 fade-in">
      {sections.map(section => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
};

export default HomePage;