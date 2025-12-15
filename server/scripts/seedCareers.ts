import { JobCategoryModel } from '../models/JobCategoryModel';
import { JobListingModel } from '../models/JobListingModel';
import pool from '../models/db';

const seedCareersData = async () => {
  console.log('Starting careers data seed process...');

  // 17 Job Categories
  const categories = [
    { name: 'Teaching - Primary', slug: 'teaching-primary', icon: '👨‍🏫', description: 'Primary school teaching positions' },
    { name: 'Teaching - Secondary', slug: 'teaching-secondary', icon: '📚', description: 'Secondary school teaching positions' },
    { name: 'Teaching - Science', slug: 'teaching-science', icon: '🔬', description: 'Science subject teaching positions' },
    { name: 'Teaching - Arts', slug: 'teaching-arts', icon: '🎨', description: 'Arts and humanities teaching positions' },
    { name: 'Teaching - Languages', slug: 'teaching-languages', icon: '🗣️', description: 'Language teaching positions' },
    { name: 'Teaching - Mathematics', slug: 'teaching-mathematics', icon: '➗', description: 'Mathematics teaching positions' },
    { name: 'Administration', slug: 'administration', icon: '💼', description: 'Administrative and office positions' },
    { name: 'Finance', slug: 'finance', icon: '💰', description: 'Finance and accounting positions' },
    { name: 'IT & Technology', slug: 'it-technology', icon: '💻', description: 'Information technology positions' },
    { name: 'Security', slug: 'security', icon: '🛡️', description: 'Security and safety positions' },
    { name: 'Maintenance', slug: 'maintenance', icon: '🔧', description: 'Facilities and maintenance positions' },
    { name: 'Catering', slug: 'catering', icon: '🍽️', description: 'Catering and food service positions' },
    { name: 'Transport', slug: 'transport', icon: '🚌', description: 'Transport and logistics positions' },
    { name: 'Healthcare', slug: 'healthcare', icon: '⚕️', description: 'School health and medical positions' },
    { name: 'Counseling', slug: 'counseling', icon: '🗨️', description: 'Student counseling positions' },
    { name: 'Sports & PE', slug: 'sports-pe', icon: '⚽', description: 'Sports and physical education positions' },
    { name: 'Library', slug: 'library', icon: '📖', description: 'Library and resource center positions' }
  ];

  try {
    // Seed Categories
    console.log('Seeding job categories...');
    const createdCategories: any = {};
    
    for (const cat of categories) {
      const existing = await JobCategoryModel.findBySlug(cat.slug);
      if (existing) {
        console.log(`  Category already exists: ${cat.name}`);
        createdCategories[cat.slug] = existing;
      } else {
        const newCat = await JobCategoryModel.create(cat);
        console.log(`  Created category: ${cat.name}`);
        createdCategories[cat.slug] = newCat;
      }
    }

    // 3 Sample Job Listings
    const jobs = [
      {
        title: 'Mathematics Teacher (Senior Secondary)',
        slug: 'mathematics-teacher-senior-secondary',
        categoryId: createdCategories['teaching-mathematics'].id,
        employmentType: 'full-time' as const,
        experienceLevel: 'mid' as const,
        minExperienceYears: 3,
        summary: 'Join UPSS as a Mathematics Teacher for Senior Secondary students. Help build sharp analytical minds ready for university success.',
        description: `<h3>About the Role</h3>
<p>We are seeking a passionate and skilled Mathematics Teacher to join our Senior Secondary School team. At UPSS, we believe in rigorous academic preparation, deep mastery, and building confident scholars who excel in university and beyond.</p>

<h3>What You'll Do</h3>
<ul>
  <li>Teach Mathematics to SS1-SS3 students (Science, Commercial tracks)</li>
  <li>Prepare students for WAEC, NECO, and UTME examinations</li>
  <li>Design engaging lessons that promote critical thinking and problem-solving</li>
  <li>Conduct weekly assessments and provide detailed feedback</li>
  <li>Participate in departmental meetings and curriculum development</li>
  <li>Mentor students and support their academic growth</li>
  <li>Participate in school competitions and Olympiad preparation</li>
</ul>`,
        responsibilities: `- Deliver high-quality Mathematics instruction aligned with Nigerian curriculum
- Develop lesson plans, assessments, and learning materials
- Track student progress and provide individualized support
- Maintain accurate records of student performance
- Collaborate with colleagues to enhance teaching methods
- Participate in professional development programs
- Support extracurricular Mathematics clubs and competitions`,
        requirements: `- Bachelor's degree in Mathematics, Mathematics Education, or related field
- 3+ years teaching experience (Secondary level preferred)
- Strong knowledge of WAEC, NECO, and UTME syllabi
- Excellent classroom management skills
- Proficiency in using technology for teaching
- Strong communication and interpersonal skills
- Passion for student success and academic excellence`,
        qualifications: `- Teaching certification (NCE, B.Ed., PGDE, or equivalent)
- Proven track record of excellent student results
- Experience with Further Mathematics is an advantage
- Familiarity with Olympiad-level problem solving
- Ability to work in a disciplined, high-performance environment`,
        benefits: `- Competitive salary (NGN 150,000 - 250,000 per month)
- Professional development opportunities
- Health insurance coverage
- Annual leave and public holidays
- Performance bonuses
- Access to school facilities and resources
- Collaborative and supportive work environment
- Career growth opportunities`,
        salaryMin: 150000,
        salaryMax: 250000,
        showSalary: true,
        location: 'Benin City, Edo State',
        isRemote: false,
        applicationDeadline: new Date('2025-03-31'),
        status: 'open' as const,
        isFeatured: true,
        isUrgent: false,
        postedAt: new Date()
      },
      {
        title: 'Physics Teacher',
        slug: 'physics-teacher',
        categoryId: createdCategories['teaching-science'].id,
        employmentType: 'full-time' as const,
        experienceLevel: 'mid' as const,
        minExperienceYears: 2,
        summary: 'Inspire the next generation of scientists and engineers. Teach Physics with practical lab work and real-world applications.',
        description: `<h3>About the Role</h3>
<p>UPSS is looking for a dedicated Physics Teacher who can bring the wonders of science to life in the classroom and laboratory. Help students build strong foundations in Physics for careers in engineering, medicine, and technology.</p>

<h3>Key Responsibilities</h3>
<ul>
  <li>Teach Physics to JSS and SS students</li>
  <li>Conduct practical laboratory sessions</li>
  <li>Prepare students for external examinations</li>
  <li>Integrate technology into science teaching</li>
  <li>Mentor students in science competitions and projects</li>
</ul>`,
        responsibilities: `- Deliver engaging Physics lessons using demonstrations and experiments
- Supervise laboratory work and ensure safety protocols
- Assess student understanding through tests, practicals, and projects
- Maintain laboratory equipment and materials
- Participate in science fairs and competitions
- Stay current with curriculum updates and teaching methods`,
        requirements: `- Bachelor's degree in Physics, Physics Education, or related field
- 2+ years teaching experience
- Strong practical skills in laboratory instruction
- Knowledge of WAEC/NECO Physics syllabi
- Excellent communication skills
- Commitment to student-centered learning`,
        qualifications: `- Teaching qualification (B.Ed., PGDE, or equivalent)
- Experience with STEM programs preferred
- Ability to simplify complex concepts
- Innovation in teaching methodologies`,
        benefits: `- Competitive salary (NGN 130,000 - 220,000)
- Professional development support
- Health insurance
- Annual leave
- Access to modern laboratory facilities
- Supportive academic team`,
        salaryMin: 130000,
        salaryMax: 220000,
        showSalary: true,
        location: 'Benin City, Edo State',
        isRemote: false,
        applicationDeadline: new Date('2025-04-15'),
        status: 'open' as const,
        isFeatured: false,
        isUrgent: false,
        postedAt: new Date()
      },
      {
        title: 'Administrative Officer',
        slug: 'administrative-officer',
        categoryId: createdCategories['administration'].id,
        employmentType: 'full-time' as const,
        experienceLevel: 'entry' as const,
        minExperienceYears: 1,
        summary: 'Support the smooth operation of UPSS through efficient administrative management and coordination.',
        description: `<h3>About the Role</h3>
<p>Join the UPSS administrative team and play a vital role in ensuring our school runs smoothly and efficiently. This position offers an opportunity to contribute to a high-performing educational institution.</p>

<h3>Key Responsibilities</h3>
<ul>
  <li>Manage office operations and documentation</li>
  <li>Coordinate communication between staff, students, and parents</li>
  <li>Maintain student and staff records</li>
  <li>Support event planning and coordination</li>
  <li>Handle administrative correspondence</li>
</ul>`,
        responsibilities: `- Process admissions paperwork and student records
- Coordinate school events and meetings
- Manage office supplies and inventory
- Prepare reports and presentations
- Assist with parent-teacher communication
- Support finance and HR with administrative tasks
- Maintain filing systems and databases`,
        requirements: `- Bachelor's degree or HND in relevant field
- 1+ years administrative experience
- Proficiency in MS Office (Word, Excel, PowerPoint)
- Strong organizational and time management skills
- Excellent written and verbal communication
- Attention to detail and accuracy`,
        qualifications: `- Experience in educational institution preferred
- Knowledge of basic accounting principles
- Ability to multitask and work under pressure
- Professional demeanor and strong work ethic`,
        benefits: `- Competitive salary (NGN 80,000 - 120,000)
- Health insurance
- Professional development opportunities
- Annual leave
- Friendly work environment
- Growth potential`,
        salaryMin: 80000,
        salaryMax: 120000,
        showSalary: false,
        location: 'Benin City, Edo State',
        isRemote: false,
        applicationDeadline: new Date('2025-04-30'),
        status: 'open' as const,
        isFeatured: false,
        isUrgent: false,
        postedAt: new Date()
      }
    ];

    // Seed Job Listings
    console.log('Seeding job listings...');
    for (const job of jobs) {
      const existing = await JobListingModel.findBySlug(job.slug);
      if (existing) {
        console.log(`  Job already exists: ${job.title}`);
      } else {
        await JobListingModel.create(job);
        console.log(`  Created job: ${job.title}`);
      }
    }

    console.log('Careers data seeding complete!');
  } catch (err) {
    console.error('Careers data seeding failed:', err);
  } finally {
    pool.end();
  }
};

seedCareersData();
