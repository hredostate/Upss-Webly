import { supabase } from '../lib/supabase';
import {
  AlumniProfile,
  AlumniEvent,
  AlumniMessage,
  AlumniChapter,
  ClassSet,
  DirectoryFilters,
  EventRegistration,
  AlumniDonation,
} from '../types/alumni';

export const alumniApi = {
  // ============ Authentication ============
  register: async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  login: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  logout: async () => {
    return await supabase.auth.signOut();
  },

  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email);
  },

  // ============ Profile Management ============
  createProfile: async (data: Partial<AlumniProfile>) => {
    return await supabase
      .from('alumni_profiles')
      .insert(data)
      .select()
      .single();
  },

  getProfile: async (id: string) => {
    return await supabase
      .from('alumni_profiles')
      .select('*')
      .eq('id', id)
      .single();
  },

  getProfileByUserId: async (userId: string) => {
    return await supabase
      .from('alumni_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
  },

  updateProfile: async (id: string, data: Partial<AlumniProfile>) => {
    return await supabase
      .from('alumni_profiles')
      .update(data)
      .eq('id', id)
      .select()
      .single();
  },

  getFeaturedAlumni: async (limit = 8) => {
    return await supabase
      .from('alumni_profiles')
      .select('*')
      .eq('is_featured', true)
      .eq('is_verified', true)
      .limit(limit);
  },

  // ============ Directory & Search ============
  searchProfiles: async (filters: DirectoryFilters, page = 1, perPage = 20) => {
    let query = supabase
      .from('alumni_profiles')
      .select('*', { count: 'exact' })
      .or('profile_visibility.eq.public,profile_visibility.eq.alumni_only');

    if (filters.graduation_year) {
      query = query.eq('graduation_year', filters.graduation_year);
    }

    if (filters.track) {
      query = query.eq('track', filters.track);
    }

    if (filters.location) {
      query = query.or(`city.ilike.%${filters.location}%,state.ilike.%${filters.location}%,country.ilike.%${filters.location}%`);
    }

    if (filters.industry) {
      query = query.eq('industry', filters.industry);
    }

    if (filters.mentors_only) {
      query = query.eq('willing_to_mentor', true);
    }

    if (filters.search) {
      query = query.or(
        `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
      );
    }

    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    return await query
      .order('last_name', { ascending: true })
      .range(from, to);
  },

  // ============ Events ============
  getEvents: async (upcoming = true) => {
    let query = supabase
      .from('alumni_events')
      .select('*, organizer:organizer_id(*)');

    if (upcoming) {
      query = query.gte('event_date', new Date().toISOString());
    } else {
      query = query.lt('event_date', new Date().toISOString());
    }

    return await query.order('event_date', { ascending: upcoming });
  },

  getEvent: async (id: string) => {
    return await supabase
      .from('alumni_events')
      .select('*, organizer:organizer_id(*)')
      .eq('id', id)
      .single();
  },

  getEventAttendees: async (eventId: string) => {
    return await supabase
      .from('event_registrations')
      .select('*, alumni:alumni_id(*)')
      .eq('event_id', eventId)
      .eq('status', 'registered');
  },

  registerForEvent: async (eventId: string, alumniId: string) => {
    return await supabase
      .from('event_registrations')
      .insert({
        event_id: eventId,
        alumni_id: alumniId,
        status: 'registered',
      })
      .select()
      .single();
  },

  unregisterFromEvent: async (eventId: string, alumniId: string) => {
    return await supabase
      .from('event_registrations')
      .update({ status: 'cancelled' })
      .eq('event_id', eventId)
      .eq('alumni_id', alumniId);
  },

  getMyEvents: async (alumniId: string) => {
    return await supabase
      .from('event_registrations')
      .select('*, event:event_id(*)')
      .eq('alumni_id', alumniId)
      .eq('status', 'registered');
  },

  // ============ Messages ============
  getConversations: async (alumniId: string) => {
    return await supabase
      .from('alumni_messages')
      .select('*, sender:sender_id(*), recipient:recipient_id(*)')
      .or(`sender_id.eq.${alumniId},recipient_id.eq.${alumniId}`)
      .order('created_at', { ascending: false });
  },

  getMessageThread: async (alumniId: string, otherAlumniId: string) => {
    return await supabase
      .from('alumni_messages')
      .select('*, sender:sender_id(*), recipient:recipient_id(*)')
      .or(
        `and(sender_id.eq.${alumniId},recipient_id.eq.${otherAlumniId}),and(sender_id.eq.${otherAlumniId},recipient_id.eq.${alumniId})`
      )
      .order('created_at', { ascending: true });
  },

  sendMessage: async (data: Partial<AlumniMessage>) => {
    return await supabase
      .from('alumni_messages')
      .insert(data)
      .select()
      .single();
  },

  markMessageAsRead: async (messageId: string) => {
    return await supabase
      .from('alumni_messages')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', messageId);
  },

  getUnreadCount: async (alumniId: string) => {
    return await supabase
      .from('alumni_messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', alumniId)
      .eq('is_read', false);
  },

  // ============ Chapters ============
  getChapters: async () => {
    return await supabase
      .from('alumni_chapters')
      .select('*, coordinator:coordinator_id(*)')
      .order('name', { ascending: true });
  },

  getChapter: async (id: string) => {
    return await supabase
      .from('alumni_chapters')
      .select('*, coordinator:coordinator_id(*)')
      .eq('id', id)
      .single();
  },

  // ============ Class Sets ============
  getClassSets: async () => {
    return await supabase
      .from('class_sets')
      .select('*')
      .order('graduation_year', { ascending: false });
  },

  getClassSet: async (year: number) => {
    return await supabase
      .from('class_sets')
      .select('*, coordinator:coordinator_id(*)')
      .eq('graduation_year', year)
      .single();
  },

  getClassmates: async (year: number) => {
    return await supabase
      .from('alumni_profiles')
      .select('*')
      .eq('graduation_year', year)
      .or('profile_visibility.eq.public,profile_visibility.eq.alumni_only')
      .order('last_name', { ascending: true });
  },

  // ============ Photo Upload ============
  uploadPhoto: async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('alumni-photos')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('alumni-photos')
      .getPublicUrl(filePath);

    return { data, publicUrl };
  },

  // ============ Donations ============
  createDonation: async (data: Partial<AlumniDonation>) => {
    return await supabase
      .from('alumni_donations')
      .insert(data)
      .select()
      .single();
  },

  getDonations: async (limit = 10) => {
    return await supabase
      .from('alumni_donations')
      .select('*')
      .eq('is_anonymous', false)
      .eq('payment_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(limit);
  },

  // ============ Statistics ============
  getAlumniStats: async () => {
    const { count: totalAlumni } = await supabase
      .from('alumni_profiles')
      .select('*', { count: 'exact', head: true });

    const { data: countries } = await supabase
      .from('alumni_profiles')
      .select('country')
      .not('country', 'is', null);

    const { data: companies } = await supabase
      .from('alumni_profiles')
      .select('company')
      .not('company', 'is', null);

    const { data: donations } = await supabase
      .from('alumni_donations')
      .select('amount')
      .eq('payment_status', 'completed');

    const uniqueCountries = new Set(countries?.map(c => c.country)).size;
    const uniqueCompanies = new Set(companies?.map(c => c.company)).size;
    const totalDonations = donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

    return {
      total_alumni: totalAlumni || 0,
      countries_represented: uniqueCountries,
      companies_represented: uniqueCompanies,
      total_scholarships: totalDonations,
    };
  },

  getDashboardStats: async (alumniId: string) => {
    // Get unread messages count
    const { count: unreadMessages } = await supabase
      .from('alumni_messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', alumniId)
      .eq('is_read', false);
    
    const { data: upcomingEvents } = await supabase
      .from('event_registrations')
      .select('event:event_id(*)', { count: 'exact' })
      .eq('alumni_id', alumniId)
      .eq('status', 'registered')
      .gte('event.event_date', new Date().toISOString());

    const stats = await alumniApi.getAlumniStats();

    return {
      ...stats,
      unread_messages: unreadMessages || 0,
      upcoming_events: upcomingEvents?.length || 0,
      connections: 0, // TODO: Implement connections logic
    };
  },
};
