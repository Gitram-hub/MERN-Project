import { useContext, useEffect, useState } from 'react'
import { Shop } from '../context/Shop';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/productitem'

function Collection() {

  const [showFilter, setShowFilter] = useState(false);

  const {products}=useContext(Shop);
  const [filterproducts,seteFilterproducts]=useState([]);
  const [category,setcategory]=useState([]);
  // Removed unused subcategory state
  const toggleCategory = (e) =>
  {
       if(category.includes(e.target.value))
       {
        setcategory(prev=>prev.filter(item=>item!=e.target.value))
       }
       else
       {
        setcategory(prev=>[...prev, e.target.value])
       }
  }
  useEffect(()=>{
    seteFilterproducts(products);
  },[]);
  useEffect(()=>
  {
     console.log(category);
  },[category])
  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* {Filter option } */}
      <div className='min w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer'>
          FILTERS 
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt="" />
        </p>
        {/* {category filter} */}
        <div className={`border border-gray-300 pl-5 py-3 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} /> Kids 
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'men'} onChange={toggleCategory}/>Men
            </p>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'women'}  onChange={toggleCategory}/>Women
            </p>
          </div>
        </div>

 <div className={`border border-gray-300 pl-5 py-3  ${showFilter?' ':'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'}/>Bottomwear
            </p>
             <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'}/>Winterwear
            </p>
          </div>
        </div>

      </div>


      {/* {rigt side} */}
      <div className='flex-1'>
        <div className='flex  justify-between text-base sm:text-2xl mb-4'>

           <Title text1={'ALL'} text2={'COLLECTION'}/>
           {/* {prodcut sort} */}
           <select name="" className='border-2 border-gray-300 text-sm px-2' id="">
              <option value="relavant">Sort by :Relavant</option>
              <option value="low-high">Sort by: low to high </option>

              <option value="high-low">Sort by:High to low </option>

           </select>



        </div>
        {/* {Map products} */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            filterproducts.map((item,index)=>
            (
              <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.image} />
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

export default Collection





