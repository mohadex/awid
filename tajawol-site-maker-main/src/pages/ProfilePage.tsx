import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Calendar, Edit, Save, X, Upload, FileText } from "lucide-react";
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
          // إنشاء ملف شخصي جديد إذا لم يكن موجود
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

      // Upload to Supabase Storage (avatars bucket)
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        // If storage upload fails, use a data URL or external service
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
        // Get public URL
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

      // If a new file was selected, upload it first
      if (avatarFile) {
        await handleAvatarUpload(avatarFile);
        // Wait a bit for upload to complete
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
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">جاري التحميل...</p>
      </div>
      <Footer />
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">لا يوجد ملف شخصي</p>
      </div>
      <Footer />
    </div>
  );

  const date = new Date(profile.created_at);
  
  // Format in Gregorian calendar with Arabic month names
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <Card className="p-6 md:p-8 shadow-md">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 mx-auto mb-4 bg-muted flex items-center justify-center">
                  {(isEditing && editAvatarUrl) || (!isEditing && profile.avatar_url) ? (
                    <AvatarImage src={isEditing ? editAvatarUrl : profile.avatar_url || ""} alt={profile.full_name} />
                  ) : (
                    <AvatarFallback>
                      <User className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                    <Upload className="h-4 w-4" />
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
                    />
                  </label>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">الملف الشخصي</h1>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="full-name" className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" /> الاسم الكامل
                </Label>
                {isEditing ? (
                  <Input
                    id="full-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                  />
                ) : (
                  <p className="text-lg font-medium p-3 bg-muted rounded-md">{profile.full_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio" className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" /> السيرة الذاتية
                </Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="اكتب سيرتك الذاتية..."
                    rows={4}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-lg font-medium p-3 bg-muted rounded-md min-h-[60px]">
                    {profile.bio || "لا توجد سيرة ذاتية"}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4" /> البريد الإلكتروني
                </Label>
                <p className="text-lg font-medium p-3 bg-muted rounded-md dir-ltr text-left">{userEmail}</p>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" /> تاريخ التسجيل
                </Label>
                <p className="text-lg font-medium p-3 bg-muted rounded-md">{formattedDate}</p>
              </div>

              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="h-4 w-4 ml-2" /> حفظ
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      <X className="h-4 w-4 ml-2" /> إلغاء
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="flex-1">
                    <Edit className="h-4 w-4 ml-2" /> تعديل الملف الشخصي
                  </Button>
                )}
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleSignOut} variant="destructive" className="w-full">
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
