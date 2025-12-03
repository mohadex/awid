import { useEffect, useState } from 'react';
import AdvertiseForm from './AdvertiseForm';

const DelayedAdPopup = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 15000); // 15 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <AdvertiseForm 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
      />
    </div>
  );
};

export default DelayedAdPopup;
