import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { usefetchCountries } from "services/fetch";

const Context = createContext();
export const useShippingCountry = () => useContext(Context);


export function ShippingCountryProvider({ children }){
    const { locale } = useRouter()
    
    const [countryCode, setCountryCode] = useState(locale == 'vi-VN' ? 'VN' : 'US')
  
    return <Context.Provider value={{ countryCode, setCountryCode }}>
        {children}
    </Context.Provider>

}