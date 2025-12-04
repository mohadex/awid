import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MessageCircle, Star, MapPin, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import RatingModal from "@/components/RatingModal";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import bikeDelivery from "@/assets/bike-delivery.jpg";
import warehouse from "@/assets/warehouse.jpg";
import luxuryCar from "@/assets/luxury-car.jpg";

interface Service {
  id: string;
  title: string;
  location: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  rating: number;
  reviews: number;
  image: string;
  whatsapp: string;
  description?: string;
  tags?: string[];
  icon?: React.ComponentType;
  driverId?: string; // Add driverId to Service interface
}

const TransportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // State to store comments for each service
  const [serviceComments, setServiceComments] = useState<{[key: string]: Array<{
    id: string;
    rating: number;
    comment: string;
    date: string;
    userName: string;
  }>}>({});

  // Fetch drivers from database
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data: driversData, error } = await supabase
          .from('drivers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching drivers:', error);
          toast({
            title: "خطأ",
            description: "تعذر تحميل قائمة السائقين",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        // Map drivers data to Service interface
        interface DriverData {
          id: number;
          full_name?: string;
          location?: string;
          vehicle_type?: string;
          rating?: number;
          vehicle_photo?: string;
          phone_number?: string;
          service_description?: string;
          created_at: string;
        }

        const mappedServices: Service[] = (driversData as DriverData[] || []).map((driver) => {
          // Determine badge variant based on vehicle type
          const getBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
            if (type.includes('صغير') || type.includes('كبير')) return "default";
            if (type === 'بيكوب' || type === 'كاميو') return "secondary";
            if (type === 'تريبورتور' || type === 'ميني بيس') return "destructive";
            return "outline";
          };

          // Select default image based on vehicle type
          const getDefaultImage = (type: string): string => {
            if (type.includes('تاكسي')) return luxuryCar;
            if (type.includes('بيكوب') || type.includes('كاميو') || type.includes('تريبورتور')) return warehouse;
            return bikeDelivery;
          };

          return {
            id: driver.id.toString(),
            title: driver.full_name || 'خدمة النقل',
            location: driver.location || 'بيوكرى',
            badge: driver.vehicle_type || 'مركبة',
            badgeVariant: getBadgeVariant(driver.vehicle_type || ''),
            rating: driver.rating || 0,
            reviews: 0, // reviews column doesn't exist in table, keeping for UI compatibility
            image: driver.vehicle_photo || getDefaultImage(driver.vehicle_type || ''),
            whatsapp: driver.phone_number || '+212600000000',
            description: driver.service_description || 'خدمة نقل موثوقة وسريعة',
            tags: [driver.vehicle_type || 'نقل'].filter(Boolean),
            driverId: driver.id.toString(), // Ensure driverId is set
          };
        });

        setServices(mappedServices);
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ غير متوقع",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, [toast]);

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

  const filteredServices = services.filter(service => {
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterType || filterType === "" || service.badge === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                أفضل خدمات النقل مع Awid
              </h1>
              <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto mb-8">
                منصة تجمع لك كل وسائل النقل المحلية في مكان واحد — بسرعة، وبساطة، وبدون عناء.
              </p>
            </div>

            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="ابحث عن خدمة نقل..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 md:h-14 bg-white/95 text-foreground border-none pr-4 text-base"
                />
              </div>
              <Button 
                className="h-12 md:h-14 px-8 bg-white text-foreground hover:bg-gray-100" 
                variant="secondary"
              >
                <Search className="ml-2 h-5 w-5" />
                بحث
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-12 md:py-16 px-4 bg-background">
          <div className="container mx-auto">
            <div className="mb-8 md:mb-10 text-right">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                اختر وسيلة النقل المناسبة لك
              </h2>
              
              {/* Service Types Filter - Under Heading */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setFilterType(filterType === "تاكسي صغير" ? "" : "تاكسي صغير")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                    filterType === "تاكسي صغير"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  تاكسي صغير
                </button>
                
                <button
                  onClick={() => setFilterType(filterType === "بيكوب" ? "" : "بيكوب")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                    filterType === "بيكوب"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  بيكوب
                </button>
                
                <button
                  onClick={() => setFilterType(filterType === "كاميو" ? "" : "كاميو")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                    filterType === "كاميو"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  كاميو
                </button>
                
                <button
                  onClick={() => setFilterType(filterType === "تريبورتور" ? "" : "تريبورتور")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                    filterType === "تريبورتور"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  تريبورتور
                </button>
                
                <button
                  onClick={() => setFilterType(filterType === "ميني بيس" ? "" : "ميني بيس")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                    filterType === "ميني بيس"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  ميني بيس
                </button>
                
                <button
                  onClick={() => setFilterType(filterType === "تاكسي كبير" ? "" : "تاكسي كبير")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                    filterType === "تاكسي كبير"
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  تاكسي كبير
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">جاري التحميل...</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                    <Badge
                      variant={service.badgeVariant}
                      className="absolute top-3 left-3 text-sm font-semibold py-1 px-3 rounded-full"
                    >
                      {service.badge}
                    </Badge>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-xl mb-1 text-gray-900">{service.title}</h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{service.location}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold text-base text-gray-800">{service.rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">({service.reviews} تقييم)</span>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                      <Button
                        size="lg"
                        className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                        onClick={() => handlePhoneCall(service.whatsapp)}
                      >
                        <Phone className="h-5 w-5 ml-2" />
                        اتصال
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full h-11 border-2 border-primary/20 text-primary hover:bg-primary/5 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all"
                        onClick={() => handleWhatsAppRedirect(service.whatsapp, service.title)}
                      >
                        <MessageCircle className="h-5 w-5 ml-2" />
                        رسالة
                      </Button>
                      <RatingModal
                        serviceTitle={service.title}
                        driverId={service.id}
                        onRatingSubmit={(rating, comment) => handleRatingSubmit(service.title, rating, comment)}
                      />
                      <ServiceDetailsModal
                        service={{
                          title: service.title,
                          description: service.description || "خدمة موثوقة وعالية الجودة",
                          rating: service.rating,
                          reviews: service.reviews,
                          tags: service.tags || [],
                          badge: service.badge,
                          badgeColor: "bg-primary",
                          whatsapp: service.whatsapp,
                          icon: MapPin,
                        }}
                        driverId={service.id}
                        comments={serviceComments[service.title] || []}
                        onAddComment={(rating, comment) => handleAddComment(service.title, rating, comment)}
                      />
                    </div>
                  </div>
                </div>
              ))}

            {filteredServices.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  لا توجد خدمات متاحة تطابق بحثك
                </p>
              </div>
            )}
            </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default TransportPage;