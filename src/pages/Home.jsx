import React from "react";
import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import AboutUs from "../components/About/About.jsx";
import Services from "../components/Services/Services.jsx";
import StatisticsCounter from "../components/Counter/Counter.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MainPartners from "../components/MainPartners/MainPartners.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <MainPartners />
      <Services />
      <StatisticsCounter />
      <Testimonials />

      <Footer />
    </>
  );
};

export default Home;
