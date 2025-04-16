import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Footer from '@/components/Footer';
import HomeContact from '@/components/HomeContact';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <AnalyticsDashboard />
      <HomeContact />
      <Footer />
    </div>
  );
};

export default Home; 