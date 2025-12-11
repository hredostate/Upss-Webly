
import { PageModel } from '../models/PageModel';
import { SectionModel } from '../models/SectionModel';
import { NewsItemModel } from '../models/NewsItemModel';
import pool from '../models/db';

const seedPages = async () => {
  console.log('Starting seed process with EXACT UPSS content...');

  const pages = [
    {
      slug: 'home',
      title: 'Home',
      seoTitle: 'Where Future Scholars Rise | UPSS',
      seoDescription: 'UPSS is a high-performing, forward-thinking secondary school in Benin City.',
      isHomePage: true,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'Where Future Scholars Rise.',
          subtitle: 'UPSS is a high-performing, forward-thinking secondary school in Benin City, shaping Nigerian students into confident, globally-ready leaders. Through rigorous academics, character development, competitions, and technology-driven learning, we prepare every learner to excel in university and beyond.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            primaryCta: { label: 'Apply to UPSS', link: '/admissions' },
            secondaryCta: { label: 'Visit Our Campus', link: '/contact' }
          }
        },
        {
          type: 'VALUE_COLUMNS',
          orderIndex: 1,
          title: 'Three Pillars',
          contentJson: {
            columns: [
              { 
                title: 'Academic Excellence', 
                description: 'Our classrooms are powered by strong teaching, structured systems, continuous assessments, and a culture of hard work.', 
                link: '/academics' 
              },
              { 
                title: 'Character & Leadership', 
                description: 'Every UPSS student is trained to lead — with integrity, empathy, confidence, discipline, and responsibility.', 
                link: '/student-life' 
              },
              { 
                title: 'Global Readiness', 
                description: 'Through competitions, digital skills, research, and global exposure, our students develop the resilience needed for a competitive world.', 
                link: '/about' 
              }
            ]
          }
        },
        {
          type: 'STATS',
          orderIndex: 2,
          title: 'UPSS at a Glance',
          contentJson: {
            stats: [
               { label: 'university admission', value: '95%' },
               { label: 'clubs', value: '20+' },
               { label: 'competition medals', value: '10+' },
               { label: 'Leadership mentoring', value: 'Yes' },
               { label: 'Coding & digital literacy', value: 'Yes' },
               { label: 'Structured boarding house', value: 'Yes' }
            ]
          }
        },
        {
          type: 'VALUE_COLUMNS',
          orderIndex: 3,
          title: '',
          contentJson: {
            variant: 'panels',
            columns: [
              { 
                title: 'Academics', 
                description: 'Our academic programme is rigorous, structured, and designed to build mastery.', 
                imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80', 
                link: '/academics', 
                ctaLabel: 'Explore Academics' 
              },
              { 
                title: 'Student Life', 
                description: 'Life at UPSS is vibrant — filled with creativity, teamwork, sports, clubs, and leadership.', 
                imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1532&q=80', 
                link: '/student-life', 
                ctaLabel: 'Student Life at UPSS' 
              }
            ]
          }
        },
        {
          type: 'NEWS_LIST',
          orderIndex: 4,
          title: 'News & Events',
          contentJson: { limit: 3 }
        }
      ]
    },
    {
      slug: 'about',
      title: 'About UPSS',
      seoTitle: 'About UPSS',
      isHomePage: false,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'About UPSS',
          subtitle: 'Rooted in discipline, excellence, and innovation.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 1,
          title: 'Who We Are',
          contentJson: {
            html: `
            <p>University Preparatory Secondary School (UPSS) is a dynamic, high-achieving secondary school in Benin City, Nigeria. Rooted in discipline, excellence, and innovation, we prepare young Nigerians to become confident scholars and global leaders.</p>
            
            <h3>Mission</h3>
            <p>To provide a rigorous, transformative education that develops sharp intellect, strong character, leadership excellence, and lifelong learning habits.</p>
            
            <h3>Vision</h3>
            <p>To be Africa’s leading secondary school for academic distinction, technological empowerment, moral strength, and university readiness.</p>
            
            <h3>Values</h3>
            <p>Integrity, Excellence, Curiosity, Resilience, Leadership, Service, Respect.</p>
            
            <h3>What Makes UPSS Different</h3>
            <ul>
              <li>Strong teaching culture</li>
              <li>Rigorous internal assessments</li>
              <li>Elevated reading, writing, and reasoning programmes</li>
              <li>Coding and digital skills</li>
              <li>Competitions and global exposure</li>
              <li>Structured discipline</li>
              <li>Deep mentorship culture</li>
            </ul>
            `
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 2,
          title: 'Message from the Administrator (Mrs. Joan Ovoke Osunde)',
          contentJson: {
            html: `
            <p>At UPSS, we believe Nigerian children are capable of greatness when given structure, discipline, opportunity, and love. Every child who walks through our gates carries potential that must be nurtured through hard work, mentorship, and a high standard of excellence.</p>
            <p>We do not take shortcuts or compromise quality. We build students who think deeply, study consistently, speak confidently, and lead boldly.</p>
            <p>UPSS is more than a school — it is a family, a movement, and a beacon of hope. Welcome to where future scholars rise.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'academics',
      title: 'Academics',
      seoTitle: 'Academics Overview',
      isHomePage: false,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'Academics',
          subtitle: 'Rigour, mastery, discipline, research, deep thinking, and continuous assessment.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 1,
          title: 'Overview',
          contentJson: {
            html: `
            <h3>Our Philosophy</h3>
            <p>UPSS academics are built on rigour, mastery, discipline, research, deep thinking, and continuous assessment.</p>
            
            <h3>Academic Streams</h3>
            <p>UPSS has three academic pathways:</p>
            <ol>
              <li><strong>Science</strong></li>
              <li><strong>Humanities (Arts)</strong></li>
              <li><strong>Business (Commercial)</strong></li>
            </ol>
            
            <h3>Junior Secondary (JSS)</h3>
            <p>Strong foundation in literacy, numeracy, reasoning, science exposure, digital literacy, study skills, and discipline.</p>
            
            <h3>Senior Secondary (All Tracks)</h3>
            <p>Depth over shortcuts, weekly tests, reading culture, WAEC & UTME readiness, mentorship, research work, and competitions.</p>
            
            <h3>Competitions</h3>
            <p>NAC, Mathletics, Leadership debates, Science fairs, UPSS Scholar Challenge.</p>
            
            <h3>University Readiness</h3>
            <p>Strong academic transcripts, counseling, mock interviews, reading/writing mastery.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'jss',
      title: 'Junior Secondary School',
      seoTitle: 'JSS - Junior Secondary',
      isHomePage: false,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'JSS — Junior Secondary',
          subtitle: 'Build strong foundational competencies for senior school specialization.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1532&q=80'
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 1,
          title: 'JSS Details',
          contentJson: {
            html: `
            <h3>Purpose</h3>
            <p>Build strong foundational competencies for senior school specialization.</p>
            
            <h3>Features</h3>
            <ul>
              <li>Literacy & numeracy</li>
              <li>Reading culture</li>
              <li>Grammar & writing mastery</li>
              <li>Scientific reasoning</li>
              <li>Digital literacy (coding, research, typing)</li>
              <li>Character & discipline</li>
              <li>Study skills</li>
              <li>Early subject exploration</li>
            </ul>
            `
          }
        }
      ]
    },
    {
      slug: 'science-track',
      title: 'Science Track',
      isHomePage: false,
      sections: [
        {
          type: 'TEXT_BLOCK',
          orderIndex: 0,
          title: 'Science Track',
          contentJson: {
            html: `
            <h3>Why Science</h3>
            <p>Nigeria’s future depends on engineers, doctors, pharma experts, researchers, tech innovators.</p>
            
            <h3>Subjects</h3>
            <p>Physics, Chemistry, Biology, Further Mathematics, Geography, Agriculture, Mathematics, English.</p>
            
            <h3>Strengths</h3>
            <ul>
              <li>Labs</li>
              <li>Practicals</li>
              <li>Research projects</li>
              <li>Olympiad preparation</li>
              <li>WAEC/UTME coaching</li>
              <li>Study groups</li>
              <li>Teacher mentorship</li>
            </ul>
            
            <h3>Outcomes</h3>
            <p>Medicine, Engineering, Nursing, Pharmacy, Computer Science.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'humanities-track',
      title: 'Humanities (Arts) Track',
      isHomePage: false,
      sections: [
        {
          type: 'TEXT_BLOCK',
          orderIndex: 0,
          title: 'Humanities (Arts) Track',
          contentJson: {
            html: `
            <h3>Subjects</h3>
            <p>Literature, Government, CRS, History, Visual Arts, Languages.</p>
            
            <h3>Experiences</h3>
            <p>Debate, oratory, writing competitions, drama, research, storytelling.</p>
            
            <h3>Outcomes</h3>
            <p>Law, Mass Communication, IR, Diplomacy, Sociology, Creative Industries.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'business-track',
      title: 'Business (Commercial) Track',
      isHomePage: false,
      sections: [
        {
          type: 'TEXT_BLOCK',
          orderIndex: 0,
          title: 'Business (Commercial) Track',
          contentJson: {
            html: `
            <h3>Subjects</h3>
            <p>Economics, Commerce, Accounting, Business Studies, Marketing, Mathematics, English.</p>
            
            <h3>Experiences</h3>
            <p>Entrepreneurship fairs, business simulation, sales pitches, market research, accounting clinics.</p>
            
            <h3>Outcomes</h3>
            <p>Banking, Business Administration, Entrepreneurship, Marketing, Finance.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'admissions',
      title: 'Admissions',
      isHomePage: false,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'Admissions',
          subtitle: 'Potential, discipline, curiosity, drive, and strong parental partnership.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 1,
          title: 'Admissions Info',
          contentJson: {
            html: `
            <h3>What We Look For</h3>
            <p>Potential, discipline, curiosity, drive, and strong parental partnership.</p>
            
            <h3>Process</h3>
            <ol>
              <li>Buy form</li>
              <li>Entrance exam</li>
              <li>Parent & student interview</li>
              <li>Campus tour</li>
              <li>Admission decision</li>
              <li>Orientation</li>
            </ol>
            
            <h3>Transfers</h3>
            <p>Placement tests + transcript review.</p>
            
            <h3>Scholarships</h3>
            <p>New Energy Scholarship Award + merit awards.</p>
            
            <h3>Boarding Admissions</h3>
            <p>Structured, safe, disciplined, academically supportive.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'student-life',
      title: 'Student Life',
      isHomePage: false,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'Student Life',
          subtitle: 'Vibrant, creative, and disciplined.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1544928147-79a2e746b50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 1,
          title: 'Activities',
          contentJson: {
            html: `
            <h3>Clubs</h3>
            <p>STEM, Debate, Coding, Robotics, Sports, Arts, Drama, Leadership, Entrepreneurship.</p>
            
            <h3>Competitions</h3>
            <p>NAC, Mathletics, Scholar Challenge, Old-School Day, Entrepreneurial Day, Writing competitions.</p>
            
            <h3>Leadership</h3>
            <p>Prefect system, class captains, club executives, mentorship.</p>
            
            <h3>Parent Culture</h3>
            <p>Open days, reviews, family events.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'boarding',
      title: 'Boarding House',
      isHomePage: false,
      sections: [
        {
          type: 'HERO',
          orderIndex: 0,
          title: 'Boarding House',
          subtitle: 'Focus, discipline, safety, improved academics, strong community.',
          contentJson: {
            backgroundImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'
          }
        },
        {
          type: 'TEXT_BLOCK',
          orderIndex: 1,
          title: 'Life in Boarding',
          contentJson: {
            html: `
            <h3>Facilities</h3>
            <p>Study rooms, library, medical room, dining hall, recreation, gender-separated dorms, shuttle services.</p>
            
            <h3>Supervision</h3>
            <p>House parents, cleaners, security, wardens.</p>
            
            <h3>Daily Life</h3>
            <p>Morning routines, prep sessions, extracurriculars, chaplaincy, weekend structure.</p>
            
            <h3>Benefits</h3>
            <p>Focus, discipline, safety, improved academics, strong community.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'why-choose-upss',
      title: 'Why Choose UPSS?',
      isHomePage: false,
      sections: [
        {
          type: 'TEXT_BLOCK',
          orderIndex: 0,
          title: 'Why Choose UPSS?',
          contentJson: {
            html: `
            <ul>
              <li>High academic standards</li>
              <li>Competitions & exposure</li>
              <li>Dedicated teachers</li>
              <li>Safe environment</li>
              <li>Technology integration</li>
              <li>Strong reading culture</li>
              <li>Leadership development</li>
              <li>Excellent boarding facilities</li>
              <li>Discipline-based systems</li>
              <li>Global readiness</li>
            </ul>
            `
          }
        }
      ]
    },
    {
      slug: 'contact',
      title: 'Contact Us',
      isHomePage: false,
      sections: [
        {
          type: 'TEXT_BLOCK',
          orderIndex: 0,
          title: 'Contact Us',
          contentJson: {
            html: `
            <h3>Campus</h3>
            <p>UPSS, Benin City, Edo State, Nigeria.</p>
            
            <h3>Hours</h3>
            <p>Mon–Fri 7:30am–4:00pm</p>
            
            <h3>Tours</h3>
            <p>By appointment.</p>
            
            <h3>Communication</h3>
            <p>Phone, email, official social media.</p>
            <p>Parents welcome anytime.</p>
            `
          }
        }
      ]
    },
    {
      slug: 'slogans',
      title: 'Slogans',
      isHomePage: false,
      sections: [
        {
          type: 'TEXT_BLOCK',
          orderIndex: 0,
          title: 'Slogans (30)',
          contentJson: {
            html: `
            <p>Future Scholars Rise Here<br/>
            Excellence. Character. Leadership.<br/>
            The School That Builds Thinkers<br/>
            Mindset for Mastery<br/>
            Discipline Meets Innovation<br/>
            Learning Without Limits<br/>
            Tomorrow’s Leaders, Today<br/>
            Academic Strength. Moral Depth.<br/>
            Where Hard Work Wins<br/>
            Strong Minds, Strong Values<br/>
            Ready for the World<br/>
            Think Bold. Learn Deep.<br/>
            A Tradition of Excellence<br/>
            Educating the Whole Child<br/>
            Powered by Curiosity<br/>
            Study Hard. Rise High.<br/>
            Nigeria’s Future Starts Here<br/>
            Leaders Grow Here<br/>
            Rise. Learn. Excel.<br/>
            Beyond Ordinary Learning<br/>
            Success Built Daily<br/>
            Champions of Learning<br/>
            Where Dreams Take Root<br/>
            The Path to University Success<br/>
            Innovation Begins Here<br/>
            Building Global Nigerians<br/>
            A Culture of Achievement<br/>
            Ready to Lead<br/>
            Learn. Compete. Win.<br/>
            Strength in Discipline</p>
            `
          }
        }
      ]
    }
  ];

  const newsItems = [
    {
      title: "UPSS Students Qualify for NAC",
      slug: "upss-students-qualify-for-nac",
      summary: "UPSS Students Qualify for NAC",
      body: "<p>UPSS Students Qualify for NAC</p>",
      category: "Achievement",
      isFeatured: true
    },
    {
      title: "Entrepreneurial Day Biggest Ever",
      slug: "entrepreneurial-day-biggest-ever",
      summary: "Entrepreneurial Day Biggest Ever",
      body: "<p>Entrepreneurial Day Biggest Ever</p>",
      category: "Events",
      isFeatured: true
    },
    {
      title: "Coding Club Builds First Web Apps",
      slug: "coding-club-builds-first-web-apps",
      summary: "Coding Club Builds First Web Apps",
      body: "<p>Coding Club Builds First Web Apps</p>",
      category: "Technology",
      isFeatured: true
    }
  ];

  try {
    // Seed Pages
    for (const p of pages) {
      console.log(`Seeding page: ${p.title} (${p.slug})`);
      
      const existing = await PageModel.findBySlug(p.slug);
      let pageId;

      if (existing) {
        console.log(`Updating existing page: ${p.slug}`);
        pageId = existing.id;
        await PageModel.update(pageId, {
          title: p.title,
          seoTitle: p.seoTitle || p.title,
          seoDescription: p.seoDescription || '',
          isHomePage: p.isHomePage
        });
      } else {
        const newPage = await PageModel.create({
          slug: p.slug,
          title: p.title,
          seoTitle: p.seoTitle || p.title,
          seoDescription: p.seoDescription || '',
          isHomePage: p.isHomePage
        });
        pageId = newPage.id;
      }

      // Clear existing sections
      const existingSections = await SectionModel.findByPageId(pageId);
      if (existingSections.length > 0) {
        for (const s of existingSections) {
          await SectionModel.delete(s.id);
        }
      }

      // Create new sections
      for (const s of p.sections) {
        await SectionModel.create({
          pageId,
          type: s.type as any,
          orderIndex: s.orderIndex,
          title: s.title,
          subtitle: s.subtitle,
          contentJson: s.contentJson,
          isVisible: true
        });
      }
    }

    // Seed News Items
    console.log('Seeding News Items...');
    for (const n of newsItems) {
      const existing = await NewsItemModel.findBySlug(n.slug);
      if (!existing) {
        await NewsItemModel.create(n);
      }
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    pool.end();
  }
};

seedPages();
