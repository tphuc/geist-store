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
    const { slug } = useRouter().query




    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>







        <Box style={{ display: "flex", flexDirection: "column", }}>
            <Box style={{ display: "flex", flex: 1, minHeight: "calc(50vw + 100px)" }}>
                <Image fill style={{ objectFit: 'cover' }} src={'/about-us.jpeg'} />
                <AnimatedTitle style={{ fontSize: "calc(10vw + 16px)", position: "absolute", bottom: '4%', left: '4%', color: gray.gray1 }} text={'ABOUT US'} ></AnimatedTitle>

            </Box>
            <Box style={{ display:'flex', flexDirection:'column', borderTop:"1px solid #222", gap:10, padding: "4%", fontFamily: "'Manrope', serif" }}>
                <span>
                    {`
                        Men's accessories have come a long way in recent years, they are not just simply functional items, they've become style statements in their own right. Our products resemble the indomitable spirit of a modern man. 
                    `}
                </span>
                <span>
                    {`
                       Our team is dedicated to creating wallets with unique styles, lush textures and fine detailing, while still offering superb functionality. We offer a wide variety of men's wallet, crafted with the finest leather, that are designed to suit a range of tastes and budgets. 
                    `}
                </span>
                <span>
                    {`
                        We believe in the power of simplicity and clarity, and we embody these values in every aspect of our work. Our goal is to create products that are not only well-crafted and functional, but also beautiful and timeless.

                    `}
                </span>
            </Box>

            <Footer />
        </Box>


    </Box>;
}





Page.getLayout = (page) => {
    return <PageLayout>
        {page}
    </PageLayout>
}




