import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/stats-card';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Building2, 
  Trophy, 
  TrendingUp, 
  Shield, 
  Clock,
  DollarSign,
  GraduationCap,
  CheckCircle
} from 'lucide-react';

const benefits = [
  {
    title: 'Monthly Stipend',
    description: '₹5,000',
    icon: <DollarSign className="h-6 w-6 text-orange-600" />,
  },
  {
    title: 'One-time Grant',
    description: '₹6,000',
    icon: <Trophy className="h-6 w-6 text-orange-600" />,
  },
  {
    title: 'Duration',
    description: '12 Months',
    icon: <Clock className="h-6 w-6 text-orange-600" />,
  },
  {
    title: 'Insurance',
    description: 'Full Coverage',
    icon: <Shield className="h-6 w-6 text-orange-600" />,
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    company: 'TCS',
    quote: 'The PMIS gave me invaluable industry experience and helped me secure a full-time position.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
  },
  {
    name: 'Rahul Kumar',
    company: 'Infosys',
    quote: 'Amazing learning opportunity with great mentorship and real-world projects.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
  },
  {
    name: 'Anjali Patel',
    company: 'HDFC Bank',
    quote: 'The scheme provided the perfect bridge between education and professional career.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop',
  },
];

const companyLogos = [
  'https://via.placeholder.com/120x60/f97316/ffffff?text=TCS',
  'https://via.placeholder.com/120x60/0066cc/ffffff?text=Infosys',
  'https://via.placeholder.com/120x60/138808/ffffff?text=HDFC',
  'https://via.placeholder.com/120x60/ff9933/ffffff?text=Wipro',
  'https://via.placeholder.com/120x60/f97316/ffffff?text=L%26T',
  'https://via.placeholder.com/120x60/0066cc/ffffff?text=HCL',
  'https://via.placeholder.com/120x60/138808/ffffff?text=Bajaj',
  'https://via.placeholder.com/120x60/ff9933/ffffff?text=Mahindra',
];

export default function HomePage() {
  const { t } = useTranslation();

  // Fetch statistics from Supabase
  const { data: statsData } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/internships">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                    {t('applyNow')}
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    {t('learnMore')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-blue-600 p-8 rounded-2xl">
                <img 
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=500&h=400&fit=crop"
                  alt="Young professionals in internship"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title={t('totalApplications')}
              value={statsData?.total_applications?.toLocaleString() || "2,45,000"}
              icon={<Users className="h-6 w-6 text-orange-600" />}
              change="+12% this month"
              changeType="positive"
            />
            <StatsCard
              title={t('activeInternships')}
              value={statsData?.active_internships?.toLocaleString() || "85,420"}
              icon={<GraduationCap className="h-6 w-6 text-orange-600" />}
              change="+8% this month"
              changeType="positive"
            />
            <StatsCard
              title={t('partnerCompanies')}
              value={statsData?.partner_companies?.toString() || "487"}
              icon={<Building2 className="h-6 w-6 text-orange-600" />}
              change="13 new this month"
              changeType="positive"
            />
            <StatsCard
              title={t('successfulPlacements')}
              value={statsData?.successful_placements?.toLocaleString() || "1,52,890"}
              icon={<Trophy className="h-6 w-6 text-orange-600" />}
              change="+15% this month"
              changeType="positive"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('keyBenefits')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support for your professional journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?w=600&h=400&fit=crop"
                alt="Students and eligibility"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Eligibility Criteria
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Age Requirement</h3>
                    <p className="text-gray-600">Between 21-24 years of age</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Education</h3>
                    <p className="text-gray-600">Completed secondary education (12th pass or equivalent)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Documents</h3>
                    <p className="text-gray-600">Aadhaar card, educational certificates, and bank account</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Commitment</h3>
                    <p className="text-gray-600">Full-time commitment for 12-month duration</p>
                  </div>
                </div>
              </div>
              <Link to="/eligibility" className="inline-block mt-6">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Check Full Eligibility
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our successful interns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partner Companies
            </h2>
            <p className="text-xl text-gray-600">
              India's top 500 companies offering internships
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {companyLogos.map((logo, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={logo}
                  alt={`Company ${index + 1}`}
                  className="w-full h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of young Indians who are building their careers through 
            the Prime Minister Internship Scheme.
          </p>
          <Link to="/internships">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Explore Internships
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}