import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { usefetchCountries } from "services/fetch";
import { useShoppingCart } from "use-shopping-cart";

const Context = createContext();
export const useShippingCountry = () => useContext(Context);


export function ShippingCountryProvider({ children }){

    // const {data: countries} = usefetchCountries();
    const { cartDetails, clearCart, addItem, changeCurrency } = useShoppingCart();

    const { locale } = useRouter()

    const { data: countries} = usefetchCountries()
    const [countryCode, setCountryCode] = useState('VN')

    const priceNumber = React.useCallback((data) => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)
    
    
        if (priceByCountry)
            return priceByCountry.value
        else {
            return data?.defaultPrice
        }
    
    }, [countryCode])
    
    const currentCurrencyCode = React.useCallback((data) => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)
    
    
        if (priceByCountry)
            return priceByCountry.currencyCode
        else {
            return data?.defaultCurrencyCode
        }
    
    }, [countryCode])
    

    React.useEffect(() => {
        let oldCartDetails = cartDetails;
        clearCart();
        // let country = countries?.find((item) => item.code === countryCode)
        // console.log(69, country)
       

        Object.values(oldCartDetails)?.map((item, id) => {
            changeCurrency(currentCurrencyCode(item.product_data))
            addItem({
                name: locale === 'vi-VN' ? item?.product_data?.vi_title : item?.product_data?.en_title, // update name
                id: item?.id,
                price: priceNumber(item.product_data), // update price
                currency: currentCurrencyCode(item.product_data),
                image: item.product_data?.selectedVariant?.imageUrl
            }, {
                count: 1,
                product_metadata: {
                    ...item.product_data
                },
            }) 
        
        })
    }, [countryCode])
  
    return <Context.Provider value={{ countryCode, setCountryCode,  }}>
        {children}
    </Context.Provider>

}