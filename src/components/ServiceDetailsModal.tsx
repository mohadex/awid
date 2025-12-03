import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, MapPin, Phone, MessageCircle, Calendar, LogIn } from "lucide-react";
import RatingModal from "./RatingModal";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: string;
  rating: number;
  comment: string;
  date: string;
  userName: string;
  userAvatar?: string | null;
}

interface ServiceDetailsModalProps {
  service: {
    title: string;
    description: string;
    rating: number;
    reviews: number;
    tags: string[];
    badge: string;
    badgeColor: string;
    whatsapp: string;
    icon: any;
    avatarUrl?: string | null;
  };
  driverId: string;
  comments: Comment[];
  onAddComment: (rating: number, comment: string) => void;
}

// Helper function to get initials
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

const ServiceDetailsModal = ({ service, driverId, comments, onAddComment }: ServiceDetailsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, [isOpen]);

  const handleWhatsAppRedirect = (phoneNumber: string, serviceTitle: string) => {
    const message = `مرحباً، أريد الاستفسار عن خدمة: ${serviceTitle}`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleRatingClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يجب تسجيل الدخول لتقييم السائق",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
  };

  const handleRatingSubmit = (rating: number, comment: string) => {
    onAddComment(rating, comment);
    setIsOpen(false);
    // Reload to show new review
    setTimeout(() => window.location.reload(), 500);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthsAr: { [key: string]: string } = {
      'January': 'يناير', 'February': 'فبراير', 'March': 'مارس', 'April': 'أبريل',
      'May': 'مايو', 'June': 'يونيو', 'July': 'يوليو', 'August': 'أغسطس',
      'September': 'سبتمبر', 'October': 'أكتوبر', 'November': 'نوفمبر', 'December': 'ديسمبر'
    };
    const day = date.getDate();
    const month = monthsAr[date.toLocaleDateString('en-US', { month: 'long' })];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground">
          تفاصيل أكثر
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{service.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Info */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                {service.avatarUrl ? (
                  <AvatarImage src={service.avatarUrl} alt={service.title} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {getInitials(service.title)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold mb-2">{service.title}</DialogTitle>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={service.badgeColor}>
                    {service.badge}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-sm text-gray-600">({service.reviews} تقييم)</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handlePhoneCall(service.whatsapp)}
                    className="bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white"
                  >
                    <Phone className="h-4 w-4 ml-1" />
                    اتصال
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWhatsAppRedirect(service.whatsapp, service.title)}
                  >
                    <MessageCircle className="h-4 w-4 ml-1" />
                    رسالة
                  </Button>
                  {isAuthenticated ? (
                    <RatingModal 
                      serviceTitle={service.title}
                      driverId={driverId}
                      onRatingSubmit={handleRatingSubmit}
                    />
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleRatingClick}
                      className="flex items-center gap-1"
                    >
                      <LogIn className="h-4 w-4" />
                      تسجيل الدخول
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">التعليقات والتقييمات</h3>
            
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p>لا توجد تعليقات بعد</p>
                <p className="text-sm mt-2">
                  {isAuthenticated 
                    ? "كن أول من يعلق على هذه الخدمة!" 
                    : "سجل الدخول لتكون أول من يعلق"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          {comment.userAvatar ? (
                            <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                          ) : (
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getInitials(comment.userName)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{comment.userName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(comment.rating)}
                            <span className="text-xs text-gray-500">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {comment.comment && (
                      <p className="text-sm text-gray-700 mt-3 leading-relaxed pr-14">
                        {comment.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsModal;