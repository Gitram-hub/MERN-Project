import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Latestcol from '../components/Latestcol'
import Bestseller from '../components/Bestseller'
import Ourpolices from '../components/Ourpolices'
import Newletterbox from '../components/Newletterbox'

function Home() {
  return (
    <div>
     <Hero/>
     <Latestcol/>
     <Bestseller/>
     <Ourpolices/>
     <Newletterbox/>
    </div>
  )
}

export default Home
