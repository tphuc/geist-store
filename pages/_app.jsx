
// import { CartProvider } from 'react-use-cart'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ShippingCountryProvider } from 'hooks/useShippingCountry'
import 'styles/globals.css'
import { CartProvider } from 'use-shopping-cart'



export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <PayPalScriptProvider options={{
            "client-id": 'Af_ml170LjBF71oWJ-2HY6wqki3KYrEz2wUisjon7RVTIi5FwqVq9ylBX3hpuxVLVePYtZPaOQ48AzXR',
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