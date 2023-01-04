import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Manrope:wght@300;400&display=swap" rel="stylesheet" />
                {/* <title>Kydo Store | Smarter wallets - Men Accessories</title> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}