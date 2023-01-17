import Image from 'next/image';
import { amber, crimson, cyan, gray, grayA, indigo, mauve, orange, sand, sky, slate, teal, violet, yellow } from "@radix-ui/colors";
import StyledLink from "components/Link";
import Box from 'components/Box';
import ImageSlides from 'components/ImageSlides';
import * as Accordion from '@radix-ui/react-accordion';


import dynamic from 'next/dynamic';
import AnimatedTitle from 'components/AnimatedText';
import PageLayout from 'layout/Page';
import { IconArrowLeft, IconArrowRight, IconBrandInstagram, IconChevronDown, IconLoader, IconLoader2, IconShoppingCart } from '@tabler/icons';
import { keyframes, styled } from '@stitches/react';
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
import { useShippingCountry, } from 'hooks/useShippingCountry';
import { axiosInstance } from 'axios.config';
import axios from 'axios';
import { useFetchStatesByCountry } from 'services/fetch';
import useTrans from 'hooks/useTrans';

// Function to convert currency using an exchange rate API
async function convertCurrency(amount, fromCurrency, toCurrency) {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const exchangeRate = response.data.rates[toCurrency];
    let res = amount * exchangeRate;
    return res.toFixed(2)
}


const rotation = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});


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
    fontSize: 'smaller',
    fontWeight: 500,
    fontFamily: "'Manrope', serif",
    width: "auto",
    minWidth: 200,
    color: mauve.mauve11

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
    minHeight:45,
    borderRadius: 5,

    '&:hover': {
        cursor: "pointer"
    },

    variants: {
        kind: {
            default: {},
            loading: {
                cursor: "default",
                pointerEvents: "none",
                opacity: 0.6,
                '& > svg': {
                    animation: `${rotation} linear`,
                    animationDuration: "1s",
                    animationIterationCount: "infinite"
                }
            }
        }
    }
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
        totalPrice,
        cartDetails,
    } = useShoppingCart();

    const trans = useTrans()

    const { countryCode, setCountryCode } = useShippingCountry();
    const { data: states } = useFetchStatesByCountry(countryCode)
    const [orderConfirmed, setOrderConfirmed] = useState(null)
    const [purchaseData, setPurchaseData] = useState(null)

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(
            yup.object({

            }).required()
        ),
        defaultValues: {
            country: countryCode
        }
    });


    const [loading, setLoading] = useState(false)




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


    const onSubmit = async (fields) => {
        try {


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

            let _data = {
                description: "Order from geiszt.com",
                intent: 'CAPTURE',

                purchase_units: [
                    {
                        shipping: {
                            name: {
                                full_name: getValues('full_name'),
                            },
                            address: {
                                address_line_1: getValues('address_line_1'),
                                admin_area_1: getValues('admin_area_1'),
                                admin_area_2: getValues('admin_area_2'),
                                postal_code: getValues('postal_code'),
                                country_code: countryCode
                            }

                        },
                        amount: {
                            currency_code: 'USD',
                            value: amount?.toFixed(2),
                            breakdown: {
                                item_total: {
                                    value: totalUSD?.toFixed(2),
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

            let option = {
                name: getValues('full_name'),
                email: getValues('email'),
                phone: getValues('phone'),
                items: Object.values(cartDetails).map(item => ({ id: item.id?.split('_')?.[1], quantity: item?.quantity })),
                subTotalPrice: _data?.purchase_units[0]?.amount?.breakdown?.item_total?.value,
                shippingPrice: _data?.purchase_units[0]?.amount?.breakdown?.shipping?.value,
                totalPrice: _data?.purchase_units[0]?.amount?.value,
                currency: _data?.purchase_units[0]?.amount?.currency_code,
                paymentId: null,
                payerId: null,
                paymentEmail: null,
                paymentName: null,
                paymentMethod: 'cod',
                purchase_data: _data?.purchase_units,
                address_line_1: getValues('address_line_1'),
                admin_area_2: getValues('admin_area_2'),
                admin_area_1: getValues('admin_area_1'),
                postal_code: getValues('postal_code'),
                country_code: countryCode,
            }

         
            setLoading(true)
            let res = await axiosInstance.post('/api/v1/order/create', option)
            if (res?.data) {
                setOrderConfirmed(res?.data)
                setStage(3)
            }
            setLoading(false)

        } catch (e) {
            setLoading(false)
        }
    }


    async function handleSuccess(payment) {
        // console.log(payment)
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
        let option = {
            name: getValues('full_name'),
            email: getValues('email'),
            phone: getValues('phone'),
            items: Object.values(cartDetails).map(item => ({ id: item.id?.split('_')?.[1], quantity: item?.quantity })),
            subTotalPrice: order?.purchase_units[0]?.amount?.breakdown?.item_total?.value,
            shippingPrice: order?.purchase_units[0]?.amount?.breakdown?.shipping?.value,
            totalPrice: order?.purchase_units[0]?.amount?.value,
            currency: order?.purchase_units[0]?.amount?.currency_code,
            paymentId: order?.id,
            payerId: order?.payer?.payer_id,
            paymentEmail: order?.payer?.email_address,
            paymentName: `${order?.payer?.name?.given_name} ${order?.payer?.name?.surname}`,
            paymentMethod: 'paypal',
            purchase_data: order?.purchase_units,
            address_line_1: getValues('address_line_1'),
            admin_area_2: getValues('admin_area_2'),
            admin_area_1: getValues('admin_area_1'),
            postal_code: getValues('postal_code'),
            country_code: countryCode,
        }

        let res = await axiosInstance.post('/api/v1/order/create', option)
        if (res?.data) {
            setOrderConfirmed(res?.data)
            setStage(3)
        }
    }



    return <Box style={{ position: "relative", fontFamily: "'Lora', serif", }}>

        {/* <h1 style={{fontSize:"5em", fontFamily:"'Lora', serif", marginBottom:"0.2em", fontWeight:400}}>Kydo</h1> */}
        <Box css={{ position: "relative", minHeight: "calc(100vh - 40px)", maxWidth: "100vw", overflow: 'hidden', display: "flex", flexDirection: "row", flexWrap: "wrap-reverse" }} >

            <Box style={{ flex: 3, display: "flex", flexDirection: "column", padding: "2% 8%", minWidth: 320, fontFamily: "'Manrope', serif", borderRight: `1px solid ${sand.sand11}`, }}>
                <form onSubmit={handleSubmit(onSubmit)}>


                    {stage == 1 && <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <h4 style={{ margin: 0 }}>{trans?.common?.checkout} </h4>
                        <Box style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                            <Label style={{ flex: 1 }}>
                                Email
                                <Input {...register('email')} style={{ width: "100%" }} placeholder={trans?.common?.placholderEmail} type='email' required />
                            </Label>

                            <Label style={{ flex: 1 }}>
                                {trans?.common?.fullname}
                                <Input {...register('full_name')}  style={{ width: "100%" }} placeholder={trans?.common?.placeholderName} required></Input>
                            </Label>
                        </Box>
                        {/* <div style={{border:"0.5px solid #aaa"}}></div> */}
                        <br />

                        <Label aria-required='false'>
                            {trans?.common?.country}
                            <NativeSelect
                                value={countryCode}
                                required={false}
                                css={{
                                    border: `1px solid ${sand.sand7}`,
                                    '&:focus': {
                                        border: `1px solid ${sand.sand10}`
                                    }
                                }}
                                style={{ height: 38, }}
                                onChange={(val) => {


                                    setCountryCode(val)

                                }}>
                                <option value="" disabled>{trans?.common?.select} *</option>
                                {
                                    countries?.map((item) => <option selected={countryCode == item.code} key={item.id} value={item?.code}>
                                        {item?.name}
                                    </option>)
                                }
                            </NativeSelect>

                        </Label>

                        <Label style={{ flex: 1 }} >
                            {trans?.common?.state} *
                            <NativeSelect

                                required={false}
                                css={{
                                    border: `1px solid ${sand.sand7}`,
                                    '&:focus': {
                                        border: `1px solid ${sand.sand10}`
                                    }
                                }}
                                style={{ height: 38, }}
                                onChange={(val) => {
                                    setValue('admin_area_1', val)
                                }}>
                                <option value="" disabled>{trans?.common?.select}</option>
                                {
                                    states?.map((item) => <option selected={getValues('admin_area_1') == item.name} key={item.id} value={item?.name}>
                                        {item?.name}
                                    </option>)
                                }
                            </NativeSelect>
                        </Label>


                        <Box style={{ display: 'flex', justifyContent: "space-between", gap: 10 }}>
                            <Label style={{ flex: 3, minWidth: 120 }} >
                                {trans?.common?.district} *
                                <Input {...register('admin_area_2')} style={{ width: "100%" }} placeholder='' required></Input>
                            </Label>



                            <Label style={{ flex: 2, minWidth: 80 }}>
                                {trans?.common?.postcode}
                                <Input {...register('postal_code')} style={{ width: "100%" }} placeholder={`(${trans.common.optional})`} ></Input>
                            </Label>
                        </Box>
                        <Label style={{ flex: 1 }} >
                            {trans?.common?.address} *
                            <Input {...register('address_line_1')} style={{ width: "100%" }}  required></Input>
                        </Label>

                        <Label>
                            {trans?.common?.phone}
                            <Input {...register('phone')} style={{ width: "100%" }} placeholder='' required></Input>
                        </Label>
                        <br />
                        <Button onClick={() => setStage(2)}
                            css={{
                                transition: "0.4s ease all",
                                backgroundColor: amber.amber8,
                                '&:hover': {
                                    transition: "0.4s ease all",
                                    backgroundColor: amber.amber9,
                                    // border:`1px solid ${gray.gray12}`,
                                    // color: gray.gray12
                                }
                            }} style={{ borderRadius: 5, height: 45, gap: 8 }}>
                            {trans?.checkout?.continueToPayment}<IconArrowRight stroke={1.2} />
                        </Button>
                        <br />


                    </Box>}

                    {stage == 2 && <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", rowGap: 5 }}>
                            <span><strong>{trans.common.contact}</strong></span>
                            <span>{getValues('email')}, {getValues('full_name')}</span>

                            <span><strong>{trans.common.shipping}</strong></span>
                            <span> {countryCode}, {getValues('admin_area_1')}, {getValues('admin_area_2')}, {getValues('address_line_1')}, {getValues('postal_code')}</span>

                        </Box>
                        <ButtonIcon onClick={() => setStage(1)} style={{ cursor: "pointer", textDecoration: 'underline' }}>
                            <IconArrowLeft /> {trans.checkout.changeInformation}
                        </ButtonIcon>
                        <br />
                        <h3 style={{ margin: 0 }}>Payment method</h3>
                        <RadioGroupRoot css={{ background: gray.gray4, padding: "10px 5px", borderRadius: 6, border: "1px solid #222" }} onValueChange={(val) => setPaymentMethod(val)} defaultValue="default" aria-label="payment-methods">
                            {
                                countryCode === 'VN' && <Label style={{ display: "flex", flexDirection: "row", gap: 5, padding: '5px 10px', color: gray.gray12, fontSize: 'revert' }}>
                                    <Box style={{ minWidth: 20 }}>
                                        <RadioGroupItem value="cod" >
                                            <RadioGroupIndicator />
                                        </RadioGroupItem>
                                    </Box>
                                    <span style={{ marginLeft: 5 }}> Thanh toán khi nhận hàng (chỉ áp dụng tại VN)</span>


                                </Label>
                            }


                            <Label style={{ display: "flex", flexDirection: "row", gap: 5, padding: '5px 10px', color: gray.gray12, fontSize: 'revert' }}>
                                <Box style={{ minWidth: 20 }}>
                                    <RadioGroupItem value="default" >
                                        <RadioGroupIndicator />
                                    </RadioGroupItem>
                                </Box>
                                <span style={{ marginLeft: 10 }}>Paypal</span>
                            </Label>

                        </RadioGroupRoot>

                        <div style={{ border: "0.5px solid #aaa", width: "100%" }}></div>
                        {paymentMethod == 'cod' && <Box style={{ display: "flex", flexDirection: "column" }}>

                            <br />
                            <Button
                                type='submit'
                                kind={loading ? 'loading' : 'default'}
                                css={{
                                    transition: "0.4s ease all",
                                    backgroundColor: sky.sky12,
                                    '&:hover': {
                                        transition: "0.4s ease all",
                                        backgroundColor: sky.sky11,
                                        // border:`1px solid ${gray.gray12}`,
                                        // color: gray.gray12
                                    }
                                }} style={{ borderRadius: 5, height: 45, gap: 8 }}>
                                {loading ? <IconLoader2 /> : trans?.checkout?.placeOrder}
                            </Button>
                            {/* <p style={{ margin: 0 }}>We will contact you to confirm the order and proceed with payment & shipping.</p> */}
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

                                let _data = {
                                    description: "Order from geiszt.com",
                                    intent: 'CAPTURE',

                                    purchase_units: [
                                        {
                                            shipping: {
                                                name: {
                                                    full_name: getValues('full_name'),
                                                },
                                                address: {
                                                    address_line_1: getValues('address_line_1'),
                                                    admin_area_1: getValues('admin_area_1'),
                                                    admin_area_2: getValues('admin_area_2'),
                                                    postal_code: getValues('postal_code'),
                                                    country_code: countryCode
                                                }

                                            },
                                            amount: {
                                                currency_code: 'USD',
                                                value: amount?.toFixed(2),
                                                breakdown: {
                                                    item_total: {
                                                        value: totalUSD?.toFixed(2),
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

                    {stage == 3 && <Box style={{ display: "flex", flexDirection: "column",  alignItems:"center", gap: 10 }}>
                        <h2 style={{textAlign:"center"}}>{trans?.checkout?.thanksfororder}</h2>
                        <span>{trans?.checkout?.orderNumber}: <strong>#{orderConfirmed?.id}</strong> </span>
                        <span>{trans?.checkout?.orderConfirmText}</span>
                        <StyledLink href='/shop/category/all'>
                            <Button>{trans?.checkout?.backToShopping}</Button>
                        </StyledLink>
                        <svg width="100%" height="auto" viewBox="0 0 933 660" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_301_447)">
                                <path d="M932.323 659.343H0C10.216 633.291 29.078 611.191 55.677 604.634C94.577 595.056 135.752 621.393 174.569 611.49C196.623 605.87 213.985 589.49 232.229 575.89C301.057 524.574 395.378 509.407 476.823 536.569C519.395 550.759 558.186 575.575 601.796 586.126C658.188 599.774 717.162 588.456 775.155 586.591C831.635 584.777 912.56 607.79 932.323 659.343Z" fill="#F3F5FD" />
                                <path d="M640.063 81.7471H394.664C375.872 81.7471 360.638 96.981 360.638 115.773V616.493C360.638 635.285 375.872 650.519 394.664 650.519H640.063C658.855 650.519 674.089 635.285 674.089 616.493V115.773C674.089 96.981 658.855 81.7471 640.063 81.7471Z" fill="white" />
                                <path d="M640.062 659.343H394.662C383.302 659.33 372.41 654.811 364.377 646.778C356.344 638.745 351.825 627.854 351.812 616.493V115.773C351.826 104.413 356.344 93.5217 364.377 85.4888C372.41 77.456 383.302 72.9373 394.662 72.9241H640.062C651.422 72.9373 662.314 77.456 670.347 85.4888C678.38 93.5217 682.898 104.413 682.912 115.773V616.493C682.899 627.854 678.38 638.745 670.347 646.778C662.314 654.811 651.422 659.33 640.062 659.343ZM394.664 90.5701C387.983 90.5783 381.578 93.2359 376.854 97.96C372.13 102.684 369.472 109.089 369.464 115.77V616.49C369.472 623.171 372.129 629.576 376.854 634.3C381.578 639.025 387.983 641.682 394.664 641.69H640.064C646.745 641.682 653.15 639.025 657.874 634.3C662.599 629.576 665.256 623.171 665.264 616.49V115.773C665.256 109.092 662.598 102.687 657.874 97.963C653.15 93.2389 646.745 90.5813 640.064 90.5731L394.664 90.5701Z" fill="#DBDBDB" />
                                <path d="M463.632 81.7471H571.094V102.6C571.092 106.738 569.447 110.706 566.521 113.631C563.594 116.556 559.626 118.2 555.488 118.2H479.238C475.1 118.2 471.132 116.556 468.205 113.631C465.279 110.706 463.634 106.738 463.632 102.6V81.7471Z" fill="#542564" />
                                <path d="M536.293 240.106C529.883 240.106 523.617 238.206 518.287 234.645C512.957 231.084 508.802 226.022 506.349 220.1C503.896 214.178 503.254 207.661 504.505 201.375C505.755 195.088 508.842 189.313 513.375 184.78C517.907 180.248 523.682 177.161 529.969 175.911C536.256 174.66 542.773 175.302 548.695 177.756C554.617 180.209 559.679 184.364 563.239 189.694C566.8 195.024 568.701 201.29 568.7 207.7C568.689 216.292 565.272 224.528 559.196 230.603C553.121 236.678 544.885 240.096 536.293 240.106ZM536.293 183.289C531.465 183.289 526.746 184.72 522.732 187.402C518.717 190.083 515.589 193.895 513.741 198.355C511.893 202.815 511.409 207.723 512.351 212.458C513.292 217.193 515.616 221.543 519.03 224.956C522.443 228.37 526.792 230.695 531.527 231.638C536.262 232.58 541.17 232.097 545.63 230.25C550.09 228.403 553.903 225.274 556.585 221.261C559.268 217.247 560.7 212.528 560.7 207.7C560.693 201.229 558.12 195.024 553.544 190.448C548.969 185.871 542.765 183.297 536.293 183.289Z" fill="#EFCF7C" />
                                <g opacity="0.12">
                                    <path d="M536.292 240.106C529.882 240.106 523.616 238.206 518.286 234.644C512.956 231.083 508.802 226.022 506.349 220.099C503.896 214.177 503.254 207.661 504.505 201.374C505.755 195.087 508.842 189.312 513.375 184.78C517.908 180.247 523.683 177.161 529.97 175.911C536.257 174.66 542.773 175.302 548.695 177.756C554.617 180.209 559.679 184.364 563.24 189.694C566.8 195.024 568.701 201.29 568.7 207.7C568.69 216.292 565.272 224.529 559.196 230.604C553.121 236.679 544.884 240.096 536.292 240.106ZM536.292 183.289C531.464 183.289 526.745 184.72 522.731 187.402C518.717 190.084 515.588 193.896 513.74 198.356C511.893 202.816 511.409 207.724 512.351 212.459C513.292 217.194 515.617 221.543 519.03 224.957C522.444 228.371 526.793 230.696 531.527 231.638C536.262 232.58 541.17 232.097 545.63 230.25C550.091 228.403 553.903 225.274 556.585 221.261C559.268 217.247 560.7 212.528 560.7 207.7C560.694 201.228 558.12 195.023 553.544 190.447C548.968 185.871 542.764 183.296 536.292 183.289Z" fill="black" />
                                </g>
                                <path d="M605.749 208.116H466.836V366.134H605.749V208.116Z" fill="#EFCF7C" />
                                <g opacity="0.12">
                                    <path d="M605.749 208.116H466.836V366.134H605.749V208.116Z" fill="black" />
                                </g>
                                <path d="M567.89 208.116H428.977V366.134H567.89V208.116Z" fill="#EFCF7C" />
                                <path d="M498.433 240.106C492.023 240.106 485.757 238.205 480.427 234.644C475.098 231.083 470.944 226.021 468.491 220.099C466.038 214.177 465.396 207.66 466.647 201.373C467.898 195.086 470.985 189.312 475.517 184.779C480.05 180.247 485.825 177.161 492.112 175.91C498.399 174.66 504.916 175.303 510.837 177.756C516.759 180.209 521.821 184.364 525.382 189.694C528.942 195.024 530.843 201.29 530.842 207.7C530.832 216.292 527.414 224.529 521.338 230.604C515.262 236.679 507.025 240.097 498.433 240.106ZM498.433 183.289C493.605 183.289 488.886 184.721 484.872 187.403C480.858 190.085 477.73 193.897 475.882 198.357C474.035 202.817 473.551 207.725 474.493 212.459C475.435 217.194 477.759 221.543 481.173 224.957C484.586 228.371 488.935 230.696 493.67 231.638C498.405 232.58 503.312 232.097 507.773 230.25C512.233 228.402 516.045 225.274 518.727 221.26C521.41 217.247 522.842 212.528 522.842 207.7C522.836 201.228 520.262 195.023 515.686 190.447C511.11 185.87 504.905 183.296 498.433 183.289Z" fill="#EFCF7C" />
                                <path d="M517.363 572.494C554.554 572.494 584.704 542.344 584.704 505.153C584.704 467.962 554.554 437.812 517.363 437.812C480.172 437.812 450.022 467.962 450.022 505.153C450.022 542.344 480.172 572.494 517.363 572.494Z" fill="#EBCB79" />
                                <path d="M505.816 541.92C504.413 541.92 503.063 541.383 502.042 540.42L476.462 516.283C475.924 515.791 475.489 515.196 475.183 514.534C474.877 513.872 474.706 513.156 474.679 512.427C474.652 511.699 474.771 510.972 475.028 510.289C475.285 509.607 475.675 508.982 476.175 508.452C476.675 507.921 477.276 507.495 477.943 507.199C478.609 506.903 479.328 506.743 480.057 506.727C480.786 506.712 481.511 506.841 482.19 507.108C482.868 507.375 483.487 507.775 484.01 508.283L505.51 528.571L550.416 479.087C550.901 478.55 551.487 478.113 552.14 477.803C552.794 477.493 553.502 477.314 554.225 477.278C554.948 477.242 555.671 477.349 556.352 477.592C557.033 477.836 557.66 478.212 558.196 478.698C558.732 479.184 559.166 479.772 559.475 480.426C559.783 481.081 559.96 481.79 559.994 482.513C560.028 483.235 559.919 483.958 559.673 484.638C559.427 485.319 559.05 485.945 558.562 486.479L509.888 540.116C509.397 540.658 508.802 541.096 508.139 541.405C507.477 541.714 506.759 541.888 506.028 541.916C505.958 541.919 505.886 541.92 505.816 541.92Z" fill="white" />
                                <path d="M182.565 95.6378C182.565 95.6378 179.6 83.7748 169.02 85.2858C156.455 87.0858 169.966 120.386 178.479 140.71C179.388 142.884 179.828 145.225 179.77 147.58C179.712 149.936 179.159 152.253 178.145 154.38C177.131 156.507 175.68 158.396 173.886 159.924C172.093 161.452 169.997 162.585 167.736 163.248C165.557 163.889 163.27 164.081 161.015 163.812C158.759 163.542 156.582 162.817 154.616 161.68C152.649 160.543 150.934 159.018 149.576 157.198C148.217 155.378 147.242 153.3 146.711 151.092C140.302 124.382 133.759 74.3437 162.377 71.2387C180.971 69.2207 183.605 87.6667 183.605 87.6667L182.565 95.6378Z" fill="#0F1011" />
                                <path d="M188.477 137.031C188.477 137.031 195.552 131.879 190.866 111.278L206.266 106.087C206.266 106.087 207.158 125.03 216.007 129.821L188.477 137.031Z" fill="#E98862" />
                                <g opacity="0.15">
                                    <path d="M212.205 126.376L197.63 118.2L207.935 116.619C208.738 120.109 210.186 123.418 212.205 126.376Z" fill="black" />
                                </g>
                                <path d="M180.738 104.477C182.738 110.645 187.038 116.141 192.913 117.387C199.338 118.932 206.044 118.881 212.445 117.239C229.557 113.347 220.509 74.4678 211.197 67.9948C201.885 61.5218 178.452 69.8098 177.344 83.0188C176.771 89.8508 178.836 98.6058 180.738 104.477Z" fill="#E98862" />
                                <path d="M204.604 96.0828C205.404 96.0828 206.053 95.4341 206.053 94.6338C206.053 93.8336 205.404 93.1848 204.604 93.1848C203.804 93.1848 203.155 93.8336 203.155 94.6338C203.155 95.4341 203.804 96.0828 204.604 96.0828Z" fill="#0F1011" />
                                <path d="M215.788 93.5386C216.588 93.5386 217.237 92.8899 217.237 92.0896C217.237 91.2894 216.588 90.6406 215.788 90.6406C214.988 90.6406 214.339 91.2894 214.339 92.0896C214.339 92.8899 214.988 93.5386 215.788 93.5386Z" fill="#0F1011" />
                                <path d="M213.933 89.1797C213.761 89.179 213.595 89.1127 213.469 88.9944C213.344 88.8761 213.268 88.7145 213.257 88.5424C213.246 88.3702 213.3 88.2003 213.41 88.0669C213.519 87.9335 213.675 87.8466 213.846 87.8237L217.653 87.3237C217.743 87.3093 217.835 87.3131 217.923 87.3349C218.012 87.3567 218.095 87.396 218.168 87.4505C218.241 87.5049 218.302 87.5735 218.348 87.6522C218.394 87.7308 218.424 87.8178 218.436 87.9081C218.448 87.9985 218.441 88.0903 218.417 88.178C218.393 88.2658 218.351 88.3478 218.294 88.4192C218.238 88.4906 218.167 88.5499 218.087 88.5937C218.008 88.6374 217.92 88.6646 217.829 88.6738L214.022 89.1738C213.993 89.1777 213.963 89.1797 213.933 89.1797Z" fill="#0F1011" />
                                <path d="M201.042 92.4828C200.883 92.4834 200.73 92.4285 200.607 92.3277C200.485 92.2268 200.401 92.0863 200.372 91.9305C200.342 91.7747 200.367 91.6134 200.444 91.4744C200.521 91.3355 200.643 91.2278 200.791 91.1698L204.408 89.7328C204.492 89.6963 204.582 89.677 204.674 89.6761C204.765 89.6752 204.856 89.6927 204.94 89.7276C205.025 89.7625 205.101 89.8141 205.166 89.8792C205.23 89.9444 205.28 90.0218 205.314 90.1069C205.347 90.1919 205.363 90.2829 205.361 90.3743C205.359 90.4657 205.338 90.5557 205.3 90.6389C205.262 90.7222 205.208 90.7969 205.141 90.8588C205.073 90.9206 204.994 90.9682 204.908 90.9988L201.291 92.4348C201.212 92.4665 201.127 92.4828 201.042 92.4828Z" fill="#0F1011" />
                                <path d="M206.881 105.836C206.881 105.836 212.256 105.636 215.781 103.811C215.781 103.811 216.25 107.303 212.109 108.245C207.968 109.187 206.881 105.836 206.881 105.836Z" fill="white" />
                                <path d="M190.047 86.4278C195.678 115.066 192.147 118.61 192.147 118.61C192.147 118.61 176.488 112 172.131 94.9398C168.047 78.9478 178.647 67.6468 186.476 64.6838C216.228 53.4218 223.616 80.9188 223.616 80.9188C208.8 87.0688 186.8 87.4798 186.8 87.4798" fill="#0F1011" />
                                <path d="M197.644 99.2099C198.005 100.799 197.721 102.466 196.853 103.845C195.985 105.223 194.605 106.201 193.017 106.562C191.428 106.924 189.761 106.639 188.382 105.771C187.003 104.904 186.025 103.524 185.664 101.935C185.471 101.148 185.438 100.33 185.568 99.5295C185.697 98.7294 185.987 97.9635 186.418 97.2775C186.85 96.5915 187.415 95.9994 188.081 95.5365C188.746 95.0736 189.498 94.7493 190.291 94.5829C194.605 93.8219 196.891 95.8999 197.644 99.2099Z" fill="#E98862" />
                                <g opacity="0.15">
                                    <path d="M212.037 101.686C211.924 101.685 211.814 101.647 211.725 101.575C211.637 101.504 211.575 101.405 211.551 101.295C211.526 101.184 211.54 101.068 211.59 100.966C211.64 100.864 211.723 100.782 211.825 100.734L214.614 99.4209L211.924 95.1679C211.853 95.0557 211.83 94.9199 211.859 94.7904C211.888 94.6609 211.967 94.5483 212.08 94.4774C212.192 94.4064 212.328 94.383 212.457 94.4121C212.587 94.4413 212.699 94.5207 212.77 94.6329L215.762 99.3649C215.8 99.4248 215.825 99.4922 215.835 99.5624C215.845 99.6326 215.839 99.7042 215.82 99.7723C215.8 99.8404 215.766 99.9035 215.719 99.9574C215.673 100.011 215.616 100.055 215.552 100.085L212.252 101.638C212.185 101.67 212.111 101.686 212.037 101.686Z" fill="black" />
                                </g>
                                <path d="M171.374 87.6729C170.717 87.673 170.087 87.4147 169.619 86.9538C169.151 86.4929 168.884 85.8665 168.874 85.2099C168.935 80.5477 170.562 76.0415 173.494 72.4159C173.927 71.9137 174.542 71.6041 175.203 71.5552C175.864 71.5062 176.518 71.722 177.02 72.1549C177.522 72.5879 177.832 73.2026 177.881 73.8639C177.93 74.5251 177.714 75.1787 177.281 75.6809C175.152 78.3806 173.956 81.6985 173.874 85.1359C173.879 85.4642 173.819 85.7903 173.698 86.0955C173.577 86.4007 173.397 86.679 173.168 86.9146C172.939 87.1502 172.666 87.3384 172.365 87.4685C172.063 87.5986 171.739 87.6681 171.411 87.6729H171.374Z" fill="#262626" />
                                <path d="M249.835 28.2319L260.942 24.1229C260.942 24.1229 262.342 8.86689 249.532 0.799893C245.286 -1.87311 242.188 2.87889 242.966 4.43089C245.537 9.56089 248.586 14.2819 248.525 19.2119C246.883 17.6789 244.515 15.7179 243.817 16.4329C241.981 18.3139 249.835 28.2319 249.835 28.2319Z" fill="#E98862" />
                                <path d="M85.315 366.963C84.699 366.838 82.822 366.463 65.015 360.596L71.582 340.648C79.133 343.135 88.216 346.048 89.724 346.433C89.629 346.409 89.549 346.393 89.486 346.381L85.315 366.963Z" fill="#E98862" />
                                <path d="M51.008 384.194C50.8755 384.743 50.8576 385.313 50.9554 385.869C51.0532 386.426 51.2646 386.956 51.5764 387.426C51.8883 387.897 52.2938 388.299 52.7678 388.606C53.2417 388.913 53.7739 389.119 54.331 389.211C55.1033 389.339 55.8959 389.243 56.6157 388.936C57.3355 388.628 57.9525 388.121 58.394 387.475L72.194 365.702C72.4596 365.28 72.6308 364.805 72.6959 364.31C72.7609 363.815 72.7184 363.313 72.571 362.836C71.111 359.016 70.9157 354.828 72.014 350.888C72.9955 347.851 74.8109 345.15 77.253 343.095C77.4881 342.919 77.6683 342.68 77.7726 342.406C77.877 342.132 77.9012 341.834 77.8423 341.546C77.7835 341.259 77.6441 340.994 77.4404 340.783C77.2367 340.572 76.9772 340.423 76.692 340.354L65.087 337.493C64.7446 337.409 64.389 337.393 64.0404 337.446C63.6918 337.499 63.3572 337.621 63.0558 337.804C62.7544 337.987 62.4921 338.228 62.284 338.513C62.0759 338.797 61.926 339.12 61.843 339.463L51.008 384.194Z" fill="#9B4524" />
                                <path d="M240.074 510.913L220.8 502.585C223.952 495.285 227.673 486.504 228.187 485.035C228.155 485.129 228.132 485.207 228.113 485.268L248.24 491.268C248.057 491.866 247.51 493.7 240.074 510.913Z" fill="#E98862" />
                                <path d="M262.322 526.978C262.857 527.16 263.424 527.23 263.987 527.183C264.551 527.135 265.098 526.973 265.596 526.704C266.093 526.436 266.53 526.068 266.878 525.623C267.227 525.178 267.48 524.666 267.622 524.119C267.818 523.361 267.794 522.564 267.552 521.82C267.31 521.076 266.86 520.416 266.256 519.919L245.809 504.219C245.412 503.916 244.955 503.703 244.468 503.594C243.982 503.485 243.477 503.482 242.989 503.586C239.053 504.698 234.864 504.517 231.039 503.07C228.102 501.82 225.575 499.769 223.747 497.153C223.593 496.903 223.371 496.702 223.107 496.574C222.844 496.446 222.549 496.395 222.257 496.428C221.966 496.46 221.69 496.576 221.461 496.759C221.232 496.943 221.061 497.188 220.966 497.466L217.076 508.766C216.961 509.099 216.914 509.452 216.936 509.804C216.958 510.156 217.049 510.5 217.204 510.817C217.359 511.133 217.576 511.416 217.84 511.649C218.105 511.882 218.413 512.06 218.747 512.174L262.322 526.978Z" fill="#9B4524" />
                                <path d="M284.5 376.9C283.469 354.133 262.391 250.547 260.158 239.376L184.518 242.8C184.518 242.8 159.443 340.319 158.424 343.036L85.7411 337.886L78.2891 374.128L168.176 389.286C172.964 390.46 178.013 389.916 182.44 387.747C186.868 385.578 190.393 381.923 192.4 377.42C192.4 377.42 220.982 293.4 221.558 291.851L245.075 369.8L218.522 489.616L253.852 500.606C253.852 500.606 284.916 386.107 284.5 376.9Z" fill="#262626" />
                                <path d="M115.065 58.4229L103.245 59.1509C103.245 59.1509 97.045 43.9009 105.501 31.3509C108.301 27.1899 113.059 30.2859 112.974 32.0199C112.695 37.7509 110.574 45.1609 112.619 49.6469C113.502 47.5809 114.876 44.8299 115.803 45.2019C118.243 46.1769 115.065 58.4229 115.065 58.4229Z" fill="#E98862" />
                                <path d="M285.594 83.7279L264.809 18.3279L244.03 24.9279L263.066 84.8279L230.727 125.949C227.855 125.55 224.942 125.558 222.072 125.973C221.452 126.053 220.462 126.203 219.172 126.403C219.852 131.863 186.292 137.683 184.612 132.283C180.353 132.983 176.238 134.377 172.43 136.409L129.049 111.422L117.714 51.9489L96.3 56.0309L108.571 120.417C108.864 121.958 109.487 123.417 110.396 124.695C111.305 125.973 112.479 127.04 113.838 127.823L160.411 154.649C159.811 170.631 175.687 188.863 178.576 205.515C182.176 226.215 174.436 237.115 176.966 247.615C180.956 264.115 261.376 246.065 263.866 235.865C266.416 225.345 256.736 220.825 251.546 188.775C249.078 173.52 250.431 154.44 246.42 141.275L283.778 93.7749C284.878 92.3757 285.619 90.7285 285.935 88.9772C286.252 87.2258 286.135 85.4235 285.594 83.7279Z" fill="#C44803" />
                                <path d="M209.3 142.525C197.32 145.425 186.29 137.685 184.61 132.285C184.622 132.277 184.636 132.273 184.65 132.275C196.58 130.195 212.2 127.505 219.17 126.405C219.852 131.865 218.282 140.345 209.3 142.525Z" fill="#E98862" />
                                <path d="M758.411 559.574H748.269V659.343H758.411V559.574Z" fill="#C1D8ED" />
                                <path d="M750.065 559.574H739.923V659.343H750.065V559.574Z" fill="#DEE8F5" />
                                <path d="M884.733 559.574H874.591V659.343H884.733V559.574Z" fill="#C1D8ED" />
                                <path d="M876.386 559.574H866.244V659.343H876.386V559.574Z" fill="#DEE8F5" />
                                <path d="M786.227 559.574H776.085V659.343H786.227V559.574Z" fill="#C1D8ED" />
                                <path d="M777.881 559.574H767.739V659.343H777.881V559.574Z" fill="#DEE8F5" />
                                <path d="M912.549 559.574H902.407V659.343H912.549V559.574Z" fill="#C1D8ED" />
                                <path d="M904.203 559.574H894.061V659.343H904.203V559.574Z" fill="#DEE8F5" />
                                <path d="M912.548 495.712H776.148V561.966H912.548V495.712Z" fill="#C1D8ED" />
                                <path d="M876.323 495.712H739.923V561.966H876.323V495.712Z" fill="#DEE8F5" />
                                <g opacity="0.53">
                                    <path d="M868.984 505.13H747.26V552.254H868.984V505.13Z" fill="#F3F5FD" />
                                </g>
                                <path d="M808.122 534.098C811.108 534.098 813.528 531.678 813.528 528.692C813.528 525.706 811.108 523.286 808.122 523.286C805.136 523.286 802.716 525.706 802.716 528.692C802.716 531.678 805.136 534.098 808.122 534.098Z" fill="white" />
                                <path d="M796.016 429.827L785.71 432.264L798.631 486.913L808.937 484.476L796.016 429.827Z" fill="#F0F6FF" />
                                <path d="M807.356 425.59L798.507 473.558L804.228 474.614L813.077 426.646L807.356 425.59Z" fill="#C1D8ED" />
                                <path d="M807.36 425.576L806.353 430.867L812.068 431.954L813.075 426.663L807.36 425.576Z" fill="#DEE8F5" />
                                <path d="M789.642 437.773L786.464 439.025L805.005 486.088L808.183 484.837L789.642 437.773Z" fill="#0CBC8B" />
                                <path d="M813.528 458.373H785.58V494.093H813.528V458.373Z" fill="#C1D8ED" />
                            </g>
                            <defs>
                                <clipPath id="clip0_301_447">
                                    <rect width="932.323" height="659.343" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <br/>
                      
                        

                    </Box>}
                </form>

            </Box>
            <Box style={{ flex: 3, padding: "2% 6%", fontFamily: "'Manrope', serif", background: gray.gray4, color: gray.gray12 }}>
                <Box>

                    <h4>{trans?.common?.items}</h4>
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
                            <img alt='' style={{ backgroundColor: sand.sand4, borderRadius: 4, border: `1px solid ${gray.gray8}`, width: "100%" }} src={item?.image}></img>
                        </Box>

                        <Box style={{ flex: 5, display: "flex", flexWrap: "wrap", width: "100%" }}>
                            <Box style={{ dislay: "flex", flex: 1, flexDirection: "column" }}>
                                <h4 style={{ margin: 0, whiteSpace: 'nowrap', color: gray.gray11 }}>{router.locale === 'vi-VN' ? item?.product_data?.vi_title : item?.product_data?.en_title}</h4>
                                <h5 style={{ color: sand.sand11, margin: 0, whiteSpace: 'nowrap', padding: 0, }}>{item?.product_data?.selectedVariant?.title} x {item?.quantity}</h5>
                            </Box>
                            <Box style={{ dislay: "flex", background: "#eee", minWidth: 50, textAlign: "right" }}>
                                <h4 style={{ margin: 0, fontWeight: 400, whiteSpace: 'nowrap', textAlign: "center" }}>{new Intl.NumberFormat(router.locale, { style: 'currency', currency: currentCurrencyCode(item?.product_data) }).format(item.value)}</h4>
                            </Box>
                        </Box>

                    </Box>)}

                    <Box style={{ display: "flex", width: "100%", marginTop: 10, borderTop: `1px solid ${sand.sand7}`, justifyContent: "space-between", alignItems: "center" }}>

                        <h4 style={{ marginTop: 10 }}> {trans?.common?.shipping} </h4>
                        <h4 style={{ marginTop: 10, fontWeight: 300 }}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCodeByShippingCountry() }).format(getShippingPrice())}</h4>

                    </Box>

                    <Box style={{ display: "flex", width: "100%", marginTop: 10, borderTop: `1px solid ${sand.sand7}`, justifyContent: "space-between", alignItems: "center" }}>

                        <h3 style={{ marginTop: 10 }}>{trans?.common?.total}</h3>
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