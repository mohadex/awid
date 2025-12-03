import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface RatingModalProps {
  serviceTitle: string;
  driverId: string;
  currentRating?: number;
  onRatingSubmit?: (rating: number, comment: string) => void;
}

const RatingModal = ({ serviceTitle, driverId, currentRating = 0, onRatingSubmit }: RatingModalProps) => {
  const [rating, setRating] = useState(currentRating);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يجب تسجيل الدخول لتقييم السائق",
        variant: "destructive"
      });
      setIsOpen(false);
      navigate("/auth");
      return;
    }

    if (rating === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار تقييم",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get user profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .maybeSingle();

      const userName = profile?.full_name || user.email?.split('@')[0] || 'مستخدم';

      // Save review to driver_reviews table
      const { error: reviewError } = await supabase
        .from('driver_reviews')
        .insert({
          driver_id: parseInt(driverId),
          user_id: user.id,
          rating: rating,
          comment: comment.trim() || null,
          created_at: new Date().toISOString()
        });

      if (reviewError) {
        throw reviewError;
      }

      // Calculate new average rating for driver
      const { data: reviews } = await supabase
        .from('driver_reviews')
        .select('rating')
        .eq('driver_id', parseInt(driverId));

      if (reviews && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;
        
        // Update driver rating
        await supabase
          .from('drivers')
          .update({ 
            rating: Math.round(avgRating * 100) / 100,
            reviews: reviews.length 
          })
          .eq('id', parseInt(driverId));
      }

      onRatingSubmit?.(rating, comment);
      toast({
        title: "شكراً لك!",
        description: "تم إرسال تقييمك بنجاح"
      });
      setIsOpen(false);
      setComment("");
      setRating(0);
      
      // Reload page to show updated reviews
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "خطأ",
        description: "تعذر إرسال التقييم. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="h-9 w-9">
          <Star className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">تقييم خدمة: {serviceTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">التقييم</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                  disabled={isSubmitting}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {rating === 0 && "اضغط على النجوم للتقييم"}
              {rating === 1 && "ضعيف جداً"}
              {rating === 2 && "ضعيف"}
              {rating === 3 && "متوسط"}
              {rating === 4 && "جيد"}
              {rating === 5 && "ممتاز"}
            </p>
          </div>

          <div>
            <Label htmlFor="comment" className="text-base font-semibold">تعليقك (اختياري)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك عن الخدمة..."
              className="mt-2 text-right min-h-[100px]"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)} 
              className="flex-1"
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;