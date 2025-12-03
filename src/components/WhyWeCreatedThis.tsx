import React from 'react';
import { Car, Phone, Clock, MapPin, Smartphone, ArrowLeft } from 'lucide-react';
import biougraProblem from '@/assets/biougraproblem.png';

const WhyWeCreatedThis = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-background to-primary/5 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
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
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              لماذا أنشأنا هذه الخدمة
            </h2>
            <p className="text-base md:text-lg text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
              لأننا نعرف صعوبة العثور على وسيلة نقل في اللحظة التي تحتاجها…
              <br />
              أنشأنا منصة تجمع كل السائقين المحليين في بيوكرى وتجعل الوصول إليهم أسهل من أي وقت.
            </p>
          </div>
          
          {/* Main Card - Problem & Solution */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16 md:mb-20 flex flex-col md:flex-row border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 animate-scale-in">
            {/* Left Side - Problem Illustration */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 md:p-8 flex items-center justify-center md:w-1/2 min-h-[350px] md:min-h-[500px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full flex items-center justify-center z-10 animate-float">
                <img 
                  src={biougraProblem} 
                  alt="Transportation problem in Biougra" 
                  className="h-72 md:h-96 w-auto object-contain hover:scale-105 transition-transform duration-300 ease-in-out drop-shadow-lg"
                />
              </div>
            </div>
            
            {/* Right Side - Text Content */}
            <div className="bg-gradient-to-br from-primary via-primary to-[#d94a3a] text-white p-6 md:p-8 lg:p-10 md:w-1/2 flex flex-col justify-center min-h-[300px] md:min-h-[500px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <div className="mb-4">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <span className="text-sm md:text-base font-medium">المشكلة</span>
                  </div>
                </div>
                <p className="text-sm md:text-base leading-relaxed mb-4 text-white/95 font-normal">
                  في بيوكرى، الحصول على تاكسي أو تريبورتور أو أي وسيلة نقل أمر متعب – الناس يضطرون للبحث في المتاجر أو المشي لمسافات طويلة فقط للحصول على رقم سائق.
                </p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                    <span className="text-sm md:text-base font-medium">الحل</span>
                  </div>
                  <p className="text-base md:text-lg font-bold text-white">
                    نحن أنشأنا هذه الخدمة لتقدم لك حلًّا سريعًا وسهلًا بدون تعب.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-900">
              ما الذي نقدمه لك؟
            </h3>
            <p className="text-center text-gray-600 mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto">
              مزايا حصرية تجعل تجربتك معنا مميزة
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: <Car className="w-6 h-6" />,
                  title: 'وصول فوري',
                  description: 'إلى جميع وسائل النقل في بيوكرى',
                  bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
                  iconBg: 'bg-blue-50',
                  iconColor: 'text-blue-600',
                  delay: '0.1s'
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: 'أرقام جاهزة',
                  description: 'دون الحاجة للبحث أو السؤال',
                  bg: 'bg-gradient-to-br from-green-500 to-green-600',
                  iconBg: 'bg-green-50',
                  iconColor: 'text-green-600',
                  delay: '0.2s'
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: 'توفير للوقت',
                  description: 'بدون مشي أو تنقل غير ضروري',
                  bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
                  iconBg: 'bg-amber-50',
                  iconColor: 'text-amber-600',
                  delay: '0.3s'
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: 'تغطية شاملة',
                  description: 'خدمة موثوقة تغطي كل أحياء بيوكرى',
                  bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
                  iconBg: 'bg-purple-50',
                  iconColor: 'text-purple-600',
                  delay: '0.4s'
                },
                {
                  icon: <Smartphone className="w-6 h-6" />,
                  title: 'سهولة الاستخدام',
                  description: 'من هاتفك وفي ثوانٍ معدودة',
                  bg: 'bg-gradient-to-br from-pink-500 to-pink-600',
                  iconBg: 'bg-pink-50',
                  iconColor: 'text-pink-600',
                  delay: '0.5s',
                  className: 'md:col-span-2 lg:col-span-1'
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={`${benefit.className || ''} bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/50 overflow-hidden group relative flex flex-col items-center text-center h-full hover:-translate-y-2 animate-scale-in`}
                  style={{ animationDelay: benefit.delay }}
                >
                  {/* Decorative gradient background on hover */}
                  <div className={`absolute inset-0 ${benefit.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 ${benefit.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative z-10`}>
                    <span className={benefit.iconColor}>
                      {benefit.icon}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col items-center relative z-10">
                    <h4 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-primary transition-colors">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="mt-12 md:mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <a 
                href="/transports"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white font-bold py-4 md:py-5 px-8 md:px-12 rounded-xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>عرض وسائل النقل</span>
                <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 rtl:ml-0 rtl:mr-0 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeCreatedThis;