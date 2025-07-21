import { useContext, useEffect, useState } from 'react'
import { Shop } from '../context/Shop'
import Title from './Title'
import ProductItem from './productitem';

function Latestcol() {
    const{products}=useContext(Shop);
    const [latest,setlatest]=useState([]);
    useEffect(() => {
        setlatest(products.slice(0, 10));
    }, [products]);
   
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>

        <Title text1={"LATEST"} text2={"COLLECTION "} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'>



        </p>


      </div>
     {/* {rendring product} */}
     <div className='grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
   {
      latest.map((item, index) => (
        <ProductItem key={index} id={item.id} image={item.image} name={item.name} price={item.price} />
      ))
   }

     </div>
      
    </div>
  )
}

export default Latestcol
