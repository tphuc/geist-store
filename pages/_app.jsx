
// import { CartProvider } from 'react-use-cart'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ShippingCountryProvider } from 'hooks/useShippingCountry'
import 'styles/globals.css'
import { CartProvider } from 'use-shopping-cart'



export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <PayPalScriptProvider  options={{
            "client-id": process.env.PAYPAL_CLIENT_ID,
        
            // debug: true
            

        }} >
             <CartProvider>
            <ShippingCountryProvider>
               
                    {getLayout(<Component {...pageProps} />)}
                
            </ShippingCountryProvider>
            </CartProvider>
        </PayPalScriptProvider>
    )
}