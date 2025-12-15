import { query } from './db';
import { JobCategory, CreateJobCategoryDTO } from '../types/careers';

export const JobCategoryModel = {
  async findAll(): Promise<JobCategory[]> {
    const text = `
      SELECT 
        id, name, slug, description, icon,
        is_active as "isActive",
        created_at as "createdAt"
      FROM job_categories
      WHERE is_active = TRUE
      ORDER BY name ASC
    `;
    const res = await query(text);
    return res.rows;
  },

  async findById(id: string): Promise<JobCategory | null> {
    const text = `
      SELECT 
        id, name, slug, description, icon,
        is_active as "isActive",
        created_at as "createdAt"
      FROM job_categories
      WHERE id = $1
    `;
    const res = await query(text, [id]);
    return res.rows[0] || null;
  },

  async findBySlug(slug: string): Promise<JobCategory | null> {
    const text = `
      SELECT 
        id, name, slug, description, icon,
        is_active as "isActive",
        created_at as "createdAt"
      FROM job_categories
      WHERE slug = $1
    `;
    const res = await query(text, [slug]);
    return res.rows[0] || null;
  },

  async create(data: CreateJobCategoryDTO): Promise<JobCategory> {
    const text = `
      INSERT INTO job_categories (name, slug, description, icon, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        id, name, slug, description, icon,
        is_active as "isActive",
        created_at as "createdAt"
    `;
    const values = [
      data.name,
      data.slug,
      data.description || null,
      data.icon || null,
      data.isActive ?? true
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: Partial<CreateJobCategoryDTO>): Promise<JobCategory | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.name !== undefined) { fields.push(`name = $${idx++}`); values.push(data.name); }
    if (data.slug !== undefined) { fields.push(`slug = $${idx++}`); values.push(data.slug); }
    if (data.description !== undefined) { fields.push(`description = $${idx++}`); values.push(data.description); }
    if (data.icon !== undefined) { fields.push(`icon = $${idx++}`); values.push(data.icon); }
    if (data.isActive !== undefined) { fields.push(`is_active = $${idx++}`); values.push(data.isActive); }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const text = `
      UPDATE job_categories 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, name, slug, description, icon,
        is_active as "isActive",
        created_at as "createdAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM job_categories WHERE id = $1', [id]);
  }
};
