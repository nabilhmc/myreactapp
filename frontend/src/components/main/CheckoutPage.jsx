// @ts-nocheck

import { Badge, Container, Stack, Box, Paper, Typography, Avatar, TextField, Divider, Button, useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CircularProgress } from '@mui/material';
import axios from 'axios'; // Import Axios
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';




const CheckoutPage = () => {

    const [selectedPaper, setSelectedPaper] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedHome, setSelectedHome] = useState(null);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [selectedHome1, setSelectedHome1] = useState(null);
    const [selectedOffice1, setSelectedOffice1] = useState(null);
    const [selectedWilaya, setSelectedWilaya] = useState(null); // Add this line
    const [paperOptionsDisabled, setPaperOptionsDisabled] = useState(false);
    const cart = useSelector(state => state.cart.products);
    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

    const theme = useTheme()
    const borderStyle = selectedPaper === 'yalidine' ? "2px solid black" : "none";
    const borderColor = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStyleHome = selectedHome === 'home' ? "2px solid black" : "none";
    const borderColor1 = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStyleOffice = selectedOffice === 'office' ? "2px solid black" : "none";
    const borderColor2 = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStyleHome1 = selectedHome1 === 'home1' ? "2px solid black" : "none";
    const borderColor3 = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStyleOffice1 = selectedOffice1 === 'office1' ? "2px solid black" : "none";
    const borderColor4 = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStylePaper = selectedPaper === 'zexpress' ? "2px solid black" : "none";
    const borderColor5 = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStylePayment = selectedPayment === 'baridimob' ? "2px solid black" : "none";
    const borderColor6 = theme.palette.mode === 'dark' ? "white" : "black";
    const borderStylePayment1 = selectedPayment === 'ccp' ? "2px solid black" : "none";
    const borderColor7 = theme.palette.mode === 'dark' ? "white" : "black";




    const handlePaymentClick = (payment) => {
        setSelectedPayment((prevpayment) => (prevpayment === payment ? null : payment));
    };


    const disabledOptionStyle = {
        opacity: 0.5,
        cursor: 'not-allowed'
    };

    const handleWilayaChange = (wilaya) => {
        setSelectedWilaya(wilaya);
    };

    const currencies = [
        { value: 'Adrar', label: 'Adrar' },
        { value: 'Chlef', label: 'Chlef' },
        { value: 'Laghouat', label: 'Laghouat' },
        { value: 'Oum El Bouaghi', label: 'Oum El Bouaghi' },
        { value: 'Batna', label: 'Batna' },
        { value: 'Béjaïa', label: 'Béjaïa' },
        { value: 'Biskra', label: 'Biskra' },
        { value: 'Béchar', label: 'Béchar' },
        { value: 'Blida', label: 'Blida' },
        { value: 'Bouira', label: 'Bouira' },
        { value: 'Tamanrasset', label: 'Tamanrasset' },
        { value: 'Tébessa', label: 'Tébessa' },
        { value: 'Tlemcen', label: 'Tlemcen' },
        { value: 'Tiaret', label: 'Tiaret' },
        { value: 'Tizi Ouzou', label: 'Tizi Ouzou' },
        { value: 'Alger', label: 'Algiers (Alger)' },
        { value: 'Djelfa', label: 'Djelfa' },
        { value: 'Jijel', label: 'Jijel' },
        { value: 'Sétif', label: 'Sétif' },
        { value: 'Saïda', label: 'Saïda' },
        { value: 'Skikda', label: 'Skikda' },
        { value: 'Sidi Bel Abbès', label: 'Sidi Bel Abbès' },
        { value: 'Annaba', label: 'Annaba' },
        { value: 'Guelma', label: 'Guelma' },
        { value: 'Constantine', label: 'Constantine' },
        { value: 'Médéa', label: 'Médéa' },
        { value: 'Mostaganem', label: 'Mostaganem' },
        { value: 'M\'Sila', label: 'M\'Sila' },
        { value: 'Mascara', label: 'Mascara' },
        { value: 'Ouargla', label: 'Ouargla' },
        { value: 'Oran', label: 'Oran' },
        { value: 'El Bayadh', label: 'El Bayadh' },
        { value: 'Illizi', label: 'Illizi' },
        { value: 'Bordj Bou Arréridj', label: 'Bordj Bou Arréridj' },
        { value: 'Boumerdès', label: 'Boumerdès' },
        { value: 'El Taref', label: 'El Taref' },
        { value: 'Tindouf', label: 'Tindouf' },
        { value: 'Tissemsilt', label: 'Tissemsilt' },
        { value: 'El Oued', label: 'El Oued' },
        { value: 'Khenchela', label: 'Khenchela' },
        { value: 'Souk Ahras', label: 'Souk Ahras' },
        { value: 'Tipaza', label: 'Tipaza' },
        { value: 'Mila', label: 'Mila' },
        { value: 'Aïn Defla', label: 'Aïn Defla' },
        { value: 'Naâma', label: 'Naâma' },
        { value: 'Aïn Témouchent', label: 'Aïn Témouchent' },
        { value: 'Ghardaïa', label: 'Ghardaïa' },
        { value: 'Relizane', label: 'Relizane' }
    ];

    const shippingPrices = {
        Adrar: 10,
        Chlef: 200,
        blida: 10,
    };

    const calculateShippingPrice = () => {
        if (selectedWilaya && selectedWilaya in shippingPrices) {
            return shippingPrices[selectedWilaya];
        }
        return 0; // Default shipping price
    };

    const isScreenUnder1000px = useMediaQuery('(max-width:1000px)');
    const isScreenUnder1180px = useMediaQuery('(max-width:1180px)');
    const isScreenUnder500px = useMediaQuery('(max-width:500px)');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [orderId, setOrderId] = useState(null);



    const handelepayment = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Check if a paper is selected and one option is selected
        if (!selectedPaper || !selectedOptions || !selectedPayment) {

            return; // Exit early if the conditions are not met
        }

        setIsSubmitted(true); // Set isSubmitted to true when the submit button is clicked
        // Extract product names and quantities from the cart

        const products = cart.map(item => ({
            id: item.id,
            name: item.title,
            quantity: item.quantity,
            price: item.price,

        }));




        // Simulate a delay for 3 seconds before processing the submit action
        setTimeout(async () => {
            try {
                const res = await axios.post("http://localhost:1337/api/orders", {
                    email,
                    phoneNumber,
                    firstName,
                    lastName,
                    selectedPaper,
                    selectedOptions,
                    selectedPayment,
                    products,


                });
                console.log("Response:", res.data); // Log the response data

                const newOrderId = res.data.order.id;
                setOrderId(newOrderId);


                if (res.data.successUrl) {
                    // Redirect the user to the success page with the new order ID
                    const successUrlWithOrderId = `${res.data.successUrl}?orderId=${newOrderId}`;
                    window.location.href = successUrlWithOrderId;
                } else {
                    // Handle the case where success URL is not provided
                    console.error("Success URL not found in the response.");
                }





            } catch (err) {
                console.error("Error:", err);
            } finally {
                setIsSubmitted(false); // Set isSubmitted to false after the submit action is processed
            }
        }, 3000); // 3 seconds delay
    };

    const handlePaperClick = (paper) => {
        setSelectedPaper((prevPaper) => (prevPaper === paper ? null : paper));
        setSelectedHome(null);
        setSelectedOffice(null);
        setSelectedHome1(null);
        setSelectedOffice1(null);
    };
    const handleHomeClick = (home) => {
        const homeValue = 'Livraison à domicile'; // New value for home
    
        if (selectedPaper === 'yalidine') {
            setSelectedOptions(homeValue); // Update selectedOptions with the new home value
            setSelectedHome((prevhome) => (prevhome === home ? null : home)); // Toggle selectedHome
            setSelectedOffice(null); // Deselect office
        } else if (!selectedPaper) {
            setSelectedOptions(homeValue); // Update selectedOptions with the new home value
            setSelectedHome((prevhome) => (prevhome === home ? null : home)); // Toggle selectedHome
        }
    };


    const handleOfficeClick = (office) => {
        const officeValue = 'livraison au bureau'; // New value for office

        if (selectedPaper === 'zexpress') {
            setSelectedOptions(officeValue); // Update selectedOptions with the new office value
            setSelectedHome(null); // Deselect home
        } else if (selectedPaper === 'yalidine') {
            setSelectedOptions(officeValue); // Update selectedOptions with the new office value
            setSelectedOffice((prevoffice) => (prevoffice === office ? null : office)); // Toggle selectedOffice
            setSelectedHome(null); // Deselect home
        } else {
            setSelectedOptions(officeValue); // Update selectedOptions with the new office value
            setSelectedOffice((prevoffice) => (prevoffice === office ? null : office)); // Toggle selectedOffice
        }
    };

    const handleHomeClick1 = (home1) => {
        const homeValue = 'Livraison à domicile'; // New value for home

        if (selectedPaper === 'zexpress') {
            setSelectedHome1(home1);
            setSelectedOffice1(null); // Deselect office1
            setSelectedOptions(homeValue); // Update selectedOptions with the new home value
        } else {
            setSelectedHome1((prevhome1) => (prevhome1 === home1 ? null : home1));
            setSelectedOptions(selectedHome1 === home1 ? null : home1); // Update selectedOptions
        }
    };

    const handleOfficeClick1 = (office1) => {
        const officeValue = 'Livraison au bureau'; // New value for office

        if (selectedPaper === 'zexpress') {
            setSelectedOffice1(office1);
            setSelectedHome1(null); // Deselect home1
            setSelectedOptions(officeValue); // Update selectedOptions with the new office value
        } else {
            setSelectedOffice1((prevoffice1) => (prevoffice1 === office1 ? null : office1));
            setSelectedOptions(selectedOffice1 === office1 ? null : office1); // Update selectedOptions
        }
    };




    return (



        <Container sx={{ pt: 3, mt: 1 }} >




            <div style={{ opacity: isSubmitted ? 0.5 : 1, filter: isSubmitted ? 'blur(4px)' : 'none' }}>



                <form onSubmit={handelepayment}>




                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>







                        {/* Screen 1000px and Up */}


                        {!isScreenUnder1000px && (
                            <>
                                <Alert sx={{ ".MuiAlert-icon": { color: "#fff" }, color: "#fff", p: 1, bgcolor: "#2B3445", width: "60%" }}
                                    severity="info">Remplissez correctement vos informations pour confirmer votre commande
                                    .</Alert>

                                <Paper className="Firstone" sx={{
                                    padding: 2,
                                    width: isScreenUnder1000px ? '100%' : '60%', // Width adjusted based on screen size
                                    mr: 2,
                                    height: 250,




                                }} elevation={3}>


                                    <Stack alignItems="center" direction="row" gap={1}>
                                        <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>1</Avatar>
                                        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Vos informations</Typography>
                                    </Stack>
                                    <Stack sx={{ mt: 2 }} direction="flex" alignItems="center" gap={2}>
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            label="Votre Prénom"
                                            value={firstName}
                                            required
                                            variant="outlined"

                                            onChange={(e) => setFirstName(e.target.value)}

                                        />
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            label="Votre Nom"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <Stack sx={{ mt: 2 }} direction="flex" alignItems="center" gap={2}>
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            label="numéro de téléphone"
                                            required
                                            type="number"
                                            variant="outlined"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />

                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            required

                                            label="Email"
                                            type="email" // Set the type to "email" for email validation
                                            value={email}

                                            onChange={(e) => setEmail(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <Stack sx={{ mt: 2 }} direction="flex" alignItems="center" gap={2}>
                                        <TextField
                                            select
                                            value={selectedWilaya}
                                            onChange={(e) => handleWilayaChange(e.target.value)}
                                            id="outlined-select-currency" select label="Wilaya" size="small" style={{ width: 300 }}>
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField style={{ width: 300 }} size="small" id="outlined-basic" label="Baladiya" variant="outlined" />
                                    </Stack>


                                </Paper>

                                <Paper className="the4"
                                    elevation={0}
                                    sx={{
                                        width: "38%",
                                        bgcolor: "transparent",
                                        height: "310px",
                                        overflowY: "auto",



                                    }}>
                                    <Typography sx={{ fontWeight: 700 }}>Votre Commande</Typography>
                                    {/* Render each item in the cart */}
                                    {cart.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                                <Box display="flex" gap={0.5}>
                                                    <Typography>{item.quantity}</Typography>
                                                    <Typography>x</Typography>
                                                    <Typography>{item.title}</Typography>
                                                </Box>
                                                <Typography>{item.quantity * item.price}DA</Typography>
                                            </Stack>
                                            {index !== cart.length - 1}
                                        </React.Fragment>
                                    ))}
                                    <Divider sx={{ margin: 3 }} orientation="horizontal" flexItem />
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Prix:</Typography>
                                        </Box>
                                        <Typography>{totalPrice.toFixed()}DA</Typography>
                                    </Stack>
                                    {/* Render shipping price, discount, and total */}
                                    {/* Add your logic to calculate shipping price and discount */}
                                    {/* Example: */}
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Livraison:</Typography>
                                        </Box>
                                        <Typography>{calculateShippingPrice()}DA</Typography>
                                    </Stack>
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Discount:</Typography>
                                        </Box>
                                        <Typography>-</Typography>
                                    </Stack>
                                    <Divider sx={{ margin: 3 }} orientation="horizontal" flexItem />
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Prix Total:</Typography>
                                        </Box>
                                        <Typography>{(totalPrice + calculateShippingPrice()).toFixed()}DA</Typography>
                                    </Stack>
                                </Paper>

                                <Paper className="Second"
                                    sx={{
                                        padding: 2,
                                        mt: isScreenUnder1000px ? -35 : -5,
                                        width: isScreenUnder1000px ? '100%' : '60%',
                                        mr: 0,
                                        height: '400px',
                                        overflowY: 'auto',


                                    }}

                                    elevation={3}>
                                    <Stack alignItems="center" direction="row" gap={1}>
                                        <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>2</Avatar>
                                        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Entreprise de livraison (sélectionnez-en une) </Typography>
                                    </Stack>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            '& > :not(style)': {
                                                m: 1,
                                                width: isScreenUnder1180px ? '230px' : '300px',
                                                height: 128,
                                                mt: 5,
                                                bgcolor: theme.palette.paper.main,
                                            },
                                        }}
                                    >

                                        <Paper

                                            onClick={() => handlePaperClick('yalidine')}
                                            elevation={3}
                                            sx={{
                                                cursor: "pointer",
                                                border: borderStyle,
                                                borderColor: borderColor,






                                            }} >
                                            <Stack alignItems={"center"} sx={{ mt: 5.5 }}  >
                                                <img width={"170"} src="https://res.cloudinary.com/damicjacf/image/upload/v1710178113/yalidine-logo_znfghk.png" alt="" />
                                            </Stack>
                                        </Paper>
                                        <Paper
                                            onClick={() => handlePaperClick('zexpress')}
                                            elevation={3} sx={{
                                                cursor: "pointer",
                                                border: borderStylePaper,
                                                borderColor: borderColor5,
                                            }}
                                        >
                                            <Stack alignItems={"center"} sx={{ mt: 3 }}  >
                                                <img width={"160"} src="https://res.cloudinary.com/damicjacf/image/upload/v1710178116/logo-zexpress_tjrzjz.png" alt="" />
                                            </Stack>
                                        </Paper>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            '& > :not(style)': {
                                                m: 1,
                                                width: isScreenUnder1180px ? '230px' : '300px',
                                                height: 50,
                                                mt: 1,
                                                bgcolor: theme.palette.paper.main,

                                            },
                                        }}
                                    >

                                        <Paper
                                            onClick={() => handleHomeClick('home')}
                                            elevation={3}
                                            sx={{
                                                cursor: selectedPaper === null ? 'not-allowed' : selectedPaper === 'yalidine' ? 'pointer' : selectedPaper === 'zexpress' ? 'not-allowed' : 'pointer',
                                                border: borderStyleHome,
                                                borderColor: borderColor1,
                                                opacity: selectedPaper === null ? 0.5 : selectedPaper === 'yalidine' ? 1 : selectedPaper === 'zexpress' ? 0.5 : 1
                                            }} >
                                            <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                <Typography>Livraison à domicile </Typography>
                                            </Stack>
                                        </Paper>
                                        <Paper
                                            onClick={() => handleHomeClick1('home1')}
                                            elevation={3}
                                            sx={{
                                                cursor: selectedPaper === null ? 'not-allowed' : selectedPaper === 'yalidine' ? 'not-allowed' : 'pointer',
                                                border: borderStyleHome1,
                                                borderColor: borderColor3,
                                                opacity:selectedPaper === null ? 0.5 : selectedPaper === 'yalidine' ? 0.5 : 1,

                                            }}  >
                                            <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                <Typography>Livraison à domicile </Typography>
                                            </Stack>
                                        </Paper>
                                        <Paper
                                            onClick={() => handleOfficeClick('office')}
                                            elevation={3}
                                            sx={{
                                                cursor: selectedPaper === null ? 'not-allowed' : selectedPaper === 'zexpress' ? 'not-allowed' : 'pointer',
                                                border: borderStyleOffice,
                                                borderColor: borderColor2,
                                                opacity: selectedPaper === null ? 0.5 : selectedPaper === 'zexpress' ? 0.5 : 1

                                            }} >
                                            <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                <Typography>livraison au bureau </Typography>
                                            </Stack>
                                        </Paper>
                                        <Paper
                                            onClick={() => handleOfficeClick1('office1')}
                                            elevation={3}
                                            sx={{
                                                cursor: selectedPaper === null ? 'not-allowed' :  selectedPaper === 'yalidine' ? 'not-allowed' : 'pointer',
                                                border: borderStyleOffice1,
                                                borderColor: borderColor4,
                                                opacity: selectedPaper === null ? 0.5 : selectedPaper === 'yalidine' ? 0.5 : 1
                                            }}  >
                                            <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                <Typography>livraison au bureau </Typography>
                                            </Stack>
                                        </Paper>
                                    </Box>

                                </Paper>

                                <Paper className="thethird"

                                    sx={{
                                        padding: 2,
                                        mt: 2,
                                        mb: 2,
                                        width: isScreenUnder1000px ? '100%' : '60%',
                                        mr: 2,
                                        height: 300,

                                    }}
                                    elevation={3}>
                                    <Stack alignItems="center" direction="row" gap={1}>
                                        <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>3</Avatar>
                                        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}> Informations de paiement (sélectionnez-en une) </Typography>
                                    </Stack>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            '& > :not(style)': {
                                                m: 1,

                                                width: isScreenUnder1180px ? '230px' : '300px',
                                                height: 128,
                                                mt: 5,
                                                bgcolor: theme.palette.paper.main,
                                            },
                                        }}
                                    >

                                        <Paper

                                            onClick={() => handlePaymentClick('baridimob')}
                                            elevation={3} sx={{
                                                cursor: "pointer",
                                                border: borderStylePayment,
                                                borderColor: borderColor6,
                                            }}
                                        >
                                            <Stack alignItems={"center"} sx={{ mt: 2 }}  >
                                                <Typography>BaridiMob (Algerie post) </Typography>
                                                <Typography sx={{ mt: 3 }}>00799999001779775703</Typography>
                                            </Stack>
                                        </Paper>
                                        <Paper


                                            onClick={() => handlePaymentClick('ccp')}
                                            elevation={3} sx={{
                                                cursor: "pointer",
                                                border: borderStylePayment1,
                                                borderColor: borderColor7,
                                            }}
                                        >
                                            <Stack alignItems={"center"} sx={{ mt: 2 }}  >
                                                <Typography>CCP (Algerie post)</Typography>
                                                <Typography sx={{ ml: isScreenUnder1180px ? '30px' : "0px", mt: isScreenUnder1180px ? '14px' : '20px', }} >001779775703 (Hamici Djihene) </Typography>
                                            </Stack>
                                        </Paper>
                                    </Box>

                                    <Stack alignItems={"center"} >

                                        <Button
                                            type="submit"
                                            disabled={
                                                cart.length === 0 || // Disable if cart is empty
                                                !selectedPaper ||
                                                !selectedPayment || // Ensure a payment method is selected
                                                ((selectedPaper === 'yalidine' && !selectedOptions && !selectedHome) ||
                                                    (selectedPaper === 'zexpress' && !selectedOptions && (!selectedHome1 && !selectedOffice1))) ||
                                                isSubmitted
                                            }

                                            sx={{
                                                width: "100%",
                                                mt: 4,
                                                textTransform: "capitalize",
                                                fontSize: "15px",
                                                bgcolor: "rgb(210, 63, 87)",
                                                color: "rgb(255, 255, 255)",
                                                borderRadius: "6px",
                                                ":hover": { border: "1px solid black", transition: "0.2s", bgcolor: "#2B3445", color: "#fff" },

                                            }}
                                        >
                                            Commandez maintenant
                                        </Button>
                                    </Stack>




                                </Paper>



                            </>
                        )}


                        {/* Screen 1000px and Down */}

                        {isScreenUnder1000px && (
                            <>
                                <Alert sx={{ ".MuiAlert-icon": { color: "#fff" }, color: "#fff", p: 1, bgcolor: "#2B3445", width: "100%", justifyContent: "center" }}
                                    severity="info">Remplissez correctement vos informations pour confirmer votre commande
                                    .</Alert>
                                <Paper className="Firstone" sx={{
                                    padding: 2,
                                    width: isScreenUnder1000px ? '100%' : '60%', // Width adjusted based on screen size
                                    mr: 2,
                                    height: 250,




                                }} elevation={3}>
                                    {isScreenUnder500px && (
                                        <Stack alignItems="center" direction="row" gap={1}>
                                            <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>1</Avatar>
                                            <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Vos informations</Typography>
                                        </Stack>

                                    )}
                                    {!isScreenUnder500px && (
                                        <Stack alignItems="center" justifyContent={"center"} direction="row" gap={1}>
                                            <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>1</Avatar>
                                            <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Vos informations</Typography>
                                        </Stack>

                                    )}

                                    <Stack sx={{ mt: 2 }} justifyContent={"center"} direction="flex" alignItems="center" gap={2}>
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            label="Votre Prénom"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            variant="outlined"
                                        />
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            required
                                            label="votre nom"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <Stack sx={{ mt: 2 }} justifyContent={"center"} direction="flex" alignItems="center" gap={2}>
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            required
                                            id="outlined-basic"
                                            label="numéro de téléphone"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            variant="outlined"
                                        />
                                        <TextField
                                            style={{ width: 300 }}
                                            size="small"
                                            id="outlined-basic"
                                            required
                                            label="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <Stack sx={{ mt: 2 }} justifyContent={"center"} direction="flex" alignItems="center" gap={2}>
                                        <TextField
                                            select
                                            value={selectedWilaya}
                                            onChange={(e) => handleWilayaChange(e.target.value)}
                                            id="outlined-select-currency" select label="Wilaya" size="small" style={{ width: 300 }}>
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField style={{ width: 300 }} size="small" id="outlined-basic" label="Baladiya" variant="outlined" />
                                    </Stack>
                                </Paper>


                                {isScreenUnder500px && (
                                    <Paper className="Second"
                                        sx={{
                                            padding: 2,
                                            mt: 3,
                                            width: isScreenUnder1000px ? '98.5%' : '60%',
                                            mr: 0,
                                            height: '500',
                                            overflowY: 'auto',

                                        }}
                                        elevation={3}>
                                        <Stack justifyContent={"center"} alignItems="center" direction="row" gap={1}>
                                            <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>2</Avatar>
                                            <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Entreprise de livraison (sélectionnez-en une) </Typography>
                                        </Stack>

                                        <Box className=""
                                            sx={{
                                                margin: 1,
                                                justifyContent: "center",
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: isScreenUnder1180px ? '230px' : '300px',
                                                    height: 128,
                                                    mt: 2,
                                                    bgcolor: theme.palette.paper.main,
                                                },
                                            }}

                                        >


                                            <Paper

                                                onClick={() => handlePaperClick('yalidine')}
                                                elevation={3}
                                                sx={{
                                                    cursor: "pointer",
                                                    border: borderStyle,
                                                    borderColor: borderColor,






                                                }} >
                                                <Stack alignItems={"center"} sx={{ mt: 5.5 }}  >
                                                    <img width={"170"} src="https://res.cloudinary.com/damicjacf/image/upload/v1710178113/yalidine-logo_znfghk.png" alt="" />
                                                </Stack>
                                            </Paper>
                                            <Box className=''
                                                sx={{
                                                    justifyContent: "center",
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: isScreenUnder1180px ? '230px' : '300px',
                                                        height: 50,
                                                        mt: 0,
                                                        bgcolor: theme.palette.paper.main,

                                                    },
                                                }}
                                            >


                                                <Paper
                                                    onClick={() => handleHomeClick('home')}
                                                    elevation={3}
                                                    sx={{

                                                        cursor: selectedPaper === 'zexpress' ? 'not-allowed' : 'pointer',
                                                        border: borderStyleHome,
                                                        borderColor: borderColor1,
                                                        opacity: selectedPaper === 'zexpress' ? 0.5 : 1,


                                                    }} >
                                                    <Stack alignItems={"center"}
                                                        sx={{ mt: 1.5 }}  >
                                                        <Typography>Livraison à domicile</Typography>
                                                    </Stack>
                                                </Paper>
                                                <Paper
                                                    onClick={() => handleOfficeClick('office')}
                                                    elevation={3}
                                                    sx={{
                                                        cursor: selectedPaper === 'zexpress' ? 'not-allowed' : 'pointer',
                                                        border: borderStyleOffice,
                                                        borderColor: borderColor2,
                                                        opacity: selectedPaper === 'zexpress' ? 0.5 : 1

                                                    }} >
                                                    <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                        <Typography>livraison au bureau</Typography>
                                                    </Stack>
                                                </Paper>





                                            </Box>






                                            <Paper
                                                onClick={() => handlePaperClick('zexpress')}
                                                elevation={3}
                                                sx={{
                                                    cursor: "pointer",
                                                    border: borderStylePaper,
                                                    borderColor: borderColor5,


                                                }}  >
                                                <Stack alignItems={"center"} sx={{ mt: 3 }}  >
                                                    <img width={"160"} src="https://res.cloudinary.com/damicjacf/image/upload/v1710178116/logo-zexpress_tjrzjz.png" alt="" />
                                                </Stack>
                                            </Paper>
                                            <Box className=''
                                                sx={{
                                                    justifyContent: "center",
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: isScreenUnder1180px ? '230px' : '300px',
                                                        height: 50,
                                                        mt: 1,
                                                        bgcolor: theme.palette.paper.main,

                                                    },
                                                }}
                                            >
                                                <Paper
                                                    onClick={() => handleHomeClick1('home1')}
                                                    elevation={3}
                                                    sx={{
                                                        cursor: selectedPaper === 'yalidine' ? 'not-allowed' : 'pointer',
                                                        border: borderStyleHome1,
                                                        borderColor: borderColor3,
                                                        opacity: selectedPaper === 'yalidine' ? 0.5 : 1,

                                                    }}  >
                                                    <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                        <Typography>Livraison à domicile </Typography>
                                                    </Stack>
                                                </Paper>

                                                <Paper
                                                    onClick={() => handleOfficeClick1('office1')}
                                                    elevation={3}
                                                    sx={{
                                                        cursor: selectedPaper === 'yalidine' ? 'not-allowed' : 'pointer',
                                                        border: borderStyleOffice1,
                                                        borderColor: borderColor4,
                                                        opacity: selectedPaper === 'yalidine' ? 0.5 : 1
                                                    }}  >
                                                    <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                        <Typography>livraison au bureau </Typography>
                                                    </Stack>
                                                </Paper>
                                            </Box>
                                        </Box>












                                    </Paper>
                                )}


                                {!isScreenUnder500px && (
                                    <Paper className="Second"
                                        sx={{
                                            padding: 2,
                                            mt: 3,
                                            width: isScreenUnder1000px ? '98.5%' : '60%',
                                            mr: 0,
                                            height: '500',
                                            overflowY: 'auto',

                                        }}
                                        elevation={3}>
                                        <Stack justifyContent={"center"} alignItems="center" direction="row" gap={1}>
                                            <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>2</Avatar>
                                            <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>Entreprise de livraison (sélectionnez-en une) </Typography>
                                        </Stack>

                                        <Box className=""
                                            sx={{

                                                justifyContent: "center",
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: isScreenUnder1180px ? '230px' : '300px',
                                                    height: 128,
                                                    mt: 5,
                                                    bgcolor: theme.palette.paper.main,
                                                },
                                            }}
                                        >

                                            <Paper

                                                onClick={() => handlePaperClick('yalidine')}
                                                elevation={3}
                                                sx={{
                                                    cursor: "pointer",
                                                    border: borderStyle,
                                                    borderColor: borderColor,






                                                }} >
                                                <Stack alignItems={"center"} sx={{ mt: 5.5 }}  >
                                                    <img width={"170"} src="https://res.cloudinary.com/damicjacf/image/upload/v1710178113/yalidine-logo_znfghk.png" alt="" />
                                                </Stack>
                                            </Paper>
                                            <Paper
                                                onClick={() => handlePaperClick('zexpress')}
                                                elevation={3} sx={{ cursor: "pointer", border: selectedPaper === 'zexpress' ? "2px solid black" : "none" }}  >
                                                <Stack alignItems={"center"} sx={{ mt: 3 }}  >
                                                    <img width={"160"} src="https://res.cloudinary.com/damicjacf/image/upload/v1710178116/logo-zexpress_tjrzjz.png" alt="" />
                                                </Stack>
                                            </Paper>
                                        </Box>





                                        <Box className=''
                                            sx={{
                                                justifyContent: "center",
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: isScreenUnder1180px ? '230px' : '300px',
                                                    height: 50,
                                                    mt: 1,
                                                    bgcolor: theme.palette.paper.main,

                                                },
                                            }}
                                        >


                                            <Paper
                                                onClick={() => handleHomeClick('home')}
                                                elevation={3}
                                                sx={{

                                                    cursor: selectedPaper === 'zexpress' ? 'not-allowed' : 'pointer',
                                                    border: borderStyleHome,
                                                    borderColor: borderColor1,
                                                    opacity: selectedPaper === 'zexpress' ? 0.5 : 1,


                                                }} >
                                                <Stack alignItems={"center"}
                                                    sx={{ mt: 1.5 }}  >
                                                    <Typography>Livraison à domicile</Typography>
                                                </Stack>
                                            </Paper>
                                            <Paper
                                                onClick={() => handleOfficeClick('office')}
                                                elevation={3}
                                                sx={{
                                                    cursor: selectedPaper === 'zexpress' ? 'not-allowed' : 'pointer',
                                                    border: borderStyleOffice,
                                                    borderColor: borderColor2,
                                                    opacity: selectedPaper === 'zexpress' ? 0.5 : 1

                                                }} >
                                                <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                    <Typography>livraison au bureau</Typography>
                                                </Stack>
                                            </Paper>


                                            <Paper
                                                onClick={() => handleHomeClick1('home1')}
                                                elevation={3}
                                                sx={{
                                                    cursor: selectedPaper === 'yalidine' ? 'not-allowed' : 'pointer',
                                                    border: borderStyleHome1,
                                                    borderColor: borderColor3,
                                                    opacity: selectedPaper === 'yalidine' ? 0.5 : 1,

                                                }}  >
                                                <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                    <Typography>Livraison à domicile </Typography>
                                                </Stack>
                                            </Paper>

                                            <Paper
                                                onClick={() => handleOfficeClick1('office1')}
                                                elevation={3}
                                                sx={{
                                                    cursor: selectedPaper === 'yalidine' ? 'not-allowed' : 'pointer',
                                                    border: borderStyleOffice1,
                                                    borderColor: borderColor4,
                                                    opacity: selectedPaper === 'yalidine' ? 0.5 : 1
                                                }}  >
                                                <Stack alignItems={"center"} sx={{ mt: 1.5 }}  >
                                                    <Typography>livraison au bureau </Typography>
                                                </Stack>
                                            </Paper>
                                        </Box>



                                    </Paper>
                                )}

                                <Paper className="thethird"

                                    sx={{
                                        padding: 2,
                                        mt: 2,
                                        mb: 2,
                                        width: isScreenUnder1000px ? '100%' : '60%',
                                        mr: 2,
                                        height: isScreenUnder1000px ? '340' : '520',
                                        overflowY: 'auto',

                                    }}
                                    elevation={3}>
                                    <Stack justifyContent={"center"} alignItems="center" direction="row" gap={1}>
                                        <Avatar sx={{ bgcolor: "rgb(210, 63, 87)", width: 30, height: 30 }}>3</Avatar>
                                        <Typography sx={{ fontSize: "20px", fontWeight: "400" }}> Informations de paiement (sélectionnez-en une) </Typography>
                                    </Stack>
                                    <Box
                                        sx={{
                                            justifyContent: "center",
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            '& > :not(style)': {
                                                m: 1,

                                                width: isScreenUnder1180px ? '230px' : '300px',
                                                height: 128,
                                                mt: 5,
                                                bgcolor: theme.palette.paper.main,
                                            },
                                        }}
                                    >

                                        <Paper

                                            onClick={() => handlePaymentClick('baridimob')}
                                            elevation={3} sx={{ cursor: "pointer",
                                            border: borderStylePayment,
                                            borderColor: borderColor6,
                                              }} 
                                              >
                                            <Stack alignItems={"center"} sx={{ mt: 2 }}  >
                                                <Typography>BaridiMob (Algerie post) </Typography>
                                                <Typography sx={{ mt: 3 }}>00799999001779775703</Typography>
                                            </Stack>
                                        </Paper>
                                        <Paper


                                            onClick={() => handlePaymentClick('ccp')}
                                            elevation={3} sx={{ cursor: "pointer",
                                            border: borderStylePayment1,
                                            borderColor: borderColor7,
                                              }}  
                                              >
                                            <Stack alignItems={"center"} sx={{ mt: 2 }}  >
                                                <Typography>CCP (Algerie post)</Typography>
                                                <Typography sx={{ ml: isScreenUnder1180px ? '30px' : "0px", mt: isScreenUnder1180px ? '14px' : '20px', }} >001779775703 (Hamici Djihene) </Typography>
                                            </Stack>
                                        </Paper>
                                    </Box>


                                </Paper>

                                <Paper className="the4"
                                    elevation={0}
                                    sx={{
                                        width: "38%",
                                        bgcolor: "transparent",
                                        width: '100%',
                                        mb: 2,
                                        height: "400",
                                        overflowY: "auto",



                                    }}>
                                    <Typography sx={{ fontWeight: 700 }}>Votre Commande</Typography>
                                    {/* Render each item in the cart */}
                                    {cart.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                                <Box display="flex" gap={0.5}>
                                                    <Typography>{item.quantity}</Typography>
                                                    <Typography>x</Typography>
                                                    <Typography>{item.title}</Typography>
                                                </Box>
                                                <Typography>{item.quantity * item.price}DA</Typography>
                                            </Stack>
                                            {index !== cart.length - 1}
                                        </React.Fragment>
                                    ))}
                                    <Divider sx={{ margin: 3 }} orientation="horizontal" flexItem />
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Prix:</Typography>
                                        </Box>
                                        <Typography>{totalPrice.toFixed(2)}DA</Typography>
                                    </Stack>
                                    {/* Render shipping price, discount, and total */}
                                    {/* Add your logic to calculate shipping price and discount */}
                                    {/* Example: */}
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Livraison:</Typography>
                                        </Box>
                                        <Typography>{calculateShippingPrice()}DA</Typography>
                                    </Stack>
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Discount:</Typography>
                                        </Box>
                                        <Typography>-</Typography>
                                    </Stack>
                                    <Divider sx={{ margin: 3 }} orientation="horizontal" flexItem />
                                    <Stack sx={{ mt: 1 }} direction="flex" justifyContent="space-between">
                                        <Box display="flex" gap={0.5}>
                                            <Typography>Prix Total:</Typography>
                                        </Box>
                                        <Typography>{(totalPrice + calculateShippingPrice()).toFixed(2)}DA</Typography>
                                    </Stack>
                                    <Stack alignItems={"center"} >
                                        <Button
                                            type="submit"
                                            disabled={
                                                !selectedPaper ||
                                                !selectedPayment || // Ensure a payment method is selected
                                                ((selectedPaper === 'yalidine' && !selectedOptions && !selectedHome) ||
                                                    (selectedPaper === 'zexpress' && !selectedOptions && (!selectedHome1 && !selectedOffice1))) ||
                                                isSubmitted
                                            }

                                            sx={{
                                                width: "100%",
                                                mt: 4,
                                                textTransform: "capitalize",
                                                fontSize: "15px",
                                                bgcolor: "rgb(210, 63, 87)",
                                                color: "rgb(255, 255, 255)",
                                                borderRadius: "6px",
                                                ":hover": { border: "1px solid black", transition: "0.2s", bgcolor: "#2B3445", color: "#fff" },

                                            }}
                                        >
                                            Commandez maintenant
                                        </Button>
                                    </Stack>
                                </Paper>

                            </>
                        )}


                    </Box>
                </form>
            </div>


            {isSubmitted && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <CircularProgress />
                </div>
            )}













        </Container>








    );
};

export default CheckoutPage;