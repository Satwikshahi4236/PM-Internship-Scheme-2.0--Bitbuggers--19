import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import InternshipFilters from '@/components/internships/InternshipFilters';
import InternshipCard from '@/components/internships/InternshipCard';
import { Button } from '@/components/ui/button';
import { useInternshipStore } from '@/store/internshipStore';
import { useAuthStore } from '@/store/authStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getInternships, applyForInternship } from '@/lib/supabase';
import type { Internship } from '@/types';

export default function InternshipPortal() {
  const { t } = useTranslation();
  const { filters, currentPage, viewMode, setPage } = useInternshipStore();
  const { user, isAuthenticated } = useAuthStore();
  const itemsPerPage = 10;

  // Fetch internships from Supabase
  const { data: internshipsData, isLoading, error } = useQuery({
    queryKey: ['internships', filters],
    queryFn: () => getInternships(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const internships = internshipsData?.data || [];
  
  // Transform Supabase data to match our Internship interface
  const transformedInternships: Internship[] = internships.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    company: {
      id: item.companies.id,
      name: item.companies.name,
      logo: item.companies.logo,
      sector: item.companies.sector,
    },
    location: item.location,
    duration: item.duration,
    stipend: item.stipend,
    sector: item.sector,
    requirements: item.requirements,
    applicationDeadline: item.application_deadline,
    startDate: item.start_date,
    status: item.status,
    appliedCount: item.applied_count,
    maxInterns: item.max_interns,
    skills: item.skills,
  }));

  const filteredInternships = transformedInternships;
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const paginatedInternships = filteredInternships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApply = async (internshipId: string) => {
    if (!isAuthenticated || !user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    try {
      const { data, error } = await applyForInternship(internshipId, user.id);
      if (error) {
        console.error('Application error:', error);
        // Show error toast
        return;
      }
      
      // Show success toast
      console.log('Application submitted successfully');
    } catch (error) {
      console.error('Application error:', error);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return (
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          {t('previous')}
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant={1 === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPage(1)}
            >
              1
            </Button>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPage(page)}
              className={page === currentPage ? 'bg-orange-600 hover:bg-orange-700' : ''}
            >
              {page}
            </Button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
            <Button
              variant={totalPages === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('next')}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('internshipPortal')}
          </h1>
          <p className="text-lg text-gray-600">
            Discover internship opportunities with India's top companies
          </p>
        </div>

        {/* Filters */}
        <InternshipFilters />

        {/* Results Summary */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mt-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredInternships.length}
            </span>{' '}
            {t('resultsFound')}
          </p>
        </div>

        {/* Internship Listings */}
        <div className="mt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">{t('loading')}</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error loading internships
              </h3>
              <p className="text-gray-600">
                Please try again later.
              </p>
            </div>
          ) : paginatedInternships.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No internships found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <>
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }>
                {paginatedInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    viewMode={viewMode}
                    onApply={handleApply}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  {renderPagination()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}