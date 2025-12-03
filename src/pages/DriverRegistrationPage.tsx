import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Upload, Image, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";
import { supabase } from "@/lib/supabase";

const DriverRegistrationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [vehicleData, setVehicleData] = useState({
    name: "",
    vehicleType: "",
    serviceDescription: "",
    phoneNumber: "+212 600 000 000",
    location: "بيوكرى"
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        toast({
          title: "يجب تسجيل الدخول",
          description: "يجب تسجيل الدخول لإضافة مركبة",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      
      setIsCheckingAuth(false);
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleVehicleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول لإضافة مركبة",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    if (!vehicleData.name || !vehicleData.vehicleType || !vehicleData.serviceDescription || !vehicleData.phoneNumber) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save to drivers table
      const driverData = {
        user_id: user.id,
        full_name: vehicleData.name,
        vehicle_type: vehicleData.vehicleType,
        service_description: vehicleData.serviceDescription,
        phone_number: vehicleData.phoneNumber,
        location: vehicleData.location || "بيوكرى",
        rating: 0,
        reviews: 0,
        created_at: new Date().toISOString()
      };

      console.log("Saving driver data:", driverData);

      const { data: insertedData, error: insertError } = await supabase
        .from('drivers')
        .insert(driverData)
        .select();

      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }

      console.log("Driver data saved successfully:", insertedData);

      toast({
        title: "تم إضافة المركبة بنجاح!",
        description: "مرحباً بك كسائق في أويد"
      });
      
      setVehicleData({
        name: "",
        vehicleType: "",
        serviceDescription: "",
        phoneNumber: "+212 600 000 000",
        location: "بيوكرى"
      });

      setTimeout(() => navigate("/"), 2000);

    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage = error?.message || error?.details || "حدث خطأ غير معروف";
      toast({
        title: "خطأ في حفظ البيانات",
        description: `حدث خطأ أثناء إضافة المركبة: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">جاري التحقق من تسجيل الدخول...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img src={logo} alt="أويد | ⴰⵡⵉⴷ | AWID" className="h-16 w-auto mx-auto mb-4" />
            </Link>
            <h1 className="text-2xl font-bold"> انظم كسائق مع أويد</h1>
            <p className="text-muted-foreground mt-2">أضف مركبتك وابدأ العمل معنا</p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleVehicleRegistration} className="space-y-4">
              {/* الاسم الكامل */}
              <div>
                <Label htmlFor="vehicle-name">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="vehicle-name"
                    type="text"
                    value={vehicleData.name}
                    onChange={(e) => setVehicleData({...vehicleData, name: e.target.value})}
                    required
                    placeholder="أدخل اسمك الكامل"
                    className="pr-10"
                  />
                </div>
              </div>

              {/* نوع المركبة */}
              <div>
                <Label htmlFor="vehicle-type">نوع المركبة</Label>
                <Select value={vehicleData.vehicleType} onValueChange={(value) => setVehicleData({...vehicleData, vehicleType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المركبة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تاكسي صغير">تاكسي صغير</SelectItem>
                    <SelectItem value="بيكوب">بيكوب</SelectItem>
                    <SelectItem value="كاميو">كاميو</SelectItem>
                    <SelectItem value="تريبورتور">تريبورتور</SelectItem>
                    <SelectItem value="ميني بيس">ميني بيس</SelectItem>
                    <SelectItem value="تاكسي كبير">تاكسي كبير</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* وصف الخدمة */}
              <div>
                <Label htmlFor="service-description">وصف الخدمة</Label>
                <Textarea
                  id="service-description"
                  value={vehicleData.serviceDescription}
                  onChange={(e) => setVehicleData({...vehicleData, serviceDescription: e.target.value})}
                  required
                  placeholder="اكتب وصف قصير لخدمتك"
                  className="min-h-[100px] resize-y text-right"
                  dir="rtl"
                />
              </div>

              {/* رقم الهاتف */}
              <div>
                <Label htmlFor="phone-number">رقم الهاتف / واتساب</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone-number"
                    type="tel"
                    value={vehicleData.phoneNumber}
                    onChange={(e) => setVehicleData({...vehicleData, phoneNumber: e.target.value})}
                    required
                    className="pr-10 text-right"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* الموقع */}
              <div>
                <Label htmlFor="location">الموقع</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    type="text"
                    value={vehicleData.location}
                    onChange={(e) => setVehicleData({...vehicleData, location: e.target.value})}
                    required
                    placeholder="أدخل موقعك"
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* الأزرار */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/")}>
                  إلغاء
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "جاري الإضافة..." : "إضافة المركبة"}
                </Button>
              </div>
            </form>
          </Card>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DriverRegistrationPage;
