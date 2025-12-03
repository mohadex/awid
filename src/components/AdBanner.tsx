import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import AdvertiseForm from './AdvertiseForm';

interface AdBannerProps {
  className?: string;
  slot?: string;
  showAdvertiseButton?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  className = '', 
  slot = '',
  showAdvertiseButton = true
}) => {
  const [isAdvertiseFormOpen, setIsAdvertiseFormOpen] = useState(false);

  return (
    <div className={`w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 ${className}`}>
      <div className="p-6 text-center">
        {showAdvertiseButton && (
          <div className="flex justify-end mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-primary hover:bg-primary/5"
              onClick={() => setIsAdvertiseFormOpen(true)}
            >
              <PlusCircle className="ml-1 h-4 w-4" />
              إعلن معنا
            </Button>
          </div>
        )}
        
        <div className="py-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            مساحة إعلانية متاحة
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            هل ترغب في عرض إعلانك هنا؟
          </p>
          <Button 
            variant="default"
            size="sm"
            className="mt-2"
            onClick={() => setIsAdvertiseFormOpen(true)}
          >
            تواصل معنا
          </Button>
        </div>
        
        {slot && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {slot}
          </div>
        )}
      </div>
      
      <AdvertiseForm 
        isOpen={isAdvertiseFormOpen} 
        onClose={() => setIsAdvertiseFormOpen(false)} 
      />
    </div>
  );
};

export default AdBanner;
