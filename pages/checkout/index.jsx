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
import { useShippingCountry } from 'hooks/useShippingCountry';
import { axiosInstance } from 'axios.config';
import axios from 'axios';

// Function to convert currency using an exchange rate API
async function convertCurrency(amount, fromCurrency, toCurrency) {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const exchangeRate = response.data.rates[toCurrency];
    let res = amount * exchangeRate;
    return res.toFixed(2)
}





const Input = styled('input', {
    padding: '0 15px',
    fontSize: 15,
    lineHeight: 1,
    borderRadius: 4,
    fontWeight: 300,
    height: 35,
    background: gray.gray5,
    color: gray.gray12,
    border: "none",
    boxShadow: `0px 0px 0px 1px ${sand.sand7}`,
    // boxShadow: "0px 0px 0px 1px $colors$grayA1",
    outlineStyle: "none",
    '&::placeholder': {
        color: slate.slate9
    },
    '&:focus': {
        boxShadow: `0px 0px 0px 1px ${sand.sand10}`
    }
})


const Textarea = styled('textarea', {
    padding: '10px 15px',
    fontSize: 15,
    lineHeight: 1,
    borderRadius: 4,
    fontWeight: 300,
    minHeight: 70,
    background: gray.gray5,
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
    fontSize:'smaller',
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


export default function Page({
    countries
}) {


    const {
        currency,
        totalPrice,
        cartDetails,
    } = useShoppingCart();

    const { category } = useRouter().query;
    const { countryCode, setCountryCode } = useShippingCountry();

    const [purchaseData, setPurchaseData] = useState(null)

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(
            yup.object({
                email: yup.string().required(),
                fullname: yup.string().required(),
                address: yup.string().required(),
                country: yup.string()
            }).required()
        ),
        defaultValues: {
            country: countryCode
        }
    });






    const priceNumber = React.useCallback((data) => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)

        if (priceByCountry)
            return priceByCountry.value
        else {
            return data?.defaultPrice
        }

    }, [countryCode])

    const getShippingPrice = React.useCallback(() => {
        let country = countries?.find(item => item.code == countryCode)
        return country.shippingPrice

    }, [countryCode])

    const currentCurrencyCode = React.useCallback((data) => {
        let priceByCountry = data?.prices?.find((item) => item.country.code == countryCode)

        if (priceByCountry)
            return priceByCountry.currencyCode
        else {
            return data?.defaultCurrencyCode
        }

    }, [countryCode])


    const currencyCodeByShippingCountry = React.useCallback(() => {
        let country = countries?.find(item => item.code == countryCode);
        return country.paymentCurrencyCode

    }, [countryCode])




    const router = useRouter()

    const [paymentMethod, setPaymentMethod] = useState('default');
    const [selected, setSelected] = useState(data.variants[0])

    const [stage, setStage] = useState(1);


    const onSubmit = (fields) => {
        const { email, fullname, country, address, postcode } = fields;
        // if (!email || !fullname || !country || !address || !postcode) {
        // }
        console.log('-')
        setStage(2)

    }


    async function handleSuccess(payment) {
        console.log(payment)
        // Send a request to the server to verify the payment
        // await axiosInstance.post('/api/v1/paypal/verify-payment', {
        //     paymentId: payment.paymentID,
        //     payerId: payment.payerID,
        // });

    }

    async function handleError(error) {
        console.error(error);
    }

    async function handleApprove(data, actions) {

        let order = await actions.order.capture()
        console.log(order)
        // await axiosInstance.post('/api/v1/order/create', {
        //     paymentMethod:'paypal',
        //     paymentId: order.id,
        //     name: 
        //     email,
        //     phone,
        //     items,
        //     shippingAddress,
        //     itemsPrice,
        //     shippingPrice,
        //     totalPrice,
        //     currency,
        //     purchase_data
        // })
    }



    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box css={{ position: "relative", minHeight: "calc(100vh - 40px)", maxWidth: "100vw", overflow: 'hidden', display: "flex", flexDirection: "row", flexWrap: "wrap-reverse" }} >

            <Box style={{ flex: 4, display: "flex", flexDirection: "column", padding: "4%", paddingLeft: "8%", paddingRight: "8%", minWidth: 320, fontFamily: "'Manrope', serif", borderRight: `1px solid ${sand.sand11}`, }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Checkout</h2>
                    {
                        stage == 1 && <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <Label>
                                Email
                                <Input {...register('email')} style={{ width: "100%" }} placeholder='Johndoe@gmail.com' type='email' required />
                            </Label>

                            <Label>
                                Full name
                                <Input {...register('fullname')} style={{ width: "100%" }} placeholder='Full name' required></Input>
                            </Label>
                            {/* <div style={{border:"0.5px solid #aaa"}}></div> */}
                            <br />

                            <Label aria-required='false'>
                                {/* Contact email * */}
                                Shipping to
                                <NativeSelect
                                    value={countryCode}
                                    required={false}
                                    css={{
                                        border: 'none', '&:focus': {
                                            border: `1px solid ${sand.sand10}`
                                        }
                                    }}
                                    style={{ height: 38, }}
                                    onChange={(val) => {


                                        setCountryCode(val)

                                    }}>
                                    <option value="" disabled>select country *</option>
                                    {
                                        countries?.map((item) => <option selected={countryCode == item.code} key={item.id} value={item?.code}>
                                            {item?.name}
                                        </option>)
                                    }
                                </NativeSelect>

                            </Label>




                            <Label>
                                Address
                                <Input {...register('address')} style={{ width: "100%" }} placeholder='Address' required></Input>
                            </Label>

                            <Label>
                                Postcode
                                <Input {...register('postcode')} style={{ width: "100%" }} placeholder='postcode (optional)' ></Input>
                            </Label>

                            <Label>
                                Phone
                                <Input {...register('phone')} style={{ width: "100%" }} placeholder='your contact number' required></Input>
                            </Label>
                            <br />
                            <Button type='submit' css={{
                                transition: "0.4s ease all",
                                backgroundColor: amber.amber8,
                                '&:hover': {
                                    transition: "0.4s ease all",
                                    backgroundColor: amber.amber9,
                                    // border:`1px solid ${gray.gray12}`,
                                    // color: gray.gray12
                                }
                            }} style={{ borderRadius: 5, height: 45, gap: 8 }}>Continue to payment <IconArrowRight stroke={1.2} /> </Button>
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
                            {
                                getValues('country') == 'VN' && <Label style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                    <RadioGroupItem value="custom" >
                                        <RadioGroupIndicator />
                                    </RadioGroupItem>
                                    Thanh toán khi nhận hàng (chỉ áp dụng tại VN)

                                </Label>
                            }


                            <Label style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <RadioGroupItem value="default" >
                                    <RadioGroupIndicator />
                                </RadioGroupItem>
                                Default
                            </Label>

                        </RadioGroupRoot>

                        <div style={{ border: "0.5px solid #aaa", width: "100%" }}></div>
                        {paymentMethod == 'custom' && <Box style={{ display: "flex", flexDirection: "column" }}>
                            <Label>
                                {/* Address */}
                                <Textarea {...register('notes')} style={{ width: "100%" }} placeholder='Write your notes / phone number' required></Textarea>
                            </Label>
                            <br />
                            <Button type='submit' style={{ borderRadius: 5, height: 42, background: gray.gray12 }}> Make order request</Button>
                            <p style={{ margin: 0 }}>We will contact you to confirm the order and proceed with payment & shipping.</p>
                        </Box>}
                        <br />

                        {paymentMethod == 'default' && <PayPalButtons
                            options={{
                                show_cart_in_paypal: true,
                            }}
                            createOrder={async (data, actions) => {
                        
                                let totalUSD = 0

                                let items = await Promise.all(Object.values(cartDetails)?.map(async (item) => {
                                    let valueInUSD = await convertCurrency(item.value, currencyCodeByShippingCountry(), 'USD')
                                    totalUSD += parseFloat(valueInUSD)
                                    return {
                                        name: item.name,
                                        description: item?.description || '',
                                        quantity: item.quantity,
                                        unit_amount: {
                                            currency_code: 'USD',
                                            value: valueInUSD
                                        }
                                    }
                                }))

                            

                                let shippingUSD = await convertCurrency(getShippingPrice(), currencyCodeByShippingCountry(), 'USD')

                                // let totalUSD = await convertCurrency(totalPrice, currencyCodeByShippingCountry(), 'USD')
                                let amount = totalUSD + parseFloat(shippingUSD)
                                let item_total = totalUSD?.toFixed(2)
                                let _data = {
                                    description: "Order from geiszt.com",
                                    intent: 'CAPTURE',
                                   
                                    purchase_units: [
                                        {
                                            shipping: {
                                                name: {
                                                  full_name: getValues('fullname')
                                                },
                                                address: {
                                                    admin_area_2: "Hanoi",
                                                    country_code: "VN"
                                                },
                                                
                                            },
                                            amount: {
                                                currency_code: 'USD',
                                                value: amount,
                                                breakdown: {
                                                    item_total: {
                                                        value: item_total,
                                                        currency_code: 'USD'
                                                    },
                                                    shipping: {
                                                        value: shippingUSD,
                                                        currency_code: 'USD'
                                                    }
                                                }
                                            },
                                            items: items

                                        }
                                    ],
                                }
                                console.log(data)
                                setPurchaseData(_data)
                                return await actions.order.create(_data);
                            }}
                            clientId={'Af_ml170LjBF71oWJ-2HY6wqki3KYrEz2wUisjon7RVTIi5FwqVq9ylBX3hpuxVLVePYtZPaOQ48AzXR'}
                            onSuccess={handleSuccess}
                            onError={handleError}
                            onApprove={handleApprove}


                        />
                        }
                    </Box>}
                </form>

            </Box>
            <Box style={{ flex: 3, padding: "4%", fontFamily: "'Manrope', serif", background: gray.gray4 }}>
                <Box>

                    <h4>Products</h4>
                    <span style={{ color: sand.sand10 }}>{Object.values(cartDetails).length == 0 && 'Empty cart'}</span>
                    {Object.values(cartDetails)?.map((item, id) => <Box style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        borderTop: `1px solid ${sand.sand7}`,
                        paddingTop: '10px',
                        overflow: "hidden",
                        flexWrap: "wrap",
                    }} key={item.id}>

                        <Box style={{ flex: 1, maxWidth: 80, minWidth: 50, borderRadius: 4 }}>
                            <img alt='' style={{ backgroundColor: sand.sand4, borderRadius: 4, border: `1px solid ${sand.sand11}`, width: "100%" }} src={item?.image}></img>
                        </Box>

                        <Box style={{ flex: 5, display: "flex", flexWrap: "wrap", width: "100%" }}>
                            <Box style={{ dislay: "flex", flex: 1, flexDirection: "column" }}>
                                <h4 style={{ margin: 0, whiteSpace: 'nowrap', color: sand.sand12 }}>{router.locale === 'vi-VN' ? item?.product_data?.vi_title : item?.product_data?.en_title}</h4>
                                <h5 style={{ color: sand.sand11, margin: 0, whiteSpace: 'nowrap', padding: 0, }}>{item?.product_data?.selectedVariant?.title} x {item?.quantity}</h5>
                            </Box>
                            <Box style={{ dislay: "flex", background: "#eee", minWidth: 50, textAlign: "right" }}>
                                <h4 style={{ margin: 0, fontWeight: 400, whiteSpace: 'nowrap', textAlign: "center" }}>{new Intl.NumberFormat(router.locale, { style: 'currency', currency: currentCurrencyCode(item?.product_data) }).format(item.value)}</h4>
                            </Box>
                        </Box>

                    </Box>)}

                    <Box style={{ display: "flex", width: "100%", marginTop: 10, borderTop: `1px solid ${sand.sand7}`, justifyContent: "space-between", alignItems: "center" }}>

                        <h4 style={{ marginTop: 10 }}> Shipping </h4>
                        <h4 style={{ marginTop: 10, fontWeight: 300 }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCodeByShippingCountry() }).format(getShippingPrice())}</h4>

                    </Box>

                    <Box style={{ display: "flex", width: "100%", marginTop: 10, borderTop: `1px solid ${sand.sand7}`, justifyContent: "space-between", alignItems: "center" }}>

                        <h3 style={{ marginTop: 10 }}>Total</h3>
                        <h4 style={{ marginTop: 10, fontWeight: 400 }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCodeByShippingCountry() }).format(totalPrice + getShippingPrice())}</h4>

                    </Box>

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


export async function getStaticProps() {

    let data = await axiosInstance.get('/api/v1/country').then(res => res.data)

    return {
        props: {
            countries: data
        }
    }
}