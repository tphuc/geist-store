'use client';

import { sand } from "@radix-ui/colors";
import Box from "components/Box";
import Image from "next/image";



const ImageSlides = ({ css, ...props }) => {
    return <Box css={{
        position: "relative",
        width: 320,
        scrollPaddingTop:1000,
        ...css
    }}  {...props}>
        <Box css={{
            display: "flex",
            position: 'absolute',
            bottom:'0.5em',
            width:'100%',
            zIndex:9,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            '& > a:active':{
                top:1
            },
            '& > a:focus':{
                background:'white'
            }
        }}>
            <a href='#image_1' style={{ position:"relative", width: 16, height: 16, borderRadius:10, background: sand.sand12 }}>
                
            </a>
            <a href='#image_2'  style={{ position:"relative", width: 16, height: 16, borderRadius:10, background: sand.sand12 }}>

            </a>
            <a href='#image_3'  style={{ position:"relative", width: 16, height: 16, borderRadius:10, background: sand.sand12 }}>

            </a>
        </Box>

        <Box css={{
            position:'relative',
            display: 'flex',
            overflowX: "auto",
            background: sand.sand3,
            'scroll-snap-type': 'x mandatory',
            'scroll-behavior': 'smooth',
            '-webkit-overflow-scrolling': 'touch',
            scrollbarWidth: 0,
            // '&::-webkit-scrollbar': {
            //     width: 0,
            //     height: 0,
            // },

            // '&::-webkit-scrollbar-thumb': {
            //     background: sand.sand10,
            //     borderRadius: 0
            // },
            // '&::-webkit-scrollbar-track': {
            //     background: sand.sand7
            // }
            // height: 320,
        }}>
            <Box
                id='image_1'
                style={{
                    display: 'flex',
                    position: "relative",
                    fontFamily: "'Manrope', sans-serif",
                    padding: 0, flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',

                    scrollSnapAlign: "start",
                    transformOrigin: "center center",
                    width: '100%',


                }}>
                <Image
                    src="/wallet1.png"
                    width={320}
                    height={320}

                />

            </Box>
            <Box
                id='image_2'
                style={{
                    display: 'flex',
                    position: "relative",
                    fontFamily: "'Manrope', sans-serif",
                    padding: 0, flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',

                    scrollSnapAlign: "start",
                    transformOrigin: "center center",
                    width: '100%',


                }}>
                <Image
                    src="/wallet1.png"
                    width={320}
                    height={320}

                />

            </Box>
            <Box
                id='image_3'
                style={{
                    display: 'flex',
                    position: "relative",
                    fontFamily: "'Manrope', sans-serif",
                    padding: 0, flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: 'center',

                    scrollSnapAlign: "start",
                    transformOrigin: "center center",
                    width: '100%',


                }}>
                <Image
                    src="/wallet1.png"
                    width={320}
                    height={320}

                />

            </Box>
        </Box>
    </Box>
}


export default ImageSlides;