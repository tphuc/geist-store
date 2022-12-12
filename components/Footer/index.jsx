import { gray, mauve, mauveA, mauveDark, mauveDarkA, sand, slate } from "@radix-ui/colors"
import { styled } from "@stitches/react"
import { IconBrandFacebook, IconBrandInstagram, IconMail, IconPhone } from "@tabler/icons"
import Box from "components/Box"
import StyledLink from "components/Link"
import useTrans from "hooks/useTrans"


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
    const t = useTrans()
    return <Box style={{ display: "flex", flexDirection: "row", borderTop: `1px solid ${sand.sand11}`, borderBottom: "1px solid #110", flexWrap: "wrap-reverse", color:mauveDark.mauve1 }}>
        <Box style={{ flex: 1, padding:"2% 4%", background: gray.gray3, borderRight: "1px solid #110", minWidth: 300 }}>
            <Box style={{

                display: "grid",
                // background:sand.sand11, 
                gap: '1em',
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))"
            }}>


                <Box style={{ display: "inline-flex",fontFamily: "'Manrope', serif",  flexDirection: "column", gap:5, padding: "4%" }}>
                    <h3 style={{  margin: 0, padding: 0,  color:mauveA.mauveA12 }}>{t.footer.contact}</h3>
                    <StyledLink style={{ fontFamily: "'Manrope', serif", display:"flex", alignItems:"center", gap:5 }} href='/'> <IconMail size={16}/> hello@geiszt.com</StyledLink>
                    <StyledLink style={{ fontFamily: "'Manrope', serif", display:"flex", alignItems:"center", gap:5 }} href='/'> <IconPhone size={16}/> +84 (0)889 775268</StyledLink>
                    <br />
                </Box>
                <Box style={{ display: "inline-flex", fontFamily: "'Manrope', serif", flexDirection: "column",  padding: "4%" }}>
                    <h3 style={{  margin: 0, padding: 0, color:mauveA.mauveA12 }}>{t.footer.follow}</h3>
                    <div style={{ display: 'flex',flexDirection:"column", }}>
                    
                        <StyledLink style={{  fontFamily: "'Manrope', serif", display:"flex", alignItems:"center", gap:5  }} href='/'> <IconBrandInstagram stroke={1.2} size={26} /> Instagram</StyledLink>
                        <StyledLink style={{  fontFamily: "'Manrope', serif", display:"flex", alignItems:"center", gap:5  }} href='/'>    <IconBrandFacebook stroke={1.2} size={24} /> Facebook</StyledLink>
                    </div>
                   
                </Box>

                <Box style={{ display: "inline-flex",fontFamily: "'Manrope', serif",  flexDirection: "column", padding: "4%" }}>

                    
                <h3 style={{  margin: 0, padding: 0, color:mauveA.mauveA12 }}>{t.footer.support}</h3>
                    <StyledLink style={{ fontFamily: "'Manrope', serif", }} href='/about-us'>{t.footer.aboutus}</StyledLink>
                    <StyledLink style={{ fontFamily: "'Manrope', serif", }} href='/shipping'>{t.footer.shipping_return}</StyledLink>
                    <StyledLink style={{ fontFamily: "'Manrope', serif", }} href='/'>{t.footer.privacy}</StyledLink>
                    <br />
                    <br/>
                </Box>

            </Box>






        </Box>



        <Box style={{ writingMode: "vertical-rl", display: "flex", minWidth: 40, alignItems: "center", padding: "2em 0.3em", textOrientation: "mixed", fontFamily: "'Manrope', serif" }}>

            <h1 style={{ fontFamily: "'Manrope', serif", fontSize: "1em", margin: 0, padding: 0, fontWeight: 500 }}>GEISZT ©2022</h1>

        </Box>


    </Box>
}