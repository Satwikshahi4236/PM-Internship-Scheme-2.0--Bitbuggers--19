import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, RegisterData } from '@/types';
import { supabase, signUp, signIn, signOut, getCurrentUser } from '@/lib/supabase';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const { data, error } = await signIn(email, password);
          if (error) throw error;
          
          const { user } = data;
          if (user) {
            // Get user profile from users table
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();

            if (profileError) {
              console.error('Profile fetch error:', profileError);
            }

            const userData: User = {
              id: user.id,
              name: profile?.name || user.user_metadata?.name || '',
              email: user.email || '',
              phone: profile?.phone || user.user_metadata?.phone || '',
              aadhaar: profile?.aadhaar,
              education: profile?.education || '',
              state: profile?.state || '',
              location: profile?.location,
              bio: profile?.bio,
              skills: profile?.skills || [],
              profilePicture: profile?.profile_picture,
              isVerified: profile?.is_verified || false,
              createdAt: profile?.created_at || user.created_at,
            };

            set({ 
              user: userData, 
              token: data.session?.access_token || null, 
              isAuthenticated: true 
            });
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'Login failed');
        }
      },

      register: async (userData: RegisterData) => {
        try {
          const { data, error } = await signUp(userData.email, userData.password, {
            name: userData.name,
            phone: userData.phone,
            aadhaar: userData.aadhaar,
            education: userData.education,
            state: userData.state,
          });
          
          if (error) throw error;

          if (data.user) {
            // Create user profile in users table
            const { error: profileError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: userData.email,
                name: userData.name,
                phone: userData.phone,
                aadhaar: userData.aadhaar,
                education: userData.education,
                state: userData.state,
                age_range: userData.age,
                job_status: userData.jobStatus,
                education_status: userData.educationStatus,
                family_income: userData.familyIncome,
                govt_job_status: userData.govtJob,
                eligibility_confirmed: userData.eligibilityConfirm,
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
            }

            const user: User = {
              id: data.user.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              aadhaar: userData.aadhaar,
              education: userData.education,
              state: userData.state,
              location: null,
              bio: null,
              skills: [],
              profilePicture: undefined,
              isVerified: false,
              createdAt: data.user.created_at,
            };
          
            set({ 
              user, 
              token: data.session?.access_token || null, 
              isAuthenticated: true 
            });
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'Registration failed');
        }
      },

      logout: async () => {
        try {
          await signOut();
          set({ user: null, token: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout error:', error);
          // Force logout even if there's an error
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      verifyOTP: async (otp: string) => {
        try {
          // This would be implemented with Supabase OTP verification
          // For now, we'll simulate verification
          const { user } = get();
          if (user) {
            await supabase
              .from('users')
              .update({ is_verified: true })
              .eq('id', user.id);
          
            set((state) => ({ 
              user: { ...state.user!, isVerified: true } 
            }));
          }
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'OTP verification failed');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);