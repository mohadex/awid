import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, MapPin, Phone, MessageCircle, Calendar } from "lucide-react";
import RatingModal from "./RatingModal";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  rating: number;
  comment: string;
  date: string;
  userName: string;
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
  };
  comments: Comment[];
  onAddComment: (rating: number, comment: string) => void;
}

const ServiceDetailsModal = ({ service, comments, onAddComment }: ServiceDetailsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleWhatsAppRedirect = (phoneNumber: string, serviceTitle: string) => {
    const message = `مرحباً، أريد الاستفسار عن خدمة: ${serviceTitle}`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleRatingSubmit = (rating: number, comment: string) => {
    onAddComment(rating, comment);
    toast({
      title: "شكراً لك!",
      description: "تم إضافة تعليقك بنجاح"
    });
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
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground">
          تفاصيل أكثر
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{service.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge className={service.badgeColor}>
                    {service.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
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
                    <span className="text-sm text-muted-foreground">({service.reviews} تقييم)</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handlePhoneCall(service.whatsapp)}
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
                  <RatingModal 
                    serviceTitle={service.title}
                    onRatingSubmit={handleRatingSubmit}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">التعليقات والتقييمات</h3>
            
            {comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>لا توجد تعليقات بعد</p>
                <p className="text-sm">كن أول من يعلق على هذه الخدمة!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-card border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {comment.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{comment.userName}</p>
                          <div className="flex items-center gap-2">
                            {renderStars(comment.rating)}
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {comment.comment && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
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
