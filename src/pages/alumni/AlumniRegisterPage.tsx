import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlumniAuth } from '../../context/AlumniAuthContext';
import { alumniApi } from '../../api/alumniApi';
import { AlumniRegistrationData } from '../../types/alumni';

const TOTAL_STEPS = 12;

export default function AlumniRegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAlumniAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<AlumniRegistrationData>>({
    profile_visibility: 'public',
    show_email: false,
    show_phone: false,
    show_location: true,
  });

  const updateFormData = (data: Partial<AlumniRegistrationData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      // 1. Create auth account
      const result = await signUp(formData.email!, formData.password!);
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      // Get the current user
      const { data: { user } } = await alumniApi.login(formData.email!, formData.password!);

      // 2. Upload photos if any
      let school_photo_url = '';
      let recent_photo_url = '';

      if (formData.school_photo) {
        const { publicUrl } = await alumniApi.uploadPhoto(formData.school_photo, 'school-photos');
        school_photo_url = publicUrl;
      }

      if (formData.recent_photo) {
        const { publicUrl } = await alumniApi.uploadPhoto(formData.recent_photo, 'recent-photos');
        recent_photo_url = publicUrl;
      }

      // 3. Create profile
      const profileData = {
        user_id: user?.id,
        email: formData.email!,
        first_name: formData.first_name!,
        last_name: formData.last_name!,
        maiden_name: formData.maiden_name,
        nickname: formData.nickname,
        gender: formData.gender,
        date_of_birth: formData.date_of_birth,
        graduation_year: formData.graduation_year!,
        entry_year: formData.entry_year,
        house: formData.house,
        track: formData.track,
        class_name: formData.class_name,
        school_photo_url,
        recent_photo_url,
        bio: formData.bio,
        favorite_memory: formData.favorite_memory,
        favorite_teacher: formData.favorite_teacher,
        message_to_students: formData.message_to_students,
        occupation: formData.occupation,
        job_title: formData.job_title,
        company: formData.company,
        industry: formData.industry,
        years_of_experience: formData.years_of_experience,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        linkedin_url: formData.linkedin_url,
        twitter_url: formData.twitter_url,
        instagram_url: formData.instagram_url,
        facebook_url: formData.facebook_url,
        website_url: formData.website_url,
        highest_degree: formData.highest_degree,
        university: formData.university,
        field_of_study: formData.field_of_study,
        willing_to_mentor: formData.willing_to_mentor,
        available_for_career_talks: formData.available_for_career_talks,
        interested_in_donations: formData.interested_in_donations,
        can_offer_internships: formData.can_offer_internships,
        profile_visibility: formData.profile_visibility,
        show_email: formData.show_email,
        show_phone: formData.show_phone,
        show_location: formData.show_location,
      };

      await alumniApi.createProfile(profileData);

      // 4. Redirect to dashboard
      navigate('/alumni/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === currentStep
                  ? 'bg-blue-900 text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
            {step < TOTAL_STEPS && (
              <div
                className={`w-8 h-1 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {TOTAL_STEPS}: {getStepTitle()}
        </p>
      </div>
    </div>
  );

  const getStepTitle = () => {
    const titles = [
      'Account',
      'Basic Info',
      'UPSS Info',
      'Photos',
      'Bio',
      'Career',
      'Location',
      'Social Media',
      'Education',
      'Give Back',
      'Privacy',
      'Review',
    ];
    return titles[currentStep - 1];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountStep data={formData} update={updateFormData} />;
      case 2:
        return <BasicInfoStep data={formData} update={updateFormData} />;
      case 3:
        return <UpssInfoStep data={formData} update={updateFormData} />;
      case 4:
        return <PhotosStep data={formData} update={updateFormData} />;
      case 5:
        return <BioStep data={formData} update={updateFormData} />;
      case 6:
        return <CareerStep data={formData} update={updateFormData} />;
      case 7:
        return <LocationStep data={formData} update={updateFormData} />;
      case 8:
        return <SocialStep data={formData} update={updateFormData} />;
      case 9:
        return <EducationStep data={formData} update={updateFormData} />;
      case 10:
        return <GiveBackStep data={formData} update={updateFormData} />;
      case 11:
        return <PrivacyStep data={formData} update={updateFormData} />;
      case 12:
        return <ReviewStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Join the UPSS Alumni Network
            </h1>
            <p className="text-lg text-gray-600">
              Complete your profile to connect with fellow alumni
            </p>
          </div>

          {renderStepIndicator()}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function AccountStep({ data, update }: any) {
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          required
          value={data.email || ''}
          onChange={(e) => update({ email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <input
          type="password"
          required
          value={data.password || ''}
          onChange={(e) => update({ password: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">At least 6 characters</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function BasicInfoStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            required
            value={data.first_name || ''}
            onChange={(e) => update({ first_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={data.last_name || ''}
            onChange={(e) => update({ last_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maiden Name (if applicable)
        </label>
        <input
          type="text"
          value={data.maiden_name || ''}
          onChange={(e) => update({ maiden_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nickname
        </label>
        <input
          type="text"
          value={data.nickname || ''}
          onChange={(e) => update({ nickname: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={data.gender || ''}
            onChange={(e) => update({ gender: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.date_of_birth || ''}
            onChange={(e) => update({ date_of_birth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function UpssInfoStep({ data, update }: any) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year *
          </label>
          <select
            required
            value={data.graduation_year || ''}
            onChange={(e) => update({ graduation_year: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Year...</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entry Year
          </label>
          <select
            value={data.entry_year || ''}
            onChange={(e) => update({ entry_year: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Year...</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          House
        </label>
        <input
          type="text"
          value={data.house || ''}
          onChange={(e) => update({ house: e.target.value })}
          placeholder="e.g., Red House, Blue House"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Track
        </label>
        <input
          type="text"
          value={data.track || ''}
          onChange={(e) => update({ track: e.target.value })}
          placeholder="e.g., Science, Commercial, Arts"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Class Name
        </label>
        <input
          type="text"
          value={data.class_name || ''}
          onChange={(e) => update({ class_name: e.target.value })}
          placeholder="e.g., Excellence Class"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function PhotosStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Photo
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Upload a photo from your time at UPSS
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => update({ school_photo: e.target.files?.[0] })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recent Photo
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Upload a current photo of yourself
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => update({ recent_photo: e.target.files?.[0] })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function BioStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          rows={4}
          value={data.bio || ''}
          onChange={(e) => update({ bio: e.target.value })}
          placeholder="Tell us about yourself..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Favorite UPSS Memory
        </label>
        <textarea
          rows={3}
          value={data.favorite_memory || ''}
          onChange={(e) => update({ favorite_memory: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Favorite Teacher
        </label>
        <input
          type="text"
          value={data.favorite_teacher || ''}
          onChange={(e) => update({ favorite_teacher: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message to Current Students
        </label>
        <textarea
          rows={3}
          value={data.message_to_students || ''}
          onChange={(e) => update({ message_to_students: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function CareerStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Occupation
        </label>
        <input
          type="text"
          value={data.occupation || ''}
          onChange={(e) => update({ occupation: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={data.job_title || ''}
            onChange={(e) => update({ job_title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            value={data.company || ''}
            onChange={(e) => update({ company: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <input
            type="text"
            value={data.industry || ''}
            onChange={(e) => update({ industry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            value={data.years_of_experience || ''}
            onChange={(e) => update({ years_of_experience: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

function LocationStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <input
          type="text"
          value={data.city || ''}
          onChange={(e) => update({ city: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State/Province
        </label>
        <input
          type="text"
          value={data.state || ''}
          onChange={(e) => update({ state: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <input
          type="text"
          value={data.country || ''}
          onChange={(e) => update({ country: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function SocialStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LinkedIn URL
        </label>
        <input
          type="url"
          value={data.linkedin_url || ''}
          onChange={(e) => update({ linkedin_url: e.target.value })}
          placeholder="https://linkedin.com/in/yourprofile"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Twitter URL
        </label>
        <input
          type="url"
          value={data.twitter_url || ''}
          onChange={(e) => update({ twitter_url: e.target.value })}
          placeholder="https://twitter.com/yourhandle"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Instagram URL
        </label>
        <input
          type="url"
          value={data.instagram_url || ''}
          onChange={(e) => update({ instagram_url: e.target.value })}
          placeholder="https://instagram.com/yourhandle"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facebook URL
        </label>
        <input
          type="url"
          value={data.facebook_url || ''}
          onChange={(e) => update({ facebook_url: e.target.value })}
          placeholder="https://facebook.com/yourprofile"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Personal Website
        </label>
        <input
          type="url"
          value={data.website_url || ''}
          onChange={(e) => update({ website_url: e.target.value })}
          placeholder="https://yourwebsite.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function EducationStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Highest Degree
        </label>
        <select
          value={data.highest_degree || ''}
          onChange={(e) => update({ highest_degree: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select...</option>
          <option value="High School">High School</option>
          <option value="Associate">Associate</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Professional">Professional</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          University/Institution
        </label>
        <input
          type="text"
          value={data.university || ''}
          onChange={(e) => update({ university: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Field of Study
        </label>
        <input
          type="text"
          value={data.field_of_study || ''}
          onChange={(e) => update({ field_of_study: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function GiveBackStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Help us understand how you'd like to contribute to the UPSS community
      </p>
      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.willing_to_mentor || false}
            onChange={(e) => update({ willing_to_mentor: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">I'm willing to mentor students</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.available_for_career_talks || false}
            onChange={(e) => update({ available_for_career_talks: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">I'm available for career talks</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.interested_in_donations || false}
            onChange={(e) => update({ interested_in_donations: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">I'm interested in making donations</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.can_offer_internships || false}
            onChange={(e) => update({ can_offer_internships: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">I can offer internships</span>
        </label>
      </div>
    </div>
  );
}

function PrivacyStep({ data, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Visibility
        </label>
        <select
          value={data.profile_visibility || 'public'}
          onChange={(e) => update({ profile_visibility: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="public">Public - Anyone can view</option>
          <option value="alumni_only">Alumni Only - Only registered alumni</option>
          <option value="private">Private - Only me</option>
        </select>
      </div>
      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.show_email || false}
            onChange={(e) => update({ show_email: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">Show my email address</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.show_phone || false}
            onChange={(e) => update({ show_phone: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">Show my phone number</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.show_location || false}
            onChange={(e) => update({ show_location: e.target.checked })}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700">Show my location</span>
        </label>
      </div>
    </div>
  );
}

function ReviewStep({ data }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Review Your Information
      </h3>
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
          <p className="text-gray-600">
            {data.first_name} {data.last_name} {data.maiden_name && `(${data.maiden_name})`}
          </p>
          <p className="text-gray-600">{data.email}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-2">UPSS Information</h4>
          <p className="text-gray-600">Class of {data.graduation_year}</p>
          {data.house && <p className="text-gray-600">House: {data.house}</p>}
          {data.track && <p className="text-gray-600">Track: {data.track}</p>}
        </div>
        {data.job_title && data.company && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Career</h4>
            <p className="text-gray-600">
              {data.job_title} at {data.company}
            </p>
          </div>
        )}
        {data.city && data.country && (
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Location</h4>
            <p className="text-gray-600">
              {data.city}, {data.country}
            </p>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">
        By clicking "Complete Registration", you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
