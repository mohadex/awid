import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dilerManImage from "@/assets/diler man.png"; // Import local image

const RestaurantsPage = () => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [restaurantSuggestion, setRestaurantSuggestion] = useState("");
  const [cuisinePreference, setCuisinePreference] = useState("");

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      email,
      restaurantSuggestion,
      cuisinePreference,
    });
    // Here you would typically send this data to a backend service
    alert("Thank you for your feedback!");
    setIsSurveyOpen(false);
    setEmail("");
    setRestaurantSuggestion("");
    setCuisinePreference("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Coming Soon Section */}
      <section className="flex-grow py-12 md:py-20 px-4 bg-gradient-to-br from-red-100 via-white to-red-50 flex items-center justify-center">
        <div className="container mx-auto max-w-6xl w-full text-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            <img
              src={dilerManImage} // Use local image
              alt="Coming Soon"
              className="w-64 h-64 md:w-80 md:h-80 object-contain animate-float mb-6"
            />

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
              🎉 مطاعم جديدة قريباً!
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              نحن نعمل بجد لإحضار أشهى المطاعم والمقاهي إلى مدينتك. ترقبوا المزيد من النكهات والتجارب الفريدة!
            </p>

            {/* Survey Button */}
            <Dialog open={isSurveyOpen} onOpenChange={setIsSurveyOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                  شاركنا رأيك في استبيان سريع!
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>استبيان المطاعم</DialogTitle>
                  <DialogDescription>
                    ساعدنا في اختيار أفضل المطاعم لك. كل اقتراحاتك مهمة!
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSurveySubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right">البريد الإلكتروني</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                      placeholder="ادخل بريدك الإلكتروني (اختياري)"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="restaurantSuggestion" className="text-right">اقتراح مطعم</label>
                    <Input
                      id="restaurantSuggestion"
                      value={restaurantSuggestion}
                      onChange={(e) => setRestaurantSuggestion(e.target.value)}
                      className="col-span-3"
                      placeholder="اسم المطعم المقترح..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="cuisinePreference" className="text-right">نوع المطبخ</label>
                    <Textarea
                      id="cuisinePreference"
                      value={cuisinePreference}
                      onChange={(e) => setCuisinePreference(e.target.value)}
                      className="col-span-3"
                      placeholder="المأكولات المفضلة (مثل: إيطالي، آسيوي، محلي...)"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    إرسال الاستبيان
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Social Media Icons */}
            <div className="mt-12 text-gray-600 text-md">
              <p>تابعنا على وسائل التواصل الاجتماعي لتبقى على اطلاع دائم!</p>
              <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-600 hover:text-red-500 transition-colors"><i className="fab fa-twitter"></i></a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
