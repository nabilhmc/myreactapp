// @ts-nocheck
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const baseURL = 'http://localhost:1337/api';
const apiToken = '59845ea4c94010f2bda027ea42ce3346a9273e186734212ad268c575e65317ac783d23b1ece9e1085a1f18730336e1a2f6d39d966fa2ce9b506c219685b13738b81425e6f7bec640e499fa63ee5ec7914f36324cc2e6492701ba03b9de07d0d00dbdf5ef39797cdb85c3ef1e09d336243f6b62139444cac3126f7083b2bc0db6';


const Succes = () => {

    const isScreenUnder500px = useMediaQuery('(max-width:500px)');

    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const orderId = queryParams.get('orderId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${apiToken}`
                    }
                });
                setOrder(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Check if order is defined and has attributes before accessing them
    if (!order || !order.data || !order.data.attributes) {
        return <div>No order found</div>;
    }

    // Now it's safe to access order attributes
    const { firstName } = order.data.attributes;
    const { lastName } = order.data.attributes;



    return (
        <div className="background-gradient">
            <Container  sx={{ display: "flex", flexDirection: "column", alignItems: "center"   }}>
            {!isScreenUnder500px && (
                <>
                    <Box  > 
                        <img width={100} src="public/images/Success.png" alt="" />
                    </Box>
                    <Paper
                        sx={{
                            textAlign: "center",
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            mt : 3,
                            width: 600,
                            height: 300,
                            boxShadow: "0 8px 64px 0 rgba( 31, 38, 135, 0.37 )",
                            backdropFilter: "blur( 4px )",
                            WebkitBackdropFilter: "blur( 4px )",
                            borderRadius: "10px",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" color="#fff">Salut {firstName} {lastName} </Typography>
                            <Typography color={"#fff"} sx={{ fontSize: 20, mt: 1 }}>Ta commande a été passée avec succès</Typography>
                            <Typography color={"#fff"} sx={{ mt: 1, fontSize: 18 }}>
                                Créé le: {new Date(order.data.attributes.createdAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric'
                                })}
                            </Typography>
                            <Typography color={"#fff"} sx={{ mt: 1 }}>Nous vous appellerons sur votre téléphone pour confirmer la commande</Typography>
                            <Typography color={"#fff"} sx={{ mt: 1 }}>Merci d'avoir acheté chez nous.</Typography>
                            <Button
                                onClick={handleButtonClick}
                                sx={{
                                    width: "80%",
                                    mt: 4,
                                    textTransform: "capitalize",
                                    fontSize: "15px",
                                    bgcolor: "#54df8b",
                                    color: "rgb(255, 255, 255)",
                                    borderRadius: "6px",
                                    ":hover": { border: "1px solid black", transition: "0.2s", bgcolor: "#2B3445", color: "#fff" },
                                }}
                            >Retourne accueil</Button>
                        </Box>
                    </Paper>
                </>
                )}


                {isScreenUnder500px && (
                    <>
                    <img width={100} src="public/images/Success.png" alt="" />
                    <Paper
                        sx={{
                            textAlign: "center",
                            mt : 3,
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            width: 300,
                            height: 330,
                            boxShadow: "0 8px 64px 0 rgba( 31, 38, 135, 0.37 )",
                            
                            borderRadius: "10px",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            overflow: "hidden",
                        }}
                    >
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" color="#fff">Salut {firstName} {lastName} </Typography>
                            <Typography color={"#fff"} sx={{ fontSize: 20, mt: 1 }}>Ta commande a été passée avec succès</Typography>
                            <Typography color={"#fff"} sx={{ mt: 1, fontSize: 18 }}>
                                Créé le: {new Date(order.data.attributes.createdAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric'
                                })}
                            </Typography>
                            <Typography color={"#fff"} sx={{ mt: 1 }}>Nous vous appellerons sur votre téléphone pour confirmer la commande</Typography>
                            <Typography color={"#fff"} sx={{ mt: 1 }}>Merci d'avoir acheté chez nous.</Typography>
                            <Button
                                onClick={handleButtonClick}
                                sx={{
                                    width: "80%",
                                    mt: 4,
                                    textTransform: "capitalize",
                                    fontSize: "15px",
                                    bgcolor: "#54df8b",
                                    color: "rgb(255, 255, 255)",
                                    borderRadius: "6px",
                                    ":hover": { border: "1px solid black", transition: "0.2s", bgcolor: "#2B3445", color: "#fff" },
                                }}
                            >Retourne accueil</Button>
                        </Box>
                    </Paper>
                    </>
                    )}




            </Container>
        </div>
    );
};

export default Succes;