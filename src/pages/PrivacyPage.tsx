import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">سياسة الخصوصية</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            اطلع على كيفية حماية خصوصيتك لدينا
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">سياسة الخصوصية</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                في Awid، نحن ملتزمون بحماية خصوصيتك. توضح هذه السياسة كيفية جمعنا واستخدامنا لمعلوماتك الشخصية.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">جمع المعلومات</h4>
              <p className="text-gray-700 leading-relaxed">
                نجمع المعلومات التي تقدمها لنا مباشرة، مثل اسمك وبريدك الإلكتروني ورقم هاتفك. نجمع أيضًا معلومات تلقائيًا حول جهازك والطريقة التي تستخدم بها خدماتنا.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">استخدام المعلومات</h4>
              <p className="text-gray-700 leading-relaxed">
                نستخدم معلوماتك لتقديم خدماتنا وتحسينها، والتواصل معك بشأن حسابك والخدمات، ومعالجة المدفوعات، ومنع الاحتيال.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">الحماية</h4>
              <p className="text-gray-700 leading-relaxed">
                نتخذ تدابير أمنية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به والتعديل والإفصاح.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">حقوقك</h4>
              <p className="text-gray-700 leading-relaxed">
                لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها وحذفها. يمكنك التحكم في التفضيلات المتعلقة بكيفية استخدامنا لمعلوماتك.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">هل لديك أسئلة؟</h3>
            <p className="text-gray-700 mb-6">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا، فلا تتردد في الاتصال بنا.
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

export default PrivacyPage;
