// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box, Drawer, IconButton, Stack, Typography, Divider, Button, useTheme } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Close } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from '../../Redux/cartReducer';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { loadCartData } from '../../Redux/cartActions';

const Cart = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const products = useSelector(state => state.cart.products);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [hasOpenedDrawer, setHasOpenedDrawer] = useState(false);

    useEffect(() => {
        const isDrawerOpenedBefore = sessionStorage.getItem('hasOpenedDrawer');
        if (products.length > 0 && !hasOpenedDrawer && !isDrawerOpenedBefore) {
            setIsDrawerOpen(true);
            setHasOpenedDrawer(true);
            sessionStorage.setItem('hasOpenedDrawer', 'true');
        }
        


        
        
    }, [ hasOpenedDrawer]);
    useEffect(() => {
        // Load cart data from storage when the component mounts
        dispatch(loadCartData());
      }, [dispatch]);
    
    
 

    useEffect(() => {
        const onRouteChange = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener('popstate', onRouteChange);

        return () => {
            window.removeEventListener('popstate', onRouteChange);
        };
    }, []);

    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => (total += item.quantity * item.price));
        return total.toFixed();
    };

    const handleIncrementQuantity = (itemId) => {
        dispatch(incrementQuantity(itemId));
        dispatch(setProducts(products)); // Update products in storage
    };

    const handleDecrementQuantity = (itemId) => {
        dispatch(decrementQuantity(itemId));
        dispatch(setProducts(products)); // Update products in storage
    };

    const handleCheckout = () => {
        // Navigate to the checkout page
        navigate('/checkout');
    };

    const isScreenUnder500px = useMediaQuery('(max-width:500px)');

    return (
        <div>
            {!isScreenUnder500px && (
                <>
                    <IconButton onClick={() => setIsDrawerOpen(true)} aria-label="cart">
                        <Badge badgeContent={products.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Drawer 
                        sx={{  width: "600px" }}
                        anchor={"right"}
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        <Box sx={{   width: "380px", height: "100%" }}>
                            <Stack  direction={"row"} alignItems={"center"} sx={{ mt: 2, height: "10%", margin: "10px" }}>
                                <LocalMallOutlinedIcon sx={{ color: theme.palette.artcolor.main, marginLeft: 2 }} fontSize="medium" />
                                <Typography sx={{ paddingX: 1, fontSize: 14, fontWeight: 600, color: theme.palette.artcolor.main }}>
                                    {products.length} Article
                                </Typography>
                                <Box flexGrow={1} />
                                <IconButton sx={{ marginRight: 2 }} onClick={() => setIsDrawerOpen(false)}>
                                    <Close />
                                </IconButton>
                            </Stack>
                            <Divider orientation="horizontal" flexItem />
                            {products.length === 0 ? (
                                <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
                                    Le panier est vide
                                </Typography>
                            ) : (
                                <List 
                                    sx={{  width: '100%',  position: 'relative', overflow: 'auto', maxHeight: 300, '& ul': { padding: 0 } }}
                                    subheader={<li />}
                                >
                                    <li>
                                        <ul>
                                            {products.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    <ListItem  sx={{ bgcolor : theme.palette.product.main , display: "flex", justifyContent: "space-between", width: "100%", height: "110px" }}>
                                                        <Stack spacing={-1} alignItems={"center"}>
                                                            <IconButton  onClick={() => handleIncrementQuantity(item.id)}>
                                                                <AddCircleOutlineOutlinedIcon  sx={{color : theme.palette.icon.main , fontSize: 35, stroke: theme.palette.product.main , strokeWidth: "1.4"   }} />
                                                            </IconButton>
                                                            <Typography>{item.quantity}</Typography>
                                                            <IconButton onClick={() => handleDecrementQuantity(item.id)}>
                                                                <RemoveCircleOutlineOutlinedIcon  sx={{color : theme.palette.icon.main, fontSize: 35, stroke: theme.palette.product.main, strokeWidth: "1.4" }} />
                                                            </IconButton>
                                                        </Stack>
                                                        <img width={60} src={item.img} alt="" srcset="" />
                                                        <Box>
                                                            <Typography sx={{ textOverflow: "ellipsis", color: theme.palette.artcolor.main }} fontSize={"14px"} fontWeight={"500"} variant='h6'>{item.title}</Typography>
                                                            <Box gap={0.5} display={"flex"}>
                                                                <Typography color={"rgb(125, 135, 156)"} fontSize={12}>{item.price}DA</Typography>
                                                                <Typography color={"rgb(125, 135, 156)"} fontSize={12}>x</Typography>
                                                                <Typography color={"rgb(125, 135, 156)"} fontSize={12}>{item.quantity}</Typography>
                                                            </Box>
                                                            <Typography fontSize={"14px"} variant='h6' sx={{ color: "rgb(210, 63, 87)" }}>{item.price}DA</Typography>
                                                        </Box>
                                                        <Box>
                                                            <IconButton sx={{ marginRight: 2 }} onClick={() => dispatch(removeItem(item.id))}>
                                                                <Close sx={{ fontSize: 20 }} />
                                                            </IconButton>
                                                        </Box>
                                                    </ListItem>
                                                    <Divider orientation="horizontal" flexItem />
                                                </React.Fragment>
                                            ))}
                                        </ul>
                                    </li>
                                </List>
                            )}
                            {products.length > 0 && (
                                <Stack spacing={1} sx={{ mt: 12, alignItems: "center" }}>
                                    <Button onClick={handleCheckout}
                                        sx={{ width: "90%", textTransform: "capitalize", fontSize: "15px", bgcolor: "rgb(210, 63, 87)", color: "rgb(255, 255, 255)", borderRadius: "6px", ":hover": { border: "1px solid black", transition: "0.2s", bgcolor: "#2B3445", color: "#fff" } }}>
                                        Passer à la caisse ({totalPrice()}DA)
                                    </Button>

                                </Stack>
                            )}
                        </Box>
                    </Drawer>
                </>
            )}

            {isScreenUnder500px && (
                <>
                    <IconButton onClick={() => setIsDrawerOpen(true)} aria-label="cart">
                        <Badge badgeContent={products.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Drawer
                        sx={{ width: "600px" }}
                        anchor={"right"}
                        open={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        <Box sx={{ width: "380px", height: "100%" }}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ mt: 2, height: "10%", margin: "10px" }}>
                                <LocalMallOutlinedIcon sx={{ color: theme.palette.artcolor.main, marginLeft: 2 }} fontSize="medium" />
                                <Typography sx={{ paddingX: 1, fontSize: 14, fontWeight: 600, color: theme.palette.artcolor.main }}>
                                    {products.length} Article
                                </Typography>
                                <Box flexGrow={1} />
                                <IconButton sx={{ marginRight: 2 }} onClick={() => setIsDrawerOpen(false)}>
                                    <Close />
                                </IconButton>
                            </Stack>
                            <Divider orientation="horizontal" flexItem />
                            {products.length === 0 ? (
                                <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
                                    Le panier est vide
                                </Typography>
                            ) : (
                                <List
                                    sx={{ width: '100%', bgcolor: theme.palette.product.main, position: 'relative', overflow: 'auto', maxHeight: 300, '& ul': { padding: 0 } }}
                                    subheader={<li />}
                                >
                                    <li>
                                        <ul>
                                            {products.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    <ListItem sx={{ display: "flex", justifyContent: "space-between", width: "100%", height: "110px" }}>
                                                        <Stack spacing={-1} alignItems={"center"}>
                                                            <IconButton onClick={() => handleIncrementQuantity(item.id)}>
                                                                <AddCircleOutlineOutlinedIcon  sx={{color: theme.palette.artcolor.main, fontSize: 35, stroke: theme.palette.product.main, strokeWidth: "1.4" }} />
                                                            </IconButton>
                                                            <Typography>{item.quantity}</Typography>
                                                            <IconButton onClick={() => handleDecrementQuantity(item.id)}>
                                                                <RemoveCircleOutlineOutlinedIcon  sx={{ color :theme.palette.icon.main, fontSize: 35, stroke: theme.palette.product.main, strokeWidth: "1.4" }} />
                                                            </IconButton>
                                                        </Stack>
                                                        <img width={60} src={item.img} alt="" srcset="" />
                                                        <Box>
                                                            <Typography sx={{ textOverflow: "ellipsis", color: theme.palette.artcolor.main  }} fontSize={"14px"} fontWeight={"500"} variant='h6'>{item.title}</Typography>
                                                            <Box gap={0.5} display={"flex"}>
                                                                <Typography color={"rgb(125, 135, 156)"} fontSize={12}>{item.price}DA</Typography>
                                                                <Typography color={"rgb(125, 135, 156)"} fontSize={12}>x</Typography>
                                                                <Typography color={"rgb(125, 135, 156)"} fontSize={12}>{item.quantity}</Typography>
                                                            </Box>
                                                            <Typography fontSize={"14px"} variant='h6' sx={{ color: "rgb(210, 63, 87)" }}>{item.price}DA</Typography>
                                                        </Box>
                                                        <Box>
                                                            <IconButton sx={{ marginRight: 2 }} onClick={() => dispatch(removeItem(item.id))}>
                                                                <Close sx={{ fontSize: 20 }} />
                                                            </IconButton>
                                                        </Box>
                                                    </ListItem>
                                                    <Divider orientation="horizontal" flexItem />
                                                </React.Fragment>
                                            ))}
                                        </ul>
                                    </li>
                                </List>
                            )}
                            {products.length > 0 && (
                                <Stack justifyContent={"center"} spacing={1} sx={{ mt: 12, alignItems: "center" }}>
                                    <Button onClick={handleCheckout}
                                        sx={{ width: "90%", textTransform: "capitalize", fontSize: "15px", bgcolor: "rgb(210, 63, 87)", color: "rgb(255, 255, 255)", borderRadius: "6px", ":hover": { border: "1px solid black", transition: "0.2s", bgcolor: "#2B3445", color: "#fff" } }}>
                                        Passer à la caisse ({totalPrice()}DA)
                                    </Button>

                                </Stack>
                            )}
                        </Box>
                    </Drawer>
                </>
            )}
        </div>
    );
}

export default Cart;