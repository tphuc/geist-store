import { gray, sand, slate } from "@radix-ui/colors"
import { styled } from "@stitches/react"
import { IconBrandInstagram } from "@tabler/icons"
import Box from "components/Box"
import StyledLink from "components/Link"


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

export default function Footer() {
    return <Box style={{ display: "flex", flexDirection: "row", borderTop: "1px solid #110", borderBottom: "1px solid #110", flexWrap: "wrap-reverse" }}>
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


            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 5, padding: "0% 4%", background: sand.sand2, borderTop: "1px solid #110", }}>

                <h1 style={{ fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0, fontWeight: 300 }}>GEIST</h1>
                <h3 style={{ fontFamily: "'Manrope', serif", color: slate.slate12, margin: 0, padding: 0, fontWeight: 300 }}>© 2022 </h3>
            </Box>

        </Box>
        <Box style={{ flex: 1, background: sand.sand1, minWidth: 300, padding: "2% 4%", fontFamily: "'Manrope', serif" }}>
            {/* <h1 style={{ fontWeight: 300, fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0 }}><i>Why us?</i></h1> */}
            <p style={{ padding: 0, margin: 0 }}>Men's accessories have come a long way in recent years. They are not just simply functional items - they've become style statements in their own right. <br />
                We provides an alternative to the traditional wallet.

                We believe in the power of simplicity and clarity, and we embody these values in every aspect of our work. Our goal is to create products that are not only well-crafted and functional, but also beautiful and timeless.
                That's why we're committed to using the finest materials and craftsmanship to create products that will last a lifetime.
            </p>
            <br/>
            <h1 style={{ fontWeight: 300, fontFamily: "'Lora', serif", fontSize: "2em", margin: 0, padding: 0 }}>Shop now</h1>


        </Box>

    </Box>
}