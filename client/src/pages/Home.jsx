import React from 'react'
import Hero from '../components/Hero'
import FeatureDestination from '../components/FeatureDestination'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonial from '../components/Testimonial'
import RecommendedHotels from '../components/RecommendedHotels'
import NewsLetter from '../components/NewsLetter'




const Home = () => {
  return (
    <>
<Hero />
<RecommendedHotels/>
<FeatureDestination/>
   <ExclusiveOffers/>
   <Testimonial/>
   <NewsLetter/>
   
    </>
  )
}

export default Home
