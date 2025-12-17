import { query } from './db.js';
import { ApplicationStatusHistory } from '../types/careers';

export const ApplicationStatusHistoryModel = {
  async findByApplicationId(applicationId: string): Promise<ApplicationStatusHistory[]> {
    const text = `
      SELECT 
        id, application_id as "applicationId",
        previous_status as "previousStatus", new_status as "newStatus",
        notes, changed_by as "changedBy",
        created_at as "createdAt"
      FROM application_status_history
      WHERE application_id = $1
      ORDER BY created_at ASC
    `;
    const res = await query(text, [applicationId]);
    return res.rows;
  },

  async create(
    applicationId: string,
    previousStatus: string | null,
    newStatus: string,
    notes?: string,
    changedBy?: string
  ): Promise<ApplicationStatusHistory> {
    const text = `
      INSERT INTO application_status_history (
        application_id, previous_status, new_status, notes, changed_by
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        id, application_id as "applicationId",
        previous_status as "previousStatus", new_status as "newStatus",
        notes, changed_by as "changedBy",
        created_at as "createdAt"
    `;
    const values = [applicationId, previousStatus, newStatus, notes || null, changedBy || null];
    const res = await query(text, values);
    return res.rows[0];
  }
};

export const SavedJobModel = {
  async findByApplicantId(applicantId: string): Promise<any[]> {
    const text = `
      SELECT 
        sj.id, sj.applicant_id as "applicantId", sj.job_id as "jobId",
        sj.saved_at as "savedAt",
        jl.title, jl.slug, jl.location, jl.employment_type as "employmentType"
      FROM saved_jobs sj
      JOIN job_listings jl ON sj.job_id = jl.id
      WHERE sj.applicant_id = $1
      ORDER BY sj.saved_at DESC
    `;
    const res = await query(text, [applicantId]);
    return res.rows;
  },

  async create(applicantId: string, jobId: string): Promise<any> {
    const text = `
      INSERT INTO saved_jobs (applicant_id, job_id)
      VALUES ($1, $2)
      ON CONFLICT (applicant_id, job_id) DO NOTHING
      RETURNING id, applicant_id as "applicantId", job_id as "jobId", saved_at as "savedAt"
    `;
    const res = await query(text, [applicantId, jobId]);
    return res.rows[0];
  },

  async delete(applicantId: string, jobId: string): Promise<void> {
    await query('DELETE FROM saved_jobs WHERE applicant_id = $1 AND job_id = $2', [applicantId, jobId]);
  },

  async isSaved(applicantId: string, jobId: string): Promise<boolean> {
    const text = 'SELECT id FROM saved_jobs WHERE applicant_id = $1 AND job_id = $2';
    const res = await query(text, [applicantId, jobId]);
    return res.rows.length > 0;
  }
};

export const JobAlertModel = {
  async findByApplicantId(applicantId: string): Promise<any[]> {
    const text = `
      SELECT 
        id, applicant_id as "applicantId", alert_name as "alertName",
        categories, keywords, employment_types as "employmentTypes",
        frequency, is_active as "isActive",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_alerts
      WHERE applicant_id = $1
      ORDER BY created_at DESC
    `;
    const res = await query(text, [applicantId]);
    return res.rows;
  },

  async create(data: {
    applicantId: string;
    alertName: string;
    categories?: string[];
    keywords?: string;
    employmentTypes?: string[];
    frequency: string;
    isActive?: boolean;
  }): Promise<any> {
    const text = `
      INSERT INTO job_alerts (
        applicant_id, alert_name, categories, keywords, employment_types, frequency, is_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        id, applicant_id as "applicantId", alert_name as "alertName",
        categories, keywords, employment_types as "employmentTypes",
        frequency, is_active as "isActive",
        created_at as "createdAt", updated_at as "updatedAt"
    `;
    const values = [
      data.applicantId,
      data.alertName,
      data.categories ? JSON.stringify(data.categories) : null,
      data.keywords || null,
      data.employmentTypes ? JSON.stringify(data.employmentTypes) : null,
      data.frequency,
      data.isActive ?? true
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: Partial<{
    alertName: string;
    categories: string[];
    keywords: string;
    employmentTypes: string[];
    frequency: string;
    isActive: boolean;
  }>): Promise<any> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.alertName !== undefined) { fields.push(`alert_name = $${idx++}`); values.push(data.alertName); }
    if (data.categories !== undefined) { 
      fields.push(`categories = $${idx++}`); 
      values.push(JSON.stringify(data.categories)); 
    }
    if (data.keywords !== undefined) { fields.push(`keywords = $${idx++}`); values.push(data.keywords); }
    if (data.employmentTypes !== undefined) { 
      fields.push(`employment_types = $${idx++}`); 
      values.push(JSON.stringify(data.employmentTypes)); 
    }
    if (data.frequency !== undefined) { fields.push(`frequency = $${idx++}`); values.push(data.frequency); }
    if (data.isActive !== undefined) { fields.push(`is_active = $${idx++}`); values.push(data.isActive); }

    if (fields.length === 0) return null;

    values.push(id);
    const text = `
      UPDATE job_alerts 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, applicant_id as "applicantId", alert_name as "alertName",
        categories, keywords, employment_types as "employmentTypes",
        frequency, is_active as "isActive",
        created_at as "createdAt", updated_at as "updatedAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM job_alerts WHERE id = $1', [id]);
  }
};
