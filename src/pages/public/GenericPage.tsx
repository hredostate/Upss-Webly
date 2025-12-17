
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CmsClient } from '../../api/cmsClient';
import { Page, Section } from '../../types';
import { SectionRenderer } from '../../components/SectionRenderer';
import { BrandSpinner } from '../../components/common/BrandSpinner';
import { SectionPatternGrid } from '../../components/patterns/SectionPatternGrid';

const GenericPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadPage = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(false);
      
      try {
        const pageData = await CmsClient.getPageBySlug(slug);
        setPage(pageData);
        
        // Update document title
        document.title = pageData.seoTitle || `${pageData.title} | UPSS Benin City`;
        
        const sectionsData = await CmsClient.getSectionsForPage(pageData.id);
        setSections(sectionsData);
      } catch (err) {
        console.error(`Failed to load page: ${slug}`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return <BrandSpinner fullscreen={false} label="Loading page" />;
  }

  if (error || !page) {
    return (
      <div className="py-32 px-6 text-center">
         <h1 className="text-4xl font-serif text-gray-900 mb-4">Page Not Found</h1>
         <p className="text-gray-600 mb-8">The page you are looking for does not exist or has been moved.</p>
         <a href="/" className="text-maroon-800 font-bold hover:underline">Return Home</a>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full font-sans text-gray-900 fade-in">
      {sections.length > 0 ? (
        <SectionPatternGrid>
          {sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </SectionPatternGrid>
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
           <h1 className="text-5xl font-serif text-gray-900 mb-6">{page.title}</h1>
           <p className="text-gray-500 italic">This page is currently under construction.</p>
        </div>
      )}
    </div>
  );
};

export default GenericPage;
