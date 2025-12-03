import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto mb-16 pb-16 border-b border-white/10">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              اشترك في أخبارنا
            </h3>
            <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              احصل على أحدث العروض والتحديثات حول خدماتنا مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="أدخل بريدك الإلكتروني"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white shrink-0 rounded-lg gap-2">
                <span>اشترك</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img src={logo} alt="أويد | AWID" className="h-12 w-auto mb-4 brightness-0 invert" />
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed mb-6">
              خدمة توصيل سريعة وموثوقة وآمنة في بيوكرى
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">الروابط السريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> الرئيسية</a></li>
              <li><a href="#services" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> خدماتنا</a></li>
              <li><a href="#how-it-works" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> كيف تعمل</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> حول أويد</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">الخدمات</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> توصيل الطلبات</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> نقل البضائع</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> توصيل فوري</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> خدمة العملاء</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">الصفحات القانونية</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> سياسة الخصوصية</a></li>
              <li><a href="/terms" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> الشروط والأحكام</a></li>
              <li><a href="/refund" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> سياسة الاسترجاع</a></li>
              <li><a href="/usage" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"><span>›</span> اتفاقية الاستخدام</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">تواصل معنا</h4>
            <div className="space-y-4">
              <a href="tel:+212684057092" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-start gap-3 group">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+212 684 057 092</span>
              </a>
              <a href="mailto:info@awid.com" className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300 flex items-start gap-3 group">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@awid.com</span>
              </a>
              <div className="text-secondary-foreground/80 flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">بيوكرى، المغرب</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Copyright */}
          <div className="text-center text-sm text-secondary-foreground/60">
            <p>© 2025 أويد | AWID. جميع الحقوق محفوظة</p>
            <p className="mt-2">صنع بـ ❤️ لخدمة أفضل</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
