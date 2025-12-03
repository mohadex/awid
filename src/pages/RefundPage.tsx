import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">سياسة الاسترجاع</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            اطلع على سياسة استرجاع الأموال الخاصة بنا
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">سياسة الاسترجاع</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                نريدك أن تكون راضياً عن خدماتنا. إذا كنت غير راضٍ، فلدينا سياسة استرجاع واضحة وعادلة.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">فترة الاسترجاع</h4>
              <p className="text-gray-700 leading-relaxed">
                يمكنك طلب استرجاع في غضون 24 ساعة من استلام طلبك. تأكد من اتصالك بنا بأسرع وقت ممكن لمعالجة طلب الاسترجاع الخاص بك.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">شروط الاسترجاع</h4>
              <p className="text-gray-700 leading-relaxed">
                لكي تكون مؤهلاً للاسترجاع، يجب أن يكون الطلب غير مستخدم وفي حالة الاستقبال الأصلية. إذا تم استخدام الخدمة، فقد لا تكون مؤهلاً للحصول على استرجاع كامل.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">عملية الاسترجاع</h4>
              <p className="text-gray-700 leading-relaxed">
                اتصل بفريق خدمة العملاء لدينا للبدء في عملية الاسترجاع. سنرشدك خلال الخطوات اللازمة ومعالجة طلب الاسترجاع الخاص بك في أسرع وقت ممكن.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">المبالغ المسترجعة</h4>
              <p className="text-gray-700 leading-relaxed">
                سيتم معالجة المبالغ المسترجعة إلى طريقة الدفع الأصلية في غضون 5-7 أيام عمل. قد يستغرق البنك الخاص بك وقتاً إضافياً لتسجيل الاسترجاع.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">هل لديك أسئلة؟</h3>
            <p className="text-gray-700 mb-6">
              إذا كان لديك أي أسئلة حول سياسة الاسترجاع الخاصة بنا، فلا تتردد في الاتصال بنا.
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

export default RefundPage;
