import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const ServiceFinder = () => {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            خدمة التوصيل السريع في بوكرى
          </h2>
          <p className="text-muted-foreground text-lg">
            اطلب وصول شحناتك في دقائق
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-card p-6 md:p-8 border">
          <h3 className="text-xl font-bold text-center mb-6">
            ابحث عن خدمة التوصيل المناسبة لك
          </h3>
          
          <div className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="ابحث عن خدمة توصيل..."
                className="pr-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نوع الخدمة</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="delivery">توصيل الطلبات</SelectItem>
                    <SelectItem value="transport">نقل البضائع</SelectItem>
                    <SelectItem value="moving">خدمة النقل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">المنطقة</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">كل المناطق</SelectItem>
                    <SelectItem value="center">وسط المدينة</SelectItem>
                    <SelectItem value="north">الشمال</SelectItem>
                    <SelectItem value="south">الجنوب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              ابحث الآن
            </Button>
          </div>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          نسهل عليك: التوصيل إلى شركء داخل المدينة بسرعة وأمان من المنشآت التجارية أو الطرود الخاصة
          <br />
          لتوصيلك منصورى في الوقت المحدد
        </p>
      </div>
    </section>
  );
};

export default ServiceFinder;
