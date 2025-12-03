import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { supabase } from '@/lib/supabase';

const OrderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    order_details: '',
    delivery_address: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { full_name, phone_number, order_details, delivery_address } = formData;

    const { data: userRes } = await supabase.auth.getUser();
    const userId = userRes.user?.id || null;

    const { data, error } = await supabase
      .from('public.order')
      .insert([{
        user_id: userId,
        full_name,
        phone_number,
        order_details,
        delivery_address,
        status: 'جديد'    // القيمة الافتراضية عند إنشاء الطلب (يمكن حذفها إذا كانت في DB)
      }]);

    if (error) {
      console.error('حدث خطأ أثناء إرسال الطلب:', error.message);
      alert(`حدث خطأ أثناء إرسال الطلب: ${error.message}`);
    } else {
      setIsSubmitted(true);
      console.log('تم إرسال الطلب بنجاح:', data);
    }
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-md text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-card-foreground mb-4">شكراً لك!</h2>
            <p className="text-muted-foreground mb-8">تم استلام طلبك، سيتواصل معك فريق أويد قريبًا.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
        <Footer />
        <FloatingButtons />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-card py-8 px-6 shadow rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-card-foreground">كتب شنو بغيتي نوصّلوه ليك</h2>
          <p className="mt-2 text-sm text-muted-foreground">املأ النموذج وسنقوم بالرد عليك قريباً</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-card-foreground text-right">
              الاسم الكامل
            </label>
            <div className="mt-1">
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-input rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                placeholder="أدخل الاسم الكامل"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-card-foreground text-right">
              رقم الهاتف
            </label>
            <div className="mt-1">
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                value={formData.phone_number}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-input rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                placeholder="أدخل رقم الهاتف"
              />
            </div>
          </div>

          <div>
            <label htmlFor="order_details" className="block text-sm font-medium text-card-foreground text-right">
              قائمة الطلبات أو البضاعة
            </label>
            <div className="mt-1">
              <textarea
                id="order_details"
                name="order_details"
                rows={4}
                required
                value={formData.order_details}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-input rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                placeholder="اكتب تفاصيل طلبك أو البضاعة المراد توصيلها"
              />
            </div>
          </div>

          <div>
            <label htmlFor="delivery_address" className="block text-sm font-medium text-card-foreground text-right">
              عنوان التسليم
            </label>
            <div className="mt-1">
              <input
                id="delivery_address"
                name="delivery_address"
                type="text"
                required
                value={formData.delivery_address}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-input rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-background text-foreground"
                placeholder="أدخل عنوان التسليم"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </div>
        </form>
        </div>
      </div>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default OrderPage;
