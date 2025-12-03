import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // ✅ Supabase automatically reads tokens from URL hash/query params
        // The client handles this synchronously when the page loads
        // No need to wait - getSession() will return the session immediately if tokens exist in URL
        
        // ✅ Get session - Supabase reads tokens from URL and stores them automatically
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('⚠️ Auth error:', error);
          navigate('/auth', { replace: true });
          return;
        }

        if (session) {
          console.log('✅ Logged in user:', session.user);
          
          // ✅ Remove tokens from URL IMMEDIATELY after session is retrieved
          // This ensures tokens are never visible in address bar, browser history, or shareable links
          if (window.location.hash || window.location.search) {
            window.history.replaceState(
              {}, 
              document.title, 
              '/profile'
            );
          }
          
          // Create or update user profile (don't wait for it - do it in parallel)
          // Profile creation is not critical for navigation
          if (session.user) {
            supabase
              .from('profiles')
              .upsert([
                {
                  user_id: session.user.id,
                  full_name: session.user.user_metadata?.full_name || 
                            session.user.user_metadata?.name ||
                            session.user.email?.split('@')[0] || 
                            'المستخدم',
                  avatar_url: session.user.user_metadata?.avatar_url || null,
                  created_at: new Date().toISOString(),
                },
              ], { onConflict: 'user_id' })
              .then(({ error: profileError }) => {
                if (profileError) {
                  console.error("Error creating/updating profile:", profileError);
                }
              });
          }

          // ✅ Redirect immediately with clean URL (no tokens)
          // Don't wait for profile creation
          navigate('/profile', { replace: true });
        } else {
          console.error('⚠️ No session found');
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('⚠️ Unexpected error:', error);
        // Ensure URL is clean on error
        window.history.replaceState({}, document.title, '/profile');
        navigate('/auth', { replace: true });
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-lg font-medium">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>جاري تسجيل الدخول...</p>
      </div>
    </div>
  );
}
