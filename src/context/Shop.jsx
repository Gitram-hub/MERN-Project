import React, { createContext, useState } from "react";
import { products } from "../assets/assets";

export const Shop = createContext();

const ShopProvider = (props) => {
    const currency = '$';
    const deliveryfees = 10;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const value = {
        products,
        currency,
        deliveryfees,
        search,setSearch,showSearch,setShowSearch
    };

    return (
        <Shop.Provider value={value}>
            {props.children}
        </Shop.Provider>
    );
};

export default ShopProvider;



 