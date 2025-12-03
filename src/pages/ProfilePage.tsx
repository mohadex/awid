import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Calendar, Edit, Save, X, Upload, FileText, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface Profile {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          toast({
            title: "خطأ",
            description: "يجب تسجيل الدخول لعرض الملف الشخصي",
            variant: "destructive"
          });
          navigate("/login");
          return;
        }

        setUserEmail(user.email || "");

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (profileData) {
          setProfile(profileData);
          setEditName(profileData.full_name || "");
          setEditBio(profileData.bio || "");
          setEditAvatarUrl(profileData.avatar_url || "");
        } else {
          const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || "المستخدم";
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              full_name: displayName,
              avatar_url: null,
              created_at: new Date().toISOString()
            })
            .select()
            .single();

          if (newProfile) {
            setProfile(newProfile);
            setEditName(newProfile.full_name);
          }
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast({
          title: "خطأ",
          description: "تعذر تحميل الملف الشخصي",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleAvatarUpload = async (file: File) => {
    try {
      setIsUploadingAvatar(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          setEditAvatarUrl(dataUrl);
        };
        reader.readAsDataURL(file);
        toast({
          title: "تنبيه",
          description: "تم استخدام الصورة محلياً. قد لا تظهر للآخرين.",
        });
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        setEditAvatarUrl(publicUrl);
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast({
        title: "خطأ",
        description: "تعذر رفع الصورة",
        variant: "destructive"
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    if (!profile || !editName.trim()) {
      toast({
        title: "خطأ",
        description: "الاسم مطلوب",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let finalAvatarUrl = editAvatarUrl;

      if (avatarFile) {
        await handleAvatarUpload(avatarFile);
        await new Promise(resolve => setTimeout(resolve, 500));
        finalAvatarUrl = editAvatarUrl || profile.avatar_url;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: editName.trim(),
          bio: editBio.trim() || null,
          avatar_url: finalAvatarUrl || null
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await supabase.auth.updateUser({
        data: { full_name: editName.trim() }
      });

      setProfile({
        ...profile,
        full_name: editName.trim(),
        bio: editBio.trim() || null,
        avatar_url: finalAvatarUrl || null
      });
      setAvatarFile(null);
      setIsEditing(false);

      toast({
        title: "تم التحديث",
        description: "تم تحديث الملف الشخصي بنجاح"
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "خطأ",
        description: "تعذر تحديث الملف الشخصي",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditName(profile.full_name || "");
      setEditBio(profile.bio || "");
      setEditAvatarUrl(profile.avatar_url || "");
    }
    setAvatarFile(null);
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح"
    });
    navigate("/");
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <Navbar />
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg">جاري التحميل...</p>
        </div>
      </div>
      <Footer />
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <Navbar />
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">لا يوجد ملف شخصي</p>
      </div>
      <Footer />
    </div>
  );

  const date = new Date(profile.created_at);
  
  const monthsAr: { [key: string]: string } = {
    'January': 'يناير', 'February': 'فبراير', 'March': 'مارس', 'April': 'أبريل',
    'May': 'مايو', 'June': 'يونيو', 'July': 'يوليو', 'August': 'أغسطس',
    'September': 'سبتمبر', 'October': 'أكتوبر', 'November': 'نوفمبر', 'December': 'ديسمبر'
  };
  
  const day = date.getDate();
  const month = monthsAr[date.toLocaleDateString('en-US', { month: 'long' })];
  const year = date.getFullYear();
  
  const formattedDate = `${day} ${month} ${year}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Card with Avatar */}
          <Card className="p-6 md:p-8 mb-6 shadow-2xl border-2 border-primary/10 bg-white/95 backdrop-blur-sm rounded-2xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-xl">
                  {(isEditing && editAvatarUrl) || (!isEditing && profile.avatar_url) ? (
                    <AvatarImage src={isEditing ? editAvatarUrl : profile.avatar_url || ""} alt={profile.full_name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-primary to-[#d94a3a] text-white text-3xl md:text-4xl font-bold">
                      {profile.full_name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 left-0 bg-primary text-white rounded-full p-3 cursor-pointer hover:bg-primary/90 transition-all shadow-lg hover:scale-110">
                    <Upload className="h-5 w-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setAvatarFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditAvatarUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      disabled={isUploadingAvatar}
                    />
                  </label>
                )}
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Profile Info Header */}
              <div className="flex-1 text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {isEditing ? editName : profile.full_name}
                </h1>
                <p className="text-gray-600 mb-4">{userEmail}</p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  <span>عضو منذ {formattedDate}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Profile Content */}
          <Card className="p-6 md:p-8 shadow-2xl border-2 border-primary/10 bg-white/95 backdrop-blur-sm rounded-2xl">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="full-name" className="flex items-center gap-2 mb-3 text-base font-semibold text-gray-700">
                  <User className="h-5 w-5 text-primary" />
                  <span>الاسم الكامل</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="full-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    className="h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl text-right"
                  />
                ) : (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                    <p className="text-lg font-medium text-gray-900">{profile.full_name}</p>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="flex items-center gap-2 mb-3 text-base font-semibold text-gray-700">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>السيرة الذاتية</span>
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="اكتب سيرتك الذاتية..."
                    rows={4}
                    className="min-h-[120px] text-base border-2 border-gray-200 focus:border-primary rounded-xl text-right"
                  />
                ) : (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 min-h-[100px]">
                    <p className="text-lg font-medium text-gray-900 whitespace-pre-wrap">
                      {profile.bio || "لا توجد سيرة ذاتية. اضغط على تعديل لإضافة سيرتك الذاتية."}
                    </p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="flex items-center gap-2 mb-3 text-base font-semibold text-gray-700">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>البريد الإلكتروني</span>
                </Label>
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                  <p className="text-lg font-medium text-gray-900 dir-ltr text-left">{userEmail}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t-2 border-gray-200">
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleSave} 
                      className="flex-1 h-12 text-base font-bold bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                      disabled={isUploadingAvatar}
                    >
                      <Save className="h-5 w-5 ml-2" />
                      حفظ التغييرات
                    </Button>
                    <Button 
                      onClick={handleCancel} 
                      variant="outline" 
                      className="flex-1 h-12 text-base font-semibold border-2 border-gray-300 hover:border-primary rounded-xl"
                    >
                      <X className="h-5 w-5 ml-2" />
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-[#d94a3a] hover:from-[#d94a3a] hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Edit className="h-5 w-5 ml-2" />
                    تعديل الملف الشخصي
                  </Button>
                )}
              </div>

              {/* Sign Out Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleSignOut} 
                  variant="destructive" 
                  className="w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <LogOut className="h-5 w-5 ml-2" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;