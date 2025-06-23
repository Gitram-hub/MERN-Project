import { useContext } from 'react'

function Collection() {
  useContext(shop)
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* {Filter option } */}
      <div className='min w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer'>
          FILTERS 
        </p>
      </div>
    </div>
  )
}

export default Collection
