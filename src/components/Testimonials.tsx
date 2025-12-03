import { Star } from "lucide-react";

const testimonials = [
  {
    name: "محمد حسن",
    rating: 5,
    text: "أفضل خدمة توصيل جربتها في بوكرى! سريعة جداً وموثوقة، والسائق كان محترف جداً. أنصح بها بشدة",
    date: "منذ 3 أيام"
  },
  {
    name: "سارة علي",
    rating: 5,
    text: "خدمة ممتازة ومنظمة، التوصيل كان في الوقت المحدد تماماً. التطبيق سهل الاستخدام والأسعار معقولة",
    date: "منذ 5 أيام"
  },
  {
    name: "أحمد محمد",
    rating: 5,
    text: "تجربة رائعة! الخدمة سريعة والتعامل احترافي. استخدمها دائماً لنقل طلباتي التجارية. ممتاز جداً",
    date: "منذ أسبوع"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">
            آراء عملائنا في بيوكرى
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-4 md:p-6 border border-border"
            >
              <div className="flex items-center gap-1 mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <h4 className="font-bold mb-2 text-base md:text-lg">{testimonial.name}</h4>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                {testimonial.text}
              </p>
              <p className="text-xs text-muted-foreground">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
