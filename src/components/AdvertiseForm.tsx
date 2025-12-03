import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface AdvertiseFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  'مقهى',
  'سوبر ماركت',
  'متجر',
  'مطعم',
  'مخبزة',
  'صالون تجميل',
  'صيدلية',
  'أخرى'
];

export const AdvertiseForm: React.FC<AdvertiseFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      // For now, we'll just show a success message
      toast({
        title: 'تم إرسال الطلب بنجاح',
        description: 'سنقوم بالتواصل معك قريباً عبر واتساب',
      });
      
      // Reset form
      setFormData({
        fullName: '',
        whatsapp: '',
        projectType: '',
        message: '',
      });
      
      // Close the form
      onClose();
      
      // Open WhatsApp with a pre-filled message
      const whatsappMessage = `مرحباً، أنا ${formData.fullName}، أود الإعلان عن ${formData.projectType}. ${formData.message}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="إغلاق"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">إعلن معنا</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="whatsapp">رقم الواتساب</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="مثال: 212612345678"
                required
                className="mt-1"
                dir="ltr"
              />
            </div>
            
            <div>
              <Label>نوع المشروع</Label>
              <Select onValueChange={handleSelectChange} value={formData.projectType}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="اختر نوع المشروع" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message">رسالة إضافية (اختياري)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="أخبرنا المزيد عن مشروعك"
                rows={3}
                className="mt-1"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseForm;
