export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          aadhaar: string | null;
          education: string;
          state: string;
          age_range: string | null;
          job_status: string | null;
          education_status: string | null;
          family_income: string | null;
          govt_job_status: string | null;
          eligibility_confirmed: boolean;
          bio: string | null;
          skills: string[];
          location: string | null;
          profile_picture: string | null;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone: string;
          aadhaar?: string | null;
          education: string;
          state: string;
          age_range?: string | null;
          job_status?: string | null;
          education_status?: string | null;
          family_income?: string | null;
          govt_job_status?: string | null;
          eligibility_confirmed?: boolean;
          bio?: string | null;
          skills?: string[];
          location?: string | null;
          profile_picture?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          aadhaar?: string | null;
          education?: string;
          state?: string;
          age_range?: string | null;
          job_status?: string | null;
          education_status?: string | null;
          family_income?: string | null;
          govt_job_status?: string | null;
          eligibility_confirmed?: boolean;
          bio?: string | null;
          skills?: string[];
          location?: string | null;
          profile_picture?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          name: string;
          logo: string;
          sector: string;
          description: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo: string;
          sector: string;
          description?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string;
          sector?: string;
          description?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      internships: {
        Row: {
          id: string;
          company_id: string;
          title: string;
          description: string;
          location: string;
          duration: number;
          stipend: number;
          sector: string;
          requirements: string[];
          application_deadline: string;
          start_date: string;
          status: 'upcoming' | 'active' | 'completed';
          applied_count: number;
          max_interns: number;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          title: string;
          description: string;
          location: string;
          duration: number;
          stipend: number;
          sector: string;
          requirements: string[];
          application_deadline: string;
          start_date: string;
          status?: 'upcoming' | 'active' | 'completed';
          applied_count?: number;
          max_interns: number;
          skills: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          title?: string;
          description?: string;
          location?: string;
          duration?: number;
          stipend?: number;
          sector?: string;
          requirements?: string[];
          application_deadline?: string;
          start_date?: string;
          status?: 'upcoming' | 'active' | 'completed';
          applied_count?: number;
          max_interns?: number;
          skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          internship_id: string;
          user_id: string;
          status: 'pending' | 'accepted' | 'rejected' | 'interview';
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          internship_id: string;
          user_id: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'interview';
          applied_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          internship_id?: string;
          user_id?: string;
          status?: 'pending' | 'accepted' | 'rejected' | 'interview';
          applied_at?: string;
          updated_at?: string;
        };
      };
      user_documents: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: 'resume' | 'cover-letter' | 'certificate' | 'other';
          file_url: string;
          file_size: number | null;
          upload_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: 'resume' | 'cover-letter' | 'certificate' | 'other';
          file_url: string;
          file_size?: number | null;
          upload_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: 'resume' | 'cover-letter' | 'certificate' | 'other';
          file_url?: string;
          file_size?: number | null;
          upload_date?: string;
          created_at?: string;
        };
      };
      user_projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          technologies: string[];
          start_date: string | null;
          end_date: string | null;
          project_url: string | null;
          github_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          technologies?: string[];
          start_date?: string | null;
          end_date?: string | null;
          project_url?: string | null;
          github_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          technologies?: string[];
          start_date?: string | null;
          end_date?: string | null;
          project_url?: string | null;
          github_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_work_experience: {
        Row: {
          id: string;
          user_id: string;
          company: string;
          position: string;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company: string;
          position: string;
          start_date?: string | null;
          end_date?: string | null;
          description?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company?: string;
          position?: string;
          start_date?: string | null;
          end_date?: string | null;
          description?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      statistics: {
        Row: {
          id: string;
          total_applications: number;
          active_internships: number;
          partner_companies: number;
          successful_placements: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          total_applications: number;
          active_internships: number;
          partner_companies: number;
          successful_placements: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          total_applications?: number;
          active_internships?: number;
          partner_companies?: number;
          successful_placements?: number;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}