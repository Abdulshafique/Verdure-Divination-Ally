import React from 'react'
import LandingSection from './LandingSection'
import MostSearchedPlants from './MostSearchedPlants'
import Categories from './Categories'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
        <LandingSection/>
        <MostSearchedPlants/>
        <Categories/>
        <div style={{ marginTop: '20px' }}/> 
        <Footer/>
    </div>
  )
}

export default Home