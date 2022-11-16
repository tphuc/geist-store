
// import { CartProvider } from 'react-use-cart'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import 'styles/globals.css'
import { CartProvider } from 'use-shopping-cart'



export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <PayPalScriptProvider>
        <CartProvider>
            {getLayout(<Component {...pageProps} />)}
        </CartProvider>
        </PayPalScriptProvider>
    )
}