import { query } from './db';
import { JobApplicant, CreateJobApplicantDTO, UpdateJobApplicantDTO } from '../types/careers';
import * as crypto from 'crypto';

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const JobApplicantModel = {
  async findAll(): Promise<JobApplicant[]> {
    const text = `
      SELECT 
        id, user_id as "userId", first_name as "firstName", last_name as "lastName",
        email, password_hash as "passwordHash", phone, whatsapp,
        address, city, state, country,
        current_job_title as "currentJobTitle", current_employer as "currentEmployer",
        years_of_experience as "yearsOfExperience",
        highest_education as "highestEducation", field_of_study as "fieldOfStudy",
        resume_url as "resumeUrl", cover_letter_url as "coverLetterUrl",
        photo_url as "photoUrl", certificates_urls as "certificatesUrls",
        bio, skills, linkedin_url as "linkedinUrl",
        is_active as "isActive", profile_complete as "profileComplete",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_applicants
      ORDER BY created_at DESC
    `;
    const res = await query(text);
    return res.rows;
  },

  async findById(id: string): Promise<JobApplicant | null> {
    const text = `
      SELECT 
        id, user_id as "userId", first_name as "firstName", last_name as "lastName",
        email, password_hash as "passwordHash", phone, whatsapp,
        address, city, state, country,
        current_job_title as "currentJobTitle", current_employer as "currentEmployer",
        years_of_experience as "yearsOfExperience",
        highest_education as "highestEducation", field_of_study as "fieldOfStudy",
        resume_url as "resumeUrl", cover_letter_url as "coverLetterUrl",
        photo_url as "photoUrl", certificates_urls as "certificatesUrls",
        bio, skills, linkedin_url as "linkedinUrl",
        is_active as "isActive", profile_complete as "profileComplete",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_applicants
      WHERE id = $1
    `;
    const res = await query(text, [id]);
    return res.rows[0] || null;
  },

  async findByEmail(email: string): Promise<JobApplicant | null> {
    const text = `
      SELECT 
        id, user_id as "userId", first_name as "firstName", last_name as "lastName",
        email, password_hash as "passwordHash", phone, whatsapp,
        address, city, state, country,
        current_job_title as "currentJobTitle", current_employer as "currentEmployer",
        years_of_experience as "yearsOfExperience",
        highest_education as "highestEducation", field_of_study as "fieldOfStudy",
        resume_url as "resumeUrl", cover_letter_url as "coverLetterUrl",
        photo_url as "photoUrl", certificates_urls as "certificatesUrls",
        bio, skills, linkedin_url as "linkedinUrl",
        is_active as "isActive", profile_complete as "profileComplete",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM job_applicants
      WHERE email = $1
    `;
    const res = await query(text, [email]);
    return res.rows[0] || null;
  },

  async create(data: CreateJobApplicantDTO): Promise<JobApplicant> {
    const passwordHash = hashPassword(data.password);
    const text = `
      INSERT INTO job_applicants (
        first_name, last_name, email, password_hash, phone, whatsapp,
        address, city, state, country
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING 
        id, user_id as "userId", first_name as "firstName", last_name as "lastName",
        email, password_hash as "passwordHash", phone, whatsapp,
        address, city, state, country,
        current_job_title as "currentJobTitle", current_employer as "currentEmployer",
        years_of_experience as "yearsOfExperience",
        highest_education as "highestEducation", field_of_study as "fieldOfStudy",
        resume_url as "resumeUrl", cover_letter_url as "coverLetterUrl",
        photo_url as "photoUrl", certificates_urls as "certificatesUrls",
        bio, skills, linkedin_url as "linkedinUrl",
        is_active as "isActive", profile_complete as "profileComplete",
        created_at as "createdAt", updated_at as "updatedAt"
    `;
    const values = [
      data.firstName,
      data.lastName,
      data.email,
      passwordHash,
      data.phone || null,
      data.whatsapp || null,
      data.address || null,
      data.city || null,
      data.state || null,
      data.country || 'Nigeria'
    ];
    const res = await query(text, values);
    return res.rows[0];
  },

  async update(id: string, data: UpdateJobApplicantDTO): Promise<JobApplicant | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.firstName !== undefined) { fields.push(`first_name = $${idx++}`); values.push(data.firstName); }
    if (data.lastName !== undefined) { fields.push(`last_name = $${idx++}`); values.push(data.lastName); }
    if (data.phone !== undefined) { fields.push(`phone = $${idx++}`); values.push(data.phone); }
    if (data.whatsapp !== undefined) { fields.push(`whatsapp = $${idx++}`); values.push(data.whatsapp); }
    if (data.address !== undefined) { fields.push(`address = $${idx++}`); values.push(data.address); }
    if (data.city !== undefined) { fields.push(`city = $${idx++}`); values.push(data.city); }
    if (data.state !== undefined) { fields.push(`state = $${idx++}`); values.push(data.state); }
    if (data.country !== undefined) { fields.push(`country = $${idx++}`); values.push(data.country); }
    if (data.currentJobTitle !== undefined) { fields.push(`current_job_title = $${idx++}`); values.push(data.currentJobTitle); }
    if (data.currentEmployer !== undefined) { fields.push(`current_employer = $${idx++}`); values.push(data.currentEmployer); }
    if (data.yearsOfExperience !== undefined) { fields.push(`years_of_experience = $${idx++}`); values.push(data.yearsOfExperience); }
    if (data.highestEducation !== undefined) { fields.push(`highest_education = $${idx++}`); values.push(data.highestEducation); }
    if (data.fieldOfStudy !== undefined) { fields.push(`field_of_study = $${idx++}`); values.push(data.fieldOfStudy); }
    if (data.resumeUrl !== undefined) { fields.push(`resume_url = $${idx++}`); values.push(data.resumeUrl); }
    if (data.coverLetterUrl !== undefined) { fields.push(`cover_letter_url = $${idx++}`); values.push(data.coverLetterUrl); }
    if (data.photoUrl !== undefined) { fields.push(`photo_url = $${idx++}`); values.push(data.photoUrl); }
    if (data.certificatesUrls !== undefined) { 
      fields.push(`certificates_urls = $${idx++}`); 
      values.push(JSON.stringify(data.certificatesUrls)); 
    }
    if (data.bio !== undefined) { fields.push(`bio = $${idx++}`); values.push(data.bio); }
    if (data.skills !== undefined) { fields.push(`skills = $${idx++}`); values.push(data.skills); }
    if (data.linkedinUrl !== undefined) { fields.push(`linkedin_url = $${idx++}`); values.push(data.linkedinUrl); }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const text = `
      UPDATE job_applicants 
      SET ${fields.join(', ')} 
      WHERE id = $${idx}
      RETURNING 
        id, user_id as "userId", first_name as "firstName", last_name as "lastName",
        email, password_hash as "passwordHash", phone, whatsapp,
        address, city, state, country,
        current_job_title as "currentJobTitle", current_employer as "currentEmployer",
        years_of_experience as "yearsOfExperience",
        highest_education as "highestEducation", field_of_study as "fieldOfStudy",
        resume_url as "resumeUrl", cover_letter_url as "coverLetterUrl",
        photo_url as "photoUrl", certificates_urls as "certificatesUrls",
        bio, skills, linkedin_url as "linkedinUrl",
        is_active as "isActive", profile_complete as "profileComplete",
        created_at as "createdAt", updated_at as "updatedAt"
    `;

    const res = await query(text, values);
    return res.rows[0] || null;
  },

  async verifyPassword(email: string, password: string): Promise<JobApplicant | null> {
    const applicant = await this.findByEmail(email);
    if (!applicant) return null;
    
    const passwordHash = hashPassword(password);
    if (passwordHash === applicant.passwordHash) {
      return applicant;
    }
    return null;
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM job_applicants WHERE id = $1', [id]);
  }
};
