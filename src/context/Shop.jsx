import React, { createContext } from "react";
import { products } from "../assets/assets";

export const Shop = createContext();

const ShopProvider = (props) => {
    const currency = '$';
    const deliveryfees = 10;
    const value = {
        products,
        currency,
        deliveryfees
    };

    return (
        <Shop.Provider value={value}>
            {props.children}
        </Shop.Provider>
    );
};

export default ShopProvider;



 