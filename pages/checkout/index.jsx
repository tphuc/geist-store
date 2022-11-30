import Image from 'next/image';
import { amber, crimson, cyan, gray, grayA, indigo, mauve, orange, sand, sky, slate, teal, violet, yellow } from "@radix-ui/colors";
import StyledLink from "components/Link";
import Box from 'components/Box';
import ImageSlides from 'components/ImageSlides';
import * as Accordion from '@radix-ui/react-accordion';


import dynamic from 'next/dynamic';
import AnimatedTitle from 'components/AnimatedText';
import PageLayout from 'layout/Page';
import { IconArrowLeft, IconArrowRight, IconBrandInstagram, IconChevronDown, IconShoppingCart } from '@tabler/icons';
import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import ImageCarousel from 'components/Carousel';
import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'components/Tabs';
import { useCart } from 'react-use-cart';
import { useShoppingCart } from 'use-shopping-cart';
import Footer from 'components/Footer';
import { NativeSelect } from 'components/NativeSelect';

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useForm } from 'react-hook-form';
import { yup, yupResolver } from 'utils/yup';
import ButtonIcon from 'components/ButtonIcon';
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'components/RadioGroup';




const Input = styled('input', {
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    borderRadius: 4,
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
    '&:focus': {
        boxShadow: "0px 0px 0px 1px #111"
    }
})


const Textarea = styled('textarea', {
    padding: '10px 15px',
    fontSize: 15,
    lineHeight: 1,
    borderRadius: 4,
    fontWeight: 300,
    minHeight:70,
    background: gray.gray4,
    color: gray.gray12,
    border: "none",
    boxShadow: "0px 0px 0px 1px $colors$grayA6",
    outlineStyle: "none",
    '&::placeholder': {
        color: slate.slate9
    },
    '&:focus': {
        boxShadow: "0px 0px 0px 1px #111"
    }
})

const Label = styled('label', {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    fontWeight: 500,
    fontFamily: "'Manrope', serif",

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
    padding: "0px 10px",
    '&:hover': {
        cursor: "pointer"
    },

})




const AccordionRoot = styled(Accordion.Root)
const AccordionItem = styled(Accordion.Item)
const AccordionToggle = styled(Accordion.Trigger, {
    all: "unset",
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "space-between",
    width: '100%',
    padding: "0.5em 4%",
    cursor: "pointer", display: "flex",
    background: sand.sand3, zIndex: 1,
    fontWeight: 300,
    borderBottom: "1px solid #222",
})
const AccordionContent = styled(Accordion.Content, {
    borderBottom: "1px solid #222",

})



const StyledChevron = styled(IconChevronDown, {
    color: gray.gray12,
    transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    '[data-state=open] &': { transform: 'rotate(-180deg)' },
});





const data = {
    title: "Alumnium Wallet Card Holder",
    variants: [
        {
            id: 1,
            color: "Black",
            url: "/wallet1.png",
            price: 149000,
            hex: "#111111",
        },
        {
            id: 2,
            color: "Brown",
            price: 349000,
            url: "/lw_black.png",
            hex: "#361b1b"
        }
    ]
}


