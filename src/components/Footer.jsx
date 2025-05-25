import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div  >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>

    <div>
      <img src={assets.logo} className='mb-5 w-32' alt="" />
      <p className='w-full md:2/3 text-gray'>
        {/* Add footer text here */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum unde quam, magni tempore doloribus est porro repellendus ex ab minima!
      </p>
    </div>

   <div>
        <p className='text-xl font-medium mb-5 '>
          COMAPNY 

        </p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li className=''>Home</li>

          <li className=''>About us </li>
          <li className=''>Delivery</li>
          <li className=''>Privacy policy </li>

        </ul>
   </div>


    <div>
      <p className='text-xl font-medium mb-5 '> 
    GET IN TOUCH 
      </p>
      <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+1-321-988-1232</li>
        <li>contact@forver@gmail.com</li>
      </ul>
    </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ All right reserved</p>
      </div>
      
    </div>
  )
}

export default Footer
