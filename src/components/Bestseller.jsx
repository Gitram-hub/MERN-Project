import { useContext, useEffect, useState } from 'react'
import { Shop } from '../context/Shop'
import Title from './Title'
import ProductItem from './productitem';

function Bestseller() {
    const { products } = useContext(Shop);
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item) => item.bestseller);
        setbestseller(bestproduct.slice(0, 4));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={"BEST"} text2={"BESTSELLERS"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700'></p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                 {
                    bestseller.map((item, index) => (
                        <ProductItem key={index} id={item.id} name={item.name} image={item.image} price={item.price}/>
                    ))
                 } 
            </div>
        </div>
    )
}

export default Bestseller
