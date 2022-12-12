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




    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

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

            <Box style={{borderTop: "1px solid #222", gap: 10, padding: "1em", minHeight:"95vh", flex:5, minWidth:400 }}>
                <Box style={{ display: 'flex', flexDirection: 'column', fontFamily: "'Manrope', serif", fontWeight:300 }}>

                    <h2>Privacy policy</h2>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: `
                    
                            We want to ensure your data is protected, so here’s how we collect, use, and share your information.

                            <br/>
                            <br/>
                            <strong>Information we collect</strong>
                            <br/>
                            We automatically collect certain information about your device when you use our Site, such as your web browser, IP address, time zone, and cookies. Furthermore, when you navigate the Site, we gather information about the particular web pages and goods you visit, the websites that sent you to us, and how you interact with the site
                            <br/>
                            <br/>
                            We acquire device Information through the use of the following technologies: 
                            <br/>
                            - "Cookies" are data files that are stored on your device or computer and frequently contain an anonymous unique identification. Visit http://www.allaboutcookies.org for additional information about cookies and how to disable them. 
                            <br/>
                            - "Log files" track Site activity and collect information such as your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps. 
                            <br/>
                            - Web beacons, tags, and pixels are electronic files that capture information about how you interact with the Site. 
                            <br/>
                            Furthermore, when you make or attempt to make a purchase on the site, we collect certain information from you, such as your name, billing address, shipping address, and payment information (including credit card numbers, email address, and phone number).
                            <br/>
                            <br/>
                            <strong>What do we do with your personal information?</strong>
                            <br/>
                            We use the order Information collected to complete orders placed on the site (including processing payments, arranging for shipping, and providing invoices and confirmations). Additionally, we use this Order Information to:
                            <br/>
                            - Maintain communication with you;
                            <br/>
                            - Screen our orders for potential risk and fraud;
                            <br/>
                            - When in line with your preferences, provide you with information or advertising related to our products and services.
                            
                            We use the device Information to help us detect potential risk and fraud (especially your IP address), and also to improve and optimize the Site (for example, by generating analytics about how customers browse and interact with the Site, and to measure the success of our advertising and marketing campaigns).
                            <br/><br/>
                            <strong>Sharing Personal Information</strong/>
                            <br/>
                            We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                            
                            <br/>
                            <br/>

                            <strongBehavioural Advertising</strong/>
                            As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:
                            We may share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising partners. We collect and share some of this information directly with our advertising partners, and in some cases through the use of cookies or other similar technologies (which you may consent to, depending on your location).
                            <br/>
                            For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
                            <br/>
                            You can opt out of targeted advertising by:
                            <br/>
                            Facebook - https://www.facebook.com/settings/?tab=ads
                            <br/>
                            Google - https://www.google.com/settings/ads/anonymous
                            <br/>
                            Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: https://optout.aboutads.info/.
                            <br/><br/>

                            <strong>Using Personal Information</strong>
                            <br/>
                            We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
                            Lawful basis
                            Pursuant to the General Data Protection Regulation (“GDPR”), if you are a resident of the European Economic Area (“EEA”), we process your personal information under the following lawful bases:
                            <br/> -Your consent;
                            <br/> -The performance of the contract between you and the Site;
                            <br/> -Compliance with our legal obligations;
                            <br/> -To protect your vital interests;
                            <br/> -To perform a task carried out in the public interest;
                            <br/> -For our legitimate interests, which do not override your fundamental rights and freedoms.
                            <br/>
                            
                            
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




