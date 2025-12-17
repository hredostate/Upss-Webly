
import { query } from './db.js';
import { NewsItem, CreateNewsItemDTO } from '../types/cms';

export const NewsItemModel = {
  async findAll(options: { featured?: boolean; limit?: number } = {}): Promise<NewsItem[]> {
    let text = `
      SELECT 
        id, slug, title, summary, body, category, 
        published_date as "publishedDate", 
        is_featured as "isFeatured", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM news_items
    `;
    
    const params: any[] = [];
    if (options.featured) {
      text += ` WHERE is_featured = $1`;
      params.push(true);
    }
    
    text += ` ORDER BY published_date DESC`;
    
    if (options.limit) {
      text += ` LIMIT $${params.length + 1}`;
      params.push(options.limit);
    }

    const res = await query(text, params);
    return res.rows;
  },

  async findBySlug(slug: string): Promise<NewsItem | null> {
    const text = `
      SELECT 
        id, slug, title, summary, body, category, 
        published_date as "publishedDate", 
        is_featured as "isFeatured", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM news_items
      WHERE slug = $1
    `;
    const res = await query(text, [slug]);
    return res.rows[0] || null;
  },

  async findById(id: string): Promise<NewsItem | null> {
    const text = `
      SELECT 
        id, slug, title, summary, body, category, 
        published_date as "publishedDate", 
        is_featured as "isFeatured", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM news_items
      WHERE id = $1
    `;
    const res = await query(text, [id]);
    return res.rows[0] || null;
  },

  async create(data: CreateNewsItemDTO): Promise<NewsItem> {
    const text = `
      INSERT INTO news_items (slug, title, summary, body, category, published_date, is_featured)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id, slug, title, summary, body, category, 
        published_date as "publishedDate", 
        is_featured as "isFeatured", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
    `;
    const values = [
      data.slug,
      data.title,
      data.summary || null,
      data.body || null,
      data.category || 'General',
      data.publishedDate || new Date(),
      data.isFeatured || false
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: Partial<CreateNewsItemDTO>): Promise<NewsItem | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.slug !== undefined) { fields.push(`slug = $${idx++}`); values.push(data.slug); }
    if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
    if (data.summary !== undefined) { fields.push(`summary = $${idx++}`); values.push(data.summary); }
    if (data.body !== undefined) { fields.push(`body = $${idx++}`); values.push(data.body); }
    if (data.category !== undefined) { fields.push(`category = $${idx++}`); values.push(data.category); }
    if (data.publishedDate !== undefined) { fields.push(`published_date = $${idx++}`); values.push(data.publishedDate); }
    if (data.isFeatured !== undefined) { fields.push(`is_featured = $${idx++}`); values.push(data.isFeatured); }

    fields.push(`updated_at = NOW()`);

    if (fields.length === 1) return this.findById(id); // Only updated_at

    values.push(id);
    const text = `
      UPDATE news_items 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, slug, title, summary, body, category, 
        published_date as "publishedDate", 
        is_featured as "isFeatured", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM news_items WHERE id = $1', [id]);
  }
};
