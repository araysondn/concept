import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Business } from './pages/Business';
import { Corporates } from './pages/Corporates';
import { Cooperatives } from './pages/Cooperatives';
import { MotorInsurance } from './pages/MotorInsurance';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Investments } from './pages/Investments';
import { Retirement } from './pages/Retirement';
import { LifeInsurance } from './pages/LifeInsurance';
import { MedicalInsurance } from './pages/MedicalInsurance';
import { HomeInsurance } from './pages/HomeInsurance';
import { Pharmacy } from './pages/Pharmacy';
import { Claims } from './pages/Claims';
import { LifeAssurance } from './pages/LifeAssurance';
import { GeneralInsurance } from './pages/GeneralInsurance';
import { Microinsurance } from './pages/Microinsurance';
import { About } from './pages/about/About';
import { Leadership } from './pages/about/Leadership';
import { History } from './pages/about/History';
import { InvestorRelations } from './pages/about/InvestorRelations';
import { Sustainability } from './pages/about/Sustainability';
import { MediaCentre } from './pages/about/MediaCentre';
import { Events } from './pages/about/Events';
import { Tenders } from './pages/about/Tenders';
import { Careers } from './pages/about/Careers';
import { JobDetail } from './pages/about/JobDetail';
import { ContactUs } from './pages/ContactUs';
import { Blog } from './pages/blog/Blog';
import { BlogPost } from './pages/blog/BlogPost';
import { Privacy } from './pages/Privacy';
import { OnlineHome } from './online/pages/OnlineHome';
import { OnlineServices } from './online/pages/OnlineServices';
import { OnlineLogin } from './online/pages/OnlineLogin';
import { OnlineRegister } from './online/pages/OnlineRegister';
import { Portfolio } from './pages/Portfolio';
import { ChatWidget } from './components/ChatWidget';
import { ImpactLogin } from './impact/pages/ImpactLogin';
import { ImpactDashboard } from './impact/pages/ImpactDashboard';
import { ImpactSignup } from './impact/pages/ImpactSignup';
import { ImpactVerify } from './impact/pages/ImpactVerify';
import { IntranetHome } from './intranet/pages/IntranetHome';
import { IntranetNews } from './intranet/pages/IntranetNews';
import { IntranetArticle } from './intranet/pages/IntranetArticle';
import { IntranetEvents } from './intranet/pages/IntranetEvents';
import { IntranetResources } from './intranet/pages/IntranetResources';
import { ImpactProfile } from './impact/pages/ImpactProfile';

// The WhatsApp customer chat isn't for service providers on Impact or staff on the intranet.
function CustomerChat() {
  const { pathname } = useLocation();
  return pathname.startsWith('/impact') || pathname.startsWith('/intranet') ? null : <ChatWidget />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Segments */}
        <Route path="/" element={<Home />} />
        <Route path="/business" element={<Business />} />
        <Route path="/corporates" element={<Corporates />} />
        <Route path="/cooperatives" element={<Cooperatives />} />

        {/* Products and services */}
        <Route path="/motor-insurance" element={<MotorInsurance />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/retirement" element={<Retirement />} />
        <Route path="/life-insurance" element={<LifeInsurance />} />
        <Route path="/medical-insurance" element={<MedicalInsurance />} />
        <Route path="/home-insurance" element={<HomeInsurance />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/claims" element={<Claims />} />

        {/* Our companies */}
        <Route path="/life-assurance" element={<LifeAssurance />} />
        <Route path="/general-insurance" element={<GeneralInsurance />} />
        <Route path="/microinsurance" element={<Microinsurance />} />

        {/* About CIC Group */}
        <Route path="/about" element={<About />} />
        <Route path="/about/leadership" element={<Navigate to="/about/leadership/board-of-directors" replace />} />
        <Route path="/about/leadership/:view" element={<Leadership />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/investor-relations" element={<InvestorRelations />} />
        <Route path="/about/sustainability" element={<Sustainability />} />
        <Route path="/about/media-centre" element={<MediaCentre />} />
        <Route path="/about/events" element={<Events />} />
        <Route path="/about/tenders" element={<Tenders />} />
        <Route path="/about/careers" element={<Careers />} />
        <Route path="/about/careers/:slug" element={<JobDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Self-service portal: CIC Online */}
        <Route path="/online" element={<OnlineHome />} />
        <Route path="/online/services" element={<OnlineServices />} />
        <Route path="/online/contact" element={<OnlineServices initial="contact" />} />
        <Route path="/online/faqs" element={<OnlineServices initial="faqs" />} />
        <Route path="/online/login" element={<OnlineLogin />} />
        <Route path="/online/register" element={<OnlineRegister />} />
        <Route path="/login" element={<Navigate to="/online/login" replace />} />
        <Route path="/register" element={<Navigate to="/online/register" replace />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Impact: CIC Microinsurance service provider portal */}
        <Route path="/impact" element={<Navigate to="/impact/login" replace />} />
        <Route path="/impact/login" element={<ImpactLogin />} />
        <Route path="/impact/dashboard" element={<ImpactDashboard />} />
        <Route path="/impact/signup" element={<ImpactSignup />} />
        <Route path="/impact/signup/verify" element={<ImpactVerify />} />
        <Route path="/impact/profile" element={<ImpactProfile />} />

        {/* Intranet: CIC Group staff portal */}
        <Route path="/intranet" element={<IntranetHome />} />
        <Route path="/intranet/news" element={<IntranetNews />} />
        <Route path="/intranet/news/:id" element={<IntranetArticle />} />
        <Route path="/intranet/events" element={<IntranetEvents />} />
        <Route path="/intranet/resources" element={<IntranetResources />} />

        <Route path="*" element={<Home />} />
      </Routes>
      <CustomerChat />
    </BrowserRouter>);

}
