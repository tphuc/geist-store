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
import useTrans from 'hooks/useTrans';


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


const Button = styled('a', {
    all: "unset",
    outline: 'none',
    background: slate.slate1,
    color: slate.slate12,
    borderRadius:30,
 
    height: 40,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Manrope', serif",
    padding: "0px 20px",
    border:"1px solid #333",
    transition:"0.4s ease transform",
    '&:hover': {
        transform:"scale(1.05)",
        transition:"0.4s ease transform"
    }
})



export default function Page(props) {
    const trans = useTrans();


    return <Box style={{ position: "relative", fontFamily: "'Manrope', serif",  }}>

      
        <Box
            css={{
                position: 'relative',
                // flexDirection: "column",
                // display: "flex", flexWrap: "wrap", 
                width: "100vw",
                overflowX:'hidden',
                height: "calc(100vh - 40px)",
                overflowY: "auto", scrollSnapType: "y mandatory",
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
                userSelect:'none', msUserSelect:'none', WebkitUserSelect:'none', 
                scrollSnapAlign: "start",
                position: "relative", backgroundColor: slate.slate3, flex: 3, minWidth: 320,
                backgroundImage: "url('/home.jpeg')",
                fontFamily:"'Manrope', serif",
                height: "calc(100vh - 40px)", width: "100vw", backgroundSize: "cover", backgroundPosition: "46% 50%", backgroundRepeat: "no-repeat", objectFit: 'contain', color: "white"
            }}> 
                    <Box style={{ fontSize: "calc(3vw + 0.5vh + 10px)", paddingTop:"calc(20vh)", left: '4vw', color: gray.gray1 }}>
                       
                        <AnimatedTitle style={{margin:0, maxWidth:"100vw", overflow:"hidden", }}  text={trans.home.welcome} ></AnimatedTitle>
                        <StyledLink href='/shop/category/all' as={Button}  style={{fontSize:"medium", marginTop:"2vh"}}>Shop all</StyledLink>
                       
                    </Box>
                   
                   
            </Box>
            {/* <Box>
      
      </Box> */}
            <Box style={{
                scrollSnapAlign: "start",
                userSelect:'none', msUserSelect:'none', WebkitUserSelect:'none', 
                display: "flex", flexDirection: "row", maxWidth: '100vw', flexWrap: "wrap"
            }}>

                <Box style={{ writingMode: "vertical-rl", display: "flex", minWidth: 50, borderTop: `1px solid ${gray.gray12}`, background: mauve.mauve3, borderRight: `1px solid ${gray.gray12}`, alignItems: "center", padding: "4em 0.5em", textOrientation: "mixed", fontFamily: "'Manrope', serif" }}>
                    <h4 style={{ margin: 0, padding: 0, fontWeight: 300, }}>{trans.home.ourfav}</h4>
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
                        <AnimatedTitle css={{ fontSize: '2em', fontWeight: 300 }} text={trans.home.introduction._1} />
                        <br />
                        <AnimatedTitle css={{ fontSize: '2em', fontWeight: 300 }} text={trans.home.introduction._2} />
                        <AnimatedTitle css={{ fontSize: '2em', fontWeight: 300 }} text={trans.home.introduction._3} />
                    </Box>
                </Box>
            </Box>


            <Box style={{ minHeight: "calc(100vh - 40px)", scrollSnapAlign: "start", display: "flex", flexDirection: "column" }}>
                <Box css={{ borderBottom: "1px solid #111", borderTop: "1px solid #111", }}>
                    <Marquee gradient={false} >
                        <h1 style={{ fontFamily: "'Manrope', serif", paddingLeft: 30, fontWeight: 300 }}>{trans.home.marquee._1}</h1>
                        <h1 style={{ fontFamily: "'Manrope', serif", paddingLeft: 30, fontWeight: 300 }}>{trans.home.marquee._2}</h1>
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