import React from 'react'

function Newletterbox() {

    const onsubmit=(event)=>
    {
           event.preventDefault();

    }
  return (
    <div className='text-center '>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and Get 20% off</p>
      <p className='text-gray-400 mt-3 '>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, porro.
      </p>
      <form onSubmit={onsubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
         <input type="email"  className='w-full sm:flex outline-none '   placeholder='Enter your Email ' required />
         <button type='submit' className='bg-black text-white text-xs px-10 py-4'> Subscribe </button>
 

      </form>
    </div>
  )
}

export default Newletterbox
