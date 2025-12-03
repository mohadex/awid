import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index"
import OrderPage from "./pages/OrderPage"
import TransportPage from "./pages/TransportPage"
import RestaurantsPage from "./pages/RestaurantsPage"
import LegalPage from "./pages/LegalPage"
import PrivacyPage from "./pages/PrivacyPage"
import TermsPage from "./pages/TermsPage"
import RefundPage from "./pages/RefundPage"
import UsagePage from "./pages/UsagePage"
import AuthPage from "./pages/AuthPage"
import AuthCallback from "./pages/auth/callback"
import DriverRegistrationPage from "./pages/DriverRegistrationPage"
import ProfilePage from "./pages/ProfilePage"
import NotFound from "./pages/NotFound"
import DelayedAdPopup from "./components/DelayedAdPopup"
import AboutUs from "./pages/AboutUs"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/usage" element={<UsagePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/driver-registration" element={<DriverRegistrationPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <DelayedAdPopup />
    </BrowserRouter>
  )
}