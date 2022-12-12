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
    const { slug } = useRouter().query
    const { categories, products } = data;

    // console.log(products)




    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box css={{ position: "relative", }} >
            <div style={{
                display: 'flex', fontFamily: "'Manrope', serif",
                // paddingLeft: "4%",
                position: "sticky",
                top: 40, zIndex: 10, background: sand.sand3,
                borderBottom: `1px solid ${sand.sand11}`,
                // paddingTop: '0.5em', paddingBottom: '0.5em', 
                flexDirection: 'row', alignItems: 'center',
            }}>
                <StyledLink href={{
                    pathname: '/shop/category/all'
                }} style={{
                    padding: "8px 15px",
                    borderLeft: "1px solid #111",

                    background: slug === 'all' ? sand.sand12 : sand.sand3,
                    color: slug === 'all' ? 'white' : sand.sand12,
                    // borderRadius: 50
                }}>All</StyledLink>
                <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
                    {
                        categories?.map((item) => <StyledLink key={item?.id} href={{
                            pathname: `/shop/category/${item.slug}`
                        }} style={{
                            padding: "8px 15px",
                            whiteSpace: "nowrap",
                            borderRight: `1px solid ${sand.sand11}`,
                            background: item?.slug == slug ? sand.sand12 : sand.sand3,
                            color: item?.slug == slug ? 'white' : sand.sand12,
                            // borderRadius: 50
                        }}>{item.title}</StyledLink>)
                    }

                </div>
            </div>
            <Box style={{ position: "relative" }} css={{ scrollPaddingTop: 200 }}>
                {/* <ImageSlides/> */}
                <Box style={{
                    display: "grid", gap: 1,
                    background:sand.sand3, 
                    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 33vw))"
                }}>
                    {products?.map((item, id) => <div key={item?.id} style={{ position: 'relative', boxShadow: "0px 0px 0px 1px #111", }}>
                        <div style={{
                            // position:"sticky",
                            // top:78,
                            position:"relative",
                            borderBottom: `1px solid ${sand.sand12}`,
                            width: "100%",
                            background: sand.sand3,
                            flexWrap: "wrap", display: "flex", justifyContent: "space-between",
                            zIndex: 1, padding: 10, fontFamily: "'Manrope', serif"
                        }}>
                            <span>{item?.vi_title}</span>
                            <span>400.000$</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 'max(330px, 33vw)', minHeight:'max(330px, 33vw)', position: "relative" }}>
                            <Image alt='logo' fill src={item?.logo} />
                        </div>

                    </div>)}
                </Box>

            </Box>
        </Box>

        <Box style={{ display: "flex", flexDirection: "column" }}>
            <Footer />
        </Box>


    </Box>;
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
        paths.push({ params: { slug: item.slug }, locale: "en" })
        paths.push({ params: { slug: item.slug }, locale: "vi" })
    })





    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths: [
            ...paths,
            { params: { slug: 'all' }, locale: 'en' },
            { params: { slug: 'all' }, locale: 'vi' },
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
                revalidate: 10
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
                revalidate: 10
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
            revalidate: 10
        }
    }

}

