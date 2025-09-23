import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useInternshipStore } from '@/store/internshipStore';

const sectors = [
  'banking', 'automotive', 'energy', 'it', 'healthcare', 
  'manufacturing', 'retail', 'telecom'
];

const locations = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const statuses = ['upcoming', 'active', 'completed'];

export default function InternshipFilters() {
  const { t } = useTranslation();
  const { 
    filters, 
    viewMode, 
    setFilters, 
    setViewMode, 
    resetFilters 
  } = useInternshipStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder={t('searchPlaceholder')}
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select 
          value={filters.sector} 
          onValueChange={(value) => setFilters({ sector: value === 'all-sectors' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filterBySector')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-sectors">{t('allSectors')}</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {t(sector)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.location} 
          onValueChange={(value) => setFilters({ location: value === 'all-locations' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filterByLocation')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-locations">{t('allLocations')}</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={filters.status} 
          onValueChange={(value) => setFilters({ status: value === 'all-statuses' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('filterByStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-statuses">{t('allStatuses')}</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-end">
        <div className="flex rounded-md border">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4 mr-1" />
            {t('gridView')}
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none border-l"
          >
            <List className="h-4 w-4 mr-1" />
            {t('listView')}
          </Button>
        </div>
      </div>
    </div>
  );
}