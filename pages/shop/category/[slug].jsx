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
    console.log(categories, products)


    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box css={{ position: "relative", }} >
            <div style={{
                display: 'flex', fontFamily: "'Manrope', serif", paddingLeft: "4%",
                position: "sticky",
                top: 40, zIndex: 10, background: sand.sand2, borderBottom: `1px solid ${sand.sand11}`,
                // paddingTop: '0.5em', paddingBottom: '0.5em', 
                flexDirection: 'row', alignItems: 'center',
            }}>
                <StyledLink href={{
                    pathname: '/shop/category/all'
                }} style={{
                    padding: "10px 20px",
                    borderLeft: "1px solid #111",

                    background: slug === 'all' ? sand.sand12 : sand.sand4,
                    color: slug ? 'white' : sand.sand12,
                    // borderRadius: 50
                }}>All</StyledLink>
                {/* {
                    categories?.map((item) => <StyledLink key={item?.id} href={{
                        pathname: `/shop/category/${item.slug}`
                    }} style={{
                        padding: "10px 20px",
                        borderLeft: "1px solid #111",
                        background: item?.slug == slug ? sand.sand12 : sand.sand4,
                        color: item?.slug == slug ? 'white' : sand.sand12,
                        // borderRadius: 50
                    }}>{item.title}</StyledLink>)
                } */}
            </div>
            <Box css={{ scrollPaddingTop: 200 }}>
                {/* <ImageSlides/> */}
                <Box style={{
                    display: "grid", gap: 1,
                    // background:sand.sand11, 
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 50vw))"
                }}>
                    {/* {
                        products?.map((item) => <div key={item.id} style={{ position: 'relative', boxShadow: "0px 0px 0px 1px #111", }}>
                            <div style={{ width: "100%", background: "rgba(200,200,200,0.2)", flexWrap: "wrap", display: "flex", justifyContent: "space-between", top: 0, left: 0, zIndex: 1, padding: 10, fontFamily: "'Manrope', serif" }}>
                                <span>{item.vi_title}</span>
                                <span>400.000$</span>
                            </div>
                            <ImageCarousel style={{ flex: 1, background: sand.sand3 }} />
                        </div>)
                    } */}



                    {/* <div style={{ position: 'relative', boxShadow: "0px 0px 0px 1px #111", }}>
                        <div style={{ width: "100%", background: "rgba(200,200,200,0.2)", flexWrap: "wrap", display: "flex", justifyContent: "space-between", top: 0, left: 0, zIndex: 1, padding: 10, fontFamily: "'Manrope', serif" }}>
                            <span>Alumnium Cards Holders Pop up</span>
                            <span>400.000$</span>
                        </div>
                        <ImageCarousel style={{ flex: 1, background: sand.sand3 }} />
                    </div>

                    <div style={{ position: 'relative', boxShadow: "0px 0px 0px 1px #111", }}>
                        <div style={{ width: "100%", background: "rgba(200,200,200,0.2)", flexWrap: "wrap", display: "flex", justifyContent: "space-between", top: 0, left: 0, zIndex: 1, padding: 10, fontFamily: "'Manrope', serif" }}>
                            <span>Alumnium Cards Holders Pop up</span>
                            <span>400.000$</span>
                        </div>
                        <ImageCarousel style={{ flex: 1, background: sand.sand3 }} />
                    </div> */}


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
    const paths = [...categories, { slug: "all" }].map((item) => ({
        params: { slug: item.slug },
    }))



    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const { slug } = params
    const categories = await axiosInstance.get(`/api/v1/categories`).then(res => res.data)
    if (slug == 'all') {
        const products = await axiosInstance.get(`/api/v1/products`).then(res => res.data)
        console.log( categories,products)
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
        const category = await axiosInstance.get(`/api/v1/categories/query?slug=${slug}`).then(res => res.data)
        let options = {
            params: {

            }
        }
        if (category?.id) {
            options.params.categoryId = category?.id
        }
        const products = await axiosInstance.get(`/api/v1/products`, options).then(res => res.data)
        console.log( categories,products)
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

}