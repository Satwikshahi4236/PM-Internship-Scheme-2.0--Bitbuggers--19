import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react';
import { Internship } from '@/types';

interface InternshipCardProps {
  internship: Internship;
  viewMode: 'grid' | 'list';
  onApply: (id: string) => void;
}

export default function InternshipCard({ internship, viewMode, onApply }: InternshipCardProps) {
  const { t } = useTranslation();

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={internship.company.logo} 
                alt={internship.company.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
                <p className="text-sm text-gray-600">{internship.company.name}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {internship.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {internship.duration} {t('monthsInternship')}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ₹{internship.stipend.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={statusColors[internship.status]}>
                {internship.status}
              </Badge>
              <Button 
                onClick={() => onApply(internship.id)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {t('applyNow')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <img 
            src={internship.company.logo} 
            alt={internship.company.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <Badge className={statusColors[internship.status]}>
            {internship.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {internship.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{internship.company.name}</p>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {internship.description}
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {internship.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              {internship.duration} {t('monthsInternship')}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
              ₹{internship.stipend.toLocaleString()} / month
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {t('applicationDeadline')}: {new Date(internship.applicationDeadline).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => onApply(internship.id)}
          className="w-full bg-orange-600 hover:bg-orange-700 mt-auto"
        >
          {t('applyNow')}
        </Button>
      </CardContent>
    </Card>
  );
}