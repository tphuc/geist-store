import Image from 'next/image';
import { amber, crimson, cyan, gray, grayA, indigo, mauve, orange, sand, sky, slate, teal, violet, yellow } from "@radix-ui/colors";
import StyledLink from "components/Link";
import Box from 'components/Box';
import ImageSlides from 'components/ImageSlides';
import * as Accordion from '@radix-ui/react-accordion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


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
import { baseURL } from 'fetch.config';
import Footer from 'components/Footer';
import { useShippingCountry } from 'hooks/useShippingCountry';




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







// const data = {
//     title: "Alumnium Wallet Card Holder",
//     variants: [
//         {
//             id:1,
//             color: "Black",
//             url: "/wallet1.png",
//             price: 149000,
//             hex: "#111111",
//         },
//         {
//             id:2,
//             color: "Brown",
//             price: 349000,
//             url: "/lw_black.png",
//             hex: "#361b1b"
//         }
//     ]
// }


export default function Page({ data }) {


    const {
        addItem,
    } = useShoppingCart();
    const { locale } = useRouter()



    const { countryCode } = useShippingCountry();

    const [selected, setSelected] = useState(data.variants[0])


    const priceNumber = React.useMemo(() => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)


        if (priceByCountry)
            return priceByCountry.value
        else {
            return data?.defaultPrice
        }

    }, [countryCode])

    const currentCurrencyCode = React.useMemo(() => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)


        if (priceByCountry)
            return priceByCountry.currencyCode
        else {
            return data?.defaultCurrencyCode
        }

    }, [countryCode])



    const getSalePrice = React.useMemo(() => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)

        if (priceByCountry)
            return priceByCountry.saleValue
        else {
            return data?.saleValue
        }


    }, [countryCode])



    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }} css={{
        '&::-webkit-scrollbar': {
            width: 0,
            height: 0,
        },

        '&::-webkit-scrollbar-thumb': {
            background: sand.sand10,
            borderRadius: 0
        },
        '&::-webkit-scrollbar-track': {
            background: sand.sand7
        }
    }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box style={{ position: "relative", display: "flex", flexDirection: "row", flexWrap: "wrap" }} >

            <Box style={{ background: sand.sand3, flex: 4, minWidth: 340, borderRight: '1px solid #111', }}>
                <div style={{ position: "relative", maxHeight: "calc(100vh - 40px)", minHeight: '50vh' }}>
                    <Image fill src={selected?.imageUrl} style={{ objectFit: 'contain' }} />
                </div>
                <Box css={{
                    '@media screen and (max-width: 600px)': {
                        display: "none"
                    }
                }} >

                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 780: 1, 900: 2, 1200: 2 }}
                    >
                        <Masonry gutter='1px' style={{ background: "#333", borderTop: `1px solid ${sand.sand11}` }} >
                            {
                                data?.images?.map((item, id) => <Image
                                    key={id}
                                    alt='Mountains'
                                    src={item.url}
                                    width={500}
                                    height={500}
                                    style={{
                                        objectFit: "contain",
                                        width: '100%',
                                        height: 'auto',

                                    }}
                                    sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                                />)
                            }
                        </Masonry>

                    </ResponsiveMasonry>
                    {/* <Box
                        style={{ display: "grid", width: "100%", gridTemplateColumns: "1fr", gridTemplateRows: "1fr" }}>
                        
                    </Box> */}
                </Box>
            </Box>
            <Box style={{ flex: 3, position: "sticky", minWidth: 340, top: 0, maxHeight: "100vh", overflow: "scroll", minWidth: 300, maxWidth: '100vw', display: "flex", flexDirection: "column", fontFamily: "'Manrope', serif", background: sand.sand1 }}
                css={{
                    '@media screen and (max-width: 600px)': {
                        maxHeight: "200vh !important"
                    }
                }} >
                <Box style={{ position: "relative", top: 0, background: sand.sand3, zIndex: 1, padding: "1% 4%", fontWeight: 300, borderBottom: "1px solid #222" }}>
                    <h3 style={{ fontSize: "1.3em", fontWeight: 300, padding: 0, marginTop: 5, marginBottom: 5 }}>{data.en_title} </h3>
                    <span style={{ color: sand.sand11, fontWeight: 500, fontSize: "0.8em", padding: 0, marginBottom: 10 }}>No. {data?.code}</span>
                </Box>
                <Box css={{ position: 'relative', flex: 1, display: "flex", flexDirection: "column", justifyContent: "stretch", padding: '4%', boxSizing: 'border-box', }}>

                    {getSalePrice && <h3 style={{ fontSize: "1em", color: sand.sand11, fontWeight: 300, textDecoration: "line-through", padding: 0, margin: 0 }}>{new Intl.NumberFormat(locale, { style: 'currency', currency: currentCurrencyCode }).format(getSalePrice)} </h3>}
                    <span > Price: { new Intl.NumberFormat(locale, { style: 'currency', currency: currentCurrencyCode }).format(priceNumber) }</span>
                    <br />
                    <span style={{ fontWeight: 300, padding: 0, margin: 0 }}>Variant: {selected.title}</span>

                    <Box style={{ display: "flex", flexDirection: "row", gap: 5, marginTop: 5, }} >
                        {data?.variants?.map((item, id) => <Box
                            key={id}
                            onClick={() => setSelected(item)}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                padding: 5,
                                display: "flex",
                                boxSizing: "border-box",
                                padding: 2,
                                border: selected.id == item.id ? "2px solid #111111" : "none"
                            }}>
                            <Box style={{ flex: 1, borderRadius: "50%", background: item.metadata?.color }} />
                        </Box>)}

                    </Box>

                    <br />
                    <Button
                        onClick={() => {

                            addItem({
                            name: locale === 'vi_VN' ? data?.vi_title : data?.en_title,
                            // description: 'Yummy yellow fruit',
                            id: `${data?.id}_${selected?.id}`,
                            price: priceNumber,
                            currency: currentCurrencyCode,
                            image: selected?.imageUrl
                        }, {
                            count: 1,
                            price_metadata: data.prices,
                            product_metadata: {
                                ...data,
                                selectedVariant: selected
                            },
                        }) 
                    }}
                        css={{ display: "flex", padding: "4px 20px", gap: 10, borderRadius: 8 }}>
                        Add to cart
                        <IconShoppingCart size={18} />
                    </Button>
                    <br />
                    <TabsRoot defaultValue='tab1'>
                        <TabsList aria-label="Manage your account">
                            <TabsTrigger value="tab1">Description</TabsTrigger>
                            <TabsTrigger value="tab3">Shipping</TabsTrigger>
                            {/* <TabsTrigger value="tab4">Reviews</TabsTrigger> */}
                        </TabsList>
                        <TabsContent css={{ marginTop: 20, minHeight:300 }} value="tab1">
                            <div style={{ fontSize: '0.95em', color: sand.sand11, fontWeight: 300 }} dangerouslySetInnerHTML={{ __html: locale == 'vi-VN' ? data?.vi_description : data?.en_description }}>

                            </div>
                        </TabsContent>
                        <TabsContent css={{ marginTop: 20, minHeight:300 }} value="tab3">
                            <div style={{ color: sand.sand11, fontSize: '0.95em', fontWeight: 300 }} >
                                We offer regular or express shipping to most addresses worldwide. Shipping cost and delivery times are calculated at checkout.
                                <br />Note: P.O. box deliveries will automatically be sent by regular shipping.
                            </div>
                        </TabsContent>
                    </TabsRoot>
                </Box>





            </Box>

        </Box>

        <Box css={{
            display: "none",
            '@media screen and (max-width: 600px)': {
                display: "block"
            }
        }} >

            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 780: 1, 900: 2, 1200: 2 }}
            >
                <Masonry gutter='1px' style={{ background: "#333", borderTop: `1px solid #333` }} >
                    {
                        data?.images?.map((item, id) => <Image
                            key={id}
                            alt='Mountains'
                            src={item.url}
                            width={500}
                            height={500}
                            style={{
                                objectFit: "contain",
                                width: '100%',
                                height: 'auto',

                            }}
                            sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                        />)
                    }
                </Masonry>

            </ResponsiveMasonry>
            {/* <Box
                        style={{ display: "grid", width: "100%", gridTemplateColumns: "1fr", gridTemplateRows: "1fr" }}>
                        {
                            data?.images?.map((item) => <Image
                                alt='Mountains'
                                src={item.url}
                                width={500}
                                height={500}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderTop: `1px solid #333`,
                                }}
                                sizes="(max-width: 768px) 100vw,
                                    (max-width: 1200px) 50vw,
                                    33vw"
                            />)
                        }
                    </Box> */}
        </Box>

        <Footer />






        {/* <Box style={{ display: "flex", flexDirection: "column", }}>

            <Box style={{ flex: 1, display: "flex", flexDirection: "row", borderTop: "1px solid #110", borderBottom: "1px solid #110", flexWrap: "wrap-reverse" }}>
                <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', background: sand.sand1, borderRight: "1px solid #110", minWidth: 300 }}>

                    <Box style={{ display: "flex", flex: 2, flexDirection: "column", padding: '4%', }}>
                        <h1 style={{ fontWeight: 300, fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0 }}><i>Follow us on</i></h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <IconBrandInstagram size={32} />
                            <StyledLink style={{ fontSize: "1.2rem", fontFamily: "'Manrope', serif", }} href='/'> @the.geist.store</StyledLink>
                        </div>
                        <br />
                       
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
                    <p >{`Men's accessories have come a long way in recent years. They are not just simply functional items - they've become style statements in their own right. <br />
                        We provides an alternative to the traditional wallet.`}

                        {`We believe in the power of simplicity and clarity, and we embody these values in every aspect of our work. Our goal is to create products that are not only well-crafted and functional, but also beautiful and timeless.
                        That's why we're committed to using the finest materials and craftsmanship to create products that will last a lifetime.`}
                    </p>
                </Box>
            </Box>
        </Box> */}


    </Box>;
}


Page.getLayout = (page) => {
    return <PageLayout>
        {page}
    </PageLayout>
}




export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const products = await fetch(`${baseURL}/api/v1/products`).then(res => res.json())

    // Get the paths we want to pre-render based on posts
    let paths = [];

    products.forEach((item, i) => {
        paths.push({ params: { slug: item.slug }, locale: "en-US" })
        paths.push({ params: { slug: item.slug }, locale: "vi-VN" })
    })


    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths, fallback: false
    }
}



export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    try {
        const { slug } = params
        let product = await fetch(`${baseURL}/api/v1/products/${slug}`).then(res => res.json())
        return {
            props: {
                data: product
            },
            revalidate: 60
        }

    } catch (e) {
        return {
            props: {
                data: null
            },
            revalidate: 60
        }
    }

}
