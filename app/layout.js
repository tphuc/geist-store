
import { styled } from "@stitches/react";
import Box from "components/Box";
import Link from "components/Link";
import 'styles/globals.css'
import { san, sand } from "@radix-ui/colors";
import ButtonIcon from "components/ButtonIcon";
import { IconShoppingCart } from '@tabler/icons'


export default function RootLayout({ children }) {
  return (
    <html style={{scrollPaddingTop:140}}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400&family=Lora:wght@400;500&family=Manrope&display=swap" rel="stylesheet"/>
        <title>Kydo Store | Smarter wallets - Men Accessories</title>
      </head>

      <body style={{  backgroundColor: sand.sand4, fontFamily:"'Manrope', sans-serif" }}>
        <nav style={{ display: 'flex', left:0, height:80, backgroundColor: sand.sand4, position:"fixed", width:"100vw",
          paddingLeft: "4%", paddingRight: "4%", 
          boxSizing:"border-box", zIndex:10, userSelect:"none", justifyContent: 'space-between', alignItems: "center" }}>
          <Link href={'/shop'} css={{ color: "#111" }}>
            Shop
          </Link>
          <Box css={{fontFamily:"'Laro', serif", fontWeight:550, fontSize:38, color: sand.sand12, userSelect:"none", cursor:"pointer"}}>
            <Link href={'/'}>GEIST</Link>
            {/* <img style={{ height: 60, width: "auto", objectFit: "contain" }} src='/logo.png'></img> */}
          </Box>

            <IconShoppingCart strokeWidth={1.25}/>
        
        </nav>
        <div style={{height:80}}></div>
        {children}
      </body>
    </html>
  )
}
