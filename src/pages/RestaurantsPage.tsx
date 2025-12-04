import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RestaurantsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Coming Soon Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <style>{`
            @keyframes pulse-scale {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes float-animation {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            .animate-pulse-scale {
              animation: pulse-scale 2s ease-in-out infinite;
            }
            .animate-float-animation {
              animation: float-animation 3s ease-in-out infinite;
            }
          `}</style>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              🎉 مطاعم جديدة قريباً
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              نعمل على إضافة المزيد من المطاعم والمقاهي الرائعة. ابقَ معنا للاطلاع على آخر الإضافات!
            </p>
          </div>



          {/* Notification Signup */}
          <div className="bg-gradient-to-r from-[#EB5C4B] to-[#F1594B] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">أخبرنا برغبتك!</h3>
            <p className="text-base md:text-lg mb-6 opacity-90">
              أخبرنا عن المطاعم التي تود أن تراها على Awid
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني..."
                className="px-4 py-3 rounded-lg text-gray-900 flex-1 outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                إرسال
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RestaurantsPage;
