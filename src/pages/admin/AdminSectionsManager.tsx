
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminClient } from '../../api/adminClient';
import { Page, Section } from '../../types';
import { SectionForm } from '../../components/admin/SectionForm';
import { BrandSpinner } from '../../components/common/BrandSpinner';

export default function AdminSectionsManager() {
  const { pageId } = useParams<{ pageId: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI State
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<Partial<Section> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (pageId) {
      loadData(pageId);
    }
  }, [pageId]);

  const loadData = async (id: string) => {
    try {
      setLoading(true);
      const [pageData, sectionsData] = await Promise.all([
        AdminClient.getPage(id),
        AdminClient.getSections(id)
      ]);
      setPage(pageData);
      setSections(sectionsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingSection({ pageId: pageId, orderIndex: sections.length });
    setIsEditing(true);
  };

  const handleEditClick = (section: Section) => {
    setEditingSection(section);
    setIsEditing(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;
    try {
      await AdminClient.deleteSection(id);
      setSuccessMsg('Item deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
      if (pageId) loadData(pageId);
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleSave = async (data: Partial<Section>) => {
    if (!pageId) return;
    setSaving(true);
    try {
      if (data.id) {
        await AdminClient.updateSection(data.id, data);
      } else {
        await AdminClient.createSection(pageId, { ...data, orderIndex: sections.length });
      }
      setSuccessMsg('Content saved successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
      setIsEditing(false);
      setEditingSection(null);
      loadData(pageId);
    } catch (err: any) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    if (!sections.length) return;
    
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Swap
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update local state immediately for responsiveness
    setSections(newSections);

    // Persist
    const orderedIds = newSections.map(s => s.id);
    try {
      await AdminClient.reorderSections(orderedIds);
      setSuccessMsg('Layout updated.');
      setTimeout(() => setSuccessMsg(''), 2000);
    } catch (err) {
      console.error('Failed to reorder', err);
      // Revert on fail?
      if (pageId) loadData(pageId);
    }
  };

  const toggleVisibility = async (section: Section) => {
    try {
      const updated = { ...section, isVisible: !section.isVisible };
      await AdminClient.updateSection(section.id, updated);
      // Update local state
      setSections(prev => prev.map(s => s.id === section.id ? { ...s, isVisible: !s.isVisible } : s));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center"><BrandSpinner label="Loading sections" /></div>;
  if (error || !page) return <div className="p-10 text-red-600">Error: {error || 'Page not found'}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
       {/* Header */}
       <div className="flex justify-between items-center pb-6 border-b border-gray-200">
         <div>
            <div className="text-sm text-gray-500 mb-1">
              <Link to="/admin/pages" className="hover:underline">&larr; Back to Pages</Link>
            </div>
            <h1 className="text-2xl font-bold font-serif text-gray-900">
              Content Editor: <span className="text-maroon-800">{page.title}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage the layout and content blocks for this page.</p>
         </div>
         <button 
           onClick={handleAddClick}
           className="btn-primary flex items-center gap-2"
         >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
           + Add New Section
         </button>
       </div>

       {successMsg && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 shadow-sm" role="alert">
            <p className="font-bold">Success</p>
            <p>{successMsg}</p>
          </div>
       )}

       {/* Editor Modal */}
       {isEditing && (
         <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
               <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsEditing(false)}>
                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
               </div>
               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
               <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                     <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        {editingSection?.id ? 'Edit Section Content' : 'Add New Content Section'}
                     </h3>
                     <SectionForm 
                       initialData={editingSection || {}} 
                       onSave={handleSave} 
                       onCancel={() => setIsEditing(false)}
                       isLoading={saving}
                     />
                  </div>
               </div>
            </div>
         </div>
       )}

       {/* Sections List */}
       <div className="space-y-4">
          {sections.length === 0 ? (
             <div className="text-center py-20 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">This page is currently empty.</h3>
                <p className="mt-1 text-sm text-gray-500">Add a section to begin building the layout.</p>
                <div className="mt-6">
                  <button onClick={handleAddClick} className="btn-primary">
                    Add Section
                  </button>
                </div>
             </div>
          ) : (
            sections.map((section, idx) => (
              <div key={section.id} className={`bg-white border rounded-lg shadow-sm p-4 flex items-center gap-4 transition-all ${!section.isVisible ? 'opacity-60 bg-gray-50' : ''}`}>
                 {/* Reorder Controls */}
                 <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => handleReorder(idx, 'up')} 
                      disabled={idx === 0}
                      className="p-1 text-gray-400 hover:text-maroon-800 disabled:opacity-30"
                      title="Move Up"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button 
                      onClick={() => handleReorder(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="p-1 text-gray-400 hover:text-maroon-800 disabled:opacity-30"
                      title="Move Down"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                 </div>

                 {/* Icon based on Type */}
                 <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                    {section.type.substring(0, 3)}
                 </div>

                 {/* Info */}
                 <div className="flex-1">
                    <div className="flex items-center gap-2">
                       <h3 className="font-bold text-gray-800">{section.type} - {section.title || '(No Title)'}</h3>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                       {section.isVisible ? <span className="text-green-600 font-bold">Visible</span> : <span className="text-red-500 font-bold">Hidden</span>}
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                    <button 
                      onClick={() => handleEditClick(section)}
                      className="text-gray-600 hover:text-maroon-800 text-sm font-bold uppercase tracking-wide"
                    >
                      Edit Content
                    </button>
                    <button 
                      onClick={() => toggleVisibility(section)}
                      className="text-gray-400 hover:text-gray-600 text-sm font-bold uppercase tracking-wide"
                    >
                      {section.isVisible ? 'Hide' : 'Show'}
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(section.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-bold uppercase tracking-wide"
                    >
                      Delete
                    </button>
                 </div>
              </div>
            ))
          )}
       </div>
    </div>
  );
}
