import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RatingModalProps {
  serviceTitle: string;
  currentRating?: number;
  onRatingSubmit?: (rating: number, comment: string) => void;
}

const RatingModal = ({ serviceTitle, currentRating = 0, onRatingSubmit }: RatingModalProps) => {
  const [rating, setRating] = useState(currentRating);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار تقييم",
        variant: "destructive"
      });
      return;
    }

    onRatingSubmit?.(rating, comment);
    toast({
      title: "شكراً لك!",
      description: "تم إرسال تقييمك بنجاح"
    });
    setIsOpen(false);
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Star className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تقييم خدمة: {serviceTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>التقييم</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {rating === 0 && "اضغط على النجوم للتقييم"}
              {rating === 1 && "ضعيف جداً"}
              {rating === 2 && "ضعيف"}
              {rating === 3 && "متوسط"}
              {rating === 4 && "جيد"}
              {rating === 5 && "ممتاز"}
            </p>
          </div>

          <div>
            <Label htmlFor="comment">تعليقك (اختياري)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب تعليقك عن الخدمة..."
              className="mt-2"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              إلغاء
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              إرسال التقييم
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;

