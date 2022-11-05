import Image from 'next/image';
import { gray, mauve, sand } from "@radix-ui/colors";
import Box from 'components/Box';
import StyledLink from 'components/Link';

const params = new URLSearchParams()

export default function Page() {
  return  <Box css={{ position:'relative', backgroundColor: sand.sand5, minHeight:"80vh", padding:"2em", flex:5, zIndex:1, }}>
          <br/>
          <Box css={{display:'flex', flexDirection:'row', alignItems:'center', gap:10, overflow:"scroll"}}>
          <StyledLink href={{
              pathname: '/shop'
            }} style={{
              padding:"5px 10px",
              border:`1.5px solid ${sand.sand12}`,
              borderRadius:50
            }}>All</StyledLink>
            <StyledLink href={{
              pathname: '/shop',
              query: { name: 'test' },
            }} css={{
              padding:"5px 10px",
              border:`1.5px solid ${sand.sand12}`,
              borderRadius:50
            }}>Wallets</StyledLink>
            <Box>Necktie</Box>
            <Box>Eyewear</Box>
            <Box>Watches</Box>
          </Box>
        <p style={{fontWeight:500, fontSize:20}}>Wallets</p>
        <Box css={{  display: 'grid', rowGap: 40, columnGap: 10, width: "100%", gridTemplateColumns: "repeat(auto-fit, 320px)" }}>
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

        <p style={{fontWeight:500, fontSize:20}}>Glasswear</p>
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

}