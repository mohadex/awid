import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LegalPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as "privacy" | "terms" | "refund" | "usage" | null;
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "refund" | "usage">(
    (tabParam as "privacy" | "terms" | "refund" | "usage") || "privacy"
  );

  useEffect(() => {
    if (tabParam && ["privacy", "terms", "refund", "usage"].includes(tabParam)) {
      setActiveTab(tabParam as "privacy" | "terms" | "refund" | "usage");
    }
  }, [tabParam]);

  const sections = {
    privacy: {
      title: "سياسة الخصوصية",
      icon: "",
      content: (
        <div className="space-y-6">
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
      )
    },
    terms: {
      title: "الشروط والأحكام",
      icon: "",
      content: (
        <div className="space-y-6">
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
      )
    },
    refund: {
      title: "سياسة الاسترجاع",
      icon: "",
      content: (
        <div className="space-y-6">
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
      )
    },
    usage: {
      title: "اتفاقية الاستخدام",
      icon: "",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">اتفاقية الاستخدام</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              هذه الاتفاقية تحكم استخدامك لخدمات Awid وتحدد حقوقك والتزاماتك.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-3 text-gray-900">الترخيص</h4>
            <p className="text-gray-700 leading-relaxed">
              نمنحك ترخيصاً محدوداً وغير حصري وغير قابل للنقل لاستخدام خدماتنا للأغراض الشخصية وغير التجارية.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-3 text-gray-900">المحتوى</h4>
            <p className="text-gray-700 leading-relaxed">
              أنت تحتفظ بجميع الحقوق في المحتوى الذي تقدمه. بموجب هذه الاتفاقية، تمنحنا ترخيصاً لاستخدام المحتوى الخاص بك فقط لتقديم الخدمات وتحسينها.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-3 text-gray-900">السلوك المحظور</h4>
            <p className="text-gray-700 leading-relaxed">
              أنت توافق على عدم استخدام الخدمات بطرق تنتهك أي قوانين، أو تهاجم الآخرين، أو تتسبب في ضرر لنا أو للآخرين.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-3 text-gray-900">الإنهاء</h4>
            <p className="text-gray-700 leading-relaxed">
              نحتفظ بالحق في إنهاء حسابك أو الوصول إلى الخدمات في أي وقت إذا انتهكت هذه الاتفاقية أو أي قوانين سارية.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الصفحات القانونية</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            اطلع على سياساتنا والشروط التي تحكم استخدام خدماتنا
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {(["privacy", "terms", "refund", "usage"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-4 rounded-xl font-bold transition-all duration-300 text-center ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 border-2 border-gray-200 hover:border-primary hover:shadow-md"
                }`}
              >
                <div className="text-sm md:text-base">{sections[tab].title}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {sections[activeTab].content}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">هل لديك أسئلة؟</h3>
            <p className="text-gray-700 mb-6">
              إذا كان لديك أي أسئلة حول سياساتنا أو شروطنا، فلا تتردد في الاتصال بنا.
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

export default LegalPage;
