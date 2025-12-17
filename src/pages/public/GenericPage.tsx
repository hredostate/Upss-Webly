
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CmsClient } from '../../api/cmsClient';
import { Page, Section } from '../../types';
import { SectionRenderer } from '../../components/SectionRenderer';
import { SectionPatternGrid } from '../../components/patterns/SectionPatternGrid';
import { SectionsScaffold } from '../../components/skeletons/SectionSkeleton';
import { normalizeSections } from '../../lib/normalizeSections';

const GenericPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const cached = (() => {
    if (!slug) return null;
    const stored = sessionStorage.getItem(`upss-page-${slug}`);
    if (stored) {
      try {
        return JSON.parse(stored) as { page: Page; sections: Section[] };
      } catch (err) {
        console.warn('Unable to restore cached page', err);
      }
    }
    return null;
  })();

  const [page, setPage] = useState<Page | null>(cached?.page ?? null);
  const [sections, setSections] = useState<Section[]>(cached?.sections ?? []);
  const [loading, setLoading] = useState(() => !cached);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadPage = async () => {
      if (!slug) return;

      setLoading(sections.length === 0);
      setError(false);
      
      try {
        const pageData = await CmsClient.getPageBySlug(slug);
        setPage(pageData);

        // Update document title
        document.title = pageData.seoTitle || `${pageData.title} | UPSS Benin City`;

        const sectionsData = await CmsClient.getSectionsForPage(pageData.id);
        setSections(sectionsData);
        sessionStorage.setItem(`upss-page-${slug}`, JSON.stringify({ page: pageData, sections: sectionsData }));
      } catch (err) {
        console.error(`Failed to load page: ${slug}`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  const normalized = useMemo(() => normalizeSections(sections), [sections]);

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
      {loading && sections.length === 0 ? (
        <SectionsScaffold />
      ) : sections.length > 0 ? (
        <SectionPatternGrid>
          {normalized.map((section) => (
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
