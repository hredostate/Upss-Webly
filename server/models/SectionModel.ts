import { query } from './db';
import { Section, CreateSectionDTO } from '../types/cms';

export const SectionModel = {
  async findByPageId(pageId: string): Promise<Section[]> {
    const text = `
      SELECT 
        id, page_id as "pageId", type, 
        order_index as "orderIndex", 
        title, subtitle, 
        content_json as "contentJson", 
        is_visible as "isVisible", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
      FROM sections
      WHERE page_id = $1
      ORDER BY order_index ASC
    `;
    const res = await query(text, [pageId]);
    return res.rows;
  },

  async create(data: CreateSectionDTO): Promise<Section> {
    const text = `
      INSERT INTO sections (page_id, type, order_index, title, subtitle, content_json, is_visible)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id, page_id as "pageId", type, 
        order_index as "orderIndex", 
        title, subtitle, 
        content_json as "contentJson", 
        is_visible as "isVisible", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
    `;
    const values = [
      data.pageId,
      data.type,
      data.orderIndex,
      data.title || null,
      data.subtitle || null,
      data.contentJson || {},
      data.isVisible ?? true
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: Partial<CreateSectionDTO>): Promise<Section | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.type !== undefined) { fields.push(`type = $${idx++}`); values.push(data.type); }
    if (data.orderIndex !== undefined) { fields.push(`order_index = $${idx++}`); values.push(data.orderIndex); }
    if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
    if (data.subtitle !== undefined) { fields.push(`subtitle = $${idx++}`); values.push(data.subtitle); }
    if (data.contentJson !== undefined) { fields.push(`content_json = $${idx++}`); values.push(data.contentJson); }
    if (data.isVisible !== undefined) { fields.push(`is_visible = $${idx++}`); values.push(data.isVisible); }

    if (fields.length === 0) return null; // Or fetch

    values.push(id);
    const text = `
      UPDATE sections
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING 
        id, page_id as "pageId", type, 
        order_index as "orderIndex", 
        title, subtitle, 
        content_json as "contentJson", 
        is_visible as "isVisible", 
        created_at as "createdAt", 
        updated_at as "updatedAt"
    `;
    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM sections WHERE id = $1', [id]);
  },

  async reorder(sectionIds: string[]): Promise<void> {
    // Basic reorder within a transaction would be better, but doing simple updates for now
    const client = await import('./db').then(m => m.default.connect());
    try {
      await client.query('BEGIN');
      for (let i = 0; i < sectionIds.length; i++) {
        await client.query('UPDATE sections SET order_index = $1 WHERE id = $2', [i, sectionIds[i]]);
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
};