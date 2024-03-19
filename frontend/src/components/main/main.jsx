// @ts-nocheck

import { Box, Container, IconButton, Stack, Drawer, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import { Close } from '@mui/icons-material';
import ProductDetails from './ProductDetails';
import { useGetproductByNameQuery } from '../../Redux/product';
import CircularProgress from '@mui/material/CircularProgress';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartReducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const Main = () => {


    const notify = () =>
    toast.success("produit ajouté au panier", {
      position: "top-center", // Position of the toast
      autoClose: 3000, // Auto close duration in milliseconds
      hideProgressBar: false, // Whether to hide the progress bar
      closeOnClick: true, // Close the toast on click
      theme: "colored",

      pauseOnHover: true, // Pause the toast duration on hover
      draggable: true, // Make the toast draggable
      progress: undefined, // Progress bar style
      style: {
        // Customize the toast style
        background: "green", // Background color
        color: "#fff", // Text color
        fontSize: "16px", // Font size
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Box shadow
      },
      // Other options as needed
    });
        
        








    const handleAlignment = (event, newValue) => {

        if (newValue !== null) {
            setmyData(newValue)
        }

    };




    const theme = useTheme()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const allProductsAPI = 'products?populate=*';
    const menCategoryAPI = "products?populate=*&filters[productCategory][$eq]=men";
    const womenCategoryAPI = "products?populate=*&filters[productCategory][$eq]=women";

    const dispatch = useDispatch()
    const borderStyle = `1px solid ${theme.palette.card.main}`;



    const [myData, setmyData] = useState(allProductsAPI);


    const { data, error, isLoading } = useGetproductByNameQuery(myData)

    const [clickedProduct, setclickedProduct] = useState({})



    if (isLoading) {
        return (
            <Box sx={{ py: 11, textAlign: "center" }}>
                <Typography>Veuillez attendre votre connexion</Typography>
                <CircularProgress />
            </Box>
        )
    }
    if (error) {
        return (

            <Container sx={{ py: 11, }} >
                <Typography variant='h6'> {error.error} </Typography>
                <Typography>Plase Ckeck Your Connection</Typography>
            </Container>


        )
    }


    if (data) {
        return (

            <Container sx={{ py: 10 }} >
                <Stack sx={{ mt: -5 }} gap={3} flexWrap={"wrap"} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box>
                        <Typography variant="h6">Produits sélectionnés</Typography>
                        <Typography fontWeight={300} variant="body1">
                            Toutes nos nouveautés dans une sélection exclusive de marques
                        </Typography>
                    </Box>

                    <ToggleButtonGroup
                        color='error'
                        value={myData}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        sx={{
                            ".Mui-selected": {
                                border: "1px solid rgba(233, 69, 96, 0.5) !important",
                                color: "#e94560",
                                backgroundColor: "initial",
                            },
                        }}
                    >
                        <ToggleButton sx={{ color: theme.palette.text.primary }} className='myButton' value={allProductsAPI} aria-label="left aligned">
                            Tous Produits

                        </ToggleButton>
                        <ToggleButton sx={{ mx: "16px ! important", color: theme.palette.text.primary }} className='myButton' value={menCategoryAPI} aria-label="centered">
                            HOMMES Catégorie
                        </ToggleButton>
                        <ToggleButton sx={{ color: theme.palette.text.primary }} className='myButton' value={womenCategoryAPI} aria-label="right aligned">
                            FEMMES Catégorie
                        </ToggleButton>



                    </ToggleButtonGroup>

                </Stack>

                <Stack gap={2} direction={"row"} flexWrap={"wrap"} justifyContent={"center"} >
                    <AnimatePresence>

                        {data.data.map((item) => {
                            return (
                                <Card

                                    component={motion.section}
                                    layout
                                    initial={{ transform: "scale(0)" }}
                                    animate={{ transform: "scale(1)" }}
                                    transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                                    key={item.id}
                                    sx={{
                                        border: borderStyle,
                                        maxWidth: 300, mt: 6,
                                        ":hover .MuiCardMedia-root": {
                                            scale: "1.1",
                                            transition: "0.35s", rotate: "1deg"
                                        },

                                        ":hover": {  transition: "0.35s" }
                                    }}>
                                    <CardMedia
                                        onClick={() => {
                                            handleClickOpen();
                                            setclickedProduct(item);


                                        }
                                        }
                                        sx={{ height: 277, m: 2, cursor: "pointer" }}
                                        image={`${item.attributes.productimg.data[0].attributes.url}`}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            alignItems={"center"}

                                        >
                                            <Typography gutterBottom variant='h6' component="div">
                                                {item.attributes.productTitel}
                                            </Typography>
                                            <Typography variant='subtitel1' component="p">
                                                {item.attributes.productPrice}DA
                                            </Typography>
                                        </Stack>
                                        <Typography variant='body2' color="text.secondary">
                                            {item.attributes.productDescription}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "space-between" }}>
                                        <Button
                                            onClick={() => {
                                                // Dispatch the product to the cart
                                                dispatch(addToCart({
                                                    id: item.id,
                                                    title: item.attributes.productTitel,
                                                    price: item.attributes.productPrice,
                                                    img: item.attributes.productimg.data[0].attributes.url,
                                                    quantity: 1,
                                                }));
                                                // Show toast notification
                                                notify();


                                            }}

                                            sx={{
                                                border: "1px solid #2B3445",
                                                textTransform: "capitalize",
                                                ":hover": {
                                                    border: "1px solid black",
                                                    transition: "0.2s",
                                                    bgcolor: "#2B3445",
                                                    color: "#fff"
                                                }
                                            }}
                                            size="large">
                                            <AddShoppingCartOutlinedIcon sx={{ mr: 1 }} fontSize='small' />
                                            Commande
                                        </Button>


                                        <Rating precision={item.attributes.productRating} name="read-only" value={4.5} readOnly />

                                    </CardActions>
                                </Card>

                            )

                        }
                        )}
                    </AnimatePresence>
                </Stack>

                <Dialog
                    sx={{
                        ".MuiPaper-root":
                        {
                            minWidth: { xs: "100%", md: 800 },

                        }
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <IconButton
                        sx={{
                            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
                            position: "absolute",
                            top: 0,
                            right: -11,
                        }}
                        onClick={handleClose}

                    >


                        <Close  />
                    </IconButton>

                    <ProductDetails clickedProduct={clickedProduct} />

                </Dialog>

                <ToastContainer/>

            </Container>


        );
    }
}

export default Main
