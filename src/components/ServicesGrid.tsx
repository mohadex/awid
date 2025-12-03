import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Clock, Star, Phone, MessageCircle } from "lucide-react";
import RatingModal from "./RatingModal";
import ServiceDetailsModal from "./ServiceDetailsModal";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    title: "دراجات ناريه - خدمة التوصيل",
    description: "دراجات ناريه سريعة للتوصيل الطلبات الخفيفة والطعام، خدمة سريعة جدا، وموثوقة ومع وقت قصير",
    rating: 4.2,
    reviews: 92,
    tags: ["توصيل سريع", "أسعار منافسة", "تغطية واسعة"],
    icon: Package,
    badge: "دراجات ناريه",
    badgeColor: "bg-accent",
    whatsapp: "+212600123456"
  },
  {
    title: "توصيل سريع - بوكرى",
    description: "أسرع خدمة توصيل داخل بوكرى، متاحة على مدار الساعة لتوصيل وصول منتجات. الأسرعة والفعالة",
    rating: 4.8,
    reviews: 124,
    tags: ["توصيل سريع", "دفع الكتروني", "متاح دائما"],
    icon: Clock,
    badge: "توصيل 24ساعة",
    badgeColor: "bg-primary",
    whatsapp: "+212600123457"
  },
  {
    title: "سيارات الأجرة بوكرى",
    description: "خدمة سيارات الأجرة الموثوقة داخل بوكرى، سائقون محترفون آمنة جيدة، أسعار معقولة ومناسبة وأمان",
    rating: 4.0,
    reviews: 87,
    tags: ["تكاليف الموافقة", "دفع الكتروني", "خدمة التحميل والتفريغ"],
    icon: Truck,
    badge: "حلل نقلها",
    badgeColor: "bg-destructive",
    whatsapp: "+212600123458"
  },
  {
    title: "نقل البضائع بوكرى",
    description: "خدمة نقل البضائع الموثوقة داخل بوكرى، سائقون شيوخ معتمدون، أسعار معادل مناسبة وأمان",
    rating: 4.0,
    reviews: 65,
    tags: ["تكاليف الموافقة", "تأمين على البضائع", "خدمة التحميل والتفريغ"],
    icon: Truck,
    badge: "بوكرى",
    badgeColor: "bg-muted",
    whatsapp: "+212600123459"
  }
];

const ServicesGrid = () => {
  const { toast } = useToast();
  
  // State to store comments for each service
  const [serviceComments, setServiceComments] = useState<{[key: string]: Array<{
    id: string;
    rating: number;
    comment: string;
    date: string;
    userName: string;
  }>}>({});

  const handleWhatsAppRedirect = (phoneNumber: string, serviceTitle: string) => {
    const message = `مرحباً، أريد الاستفسار عن خدمة: ${serviceTitle}`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleRatingSubmit = (serviceTitle: string, rating: number, comment: string) => {
    const newComment = {
      id: Date.now().toString(),
      rating,
      comment,
      date: new Date().toISOString(),
      userName: "مستخدم" // In a real app, this would be the logged-in user's name
    };

    setServiceComments(prev => ({
      ...prev,
      [serviceTitle]: [...(prev[serviceTitle] || []), newComment]
    }));

    toast({
      title: "شكراً لك!",
      description: "تم إرسال تقييمك بنجاح"
    });
  };

  const handleAddComment = (serviceTitle: string, rating: number, comment: string) => {
    handleRatingSubmit(serviceTitle, rating, comment);
  };
  return (
    <section id="services" className="py-12 md:py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-primary font-medium mb-2 text-sm md:text-base">خدماتنا</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">
            أفضل خدمات التوصيل
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            اكتشف أفضل خدمات النقل والتوصيل في بوكرى، عن جودتها، السريعة والموثوقية
          </p>
        </div>
        
        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <Badge variant="default" className="px-4 py-2 text-sm cursor-pointer">
            الكل
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-muted">
            سيارات نقل
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-muted">
            توصيل
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-muted">
            دراجات ناريه
          </Badge>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-4 md:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border"
            >
              <div className="flex flex-col md:flex-row items-start gap-4 mb-2">
                <div className="flex-shrink-0 w-14 h-14 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <service.icon className="h-6 w-6 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg md:text-xl">{service.title}</h3>
                    <Badge className={service.badgeColor}>
                      {service.badge}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {service.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between md:justify-start gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-sm text-muted-foreground">({service.reviews})</span>
                      </div>
                      <span className="text-xs text-muted-foreground">التقييم</span>
                    </div>

                    {/* Desktop action buttons */}
                    <div className="hidden md:flex gap-2 ml-auto">
                      <Button 
                        size="icon" 
                        variant="default"
                        onClick={() => handlePhoneCall(service.whatsapp)}
                        title="اتصال"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => handleWhatsAppRedirect(service.whatsapp, service.title)}
                        title="رسالة واتساب"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <RatingModal 
                        serviceTitle={service.title}
                        onRatingSubmit={(rating, comment) => handleRatingSubmit(service.title, rating, comment)}
                      />
                    </div>
                  </div>

                  {/* Mobile action buttons (stacked) */}
                  <div className="mt-4 md:hidden flex flex-col gap-2">
                    <Button className="w-full h-10" onClick={() => handlePhoneCall(service.whatsapp)}>اتصال</Button>
                    <Button className="w-full h-10" variant="outline" onClick={() => handleWhatsAppRedirect(service.whatsapp, service.title)}>واتساب</Button>
                    <ServiceDetailsModal 
                      service={service}
                      comments={serviceComments[service.title] || []}
                      onAddComment={(rating, comment) => handleAddComment(service.title, rating, comment)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
