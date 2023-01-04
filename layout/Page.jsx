
import { styled } from "@stitches/react";
import Box from "components/Box";
import Link from "components/Link";
import { gray, san, sand, sky, slate, yellow } from "@radix-ui/colors";
import { IconArrowRight, IconCross, IconMinus, IconPlus, IconShoppingCart, IconX } from '@tabler/icons'
import { useCart } from "react-use-cart";
import { useShoppingCart } from "use-shopping-cart";
import * as Dialog from '@radix-ui/react-dialog';
import ButtonIcon from "components/ButtonIcon";
import { NativeSelect } from "components/NativeSelect";
import { useRouter } from "next/router";
import useTrans from "hooks/useTrans";
import StyledLink from "components/Link";
import { usefetchCountries } from "services/fetch";
import { useShippingCountry } from "hooks/useShippingCountry";
import { Popover, PopoverContent, PopoverTrigger } from "components/Popover";
import { PopoverPortal } from "@radix-ui/react-popover";
import getSymbolFromCurrency from 'currency-symbol-map'
import React from "react";


const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0,0,0,0.2)',
  transition: "0.3s ease background",
  position: 'fixed',
  inset: 0,
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: sand.sand2,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: 0,
  right: 0,
  // transform: 'translate(-50%, -50%)',
  zIndex: 50,
  width: 'min(90vw, 500px)',
  height: "100vh",
  borderLeft: "1px solid #111",
  // padding: '1em',
  '&:focus': { outline: 'none' },
});


const Button = styled('button', {
  all: "unset",
  outline: 'none',
  background: gray.gray12,
  color: slate.slate1,
  height: 35,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Manrope', serif",
  padding: "10px 10px",
  cursor: 'pointer',
  transition:"0.4s ease all",
  '&:hover': {
    background: sand.sand6,
    color: gray.gray12,
    boxShadow: `0 0 0 1px ${gray.gray12}`,
    transition:"0.4s ease all",
  }

})

export default function PageLayout({ children }) {

  const {
    cartCount,
    cartDetails,
    formattedTotalPrice,
    totalPrice,
    currency,
    changeCurrency,
    decrementItem,
    incrementItem
  } = useShoppingCart();



  const router = useRouter();
  const t = useTrans();

  const { countryCode, setCountryCode } = useShippingCountry();
  const { data: countries } = usefetchCountries();

  const priceNumber = React.useCallback((data) => {
    let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)


    if (priceByCountry)
        return priceByCountry.value
    else {
        return data?.defaultPrice
    }

}, [countryCode])

