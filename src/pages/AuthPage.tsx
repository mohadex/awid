import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error signing in with Google:', error.message);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الدخول",
        description: error instanceof Error ? error.message : "حدث خطأ في تسجيل الدخول بواسطة Google",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (authError) {
        if (authError.message.includes('Email not confirmed')) {
          toast({
            variant: "destructive",
            title: "البريد الإلكتروني غير مؤكد",
            description: "يرجى تأكيد بريدك الإلكتروني من خلال الرابط المرسل إليك",
          });
          return;
        }
        throw authError;
      }

      if (authData.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', authData.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }

        if (!profileData) {
          const { error: createProfileError } = await supabase
            .from('profiles')
            .insert([
              {
                user_id: authData.user.id,
                full_name: authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'المستخدم',
                avatar_url: null,
                created_at: new Date().toISOString(),
              },
            ]);

          if (createProfileError) {
            console.error("Error creating profile:", createProfileError);
            toast({
              variant: "destructive",
              title: "تم تسجيل الدخول",
              description: "حدث خطأ في إنشاء الملف الشخصي، يرجى المحاولة مرة أخرى لاحقاً",
            });
          }
        }
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بعودتك!",
      });

      navigate("/profile");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الدخول",
        description: error instanceof Error ? error.message : "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "خطأ في التسجيل",
        description: "يرجى الموافقة على شروط الاستخدام وسياسة الخصوصية",
      });
      return;
    }
    
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "خطأ في التسجيل",
        description: "كلمات المرور غير متطابقة",
      });
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      toast({
        variant: "destructive",
        title: "خطأ في التسجيل",
        description: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            full_name: registerData.name,
          },
          emailRedirectTo: window.location.origin + '/auth'
        },
      });

      if (authError) {
        if (authError.message.includes('Email already registered')) {
          throw new Error('هذا البريد الإلكتروني مسجل مسبقاً');
        }
        throw authError;
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: authData.user.id,
              full_name: registerData.name,
              avatar_url: null,
              created_at: new Date().toISOString(),
            },
          ])
          .select()
          .maybeSingle();

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }

        toast({
          title: "✅ تم إنشاء الحساب بنجاح",
          description: "تم إرسال رابط تأكيد إلى بريدك الإلكتروني.",
        });
        
        toast({
          title: "📧 تحقق من بريدك الإلكتروني",
          description: "من فضلك اضغط على الرابط في البريد الإلكتروني لتفعيل حسابك. قد يستغرق وصول البريد بضع دقائق.",
          duration: 10000,
        });

        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        
        setAcceptTerms(false);
        setActiveTab("login");
      } else {
        toast({
          title: "تم إرسال رابط التأكيد",
          description: "يرجى تفعيل حسابك من خلال الرابط المرسل إلى بريدك الإلكتروني",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في التسجيل",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background" dir="rtl">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-[450px] mx-auto animate-fade-in-up">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm rounded-xl p-1 h-12">
              <TabsTrigger 
                value="login" 
                className="text-base md:text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
              >
                تسجيل الدخول
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="text-base md:text-lg font-semibold data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg transition-all"
              >
                إنشاء حساب
              </TabsTrigger>
            </TabsList>
          
          <TabsContent value="login">
            <Card className="p-6 md:p-8 shadow-2xl border-2 border-primary/10 bg-white/95 backdrop-blur-sm rounded-2xl">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">مرحباً بعودتك!</h2>
                  <p className="text-gray-600 text-sm md:text-base">سجل دخولك للوصول إلى حسابك</p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 flex items-center justify-center gap-3 text-base font-medium hover:bg-gray-50 transition-all border-2 hover:border-primary/30"
                  disabled={isGoogleLoading}
                  onClick={handleGoogleSignIn}
                >
                  {isGoogleLoading ? (
                    <span>جاري التحويل...</span>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      <span>تسجيل الدخول بواسطة Google</span>
                    </>
                  )}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">
                      أو باستخدام البريد الإلكتروني
                    </span>
                  </div>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700 text-right block">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        className="pr-11 text-right h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-semibold text-gray-700 text-right block">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pr-11 pl-11 text-right h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="p-6 md:p-8 shadow-2xl border-2 border-primary/10 bg-white/95 backdrop-blur-sm rounded-2xl">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">أنشئ حسابك الآن</h2>
                  <p className="text-gray-600 text-sm md:text-base">انضم إلينا وابدأ رحلتك</p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold text-gray-700 text-right block">الاسم الكامل</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        className="pr-11 text-right h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-base font-semibold text-gray-700 text-right block">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="example@email.com"
                        className="pr-11 text-right h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-base font-semibold text-gray-700 text-right block">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="8 أحرف على الأقل"
                        className="pr-11 pl-11 text-right h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, password: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-base font-semibold text-gray-700 text-right block">تأكيد كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type={showRegisterPassword ? "text" : "password"}
                        placeholder="أعد إدخال كلمة المرور"
                        className="pr-11 text-right h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Terms and Privacy Agreement */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 text-right">
                    <label className="text-sm text-gray-700 cursor-pointer flex-1 text-right">
                      أوافق على{" "}
                      <Link 
                        to="/terms" 
                        target="_blank"
                        className="text-primary font-semibold hover:underline"
                      >
                        شروط الاستخدام
                      </Link>
                      {" "}و{" "}
                      <Link 
                        to="/privacy" 
                        target="_blank"
                        className="text-primary font-semibold hover:underline"
                      >
                        سياسة الخصوصية
                      </Link>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAcceptTerms(!acceptTerms)}
                      className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        acceptTerms
                          ? "bg-primary border-primary"
                          : "bg-white border-gray-300 hover:border-primary"
                      }`}
                    >
                      {acceptTerms && <Check className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading || !acceptTerms}
                  >
                    {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
      <Footer />
      <FloatingButtons />
    </div>
  );
}