import { Menu, User, UserPlus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/logo.png";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDriverJoinClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    
    // Check if user is logged in
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    if (!currentUser) {
      // User not logged in - redirect to auth page
      toast({
        title: "يجب تسجيل الدخول",
        description: "يجب تسجيل الدخول للانضمام كسائق",
        variant: "destructive"
      });
      navigate("/auth");
    } else {
      // User is logged in - go to driver registration
      navigate("/driver-registration");
    }
  };

  // جلب بيانات المستخدم إذا سجل الدخول
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      const name =
        data.user.user_metadata?.full_name ||
        data.user.user_metadata?.name ||
        data.user.email?.split("@")[0] ||
        "المستخدم";
      setUser({ name });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    void fetchUser();

    // الاستماع لتغيرات تسجيل الدخول/الخروج
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      void fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {/* Main Navigation - Red */}
      <nav className="bg-primary text-primary-foreground py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand - Left side */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center" onClick={closeMenu}>
                <img 
                  src={logo} 
                  alt="أويد | AWID" 
                  className="h-10 w-auto ml-4 brightness-0 invert"
                />
                <div className="flex items-center space-x-2 rtl:space-x-reverse mr-2">
                  <span className="font-bold text-sm">أويد</span>
                  <span className="text-gray-200 font-bold">|</span>
                  <span className="font-bold text-sm">AWID</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8 rtl:space-x-reverse">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  الرئيسية
                </Link>
                <a href="#services" className="hover:opacity-80 transition-opacity" onClick={closeMenu}>
                  خدمات
                </a>
                <Link to="/transport" className="hover:opacity-80 transition-opacity" onClick={closeMenu}>
                  وسائل النقل
                </Link>
                <a href="#about" className="hover:opacity-80 transition-opacity" onClick={closeMenu}>
                  من نحن
                </a>
                <a href="#contact" className="hover:opacity-80 transition-opacity" onClick={closeMenu}>
                  اتصل بنا
                </a>
              </div>
            </div>

            {/* Sign In/Sign Up Buttons - Far Right */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              {user ? (
                <>
                  <button 
                    onClick={handleDriverJoinClick}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-md hover:bg-white/20"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>انضم كسائق</span>
                  </button>
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-md hover:bg-white/20">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth" className="flex items-center hover:opacity-80" onClick={closeMenu}>
                    <User className="h-4 w-4 ml-1" />
                    <span>تسجيل الدخول</span>
                  </Link>
                  <button 
                    onClick={handleDriverJoinClick}
                    className="flex items-center hover:opacity-80 bg-white text-primary hover:bg-gray-100 px-3 py-1 rounded"
                  >
                    <UserPlus className="h-4 w-4 ml-1" />
                    <span>انضم كسائق</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 pb-3 px-2">
              <Link to="/" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                الرئيسية
              </Link>
              <a href="#services" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                خدمات
              </a>
              {user ? (
                <>
                  <button 
                    onClick={handleDriverJoinClick}
                    className="w-full text-right block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium flex items-center"
                  >
                    <UserPlus className="h-4 w-4 ml-2.5" />
                    <span>انضم كسائق</span>
                  </button>
                  <Link to="/profile" className="flex items-center gap-2 py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                    تسجيل الدخول
                  </Link>
                  <button 
                    onClick={handleDriverJoinClick}
                    className="w-full text-right block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium"
                  >
                    انضم كسائق
                  </button>
                </>
              )}
              <Link to="/transport" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                وسائل النقل
              </Link>
              <a href="#about" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                من نحن
              </a>
              <a href="#contact" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md text-sm font-medium" onClick={closeMenu}>
                اتصل بنا
              </a>
              <div className="mt-3 pt-3 border-t border-primary-foreground/20 space-y-1">
                <Link to="/login" className="block py-2.5 hover:bg-primary/80 px-3 rounded-md flex items-center text-sm font-medium" onClick={closeMenu}>
                  <User className="h-4 w-4 ml-2.5" />
                  <span>تسجيل الدخول</span>
                </Link>
                <button 
                  onClick={handleDriverJoinClick}
                  className="w-full text-right block py-2.5 hover:bg-primary/80 px-3 rounded-md flex items-center text-sm font-medium"
                >
                  <UserPlus className="h-4 w-4 ml-2.5" />
                  <span>انضم كسائق</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
