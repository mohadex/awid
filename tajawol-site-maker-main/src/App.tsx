import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Index from "./pages/Index"
import OrderPage from "./pages/OrderPage"
import TransportPage from "./pages/TransportPage"
import AuthPage from "./pages/AuthPage"
import AuthCallback from "./pages/auth/callback"
import DriverRegistrationPage from "./pages/DriverRegistrationPage"
import ProfilePage from "./pages/ProfilePage"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/transport" element={<TransportPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/driver-registration" element={<DriverRegistrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}