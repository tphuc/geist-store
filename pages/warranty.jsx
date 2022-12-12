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

        <Box style={{ display: "flex", flexWrap: "wrap" }}>
            {/* <Box style={{ display: "flex", flex: 1, minHeight: "calc(50vw + 100px)" }}>
                <Image fill style={{ objectFit: 'cover' }} src={'/about-us.jpeg'} />
                <AnimatedTitle style={{ fontSize: "calc(10vw + 16px)", position: "absolute", bottom: '4%', left: '4%', color: gray.gray1 }} text={'ABOUT US'} ></AnimatedTitle>

            </Box> */}
            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: "2% 4%", gap: 5, fontFamily: "'Manrope', serif" }}>
                <StyledLink style={{ color: router.pathname == '/shipping' ? sand.sand12 : sand.sand11 }} href='/shipping'> Shipping</StyledLink>
                <StyledLink style={{ color: router.pathname == '/warranty' ? sand.sand12 : sand.sand11 }} href='/warranty'> Warranty & Returns</StyledLink>
                <StyledLink style={{ color: router.pathname == '/privacy' ? sand.sand12 : sand.sand11 }} href='/privacy'>Privacy</StyledLink>
                <StyledLink style={{ color: router.pathname == '/returns' ? sand.sand12 : sand.sand11 }} href='/returns'> Contact form</StyledLink>
            </Box>

            <Box style={{ borderTop: "1px solid #222", gap: 10, padding: "1em", minHeight: "95vh", flex: 5, minWidth: 400 }}>
                <Box style={{ display: 'flex', flexDirection: 'column', fontFamily: "'Manrope', serif", fontWeight: 300 }}>

                    <h2>Warranty & Returns policy</h2>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: `
                    
                            We take quality control very seriously and strive to provide the best products, however, rarely there may be a manufacturing defect. In this case, we are happy to assist you with a free of cost replacement shipped to you at our expense!
                            <br/>
                            <br/>
                            All our products come with a one year warranty period from the date of delivery. This covers any manufacturing defects. Our warranty does not cover product damages that may have resulted from normal wear and tear, accidental damage caused by the user, faults as a result of willful or negligent operation, or any other improper handling. Proof of defect (photos or video, depending on the defect) is mandatory and will be requested by our team. A refund for your defective item can be given if requested within 14 days of receiving your product. After this period, we will offer an exchange or store credit equivalent to the value of your product.
                            <br/><br/>
                            If you would like to claim the warranty on your defective item, please email our team at hello@geiszt.com and we can assist you right away.
                            <br/><br/>
                            <strong>How long do I have to make a return? Do I need to pay the return shipping fee?</strong>
                            <br/> <br/>
                            We will accept returns within 30 days of receipt for most items in new condition. You are responsible for shipping the return at your own cost.
                            <br/>
                            If you did not receive the item, but you want to make a return, there are a few things to consider:
                            <br/>
                            1. If the items have not shipped yet, we will return the full money to you, except for customers from the US or EU. In that case, a cancellation fee of $2 will be charged.
                            <br/>
                            2. If the items have shipped, only 30% of the product fee (not including shipping cost) will be refunded, and there is no need to send the item back after receipt.
                            <br/>
                            <br/>
                            <strong>Can I still return items if they are worn or damaged?</strong>
                            <br/>
                            1. Items must be unused and in the same condition that you received them in order to be eligible for a return. The item must also be in the original packaging.
                            <br/>
                            2. Items marked non-returnable and free gifts cannot be returned.
                            <br/>
                            3. To complete your return, we require a receipt or proof of purchase and a video of the item so that we can check if it is not damaged/ defective.
                            
                        `
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




