import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Latestcol from '../components/Latestcol'

function Home() {
  return (
    <div>
     <Hero/>
     <Latestcol/>
    </div>
  )
}

export default Home
