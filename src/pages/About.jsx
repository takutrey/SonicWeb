import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AboutUs from '../components/AboutUsPage/MoreAbout/MoreAbout'
import MissionValues from '../components/AboutUsPage/MissionValues/MissionValues'
import HeroAbout from '../components/AboutUsPage/HeroAbout/HeroAbout'

const About = () => {
  return (
    <>
    <Header />
    <HeroAbout />
    <AboutUs />
    <MissionValues />
    <Footer />
    </>
  )
}

export default About