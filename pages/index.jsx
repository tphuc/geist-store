import Image from 'next/image';
import { amber, crimson, cyan, gray, grayA, indigo, mauve, orange, sand, sky, slate, teal, violet, yellow } from "@radix-ui/colors";
import StyledLink from "components/Link";
import Box from 'components/Box';
import ImageSlides from 'components/ImageSlides';



import dynamic from 'next/dynamic';
import AnimatedTitle from 'components/AnimatedText';
import PageLayout from 'layout/Page';
import { IconBrandInstagram } from '@tabler/icons';
import { styled } from '@stitches/react';
import Footer from 'components/Footer';


const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false })


const Input = styled('input', {
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 300,
    height: 35,
    background: gray.gray4,
    color: gray.gray12,
    border: "none",
    boxShadow: "0px 0px 0px 1px $colors$grayA6",
    outlineStyle: "none",
    '&::placeholder': {
        color: slate.slate9
    },
})


const Button = styled('button', {
    all: "unset",
    outline: 'none',
    background: slate.slate12,
    color: slate.slate1,
    height: 35,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Manrope', serif",
    padding: "0px 10px"
})


export default function Page() {



    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box
            css={{
                position: 'relative',
                // flexDirection: "column",
                // display: "flex", flexWrap: "wrap", 
                width: "100vw",
                height: "calc(100vh - 40px)",
                overflow: "auto", scrollSnapType: "y mandatory",
                '&::-webkit-scrollbar': {
                    width: 0,
                    height: 0,

                },

                /* Track */
                '&::-webkit-scrollbar-track': {
                    background: '$mauve1',

                },

                /* Handle */
                '&::-webkit-scrollbar-thumb': {
                    background: '$mauve3',
                    borderRadius: 10,
                },

                /* Handle on hover */
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '$mauve7',
                },
                // scrollPaddingTop: 40, WebkitOverflowScrolling: "touch"
            }}
        >

            <Box style={{
                scrollSnapAlign: "start",
                position: "relative", backgroundColor: slate.slate3, flex: 3, minWidth: 320,
                backgroundImage: "url('/bg_3.jpeg')",

                height: "calc(100vh - 40px)", width: "100vw", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", objectFit: 'contain', color: "white"
            }}>
                <Box style={{
                    zIndex: 0,
                    // position: "fixed", 
                    fontFamily: "'Manrope', serif",
                    textAlign: "left",
                    display: "flex", flexDirection: 'column',
                    justifyContent: "flex-end",
                    height: "100%",
                    padding: "4%"

                    // paddingTop: "10%",




                }}>
                    <AnimatedTitle css={{ fontSize: "6em", fontFamily: "'Lora', serif", fontWeight: 600 }} text='Desgined to withstand the rigor of everyday life' />
                    {/* <h1 style={{ fontWeight: 500, fontSize: '5em', marginTop:"auto"}}> */}
                    {/* Desgined to withstand the rigor of everyday life. */}
                    {/* Được thiết kế để đối chọi với sự khắc nghiệt của cuộc sống thường ngày. */}
                    {/* </h1> */}
                    <span style={{ fontSize: 18, padding: 0, margin: 0, color: sand.sand11 }}>
                        {/* Men's accessories have come a long way in recent years. They are not just simply functional items - they've become style statements in their own right.
            indomitable spirit of man */}
                    </span>

                    {/* <span style={{ fontSize: 18, padding: 0, margin: 0, color: sand.sand12 }}>Find the one that fit your style.</span> */}

                    {/* <br /> */}
                    {/* <StyledLink href='/shop' style={{
            background: sand.sand12, display: "inline-flex", padding: "10px 20px", cursor: "pointer", userSelect: "none", color: sand.sand1, fontFamily: "'Manrope', sans-serif", '&:hover': {
              backgroundColor: "Black"
            }
          }}>
            Shop now
          </StyledLink> */}
                </Box>
            </Box>
            {/* <Box>
      
      </Box> */}
            <Box style={{
                scrollSnapAlign: "start",
                display: "flex", flexDirection: "row", maxWidth: '100vw', flexWrap: "wrap"
            }}>

                <Box style={{ writingMode: "vertical-rl", display: "flex", minWidth: 50, borderTop: `1px solid ${gray.gray12}`, background: mauve.mauve3, borderRight: `1px solid ${gray.gray12}`, alignItems: "center", padding: "4em 0.5em", textOrientation: "mixed", fontFamily: "'Manrope', serif" }}>
                    <h4 style={{ margin: 0, padding: 0, fontWeight: 300, }}>Our Favorites Geist Wallets</h4>
                </Box>

                <Box style={{ flex: 1, minHeight: "100vh", width: '100vw', display: "flex", flexDirection: "column", }}>
                    <Box style={{ flex: 1, display: 'flex', borderTop: `1px solid ${gray.gray11}`, flexWrap: "wrap", position: 'relative', minWidth: 200, }}>
                        <Box style={{
                            flex: 1,
                            position: "relative",
                            boxSizing: "border-box",
                            borderRight: `1px solid ${gray.gray11}`,
                            borderLeft: 'none', minWidth: 200,
                            fontFamily: "'Manrope', sans-serif",
                            background: `linear-gradient(-85deg, ${slate.slate3} 20%, ${mauve.mauve5})`,
                            maxWidth: "min(50vh, 90vw)",
                        }}>
                            <img
                                alt=''
                                src="/wallet1.png"
                                style={{ objectFit: 'cover', width: '100%', height: "100%" }}
                            />
                            <Box css={{ position: "absolute", bottom: 0, left: 0, width: '100%', padding: "0px 2em" }}>
                                <p >Alumnium Card Holder</p>
                            </Box>

                        </Box>

                        <Box style={{
                            flex: 1,
                            position: "relative",
                            boxSizing: "border-box",
                            borderRight: `1px solid ${gray.gray11}`,
                            borderLeft: 'none', minWidth: 200,
                            fontFamily: "'Manrope', sans-serif",
                            background: `linear-gradient(-85deg, ${slate.slate3} 20%, ${mauve.mauve5})`,
                            maxWidth: "min(50vh, 90vw)",
                        }}>
                            <img
                                alt=''
                                src="/lw_black.png"
                                style={{ objectFit: 'cover', width: '100%', height: "100%" }}
                            />
                            <Box css={{ position: "absolute", bottom: 0, left: 0, width: '100%', padding: "0px 2em" }}>
                                <p >Alumnium Leather Wallet</p>
                            </Box>

                        </Box>

                        {/* <Box style={{
              fontFamily: "'Manrope', serif", flex: 1, position: "relative", boxSizing: "border-box", borderRight: `1px solid ${gray.gray11}`, borderLeft: 'none',
              minWidth: 200,
              background: `linear-gradient(-85deg, ${slate.slate5} 30%, ${sand.sand4})`,
              maxWidth: "90vw"
            }}>
              <Box style={{ padding: '4%' }}>
                <AnimatedTitle css={{ fontSize: '3em', fontWeight:300 }} text='Made of premium aluminium, which is durable, light-weight, and rust-free. ' />
              </Box>
            </Box> */}

                    </Box>

                    <Box style={{
                        borderTop: `1px solid ${gray.gray11}`,
                        fontFamily: "'Manrope', serif", flex: 1, position: "relative", boxSizing: "border-box", borderRight: `1px solid ${gray.gray11}`, borderLeft: 'none',
                        minWidth: 200,

                        background: `linear-gradient(-85deg, ${slate.slate5} 30%, ${sand.sand4})`,
                    }}>
                        <video style={{ objectFit: "cover", width: "100%", height: "100%" }} autoPlay muted loop >
                            <source src="/video.m4v" type="video/mp4" />
                        </video>
                    </Box>

                </Box>

                <Box style={{
                    borderTop: `1px solid ${gray.gray11}`,
                    flex: 1,
                    fontFamily: "'Manrope', serif", position: "relative", boxSizing: "border-box", borderRight: `1px solid ${gray.gray11}`, borderLeft: 'none',
                    minWidth: 200,
                    background: `linear-gradient(85deg, ${slate.slate3} 20%, ${mauve.mauve5})`,
                    // maxWidth: "90vw"
                }}>
                    <Box style={{ padding: '4%' }}>
                        <AnimatedTitle css={{ fontSize: '2em', fontWeight: 300 }} text='Wallet cases are made of aluminium, which is durable, light-weight, and rust-free. Designed to be both minimal and functional.' />
                        <br />
                        <AnimatedTitle css={{ fontSize: '2em', fontWeight: 300 }} text="The case comes with an RFID blocking system which prevents your credit cards from being scanned by a device with RFID reader capability." />
                    </Box>
                </Box>





            </Box>




            <Box style={{ minHeight: "calc(100vh - 40px)", scrollSnapAlign: "start", display: "flex", flexDirection: "column" }}>
                <Box css={{ borderBottom: "1px solid #111", borderTop: "1px solid #111", }}>
                    <Marquee gradient={false} >
                        <h1 style={{ fontFamily: "'Manrope', serif", paddingLeft: 30, fontWeight: 300 }}>Redefined everyday essentials, streamline your daily life.</h1>
                        <h1 style={{ fontFamily: "'Manrope', serif", paddingLeft: 30, fontWeight: 300 }}>Made ready for people always on the go.</h1>
                    </Marquee>
                </Box>
                <Box style={{ flex: 1, }}>
                    <Box >

                    </Box>
                </Box>
                <Footer/>
            </Box>



        </Box>


    </Box>;
}


Page.getLayout = (page) => {
    return <PageLayout>
        {page}
    </PageLayout>
}