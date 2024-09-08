import React from 'react'
import Navbar from './Shared/Navbar'
import Herosection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Shared/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home