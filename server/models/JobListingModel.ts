import { query } from './db';
import { JobListing, CreateJobListingDTO } from '../types/careers';

export const JobListingModel = {
  async findAll(filters?: { status?: string; categoryId?: string; isFeatured?: boolean }): Promise<JobListing[]> {
    let text = `
      SELECT 
        id, title, slug, category_id as "categoryId",
        employment_type as "employmentType",
        experience_level as "experienceLevel",
        min_experience_years as "minExperienceYears",
        summary, description, responsibilities, requirements, qualifications, benefits,
        salary_min as "salaryMin", salary_max as "salaryMax", show_salary as "showSalary",
        location, is_remote as "isRemote",
        application_deadline as "applicationDeadline",
        status, is_featured as "isFeatured", is_urgent as "isUrgent",
        views_count as "viewsCount", applications_count as "applicationsCount",
        posted_at as "postedAt",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_listings
      WHERE 1=1
    `;
    const values: any[] = [];
    let idx = 1;

    if (filters?.status) {
      text += ` AND status = $${idx++}`;
      values.push(filters.status);
    }
    if (filters?.categoryId) {
      text += ` AND category_id = $${idx++}`;
      values.push(filters.categoryId);
    }
    if (filters?.isFeatured !== undefined) {
      text += ` AND is_featured = $${idx++}`;
      values.push(filters.isFeatured);
    }

    text += ` ORDER BY posted_at DESC NULLS LAST, created_at DESC`;

    const res = await query(text, values);
    return res.rows;
  },

  async findById(id: string): Promise<JobListing | null> {
    const text = `
      SELECT 
        id, title, slug, category_id as "categoryId",
        employment_type as "employmentType",
        experience_level as "experienceLevel",
        min_experience_years as "minExperienceYears",
        summary, description, responsibilities, requirements, qualifications, benefits,
        salary_min as "salaryMin", salary_max as "salaryMax", show_salary as "showSalary",
        location, is_remote as "isRemote",
        application_deadline as "applicationDeadline",
        status, is_featured as "isFeatured", is_urgent as "isUrgent",
        views_count as "viewsCount", applications_count as "applicationsCount",
        posted_at as "postedAt",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_listings
      WHERE id = $1
    `;
    const res = await query(text, [id]);
    return res.rows[0] || null;
  },

  async findBySlug(slug: string): Promise<JobListing | null> {
    const text = `
      SELECT 
        id, title, slug, category_id as "categoryId",
        employment_type as "employmentType",
        experience_level as "experienceLevel",
        min_experience_years as "minExperienceYears",
        summary, description, responsibilities, requirements, qualifications, benefits,
        salary_min as "salaryMin", salary_max as "salaryMax", show_salary as "showSalary",
        location, is_remote as "isRemote",
        application_deadline as "applicationDeadline",
        status, is_featured as "isFeatured", is_urgent as "isUrgent",
        views_count as "viewsCount", applications_count as "applicationsCount",
        posted_at as "postedAt",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_listings
      WHERE slug = $1
    `;
    const res = await query(text, [slug]);
    return res.rows[0] || null;
  },

  async create(data: CreateJobListingDTO): Promise<JobListing> {
    const text = `
      INSERT INTO job_listings (
        title, slug, category_id, employment_type, experience_level, min_experience_years,
        summary, description, responsibilities, requirements, qualifications, benefits,
        salary_min, salary_max, show_salary, location, is_remote,
        application_deadline, status, is_featured, is_urgent, posted_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING 
        id, title, slug, category_id as "categoryId",
        employment_type as "employmentType",
        experience_level as "experienceLevel",
        min_experience_years as "minExperienceYears",
        summary, description, responsibilities, requirements, qualifications, benefits,
        salary_min as "salaryMin", salary_max as "salaryMax", show_salary as "showSalary",
        location, is_remote as "isRemote",
        application_deadline as "applicationDeadline",
        status, is_featured as "isFeatured", is_urgent as "isUrgent",
        views_count as "viewsCount", applications_count as "applicationsCount",
        posted_at as "postedAt",
        created_at as "createdAt", updated_at as "updatedAt"
    `;
    const values = [
      data.title,
      data.slug,
      data.categoryId || null,
      data.employmentType || null,
      data.experienceLevel || null,
      data.minExperienceYears || 0,
      data.summary || null,
      data.description || null,
      data.responsibilities || null,
      data.requirements || null,
      data.qualifications || null,
      data.benefits || null,
      data.salaryMin || null,
      data.salaryMax || null,
      data.showSalary ?? false,
      data.location || null,
      data.isRemote ?? false,
      data.applicationDeadline || null,
      data.status || 'draft',
      data.isFeatured ?? false,
      data.isUrgent ?? false,
      data.postedAt || null
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: Partial<CreateJobListingDTO>): Promise<JobListing | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.title !== undefined) { fields.push(`title = $${idx++}`); values.push(data.title); }
    if (data.slug !== undefined) { fields.push(`slug = $${idx++}`); values.push(data.slug); }
    if (data.categoryId !== undefined) { fields.push(`category_id = $${idx++}`); values.push(data.categoryId); }
    if (data.employmentType !== undefined) { fields.push(`employment_type = $${idx++}`); values.push(data.employmentType); }
    if (data.experienceLevel !== undefined) { fields.push(`experience_level = $${idx++}`); values.push(data.experienceLevel); }
    if (data.minExperienceYears !== undefined) { fields.push(`min_experience_years = $${idx++}`); values.push(data.minExperienceYears); }
    if (data.summary !== undefined) { fields.push(`summary = $${idx++}`); values.push(data.summary); }
    if (data.description !== undefined) { fields.push(`description = $${idx++}`); values.push(data.description); }
    if (data.responsibilities !== undefined) { fields.push(`responsibilities = $${idx++}`); values.push(data.responsibilities); }
    if (data.requirements !== undefined) { fields.push(`requirements = $${idx++}`); values.push(data.requirements); }
    if (data.qualifications !== undefined) { fields.push(`qualifications = $${idx++}`); values.push(data.qualifications); }
    if (data.benefits !== undefined) { fields.push(`benefits = $${idx++}`); values.push(data.benefits); }
    if (data.salaryMin !== undefined) { fields.push(`salary_min = $${idx++}`); values.push(data.salaryMin); }
    if (data.salaryMax !== undefined) { fields.push(`salary_max = $${idx++}`); values.push(data.salaryMax); }
    if (data.showSalary !== undefined) { fields.push(`show_salary = $${idx++}`); values.push(data.showSalary); }
    if (data.location !== undefined) { fields.push(`location = $${idx++}`); values.push(data.location); }
    if (data.isRemote !== undefined) { fields.push(`is_remote = $${idx++}`); values.push(data.isRemote); }
    if (data.applicationDeadline !== undefined) { fields.push(`application_deadline = $${idx++}`); values.push(data.applicationDeadline); }
    if (data.status !== undefined) { fields.push(`status = $${idx++}`); values.push(data.status); }
    if (data.isFeatured !== undefined) { fields.push(`is_featured = $${idx++}`); values.push(data.isFeatured); }
    if (data.isUrgent !== undefined) { fields.push(`is_urgent = $${idx++}`); values.push(data.isUrgent); }
    if (data.postedAt !== undefined) { fields.push(`posted_at = $${idx++}`); values.push(data.postedAt); }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const text = `
      UPDATE job_listings 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, title, slug, category_id as "categoryId",
        employment_type as "employmentType",
        experience_level as "experienceLevel",
        min_experience_years as "minExperienceYears",
        summary, description, responsibilities, requirements, qualifications, benefits,
        salary_min as "salaryMin", salary_max as "salaryMax", show_salary as "showSalary",
        location, is_remote as "isRemote",
        application_deadline as "applicationDeadline",
        status, is_featured as "isFeatured", is_urgent as "isUrgent",
        views_count as "viewsCount", applications_count as "applicationsCount",
        posted_at as "postedAt",
        created_at as "createdAt", updated_at as "updatedAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async incrementViews(id: string): Promise<void> {
    await query('UPDATE job_listings SET views_count = views_count + 1 WHERE id = $1', [id]);
  },

  async incrementApplications(id: string): Promise<void> {
    await query('UPDATE job_listings SET applications_count = applications_count + 1 WHERE id = $1', [id]);
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM job_listings WHERE id = $1', [id]);
  }
};
