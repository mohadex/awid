import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MessageCircle, Star, MapPin, Search, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import RatingModal from "@/components/RatingModal";
import ServiceDetailsModal from "@/components/ServiceDetailsModal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

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
  avatarUrl?: string | null;
  fullName?: string;
}

// Helper function to get initials from Arabic name
const getInitials = (name: string): string => {
  if (!name) return '?';
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return words[0][0] + words[words.length - 1][0];
  } else if (words.length === 1) {
    return words[0].substring(0, 2);
  }
  return '?';
};

const TransportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // State to store comments for each service (keyed by driver ID)
  const [serviceComments, setServiceComments] = useState<{[key: string]: Array<{
    id: string;
    rating: number;
    comment: string;
    date: string;
    userName: string;
    userAvatar?: string | null;
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

        // Fetch profiles for avatars
        const userIds = (driversData || []).map((d: any) => d.user_id).filter(Boolean);
        let profilesMap: Record<string, { avatar_url: string | null; full_name: string | null }> = {};
        
        if (userIds.length > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('user_id, avatar_url, full_name')
            .in('user_id', userIds);
          
          if (profilesError) {
            console.warn('Error fetching profiles:', profilesError);
          } else if (profilesData) {
            profilesMap = profilesData.reduce((acc, profile) => {
              acc[profile.user_id] = {
                avatar_url: profile.avatar_url,
                full_name: profile.full_name
              };
              return acc;
            }, {} as Record<string, { avatar_url: string | null; full_name: string | null }>);
          }
        }

        // Map drivers data to Service interface
        interface DriverData {
          id: number;
          user_id?: string;
          full_name?: string;
          location?: string;
          vehicle_type?: string;
          rating?: number;
          vehicle_photo?: string;
          phone_number?: string;
          service_description?: string;
          created_at: string;
        }
        
        // Fetch reviews for all drivers
        const driverIds = (driversData || []).map((d: any) => d.id);
        let reviewsMap: Record<string, Array<{
          id: string;
          rating: number;
          comment: string;
          date: string;
          userName: string;
          userAvatar?: string | null;
        }>> = {};

        if (driverIds.length > 0) {
          // Fetch reviews
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('driver_reviews')
            .select('id, driver_id, rating, comment, created_at, user_id')
            .in('driver_id', driverIds)
            .order('created_at', { ascending: false });

          if (reviewsError) {
            console.warn('Error fetching reviews:', reviewsError);
          } else if (reviewsData && reviewsData.length > 0) {
            // Get unique user IDs from reviews
            const reviewUserIds = [...new Set(reviewsData.map((r: any) => r.user_id).filter(Boolean))];
            
            // Fetch profiles for review users
            let reviewProfilesMap: Record<string, { full_name: string | null; avatar_url: string | null }> = {};
            if (reviewUserIds.length > 0) {
              const { data: reviewProfiles } = await supabase
                .from('profiles')
                .select('user_id, full_name, avatar_url')
                .in('user_id', reviewUserIds);
              
              if (reviewProfiles) {
                reviewProfilesMap = reviewProfiles.reduce((acc, profile) => {
                  acc[profile.user_id] = {
                    full_name: profile.full_name,
                    avatar_url: profile.avatar_url
                  };
                  return acc;
                }, {} as Record<string, { full_name: string | null; avatar_url: string | null }>);
              }
            }

            // Group reviews by driver_id
            reviewsMap = reviewsData.reduce((acc, review: any) => {
              const driverId = review.driver_id.toString();
              if (!acc[driverId]) {
                acc[driverId] = [];
              }
              const profile = reviewProfilesMap[review.user_id] || {};
              acc[driverId].push({
                id: review.id.toString(),
                rating: review.rating || 0,
                comment: review.comment || '',
                date: review.created_at,
                userName: profile.full_name || 'مستخدم',
                userAvatar: profile.avatar_url || null
              });
              return acc;
            }, {} as Record<string, Array<any>>);
          }
        }

        const mappedServices: Service[] = (driversData as DriverData[] || []).map((driver) => {
          // Determine badge variant based on vehicle type
          const getBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
            if (type.includes('صغير') || type.includes('كبير')) return "default";
            if (type === 'بيكوب' || type === 'كاميو') return "secondary";
            if (type === 'تريبورتور' || type === 'ميني بيس') return "destructive";
            return "outline";
          };

          const profile = driver.user_id ? profilesMap[driver.user_id] : null;
          const driverName = driver.full_name || profile?.full_name || 'خدمة النقل';
          const avatarUrl = profile?.avatar_url || null;
          const driverReviews = reviewsMap[driver.id.toString()] || [];
          const reviewCount = driverReviews.length;
          
          // Calculate average rating from reviews if available
          let calculatedRating = driver.rating || 0;
          if (driverReviews.length > 0) {
            const avgRating = driverReviews.reduce((sum, r) => sum + r.rating, 0) / driverReviews.length;
            calculatedRating = Math.round(avgRating * 100) / 100;
          }

          return {
            id: driver.id.toString(),
            title: driverName,
            location: driver.location || 'بيوكرى',
            badge: driver.vehicle_type || 'مركبة',
            badgeVariant: getBadgeVariant(driver.vehicle_type || ''),
            rating: calculatedRating,
            reviews: reviewCount,
            image: '', // No longer using images
            whatsapp: driver.phone_number || '+212600000000',
            description: driver.service_description || 'خدمة نقل موثوقة وسريعة',
            tags: [driver.vehicle_type || 'نقل'].filter(Boolean),
            avatarUrl: avatarUrl,
            fullName: driverName
          };
        });

        setServices(mappedServices);
        setServiceComments(reviewsMap);
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

  const handleRatingSubmit = async (driverId: string, rating: number, comment: string) => {
    // This is called after RatingModal saves to database
    // Reload reviews for this driver
    try {
      const { data: reviewsData } = await supabase
        .from('driver_reviews')
        .select('id, rating, comment, created_at, user_id')
        .eq('driver_id', parseInt(driverId))
        .order('created_at', { ascending: false });

      if (reviewsData && reviewsData.length > 0) {
        const reviewUserIds = [...new Set(reviewsData.map((r: any) => r.user_id).filter(Boolean))];
        
        // Fetch profiles
        let reviewProfilesMap: Record<string, { full_name: string | null; avatar_url: string | null }> = {};
        if (reviewUserIds.length > 0) {
          const { data: reviewProfiles } = await supabase
            .from('profiles')
            .select('user_id, full_name, avatar_url')
            .in('user_id', reviewUserIds);
          
          if (reviewProfiles) {
            reviewProfilesMap = reviewProfiles.reduce((acc, profile) => {
              acc[profile.user_id] = {
                full_name: profile.full_name,
                avatar_url: profile.avatar_url
              };
              return acc;
            }, {} as Record<string, { full_name: string | null; avatar_url: string | null }>);
          }
        }

        const reviews = reviewsData.map((review: any) => {
          const profile = reviewProfilesMap[review.user_id] || {};
          return {
            id: review.id.toString(),
            rating: review.rating || 0,
            comment: review.comment || '',
            date: review.created_at,
            userName: profile.full_name || 'مستخدم',
            userAvatar: profile.avatar_url || null
          };
        });

        setServiceComments(prev => ({
          ...prev,
          [driverId]: reviews
        }));
      }
    } catch (error) {
      console.error('Error reloading reviews:', error);
    }
  };

  const handleAddComment = (driverId: string, rating: number, comment: string) => {
    handleRatingSubmit(driverId, rating, comment);
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
                  className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center border-b-2 border-gray-100">
                    {/* Profile Avatar */}
                    <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-primary/20 shadow-lg z-10">
                      {service.avatarUrl ? (
                        <AvatarImage src={service.avatarUrl} alt={service.fullName || service.title} />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl md:text-3xl font-bold">
                          {service.fullName ? getInitials(service.fullName) : <User className="w-8 h-8 md:w-10 md:h-10 text-primary" />}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    {/* Badge */}
                    <Badge 
                      variant={service.badgeVariant}
                      className="absolute top-4 left-4 bg-primary text-white border-none shadow-md font-semibold z-10"
                    >
                      {service.badge}
                    </Badge>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 flex items-center gap-1 shadow-md z-10 border border-gray-200">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm text-gray-900">{service.rating || 0}</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{service.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{service.rating}</span>
                        <span className="text-sm text-muted-foreground">({service.reviews} تقييم)</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 h-9"
                        onClick={() => handlePhoneCall(service.whatsapp)}
                      >
                        <Phone className="h-4 w-4 ml-1" />
                        اتصال
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 h-9"
                        onClick={() => handleWhatsAppRedirect(service.whatsapp, service.title)}
                      >
                        <MessageCircle className="h-4 w-4 ml-1" />
                        رسالة
                      </Button>
                      <RatingModal 
                        serviceTitle={service.title}
                        driverId={service.id}
                        onRatingSubmit={(rating, comment) => handleRatingSubmit(service.id, rating, comment)}
                      />
                    </div>
                    
                    <div className="mt-3">
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
                          icon: MapPin
                        }}
                        driverId={service.id}
                        comments={serviceComments[service.id] || []}
                        onAddComment={(rating, comment) => handleAddComment(service.id, rating, comment)}
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