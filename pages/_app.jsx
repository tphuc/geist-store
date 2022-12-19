
// import { CartProvider } from 'react-use-cart'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ShippingCountryProvider } from 'hooks/useShippingCountry'
import 'styles/globals.css'
import { CartProvider } from 'use-shopping-cart'



export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <PayPalScriptProvider>
            <ShippingCountryProvider>
                <CartProvider>
                    {getLayout(<Component {...pageProps} />)}
                </CartProvider>
            </ShippingCountryProvider>
        </PayPalScriptProvider>
    )
}