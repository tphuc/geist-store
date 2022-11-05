import Image from 'next/image';
import { gray, mauve, sand } from "@radix-ui/colors";
import StyledLink from "components/Link";
import Box from 'components/Box';


export default function Page() {
  return <Box css={{ position: "relative", fontFamily: "'Lora', serif", }}>
    {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
    <Box style={{
      display: "flex", flexWrap: "wrap", width: "100vw",
    }}>
      <Box css={{ backgroundColor: sand.sand6, minHeight: "calc(100vh - 80px)", flex: 3 }}>
        <Box css={{
          zIndex: 0,
          position: "fixed", fontFamily: "'Lora', serif", textAlign: "left",
          padding: "4%",
          paddingTop: "5%",

          width: "34vw",
          '@media only screen and (max-width: 600px)': {
            width: '90vw'
          }

        }}>
          <h1 style={{ fontWeight: 500, fontSize: '2em' }}>
            Desgined to withstand the rigor of everyday life.
            {/* Được thiết kế để đối chọi với sự khắc nghiệt của cuộc sống thường ngày. */}
          </h1>
          <span style={{ fontSize: 18, padding: 0, margin: 0, color: sand.sand11 }}>Men's accessories have come a long way in recent years. They are not just simply functional items - they've become style statements in their own right. </span>
          <br />
          <span style={{ fontSize: 18, padding: 0, margin: 0, color: sand.sand12 }}>Find the one that fit your style.</span>
          <br />
          <br />
          <StyledLink href='/shop' style={{
            background: sand.sand12, display: "inline-flex", padding: "10px 20px", cursor: "pointer", userSelect: "none", color: sand.sand1, fontFamily: "'Manrope', sans-serif", '&:hover': {
              backgroundColor: "Black"
            }
          }}>
            Shop now
          </StyledLink>
        </Box>


      </Box>
      <Box css={{ position: 'relative', backgroundColor: sand.sand5, minHeight: "calc(100vh - 80px)", padding: "2em", flex: 5, zIndex: 1, }}>
        <p style={{ fontWeight: 500, fontSize: 20 }}>Wallets</p>
        <Box css={{ display: 'grid', rowGap: 40, columnGap: 10, width: "100%", gridTemplateColumns: "repeat(auto-fit, 320px)" }}>
          <Box style={{ display: 'inline-flex', position: "relative", fontFamily: "'Manrope', sans-serif", padding: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center', overflow: 'hidden', width: '100%' }}>
            <Image
              src="/lw_black_grain.jpeg"
              width={320}
              height={320}

            />
            <Box css={{ width: '100%' }}>
              <p style={{ textAlign: "left", marginBottom: 10 }}>Alumnium Wallet</p>
              <p style={{ padding: 0, margin: 0 }}>320$</p>
            </Box>

          </Box>

          <Box style={{ display: 'inline-flex', position: "relative", fontFamily: "'Manrope', sans-serif", padding: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center', overflow: 'hidden', width: '100%' }}>
            <Image
              src="/lw_black_grain.jpeg"
              width={320}
              height={320}
            />
            <Box css={{ width: '100%' }}>
              <p style={{ textAlign: "left", marginBottom: 10 }}>Alumnium Wallet</p>
              <p style={{ padding: 0, margin: 0 }}>320$</p>
            </Box>

          </Box>





        </Box>

        <p style={{ fontWeight: 500, fontSize: 20 }}>Glasswear</p>
        <Box css={{ display: 'grid', rowGap: 40, columnGap: 10, width: "100%", gridTemplateColumns: "repeat(auto-fit, 320px)" }}>
          <Box style={{ display: 'inline-flex', position: "relative", fontFamily: "'Manrope', sans-serif", padding: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center', overflow: 'hidden', width: '100%' }}>
            <Image
              src="/lw_black_grain.jpeg"
              width={320}
              height={320}

            />
            <Box css={{ width: '100%' }}>
              <p style={{ textAlign: "left", marginBottom: 10 }}>Alumnium Wallet</p>
              <p style={{ padding: 0, margin: 0 }}>320$</p>
            </Box>

          </Box>

          <Box style={{ display: 'inline-flex', position: "relative", fontFamily: "'Manrope', sans-serif", padding: 0, flexDirection: 'column', justifyContent: "center", alignItems: 'center', overflow: 'hidden', width: '100%' }}>
            <Image
              src="/lw_black_grain.jpeg"
              width={320}
              height={320}

            />
            <Box css={{ width: '100%' }}>
              <p style={{ textAlign: "left", marginBottom: 10 }}>Alumnium Wallet</p>
              <p style={{ padding: 0, margin: 0 }}>320$</p>
            </Box>

          </Box>
        </Box>

      </Box>
    </Box>




  </Box>;
}