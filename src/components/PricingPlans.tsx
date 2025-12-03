import { Check, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PricingPlans = () => {
  const plans = [
    {
      name: 'الباقة الأساسية',
      price: '49',
      period: 'شهريًا',
      description: 'مناسبة للأفراد والاستخدام العادي',
      features: [
        'حتى 10 رحلات شهريًا',
        'تتبع مباشر للرحلات',
        'دعم فني على مدار الساعة',
        'تقييم السائقين',
        'تأكيد فوري للرحلة',
      ],
      buttonText: 'اشترك الآن',
      popular: false,
      gradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
    },
    {
      name: 'الباقة المميزة',
      price: '89',
      period: 'شهريًا',
      description: 'مناسبة للعائلات والاستخدام المتكرر',
      features: [
        'حتى 25 رحلة شهريًا',
        'أولوية في الحجز',
        'خصم 10% على الرحلات الإضافية',
        'تتبع مباشر للرحلات',
        'دعم فني على مدار الساعة',
        'تقييم السائقين',
        'تأكيد فوري للرحلة',
      ],
      buttonText: 'الاشتراك المميز',
      popular: true,
      gradient: 'from-primary/10 via-primary/5 to-primary/10',
      borderColor: 'border-primary',
    },
    {
      name: 'الباقة العائلية',
      price: '149',
      period: 'شهريًا',
      description: 'مناسبة للعائلات الكبيرة والاستخدام المكثف',
      features: [
        'رحلات غير محدودة',
        'أولوية قصوى في الحجز',
        'خصم 15% على جميع الرحلات',
        'سائق خاص عند الطلب',
        'تتبع مباشر للرحلات',
        'دعم فني مخصص',
        'تقييم السائقين',
        'تأكيد فوري للرحلة',
      ],
      buttonText: 'اختر العائلية',
      popular: false,
      gradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            باقات الأسعار
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            اختر الباقة التي تناسب احتياجاتك واستمتع بخدمات نقل متميزة في بيوكرة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary/10 via-white to-primary/5 border-2 border-primary shadow-xl transform md:-translate-y-2 scale-105 md:scale-105 z-10' 
                  : `bg-white border-2 ${plan.borderColor} shadow-lg hover:shadow-xl hover:-translate-y-2`
              } animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-primary to-[#d94a3a] text-white text-sm font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 fill-white" />
                  <span>الأكثر طلبًا</span>
                  <Star className="w-4 h-4 fill-white" />
                </div>
              )}
              
              <div className={`p-6 md:p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${plan.popular ? 'text-primary' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-5xl md:text-6xl font-extrabold ${plan.popular ? 'text-primary' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      <span className="text-xl md:text-2xl text-gray-600 font-medium">درهم</span>
                    </div>
                    <span className="text-gray-500 text-sm md:text-base block mt-2">
                      / {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 min-h-[280px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        plan.popular 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-green-100 text-green-600'
                      } group-hover:scale-110 transition-transform`}>
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base leading-relaxed flex-1">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-6 md:py-7 text-base md:text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white shadow-lg' 
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>

              {plan.popular && (
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-float"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-white to-primary/5 rounded-3xl p-8 md:p-12 border-2 border-primary/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary fill-primary" />
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  هل تحتاج إلى باقة مخصصة لاحتياجاتك الخاصة؟
                </h3>
                <Star className="w-6 h-6 text-primary fill-primary" />
              </div>
              <p className="text-gray-600 mb-8 text-base md:text-lg max-w-2xl mx-auto">
                نقدم حلول مخصصة تناسب احتياجاتك الخاصة. تواصل معنا للحصول على عرض سعر يناسبك
              </p>
              <Button 
                variant="outline" 
                className="bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white text-base md:text-lg font-bold py-6 md:py-7 px-8 md:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                تواصل معنا للحصول على عرض سعر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;