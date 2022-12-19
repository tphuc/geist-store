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
import { axiosInstance } from 'axios.config';
import { baseURL } from 'fetch.config';
import React from 'react';




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


export default function Page({ data }) {
    const router = useRouter()
    const { locale } = router;
    const { slug } = router.query

    const { categories, products } = data;

    // console.log(products)




    return <>

        <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

            {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
            <Box css={{ position: "relative", }} >
                <div style={{
                    position: "relative",
                    display: 'flex', fontFamily: "'Manrope', serif",
                    // paddingLeft: "4%",

                    zIndex: 10, background: sand.sand4,
                    padding: 5,


                    borderBottom: `1px solid ${sand.sand11}`,
                    // paddingTop: '0.5em', paddingBottom: '0.5em', 
                    flexDirection: 'row', alignItems: 'center',
                    gap: "0.5em",

                }}>
                    <StyledLink href={{
                        pathname: '/shop/category/all'
                    }} style={{
                        padding: "5px 15px",
                        // borderLeft: "1px solid #111",

                        border: slug == 'all' ? `1px solid #333` : `none`,
                        borderRadius: 20
                        // borderRadius: 50
                    }}>All</StyledLink>
                    <div style={{ display: "flex", gap: '0.5em' }}>
                        {
                            categories?.map((item) => <StyledLink key={item?.id} href={{
                                pathname: `/shop/category/${item.slug}`
                            }} style={{
                                padding: "5px 10px",
                                whiteSpace: "nowrap",

                                // background: item?.slug == slug ? sand.sand12 : sand.sand3,
                                // color: item?.slug == slug ? 'white' : sand.sand12,

                                border: item?.slug == slug ? `1px solid #333` : `none`,
                                borderRadius: 20

                                // borderRadius: 50
                            }}>{item.title}</StyledLink>)
                        }

                    </div>
                </div>
                <Box style={{ position: "relative" }} css={{ scrollPaddingTop: 200 }}>
                    {/* <ImageSlides/> */}
                    <Box style={{
                        display: "flex", gap: 1,
                        width: "100vw",
                        flexWrap: "wrap",
                        background: sand.sand4,



                    }} >
                        {products?.map((item, id) => <Box key={item?.id} style={{ boxSizing: "border-box", position: 'relative', width: 'auto', background: "black",  boxShadow: `0px 0px 0px 1px ${sand.sand11}`, }}

                        >

                            <div style={{
                                // position:"sticky",
                                // top:78,
                                cursor: 'pointer',
                                position: "relative",
                                borderBottom: `1px solid ${sand.sand11}`,
                                width: "100%",

                                background: sand.sand4,
                                flexWrap: "wrap", display: "flex", justifyContent: "space-between",
                                zIndex: 1, padding: 10, fontFamily: "'Manrope', serif"
                            }}>
                                <span>{locale == 'en-US' ? item?.en_title : item?.vi_title}</span>
                                <span>400.000$</span>
                            </div>
                            <StyledLink href={`/product/${item.slug}`}>
                            <Box style={{ position: "relative", boxSizing: "border-box" }} css={{

                                    '@media screen and (max-width: 600px)': {
                                        width: "100vw",
                                        height: "100vw"
                                    },

                                    '@media screen and (min-width: 768px)': {
                                        width: "calc(50vw - 1px)",
                                        height: "50vw"
                                    },

                                    '@media screen and (min-width: 1200px)': {
                                        width: "33vw",
                                        height: "33vw"
                                    },

                                    '& > .hoverfade': {

                                        transition: "0.4s ease-in-out opacity"
                                    },
                                    '&:hover > .hoverfade': {
                                        opacity: 0,
                                        transition: "0.4s ease-in-out opacity"
                                    }
                                }
                            } >




                                    <Image

                                        alt='img'
                                        src={item?.images[1]?.url}
                                        width={320}
                                        height={320}
                                        style={{
                                            zIndex: 10,
                                            objectFit: "cover",
                                            width: '100%',
                                            height: 'auto',

                                        }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <Image
                                        className='hoverfade'
                                        alt='img'
                                        src={item?.images[0]?.url}
                                        fill
                                    />
                                </Box>

                            </StyledLink>

                        </Box>)}
                </Box>

            </Box>
        </Box>

        <Box style={{ display: "flex", flexDirection: "column" }}>
            <Footer />
        </Box>


    </Box>

    </>;
}





Page.getLayout = (page) => {
    return <PageLayout>
        {page}
    </PageLayout>
}




export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const categories = await axiosInstance.get('/api/v1/categories').then(res => res.data)

    // Get the paths we want to pre-render based on posts
    let paths = [];

    categories.forEach((item, i) => {
        paths.push({ params: { slug: item.slug }, locale: "en-US" })
        paths.push({ params: { slug: item.slug }, locale: "vi-VN" })
    })


    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths: [
            ...paths,
            { params: { slug: 'all' }, locale: 'en-US' },
            { params: { slug: 'all' }, locale: 'vi-VN' },
        ], fallback: false
    }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    try {
        const { slug } = params
        const categories = await fetch(`${baseURL}/api/v1/categories`).then(res => res.json())
        if (slug == 'all') {
            const products = await fetch(`${baseURL}/api/v1/products`).then(res => res.json())


            return {
                props: {
                    slug,
                    data: {
                        categories,
                        products
                    }
                },
                revalidate: 60
            }
        }
        else {
            const category = await fetch(`${baseURL}/api/v1/categories/query?slug=${slug}`).then(res => res.json())
            const products = await fetch(`${baseURL}/api/v1/products?categoryId=${category.id}`).then(res => res.json())

            return {
                props: {
                    slug,
                    data: {
                        categories,
                        products
                    }
                },
                revalidate: 60
            }
        }
    } catch (e) {

        return {
            props: {
                slug,
                data: {
                    categories,
                    products: []
                }
            },
            revalidate: 60
        }
    }

}