const currentCurrencyCode = React.useCallback((data) => {
    let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)


    if (priceByCountry)
        return priceByCountry.currencyCode
    else {
        return data?.defaultCurrencyCode
    }

}, [countryCode])



  return (
    <div style={{ position: "relative" }}>


      <div style={{ backgroundColor: sand.sand1, boxSizing: "border-box", fontFamily: "'Manrope', sans-serif", }}>
        <nav style={{

          display: 'flex', left: 0, height: 48, backgroundColor: sand.sand3, borderBottom: `1px solid ${gray.gray11}`, width: "100vw",
          paddingLeft: "4%", paddingRight: "4%",
          boxSizing: "border-box", zIndex: 50, userSelect: "none", justifyContent: 'space-between', alignItems: "center"
        }}>
          <Link href={'/'}>
            <svg width="70px" viewBox="0 0 700 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M126.067 67.1137C112.118 53.1647 93.432 45.5322 73.956 45.5322C54.2169 45.5322 35.5305 53.1647 21.5814 67.1137C7.63244 81.0627 0 99.4859 0 119.225C0 138.964 7.63244 157.387 21.5814 171.336C35.5305 185.285 54.2169 192.918 73.956 192.918C85.5363 192.918 96.8534 190.286 106.855 185.285C102.907 199.761 89.4842 210.288 73.956 210.288C65.0076 210.288 56.5855 206.867 50.269 200.814L22.8975 229.501C36.8465 242.661 54.7433 249.767 73.6929 249.767C93.432 249.767 112.118 242.134 126.067 228.185C140.016 214.236 147.649 195.813 147.649 176.074V119.225C147.649 99.4859 140.016 81.0627 126.067 67.1137ZM73.956 153.44C55.0064 153.44 39.4783 138.175 39.4783 119.225C39.4783 100.275 55.0064 84.7474 73.956 84.7474C92.9056 84.7474 108.171 100.275 108.171 119.225C108.171 138.175 92.6424 153.44 73.956 153.44Z" fill="url(#paint0_linear_49_62)" />
              <path d="M229.398 194.76C239.662 194.76 249.663 192.654 259.138 188.443C268.35 184.495 276.509 178.705 283.352 171.599L255.454 145.28C248.611 152.65 239.399 156.597 229.398 156.597C216.502 156.597 205.185 149.754 198.868 139.753H303.354V120.541C303.354 100.801 295.721 82.115 281.772 68.166C267.823 54.217 249.137 46.3213 229.398 46.3213C209.396 46.3213 190.972 54.217 176.76 68.166C162.811 82.115 155.179 100.801 155.179 120.541C155.179 140.28 162.811 158.966 176.76 172.915C190.972 186.864 209.396 194.76 229.398 194.76ZM198.868 101.591C205.185 91.3266 216.502 84.4837 229.398 84.4837C242.031 84.4837 253.348 91.3266 259.928 101.591H198.868Z" fill="url(#paint1_linear_49_62)" />
              <path d="M314.074 193.707H353.816V41.8467L314.074 55.0061V193.707Z" fill="url(#paint2_linear_49_62)" />
              <path d="M431.494 195.285C458.076 195.285 479.658 173.704 479.658 147.122C479.658 120.54 458.076 98.9581 431.494 98.9581H420.44C416.492 98.9581 413.597 95.7999 413.597 92.1152C413.597 88.1674 416.492 85.0091 420.44 85.0091H475.447V43.6885H420.44C393.858 43.6885 372.277 65.5331 372.277 92.1152C372.277 118.697 393.858 140.279 420.44 140.279H431.494C435.179 140.279 438.337 143.437 438.337 147.122C438.337 151.07 435.179 153.965 431.494 153.965H369.908V195.285H431.494Z" fill="url(#paint3_linear_49_62)" />
              <path d="M481.368 193.707H603.488V156.861H538.217L603.488 75.0093V47.1113H485.316V83.9578H546.376L481.368 165.809V193.707Z" fill="url(#paint4_linear_49_62)" />
              <path d="M700 83.9572V47.1108H658.153V0L618.675 13.1594V115.277C618.675 126.331 620.78 136.858 624.991 146.859C628.939 156.597 634.992 165.283 642.362 172.652C649.731 180.284 658.416 186.074 668.154 190.285C678.156 194.497 688.946 196.602 700 196.602V157.124C676.839 157.124 658.153 138.437 658.153 115.277V83.9572H700Z" fill="url(#paint5_linear_49_62)" />
              <defs>
                <linearGradient id="paint0_linear_49_62" x1="-48.3023" y1="117.081" x2="171.938" y2="122.458" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0.77" />
                </linearGradient>
                <linearGradient id="paint1_linear_49_62" x1="106.704" y1="98.3233" x2="327.61" y2="105.77" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0.77" />
                </linearGradient>
                <linearGradient id="paint2_linear_49_62" x1="301.073" y1="95.0474" x2="360.384" y2="95.5715" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0.77" />
                </linearGradient>
                <linearGradient id="paint3_linear_49_62" x1="334.004" y1="96.797" x2="497.712" y2="100.799" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0.77" />
                </linearGradient>
                <linearGradient id="paint4_linear_49_62" x1="441.418" y1="98.468" x2="623.541" y2="103.591" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0.77" />
                </linearGradient>
                <linearGradient id="paint5_linear_49_62" x1="592.07" y1="68.8751" x2="713.427" y2="70.5703" gradientUnits="userSpaceOnUse">
                  <stop />
                  <stop offset="1" stop-opacity="0.77" />
                </linearGradient>
              </defs>
            </svg>
          </Link>

          <Box style={{ position: "relative", fontFamily: "'Manrope', serif", flex: 1, display: "flex", gap: '1em', justifyContent: "flex-end", alignItems: "center", fontWeight: 400, fontSize: 18, color: sand.sand12, userSelect: "none", cursor: "pointer" }}>
            <Link href={'/shop/category/all'} css={{ color: "#111" }}>
              SHOP
            </Link>





            <Popover>
              <PopoverTrigger asChild>
                <span style={{ fontSize: '0.9em', background: gray.gray5, padding: '2px 8px', borderRadius: 50 }}>{countryCode} <span style={{ color: sand.sand11 }}>{getSymbolFromCurrency(countries?.find(i => i.code == countryCode)?.paymentCurrencyCode)}{countries?.find(i => i.code == countryCode)?.paymentCurrencyCode}</span></span>
              </PopoverTrigger>
              <PopoverPortal>
                <PopoverContent align="left" style={{ zIndex: 100, display: "flex", flexDirection: "column", gap: 5, minWidth: 80, borderRadius: 0, border: "1px solid #333" }}>
                  <span style={{ fontWeight: 300 }}>Shipping to</span>
                  <div style={{ display: "flex", fontSize: 14, borderRadius: 50, padding: "0px 20px", color: sand.sand11, background: sand.sand4, alignItems: "center" }}>
                    {countryCode && <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`} alt="." style={{ width: 20, height: 'auto' }} ></img>}
                    <NativeSelect id='lang-select'

                      style={{ color: sand.sand11, border: 'none', textDecoration: "underline", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: 'none' }} defaultValue={countryCode} required onChange={(val) => {
                        setCountryCode(val);
                        changeCurrency(countries?.find(item => item.code == val)?.paymentCurrencyCode || 'USD')
                      }} placeholder="">

                      {countries?.map((item, id) => <option selected={countryCode == item.code} value={item.code} key={id}>
                        <span style={{}}>{item.name} ({item.paymentCurrencyCode})</span>
                      </option>)}
                    </NativeSelect>
                  </div>
                  <br />
                  <span style={{ fontWeight: 300 }}>Language</span>

                  <div style={{ display: "flex", fontSize: 14, borderRadius: 50, padding: "0px 10px", color: sand.sand11, background: sand.sand4, alignItems: "center" }}>
                    <NativeSelect defaultValue={router.locale} style={{ color: sand.sand11, border: 'none', display: "flex", fontSize: 16, background: 'none' }} required onChange={(val) => {
                      // if (val == 'vi-VN') {
                      //   setCountryCode('VN')
                      // }
                      router.push(router.asPath, null, { locale: val, shallow: true })
                    }} 
                    placeholder="language">
                      <option value={'en-US'} selected={router.locale == 'en-US'}>🇬🇧 English </option>
                      <option value={'vi-VN'} selected={router.locale == 'vi-VN'}>🇻🇳 Tiếng Việt </option>
                    </NativeSelect>
                  </div>
                </PopoverContent>
              </PopoverPortal>
            </Popover>
          </Box>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Box style={{ cursor: 'pointer', userSelect: "none", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>

                <IconShoppingCart strokeWidth={1.25} />
                <Box style={{ position: "absolute", fontSize: "small", width: 20, height: 20, background: gray.gray12, color: "whitesmoke", borderRadius: "50%", top: '-20%', right: '-50%', display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {cartCount}
                </Box>

              </Box>
            </Dialog.Trigger>



            <Dialog.Portal>
              <DialogOverlay />
              <DialogContent>
                <Box style={{ display: "flex", backgroundColor: sand.sand3, fontFamily: "'Manrope', serif", flexDirection: "column", height: "100%" }}>

                  <Dialog.Close asChild>
                    <ButtonIcon style={{ zIndex: 10, display: 'inline-flex', cursor: "pointer", position: "absolute", top: 10, right: 10 }}>
                      <IconX size={26} stroke={1.5} />
                    </ButtonIcon>
                  </Dialog.Close>
                  <Box style={{ flex: 1, padding: "1em" }}>

                    <div style={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                      <h2>Your cart</h2>
                      <IconShoppingCart size={30} stroke={1.5} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                      {Object.values(cartDetails)?.length == 0 ? <div >
                        <span style={{ color: sand.sand10 }}> Your cart is empty </span>
                        <br />
                        <StyledLink style={{ display: "flex", alignItems: 'center', fontSize: '1.2em' }} href='/shop/category/all'>Start shopping now <IconArrowRight stroke={1} /></StyledLink>
                      </div> : null}

                      {Object.values(cartDetails)?.map((item, id) => <Box style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        borderTop: `1px solid ${sand.sand5}`,
                        paddingTop: 10,
                        overflow: "hidden"
                      }} key={item.id}>

                        <Box style={{ flex: 1, maxWidth: 100, minWidth: 50,  }}>
                          <img alt='' style={{ backgroundColor: sand.sand4,borderRadius:4, border: "1px solid #111", width: "100%" }} src={item?.image}></img>
                        </Box>

                        <Box style={{ flex: 5, display: "flex", flexDirection: "column", gap: 2, }}>
                          <h4 style={{ margin: 0, whiteSpace: 'nowrap', }}>{router.locale === 'vi-VN' ? item?.product_data?.vi_title : item?.product_data?.en_title}</h4>
                          <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{item?.product_data?.color}</p>

                          <Box style={{ display: "inline-flex", width: 80, justifyContent: "space-between", alignItems: 'center', cursor: "pointer", gap: 5, }}>
                            <ButtonIcon onClick={() => decrementItem(item?.id)} style={{ padding: 5, borderRadius:50, background: gray.gray6 }}><IconMinus  size={16} /></ButtonIcon>
                            <p style={{ margin: 0, fontSize: 15 }}>{item?.quantity}</p>
                            <ButtonIcon onClick={() => incrementItem(item?.id)} style={{ padding: 5, borderRadius:50, background: gray.gray6 }}><IconPlus size={16} /></ButtonIcon>
                            
                          </Box>

                          <span style={{ marginTop: 5 }}>{new Intl.NumberFormat(router.locale, { style: 'currency', currency: currentCurrencyCode(item?.product_data) }).format(item.value)}</span>

                        </Box>
                      </Box>)}

                     


                    </div>


                  </Box>
                  <Box style={{ background: sand.sand1, borderTop: "1px solid #222", gap: 16, padding:4,  }}>
                    {/* <span style={{ paddingLeft: 10 }}>Total: {formattedTotalPrice}</span> */}
                    <StyledLink   href='/checkout'>
                    <Button style={{ flex: 1, boxSizing:"border-box", minHeight:50,  width:"100%",  borderRadius: 6, gap: 5 }} >
                      <span>Go to checkout</span>
                      <IconArrowRight stroke={1.5} />
                    </Button>
                    </StyledLink>
                  </Box>

                </Box>
              </DialogContent>

            </Dialog.Portal>

          </Dialog.Root>
        </nav>
        {/* <div style={{ height: 48, position: "relative" }}></div> */}

      </div>

      {children}

      <div style={{ position: 'absolute', bottom: '1em', left: '4%', zIndex: 100 }}>
        <NativeSelect defaultValue={router.locale} required onChange={(val) => router.push(router.asPath, null, { locale: val })} placeholder="language">
          <option value={'en-US'} selected={router.locale == 'en-US'}>🇬🇧 English </option>
          <option value={'vi-VN'} selected={router.locale == 'vi-VN'}>🇻🇳 Tiếng Việt </option>

        </NativeSelect>
      </div>
    </div>
  )
}
