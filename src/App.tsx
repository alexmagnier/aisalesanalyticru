import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
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

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navigation />
      <main>
        <Routes>
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
