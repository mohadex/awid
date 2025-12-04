import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TransportServices from "@/components/TransportServices";
import PricingPlans from "@/components/PricingPlans";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

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

const Index = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
        
        const driverIds = (driversData || []).map((d: any) => d.id);
        let reviewsMap: Record<string, Array<any>> = {};

        if (driverIds.length > 0) {
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('driver_reviews')
            .select('id, driver_id, rating, comment, created_at, user_id')
            .in('driver_id', driverIds);

          if (reviewsError) {
            console.warn('Error fetching reviews:', reviewsError);
          } else if (reviewsData && reviewsData.length > 0) {
            const reviewUserIds = [...new Set(reviewsData.map((r: any) => r.user_id).filter(Boolean))];
            
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
            image: '',
            whatsapp: driver.phone_number || '+212600000000',
            description: driver.service_description || 'خدمة نقل موثوقة وسريعة',
            tags: [driver.vehicle_type || 'نقل'].filter(Boolean),
            avatarUrl: avatarUrl,
            fullName: driverName
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">جاري تحميل خدمات النقل...</p>
        </div>
      ) : (
        <TransportServices services={services} getInitials={getInitials} />
      )}
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Index;
