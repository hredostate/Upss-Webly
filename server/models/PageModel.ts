import { query } from './db.js';
import { Page, CreatePageDTO } from '../types/cms';

export const PageModel = {
  async findAll(): Promise<Page[]> {
    const text = `
      SELECT 
        id, slug, title, 
        seo_title as "seoTitle", 
        seo_description as "seoDescription",
        track_type as "trackType",
        is_home_page as "isHomePage",
        is_published as "isPublished",
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM pages
      ORDER BY title ASC
    `;
    const res = await query(text);
    return res.rows;
  },

  async findBySlug(slug: string): Promise<Page | null> {
    const text = `
      SELECT 
        id, slug, title, 
        seo_title as "seoTitle", 
        seo_description as "seoDescription",
        track_type as "trackType",
        is_home_page as "isHomePage",
        is_published as "isPublished",
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM pages
      WHERE slug = $1
    `;
    const res = await query(text, [slug]);
    return res.rows[0] || null;
  },

  async findById(id: string): Promise<Page | null> {
    const text = `
      SELECT 
        id, slug, title, 
        seo_title as "seoTitle", 
        seo_description as "seoDescription",
        track_type as "trackType",
        is_home_page as "isHomePage",
        is_published as "isPublished",
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM pages
      WHERE id = $1
    `;
    const res = await query(text, [id]);
    return res.rows[0] || null;
  },

  async create(data: CreatePageDTO): Promise<Page> {
    const text = `
      INSERT INTO pages (slug, title, seo_title, seo_description, track_type, is_home_page, is_published)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id, slug, title, 
        seo_title as "seoTitle", 
        seo_description as "seoDescription",
        track_type as "trackType",
        is_home_page as "isHomePage",
        is_published as "isPublished",
        created_at as "createdAt", 
        updated_at as "updatedAt"
    `;
    const values = [
      data.slug, 
      data.title, 
      data.seoTitle || null, 
      data.seoDescription || null,
      data.trackType || 'general',
      data.isHomePage || false,
      data.isPublished ?? true
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: Partial<CreatePageDTO>): Promise<Page | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.slug !== undefined) { fields.push(`slug = $${idx++}`); values.push(data.slug); }
    if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
    if (data.seoTitle !== undefined) { fields.push(`seo_title = $${idx++}`); values.push(data.seoTitle); }
    if (data.seoDescription !== undefined) { fields.push(`seo_description = $${idx++}`); values.push(data.seoDescription); }
    if (data.trackType !== undefined) { fields.push(`track_type = $${idx++}`); values.push(data.trackType); }
    if (data.isHomePage !== undefined) { fields.push(`is_home_page = $${idx++}`); values.push(data.isHomePage); }
    if (data.isPublished !== undefined) { fields.push(`is_published = $${idx++}`); values.push(data.isPublished); }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const text = `
      UPDATE pages 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, slug, title, 
        seo_title as "seoTitle", 
        seo_description as "seoDescription",
        track_type as "trackType",
        is_home_page as "isHomePage",
        is_published as "isPublished",
        created_at as "createdAt", 
        updated_at as "updatedAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM pages WHERE id = $1', [id]);
  }
};