
import { styled } from "@stitches/react";
import Box from "components/Box";
import Link from "components/Link";
import { gray, san, sand, slate } from "@radix-ui/colors";
import { IconArrowRight, IconCross, IconMinus, IconPlus, IconShoppingCart, IconX } from '@tabler/icons'
import { useCart } from "react-use-cart";
import { useShoppingCart } from "use-shopping-cart";
import * as Dialog from '@radix-ui/react-dialog';
import ButtonIcon from "components/ButtonIcon";


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
  background: slate.slate12,
  color: slate.slate1,
  height: 35,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Manrope', serif",
  padding: "10px 10px",
  cursor: 'pointer'
})

export default function PageLayout({ children }) {

  const {
    cartCount,
    cartDetails,
    formattedTotalPrice,
    decrementItem,
    incrementItem
  } = useShoppingCart();

  console.log(cartDetails)



  return (
    <div style={{ position: "relative" }}>


      <div style={{ backgroundColor: gray.gray1, boxSizing: "border-box", fontFamily: "'Manrope', sans-serif" }}>
        <nav style={{
          display: 'flex', left: 0, height: 40, backgroundColor: gray.gray2, borderBottom: `1px solid ${gray.gray11}`, position: "fixed", width: "100vw",
          paddingLeft: "4%", paddingRight: "4%",
          boxSizing: "border-box", zIndex: 10, userSelect: "none", justifyContent: 'space-between', alignItems: "center"
        }}>
          <Link href={'/shop'} css={{ color: "#111" }}>
            Shop
          </Link>
          <Box css={{ fontFamily: "'Lora', serif", fontWeight: 400, fontSize: 24, color: sand.sand12, userSelect: "none", cursor: "pointer" }}>
            <Link href={'/'}>GEIST</Link>
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
                <Box style={{ display: "flex", backgroundColor: gray.gray2, fontFamily: "'Manrope', serif", flexDirection: "column", height: "100%" }}>
                  <Dialog.Close asChild>
                    <ButtonIcon style={{ zIndex: 10, display: 'inline-flex', cursor: "pointer", position: "absolute", top: 5, right: 5 }}>
                      <IconX size={26} stroke={1.5} />
                    </ButtonIcon>
                  </Dialog.Close>
                  <Box style={{ flex: 1, padding: "1em" }}>

                    <div style={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                      <h3>Your cart</h3>
                      <IconShoppingCart stroke={1.5} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {Object.values(cartDetails)?.map((item, id) => <Box style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        borderTop: `1px solid ${sand.sand5}`,
                        paddingTop: 10,
                        overflow: "hidden"
                      }} key={item.id}>
                        <Box style={{ flex: 1, maxWidth: 100, minWidth: 50 }}>
                          <img style={{ backgroundColor: sand.sand4, border: "1px solid #111", width: "100%" }} src={item?.image}></img>
                        </Box>
                        <Box style={{ flex: 5, display: "flex", flexDirection: "column", gap: 2, }}>
                          <h4 style={{ margin: 0, whiteSpace: 'nowrap', }}>{item?.name}</h4>
                          <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{item?.product_data?.color}</p>


                          <Box style={{ display: "inline-flex", width: 80, justifyContent: "space-between", alignItems: 'center', cursor: "pointer", gap: 5, background: sand.sand3, }}>
                            <ButtonIcon onClick={() => incrementItem(item?.id)} style={{ padding: 5, background: gray.gray5 }}><IconPlus size={16} /></ButtonIcon>
                            <p style={{ margin: 0, fontSize: 15 }}>{item?.quantity}</p>
                            <ButtonIcon onClick={() => decrementItem(item?.id)} style={{ padding: 5, background: gray.gray5 }}><IconMinus size={16} /></ButtonIcon>
                          </Box>
                          <span style={{ marginTop: 5 }}>{item?.formattedValue}</span>
                        </Box>

                      </Box>)}

                    </div>


                  </Box>
                  <Box style={{ display: "flex", background:sand.sand1, borderTop: "1px solid #222", alignItems: "center", gap: 16, padding: 4 }}>
                    <span style={{ paddingLeft: 10 }}>Total: {formattedTotalPrice}</span>
                    <Button style={{ flex: 1, borderRadius: 6, gap:5  }} >
                      <span>Go to checkout</span>
                      <IconArrowRight stroke={1.5}/>
                    </Button>
                  </Box>

                </Box>
              </DialogContent>

            </Dialog.Portal>

          </Dialog.Root>
        </nav>
        <div style={{ height: 39, position: "relative" }}></div>
        {children}
      </div>
    </div>
  )
}
