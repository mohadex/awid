import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12 pb-12 border-b border-white/10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            اشترك في نشرتنا البريدية
          </h3>
          <p className="text-secondary-foreground/80 mb-6 max-w-2xl mx-auto">
            انضم إلى نشرة وأحصل على آخر العروض التجريبية والتحديثات مباشرة إلى بريدك الإلكتروني
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="بريدك الإلكتروني"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="default" className="bg-accent hover:bg-accent/90 shrink-0">
              اشترك
            </Button>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="أويد | AWID" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-secondary-foreground/80 text-sm">
              خدمة توصيل سريعة وموثوقة في بوكرى
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#services" className="text-secondary-foreground/80 hover:text-white transition-colors">خدماتنا</a></li>
              <li><a href="#how-it-works" className="text-secondary-foreground/80 hover:text-white transition-colors">كيف تعمل</a></li>
              <li><a href="#contact" className="text-secondary-foreground/80 hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">الخدمات</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">توصيل الطلبات</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">نقل البضائع</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">توصيل سريع</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">دعم 24/7</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-2 text-secondary-foreground/80 mb-4">
              <li> الموقع: بيوكرى</li>
              <li>هاتف:+212684057092  </li>
              <li>البريد: info@awid.com</li>
            </ul>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Facebook claؤssName="h-5 w-5" />
                
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-secondary-foreground/60">
          <p>© 2025 أويد | AWID - جميع الحقوق محفوظة | سياسة الخصوصية | الشروط والأحكام</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
