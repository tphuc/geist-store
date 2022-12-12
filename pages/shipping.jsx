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
import { useRouter } from 'next/router';
import ImageCarousel from 'components/Carousel';
import Footer from 'components/Footer';







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


export default function Page({ data }) {
    const router = useRouter()




    return <Box style={{ position: "relative", fontFamily: "'Manrope', serif", }}>

        <Box style={{ display: "flex", flexWrap:"wrap" }}>
            {/* <Box style={{ display: "flex", flex: 1, minHeight: "calc(50vw + 100px)" }}>
                <Image fill style={{ objectFit: 'cover' }} src={'/about-us.jpeg'} />
                <AnimatedTitle style={{ fontSize: "calc(10vw + 16px)", position: "absolute", bottom: '4%', left: '4%', color: gray.gray1 }} text={'ABOUT US'} ></AnimatedTitle>

            </Box> */}
            <Box style={{flex:1, display:'flex', flexDirection:'column', padding:"2% 4%", gap:5, fontFamily:"'Manrope', serif"}}>
                <StyledLink style={{color: router.pathname == '/shipping' ? sand.sand12 : sand.sand11 }} href='/shipping'> Shipping</StyledLink>
                <StyledLink style={{color: router.pathname == '/warranty' ? sand.sand12 : sand.sand11 }} href='/warranty'> Warranty & Returns</StyledLink>
                <StyledLink style={{color: router.pathname == '/privacy' ? sand.sand12 : sand.sand11 }} href='/privacy'>Privacy</StyledLink>
                <StyledLink style={{color: router.pathname == '/returns' ? sand.sand12 : sand.sand11 }} href='/returns'> Contact form</StyledLink>
            </Box>

            <Box style={{borderTop: "1px solid #222", gap: 10, padding: "2% 4%", minHeight:"95vh", flex:5, minWidth:400 }}>
                <Box style={{ display: 'flex', flexDirection: 'column', fontFamily: "'Manrope', serif", fontWeight:300 }}>

                    <h2>Shipping policy</h2>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: `
                    
                        <strong>Global shipping</strong>
                        <br/>
                        We are able to ship to most countries worldwide.
                        <br/>
                        <br/>
                        <strong>Shipping Fee</strong>
                        <br/>
                        Shipping fee will be calculated at checkout page.  We offer free shipping for orders over $55 USD.
                        <br/>
                        <br/>
                        <strong>Shipping Time</strong>
                        <br/>
                        We will make every effort to deliver your package as quickly as possible. <br/> Delivery time usually takes between 3-25 business days.  For an estimated arrival time, please check the official website/notice of the logistics company. We will make every effort to deliver your package as soon as possible. 
                        However, additional time may be required due to invalid addresses and custom clearance issues. 
                        If your package does not arrive within 3 months of shipment, please contact us at <u>hello@geiszt.com</u>. Note that overdue requests may not be accepted.
                        <br/>
                        <br/>

                        <strong>Please note</strong>
                        <br/>
                        We reserve the right to vary shipping methods to certain destinations and may alter the shipping method from that stated on your order. In addition, when the order has arrived in the country of destination, imported duties and tax may be incurred, which are the responsibility of the recipient. If these duties and taxes are not paid within 3 weeks, the parcel will return to us, and the order will not be refunded - it will be used to offset import duties and taxes. Finally, if our shipping company cannot match the address, we will send an email to you to confirm your address after the goods are being ordered. If no reply is received within 24 hours, we cannot guarantee the delivery time.`
                        }}
                    />
                </Box>

              
            </Box>
        </Box>
        <Footer />


    </Box>;
}





Page.getLayout = (page) => {
    return <PageLayout>
        {page}
    </PageLayout>
}




