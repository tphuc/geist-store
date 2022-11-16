import Image from 'next/image';
import { amber, crimson, cyan, gray, grayA, indigo, mauve, orange, sand, sky, slate, teal, violet, yellow } from "@radix-ui/colors";
import StyledLink from "components/Link";
import Box from 'components/Box';
import ImageSlides from 'components/ImageSlides';
import * as Accordion from '@radix-ui/react-accordion';


import dynamic from 'next/dynamic';
import AnimatedTitle from 'components/AnimatedText';
import PageLayout from 'layout/Page';
import { IconBrandInstagram, IconChevronDown, IconShoppingCart } from '@tabler/icons';
import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import ImageCarousel from 'components/Carousel';
import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'components/Tabs';
import { useCart } from 'react-use-cart';
import { useShoppingCart } from 'use-shopping-cart';




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
    padding: "0px 10px",
    '&:hover': {
        cursor: "pointer"
    }
})




const AccordionRoot = styled(Accordion.Root)
const AccordionItem = styled(Accordion.Item)
const AccordionToggle = styled(Accordion.Trigger, {
    all: "unset",
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "space-between",
    width: '100%',
    padding: "0.5em 4%",
    cursor: "pointer", display: "flex",
    background: sand.sand3, zIndex: 1,
    fontWeight: 300,
    borderBottom: "1px solid #222",
})
const AccordionContent = styled(Accordion.Content, {
    borderBottom: "1px solid #222",

})



const StyledChevron = styled(IconChevronDown, {
    color: gray.gray12,
    transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    '[data-state=open] &': { transform: 'rotate(-180deg)' },
});


const AccordionTrigger = React.forwardRef(({ children, ...props }, forwardedRef) => (

    <AccordionToggle {...props} ref={forwardedRef}>
        {children}
        <StyledChevron stroke={1} aria-hidden />
    </AccordionToggle>

));




const data = {
    title: "Alumnium Wallet Card Holder",
    variants: [
        {
            id:1,
            color: "Black",
            url: "/wallet1.png",
            price: 149000,
            hex: "#111111",
        },
        {
            id:2,
            color: "Brown",
            price: 349000,
            url: "/lw_black.png",
            hex: "#361b1b"
        }
    ]
}


