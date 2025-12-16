import React, { useEffect, useState } from 'react';
import { CmsClient } from '../../api/cmsClient';
import { Section } from '../../types';
import { SectionRenderer } from '../../components/SectionRenderer';
import { BrandSpinner } from '../../components/common/BrandSpinner';

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
    return <BrandSpinner fullscreen label="Loading school homepage" />;
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