export default function Page() {


    const {
        cartDetails,
    } = useShoppingCart();
    const { category } = useRouter().query;
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(
            yup.object({
                email: yup.string().required(),
                fullname: yup.string().required(),
                country: yup.string().required(),
                address: yup.string().required(),
                postcode: yup.string().required()
            }).required()
        )
    });


    const [paymentMethod, setPaymentMethod] = useState('default');
    const [selected, setSelected] = useState(data.variants[0])

    const [stage, setStage] = useState(1);


    const onSubmit = (fields) => {
        const { email, fullname, country, address, postcode } = fields;
        // if (!email || !fullname || !country || !address || !postcode) {
        // }

        setStage(2)

    }

    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box css={{ position: "relative", minHeight: "calc(100vh - 40px)", maxWidth: "100vw", overflow: 'hidden', display: "flex", flexDirection: "row", flexWrap: "wrap-reverse" }} >

            <Box style={{ flex: 3, minWidth: 320, padding: "4%", fontFamily: "'Manrope', serif", borderRight: "1px solid #222" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Checkout</h2>
                    {
                        stage == 1 && <Box style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <Label>Contact
                                <Input {...register('email')} style={{ width: "100%" }} placeholder='johndoe@gmail.com' type='email' required />
                            </Label>

                            <Label>
                                {/* Full name */}
                                <Input {...register('fullname')} style={{ width: "100%" }} placeholder='Full name' required></Input>
                            </Label>
                            {/* <div style={{border:"0.5px solid #aaa"}}></div> */}
                            <br />

                            <Label>
                                {/* Contact email * */}
                                Shipping
                                <NativeSelect onChange={(val) => setValue('country', val)}>
                                    <option value="">select country *</option>
                                    <option value='1'>Vietnam</option>
                                    {/* <option value='2'>UK</option> */}
                                </NativeSelect>
                            </Label>




                            <Label>
                                {/* Address */}
                                <Input {...register('address')} style={{ width: "100%" }} placeholder='Address' required></Input>
                            </Label>

                            <Label>
                                {/* Postcode */}
                                <Input {...register('postcode')} style={{ width: "100%" }} placeholder='postcode' required></Input>
                            </Label>
                            <br />
                            <Button type='submit' style={{ borderRadius: 5, height: 45 }}>Continue to payment </Button>
                            <br />


                        </Box>}

                    {stage == 2 && <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", rowGap: 5 }}>
                            <span><strong>Contact</strong></span>
                            <span>{getValues('email')}, {getValues('fullname')}</span>

                            <span><strong>Shipping</strong></span>
                            <span>{getValues('address')}, {getValues('postcode')}, {getValues('country')}</span>

                        </Box>
                        <ButtonIcon onClick={() => setStage(1)} style={{ cursor: "pointer", textDecoration: 'underline' }}>
                            <IconArrowLeft /> Change information
                        </ButtonIcon>
                        <br />
                        <h3 style={{ margin: 0 }}>Payment method</h3>
                        <RadioGroupRoot css={{ background: gray.gray4, padding: "1em", borderRadius: 6, border: "1px solid #222" }} onValueChange={(val) => setPaymentMethod(val)} defaultValue="default" aria-label="payment-methods">
                            <Label style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <RadioGroupItem value="custom" >
                                    <RadioGroupIndicator />
                                </RadioGroupItem>
                                Request custom payment method

                            </Label>


                            <Label style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <RadioGroupItem value="default" >
                                    <RadioGroupIndicator />
                                </RadioGroupItem>
                                Default
                            </Label>

                        </RadioGroupRoot>

                        <div style={{ border: "0.5px solid #aaa", width: "100%" }}></div>
                        {paymentMethod == 'custom' && <Box style={{display:"flex", flexDirection:"column"}}>
                            <Label>
                                {/* Address */}
                                <Textarea {...register('notes')} style={{ width: "100%" }} placeholder='Write your notes / phone number' required></Textarea>
                            </Label>
                            <br/>
                            <Button type='submit' style={{ borderRadius: 5, height: 42, background: gray.gray12 }}> Make order request</Button>
                            <p style={{ margin: 0 }}>We will contact you to confirm the order and proceed with payment & shipping.</p>
                        </Box>}
                        <br />

                        {paymentMethod == 'default' && <PayPalButtons
                            onClick={(data, context) => {

                            }}
                            style={{ height: 40 }}></PayPalButtons>
                        }
                    </Box>}
                </form>
            </Box>
            <Box style={{ flex: 3, padding: "4%", fontFamily: "'Manrope', serif", background: sand.sand3 }}>
                <Box>
                    {Object.values(cartDetails)?.map((item, id) => <Box style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        borderTop: `1px solid ${sand.sand5}`,
                        paddingTop: 10,
                        overflow: "hidden"
                    }} key={item.id}>
                        <Box style={{ flex: 1, maxWidth: 80, minWidth: 50, borderRadius: 3, }}>
                            <img alt='' style={{ backgroundColor: sand.sand4, borderRadius: 3, border: "1px solid #333", width: "100%" }} src={item?.image}></img>
                        </Box>
                        <Box style={{ flex: 5, display: "flex", flexDirection: "column", gap: 2, }}>
                            <h4 style={{ margin: 0, whiteSpace: 'nowrap', }}>{item?.name}</h4>
                            <p style={{ margin: 0, whiteSpace: 'nowrap' }}>{item?.product_data?.color}</p>


                            {/* <Box style={{ display: "inline-flex", width: 80, justifyContent: "space-between", alignItems: 'center', cursor: "pointer", gap: 5, background: sand.sand3, }}>
                            <ButtonIcon onClick={() => incrementItem(item?.id)} style={{ padding: 5, background: gray.gray5 }}><IconPlus size={16} /></ButtonIcon>
                            <p style={{ margin: 0, fontSize: 15 }}>{item?.quantity}</p>
                            <ButtonIcon onClick={() => decrementItem(item?.id)} style={{ padding: 5, background: gray.gray5 }}><IconMinus size={16} /></ButtonIcon>
                          </Box> */}
                            <span style={{ marginTop: 5 }}>{item?.formattedValue}</span>
                        </Box>

                    </Box>)}
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