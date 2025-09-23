export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  aadhaar?: string;
  education: string;
  state: string;
  profilePicture?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Internship {
  id: string;
  company: {
    id: string;
    name: string;
    logo: string;
    sector: string;
  };
  title: string;
  description: string;
  location: string;
  duration: number; // months
  stipend: number;
  sector: string;
  requirements: string[];
  applicationDeadline: string;
  startDate: string;
  status: 'upcoming' | 'active' | 'completed';
  appliedCount: number;
  maxInterns: number;
  skills: string[];
}

export interface Application {
  id: string;
  internshipId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'interview';
  appliedAt: string;
  internship: Internship;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  aadhaar: string;
  education: string;
  state: string;
}

export interface InternshipFilters {
  search: string;
  sector: string;
  location: string;
  company: string;
  status: string;
}

export interface Statistics {
  totalApplications: number;
  activeInternships: number;
  partnerCompanies: number;
  successfulPlacements: number;
}