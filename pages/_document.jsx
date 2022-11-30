import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400&family=Lora:wght@400;500&family=Manrope&display=optional" rel="stylesheet" />
                {/* <title>Kydo Store | Smarter wallets - Men Accessories</title> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}