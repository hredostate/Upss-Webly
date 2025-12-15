import { query } from './db';
import { JobApplication, CreateJobApplicationDTO, UpdateJobApplicationDTO, ApplicationStatus } from '../types/careers';

export const JobApplicationModel = {
  async findAll(filters?: { applicantId?: string; jobId?: string; status?: ApplicationStatus }): Promise<JobApplication[]> {
    let text = `
      SELECT 
        id, applicant_id as "applicantId", job_id as "jobId",
        cover_letter as "coverLetter", resume_url as "resumeUrl",
        additional_documents as "additionalDocuments",
        years_experience as "yearsExperience", expected_salary as "expectedSalary",
        available_start_date as "availableStartDate", answers,
        status, interview_date as "interviewDate",
        interview_location as "interviewLocation", interview_type as "interviewType",
        interview_notes as "interviewNotes", hr_notes as "hrNotes",
        rating, reviewed_by as "reviewedBy", reviewed_at as "reviewedAt",
        submitted_at as "submittedAt", updated_at as "updatedAt"
      FROM job_applications
      WHERE 1=1
    `;
    const values: any[] = [];
    let idx = 1;

    if (filters?.applicantId) {
      text += ` AND applicant_id = $${idx++}`;
      values.push(filters.applicantId);
    }
    if (filters?.jobId) {
      text += ` AND job_id = $${idx++}`;
      values.push(filters.jobId);
    }
    if (filters?.status) {
      text += ` AND status = $${idx++}`;
      values.push(filters.status);
    }

    text += ` ORDER BY submitted_at DESC`;

    const res = await query(text, values);
    return res.rows;
  },

  async findById(id: string): Promise<JobApplication | null> {
    const text = `
      SELECT 
        id, applicant_id as "applicantId", job_id as "jobId",
        cover_letter as "coverLetter", resume_url as "resumeUrl",
        additional_documents as "additionalDocuments",
        years_experience as "yearsExperience", expected_salary as "expectedSalary",
        available_start_date as "availableStartDate", answers,
        status, interview_date as "interviewDate",
        interview_location as "interviewLocation", interview_type as "interviewType",
        interview_notes as "interviewNotes", hr_notes as "hrNotes",
        rating, reviewed_by as "reviewedBy", reviewed_at as "reviewedAt",
        submitted_at as "submittedAt", updated_at as "updatedAt"
      FROM job_applications
      WHERE id = $1
    `;
    const res = await query(text, [id]);
    return res.rows[0] || null;
  },

  async create(data: CreateJobApplicationDTO): Promise<JobApplication> {
    const text = `
      INSERT INTO job_applications (
        applicant_id, job_id, cover_letter, resume_url, additional_documents,
        years_experience, expected_salary, available_start_date, answers
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING 
        id, applicant_id as "applicantId", job_id as "jobId",
        cover_letter as "coverLetter", resume_url as "resumeUrl",
        additional_documents as "additionalDocuments",
        years_experience as "yearsExperience", expected_salary as "expectedSalary",
        available_start_date as "availableStartDate", answers,
        status, interview_date as "interviewDate",
        interview_location as "interviewLocation", interview_type as "interviewType",
        interview_notes as "interviewNotes", hr_notes as "hrNotes",
        rating, reviewed_by as "reviewedBy", reviewed_at as "reviewedAt",
        submitted_at as "submittedAt", updated_at as "updatedAt"
    `;
    const values = [
      data.applicantId,
      data.jobId,
      data.coverLetter || null,
      data.resumeUrl || null,
      data.additionalDocuments ? JSON.stringify(data.additionalDocuments) : null,
      data.yearsExperience || null,
      data.expectedSalary || null,
      data.availableStartDate || null,
      data.answers ? JSON.stringify(data.answers) : null
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: UpdateJobApplicationDTO): Promise<JobApplication | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.coverLetter !== undefined) { fields.push(`cover_letter = $${idx++}`); values.push(data.coverLetter); }
    if (data.resumeUrl !== undefined) { fields.push(`resume_url = $${idx++}`); values.push(data.resumeUrl); }
    if (data.additionalDocuments !== undefined) { 
      fields.push(`additional_documents = $${idx++}`); 
      values.push(JSON.stringify(data.additionalDocuments)); 
    }
    if (data.yearsExperience !== undefined) { fields.push(`years_experience = $${idx++}`); values.push(data.yearsExperience); }
    if (data.expectedSalary !== undefined) { fields.push(`expected_salary = $${idx++}`); values.push(data.expectedSalary); }
    if (data.availableStartDate !== undefined) { fields.push(`available_start_date = $${idx++}`); values.push(data.availableStartDate); }
    if (data.answers !== undefined) { 
      fields.push(`answers = $${idx++}`); 
      values.push(JSON.stringify(data.answers)); 
    }
    if (data.status !== undefined) { fields.push(`status = $${idx++}`); values.push(data.status); }
    if (data.interviewDate !== undefined) { fields.push(`interview_date = $${idx++}`); values.push(data.interviewDate); }
    if (data.interviewLocation !== undefined) { fields.push(`interview_location = $${idx++}`); values.push(data.interviewLocation); }
    if (data.interviewType !== undefined) { fields.push(`interview_type = $${idx++}`); values.push(data.interviewType); }
    if (data.interviewNotes !== undefined) { fields.push(`interview_notes = $${idx++}`); values.push(data.interviewNotes); }
    if (data.hrNotes !== undefined) { fields.push(`hr_notes = $${idx++}`); values.push(data.hrNotes); }
    if (data.rating !== undefined) { fields.push(`rating = $${idx++}`); values.push(data.rating); }
    if (data.reviewedBy !== undefined) { 
      fields.push(`reviewed_by = $${idx++}`); 
      values.push(data.reviewedBy); 
      fields.push(`reviewed_at = NOW()`);
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const text = `
      UPDATE job_applications 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, applicant_id as "applicantId", job_id as "jobId",
        cover_letter as "coverLetter", resume_url as "resumeUrl",
        additional_documents as "additionalDocuments",
        years_experience as "yearsExperience", expected_salary as "expectedSalary",
        available_start_date as "availableStartDate", answers,
        status, interview_date as "interviewDate",
        interview_location as "interviewLocation", interview_type as "interviewType",
        interview_notes as "interviewNotes", hr_notes as "hrNotes",
        rating, reviewed_by as "reviewedBy", reviewed_at as "reviewedAt",
        submitted_at as "submittedAt", updated_at as "updatedAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM job_applications WHERE id = $1', [id]);
  }
};
