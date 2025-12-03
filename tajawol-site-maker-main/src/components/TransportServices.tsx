import { Button } from "@/components/ui/button";
import { User, Phone, Star } from "lucide-react";

const transportServices = [
  {
    icon: User,
    title: "سائقون موثوقون",
    description: "نوفّر لك قائمة بسائقي التاكسي، الميني باص، والموتوسيكل مع معلوماتهم، لضمان تجربة آمنة وسلسة للتنقل داخل المدينة."
  },
  {
    icon: Phone,
    title: "سهولة التواصل",
    description: "يمكنك الاتصال مباشرة بالسائقين عبر الهاتف أو الواتساب، لتحديد الرحلات بكل سهولة وبدون الحاجة للبحث عن أرقامهم أو التوجه إلى محطات النقل."
  },
  {
    icon: Star,
    title: "تقييمات وآراء المستخدمين",
    description: "اطلع على تقييمات العملاء السابقين لكل سائق أو خدمة نقل، لتختار الأنسب لك من حيث الأمان والكفاءة."
  }
];

const TransportServices = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">
            خدمات النقل في بيوكرى
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base lg:text-lg mb-4 md:mb-6">
            استكشف أفضل وسائل النقل داخل بيوكرى، بجودة عالية، سرعة موثوقة، وسهولة الوصول لكل المستخدمين.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {transportServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-card rounded-xl p-4 md:p-6 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center mb-4 md:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full mb-3 md:mb-4">
                    <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                    {service.description}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TransportServices;