export default function Page() {


    const {
        addItem,
      } = useShoppingCart();
    const { category } = useRouter().query

    const [selected, setSelected] = useState(data.variants[0])

    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box css={{ position: "relative", minHeight: "calc(100vh - 40px)", display: "flex", flexDirection: "row", flexWrap: "wrap" }} >
            <Box css={{ background: sand.sand3, maxHeight: "calc(100vh - 40px)", flex: 2, borderRight: '1px solid #111', minWidth: 300, minHeight: '50vh' }}>
                <Image fill src={selected?.url} style={{ objectFit: 'contain' }} />
            </Box>
            <Box css={{ flex: 1, maxHeight: "calc(100vh - 40px)", overflow: "scroll", minWidth: 300, maxWidth: '100vw', display: "flex", flexDirection: "column", fontFamily: "'Manrope', serif", background: sand.sand1 }}>
                <Box css={{ position: "sticky", top: 0, background: sand.sand3, zIndex: 1, padding: "0% 4%", fontWeight: 300, borderBottom: "1px solid #222" }}>
                    <h3 style={{ fontWeight: 300, padding: 0 }}>{data.title}</h3>
                </Box>
                <Box css={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "stretch", padding: '4%', boxSizing: 'border-box', }}>

                    <h3 style={{ fontWeight: 300, padding: 0, margin: 0 }}>Price: {selected.price} </h3>
                    <br />
                    <p style={{ fontWeight: 300, padding: 0, margin: 0 }}>Color: {selected.color}</p>
                    <Box style={{ display: "flex", flexDirection: "row", gap: 5, marginTop: 5, }}>

                        {data?.variants?.map((item) => <Box
                            onClick={() => setSelected(item) }
                            style={{
                                width: 30, 
                                height: 30, 
                                borderRadius: 30, 
                                padding: 5, 
                                display: "flex", 
                                boxSizing: "border-box", 
                                padding: 2, 
                                border: selected.color == item.color ? "2px solid #111111" : "none"
                            }}>
                            <Box style={{ flex: 1, borderRadius: "50%", background: item.color }} />
                        </Box>)}

                    </Box>

                    <br />
                    <Button 
                    onClick={() => addItem({
                        name: data.title,
                        description: 'Yummy yellow fruit',
                        id: selected?.id,
                        price: 400,
                        currency: 'USD',
                        image: selected?.url
                      }, {
                        count: 1,
                        product_metadata: { color: selected.color },
                      })}
                    css={{ display: "flex", padding: "4px 20px", gap: 10, borderRadius: 8 }}>
                        Add to cart
                        <IconShoppingCart size={18} />
                    </Button>
                    <br />
                    <TabsRoot defaultValue='tab1'>
                        <TabsList aria-label="Manage your account">
                            <TabsTrigger value="tab1">Description</TabsTrigger>
                            <TabsTrigger value="tab2">Dimensions</TabsTrigger>
                            <TabsTrigger value="tab3">Material</TabsTrigger>
                        </TabsList>
                        <TabsContent css={{ marginTop: 20 }} value="tab1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </TabsContent>
                    </TabsRoot>
                </Box>


                {/* <AccordionRoot type="single" defaultValue="description">
                    <AccordionItem value='description'>
                        <AccordionTrigger>
                            Description
                        </AccordionTrigger>
                        <AccordionContent>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='Shipping'>
                        <AccordionTrigger >

                            Shipping

                        </AccordionTrigger>
                        <AccordionContent css={{borderBottom:'none'}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </AccordionContent>
                    </AccordionItem>
                </AccordionRoot> */}


            </Box>

        </Box>






        <Box style={{ display: "flex", flexDirection: "column", }}>

            <Box style={{ flex: 1, display: "flex", flexDirection: "row", borderTop: "1px solid #110", borderBottom: "1px solid #110", flexWrap: "wrap-reverse" }}>
                <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', background: sand.sand1, borderRight: "1px solid #110", minWidth: 300 }}>

                    <Box style={{ display: "flex", flex: 2, flexDirection: "column", padding: '4%', }}>
                        <h1 style={{ fontWeight: 300, fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0 }}><i>Follow us on</i></h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <IconBrandInstagram size={32} />
                            <StyledLink style={{ fontSize: "1.2rem", fontFamily: "'Manrope', serif", }} href='/'> @the.geist.store</StyledLink>
                        </div>
                        <br />
                        {/* <StyledLink style={{fontSize:"1.5rem", fontFamily: "'Manrope', serif",}} href='/'>Facebook</StyledLink> */}
                        <h1 style={{ fontWeight: 300, fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0 }}><i>Contact us</i></h1>
                        <StyledLink style={{ fontFamily: "'Manrope', serif", }} href='/'>hello@geist.store</StyledLink>
                        <StyledLink style={{ fontFamily: "'Manrope', serif", }} href='/'>+84 889 775268</StyledLink>
                        <br />
                        <h1 style={{ fontWeight: 300, fontFamily: "'Manrope', serif", fontSize: "1.5em", margin: 0, padding: 0 }}>Recieve exclusive offers</h1>
                        <p style={{ fontWeight: 300, fontFamily: "'Manrope', serif", margin: 0, padding: 0 }}>Join our email list</p>
                        <form>
                            <div>

                                <Input />
                                <Button>Subcribe</Button>

                            </div>
                        </form>
                        <br />
                        <StyledLink style={{ fontFamily: "'Manrope', serif", fontWeight: 500, fontSize: '1.2em' }} href='/'><strong>Products</strong></StyledLink>
                        <StyledLink style={{ fontFamily: "'Manrope', serif", fontWeight: 500, fontSize: '1.2em' }} href='/'><strong>Shipping & delivery</strong></StyledLink>
                    </Box>


                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 5, padding: "4%", background: sand.sand2, borderTop: "1px solid #110", }}>

                        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0, fontWeight: 300 }}>GEIST</h1>


                        <h3 style={{ fontFamily: "'Manrope', serif", color: slate.slate12, margin: 0, padding: 0, fontWeight: 300 }}>© 2022 </h3>
                    </Box>

                </Box>
                <Box style={{ flex: 1, background: sand.sand1, minWidth: 300, padding: "2%", fontFamily: "'Manrope', serif" }}>
                    <h1 style={{ fontWeight: 300, fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0 }}><i>Why us</i></h1>
                    <p >Men's accessories have come a long way in recent years. They are not just simply functional items - they've become style statements in their own right. <br />
                        We provides an alternative to the traditional wallet.

                        We believe in the power of simplicity and clarity, and we embody these values in every aspect of our work. Our goal is to create products that are not only well-crafted and functional, but also beautiful and timeless.
                        That's why we're committed to using the finest materials and craftsmanship to create products that will last a lifetime.
                    </p>
                </Box>
            </Box>
        </Box>


    </Box>;
}


Page.getLayout = (page) => {
    return <PageLayout>
        {page}
    </PageLayout>
}