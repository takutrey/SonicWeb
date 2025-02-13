import React from 'react'
import Header from '../components/Header/Header.jsx'
import Hero from '../components/Hero/Hero.jsx'
import AboutUs from '../components/About/About.jsx'
import Services from '../components/Services/Services.jsx'
import StatisticsCounter from '../components/Counter/Counter.jsx'

const Home = () => {
  return (
    <>
     <Header />
    <Hero />
    <AboutUs />
    <Services />
    <StatisticsCounter />
    </>
   
  )
}

export default Home