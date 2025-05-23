import React from 'react'
import { assets } from '../assets/assets'

export default function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/*hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-1- sm:py-0'>

         <div className='text-black-500'>
            <div className='flex items-center gap-2'>
                     <p className='w-8 md:w-11 h-[2px] bg-[#414141]'>  </p>
                     <p className='font-medium text-sm md:text-base'> OUR BESTSELLERS  </p>
                
            </div>
            <h1 className='.prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrival</h1>
            <div className='flex items-center gap-2'>
             <p className='font-semibold text-sm ms:text-base'>SHOP NOW</p>
             <p className='w-8 md:w-11 h-[2px] bg-[#414141'></p>


            </div>
         </div>
        
        </div>
        {/* hero left side */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
      
    </div>
  )
}
