import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الشروط والأحكام</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            اطلع على الشروط التي تحكم استخدام خدماتنا
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">الشروط والأحكام</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                بالوصول إلى واستخدام منصة Awid، فإنك توافق على الامتثال لهذه الشروط والأحكام.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">استخدام الخدمة</h4>
              <p className="text-gray-700 leading-relaxed">
                توافق على استخدام خدماتنا فقط للأغراض القانونية وبما يتفق مع هذه الشروط. تتعهد بعدم انتهاك أي قوانين أو حقوق الطرف الثالث.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">حسابك</h4>
              <p className="text-gray-700 leading-relaxed">
                أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وجميع الأنشطة التي تحدث تحت حسابك. يجب إخطارنا فوراً بأي استخدام غير مصرح به.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">الخدمات</h4>
              <p className="text-gray-700 leading-relaxed">
                نحاول تقديم خدمات عالية الجودة، لكننا لا نضمن أن الخدمات ستكون خالية من الأخطاء أو الانقطاعات. نحتفظ بالحق في تعديل أو إيقاف الخدمات في أي وقت.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">المسؤولية</h4>
              <p className="text-gray-700 leading-relaxed">
                في الحد الأقصى المسموح به بموجب القانون، لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو تبعية أو خاصة ناشئة عن استخدامك للخدمات.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">هل لديك أسئلة؟</h3>
            <p className="text-gray-700 mb-6">
              إذا كان لديك أي أسئلة حول الشروط والأحكام الخاصة بنا، فلا تتردد في الاتصال بنا.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+212684057092"
                className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors duration-300 text-center"
              >
                اتصل بنا
              </a>
              <a
                href="mailto:info@awid.com"
                className="px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-colors duration-300 text-center"
              >
                أرسل بريداً إلكترونياً
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsPage;
