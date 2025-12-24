import { Routes, Route } from 'react-router-dom';
import ReferralTracker from './components/common/ReferralTracker';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

// Main site pages
import HomePage from './pages/Home';
import FeaturesPage from './pages/Features';
import PricingPage from './pages/Pricing';
import IntegrationsPage from './pages/Integrations';
import ForWhomPage from './pages/ForWhom';
import CalculatorPage from './pages/Calculator';
import BlogPage from './pages/Blog';
import ConversionArticle from './pages/blog/Conversion';
import AiVsHumanArticle from './pages/blog/AiVsHuman';
import OnboardingArticle from './pages/blog/Onboarding';
import ScriptsArticle from './pages/blog/Scripts';
import AmoCRMArticle from './pages/blog/AmoCRM';
import ROIArticle from './pages/blog/ROI';

// Partner pages
import PartnersLanding from './pages/partners/PartnersLanding';
import Register from './pages/partners/Register';
import Login from './pages/partners/Login';
import ResetPassword from './pages/partners/ResetPassword';
import Dashboard from './pages/partners/Dashboard';
import Referrals from './pages/partners/Referrals';
import Payouts from './pages/partners/Payouts';
import Profile from './pages/partners/Profile';
import Materials from './pages/partners/Materials';

// Admin pages (placeholder)
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPartners from './pages/admin/AdminPartners';
import AdminReferrals from './pages/admin/AdminReferrals';
import AdminPayouts from './pages/admin/AdminPayouts';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <ReferralTracker />
      <MainLayout>
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/for-whom" element={<ForWhomPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/conversion" element={<ConversionArticle />} />
          <Route path="/blog/ai-vs-human" element={<AiVsHumanArticle />} />
          <Route path="/blog/onboarding" element={<OnboardingArticle />} />
          <Route path="/blog/scripts" element={<ScriptsArticle />} />
          <Route path="/blog/amocrm" element={<AmoCRMArticle />} />
          <Route path="/blog/roi" element={<ROIArticle />} />
          
          {/* Partner routes - public */}
          <Route path="/partners" element={<PartnersLanding />} />
          <Route path="/partners/register" element={<Register />} />
          <Route path="/partners/login" element={<Login />} />
          <Route path="/partners/reset-password" element={<ResetPassword />} />
          
          {/* Partner routes - protected */}
          <Route path="/partners/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/partners/referrals" element={
            <ProtectedRoute>
              <Referrals />
            </ProtectedRoute>
          } />
          <Route path="/partners/payouts" element={
            <ProtectedRoute>
              <Payouts />
            </ProtectedRoute>
          } />
          <Route path="/partners/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/partners/materials" element={
            <ProtectedRoute>
              <Materials />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/partners" element={
            <ProtectedRoute requireAdmin>
              <AdminPartners />
            </ProtectedRoute>
          } />
          <Route path="/admin/referrals" element={
            <ProtectedRoute requireAdmin>
              <AdminReferrals />
            </ProtectedRoute>
          } />
          <Route path="/admin/payouts" element={
            <ProtectedRoute requireAdmin>
              <AdminPayouts />
            </ProtectedRoute>
          } />
        </Routes>
      </MainLayout>
    </div>
  );
};

export default App;
