// @ts-nocheck

import { Box, Button, Stack, ToggleButtonGroup, Typography } from "@mui/material";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';






const ProductDetails = ({ clickedProduct }) => {

    const [selectedImg, setselectedImg] = useState(0)
  


    const [alignment, setAlignment] = useState('left');

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }


    };






    return (
        <Box gap={2}
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" }
            }} >
            <Box display={"flex"}>
                <img width={322} src={clickedProduct.attributes.productimg.data[selectedImg].attributes.url} alt="" />
            </Box>

            <Box sx={{paddingY : 2, textAlign: { xs: "center", sm: "left"  } }}  >
                <Typography variant="h5"> {clickedProduct.attributes.productTitel} </Typography>
                <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
                    ${clickedProduct.attributes.productPrice}
                </Typography>
                <Typography variant="body1">
                    {clickedProduct.attributes.productDescription1}
                </Typography>

                <Stack sx={{ justifyContent: { xs: "center", sm: "left" } }} direction={"row"} gap={1} my={2}>


                    <ToggleButtonGroup
                        value={selectedImg}
                        exclusive
                        onChange={handleAlignment}
                        sx={{
                            ".Mui-selected": {
                                border: "1px solid royalblue !imoprtant",
                                borderRadius: "5px !important",
                                opacity: 1,
                                backgroundColor: "initial",
                            },
                        }}
                    >




                        {clickedProduct.attributes.productimg.data.map((item, index) => {
                            return (




                                <ToggleButton
                                    value={index}
                                    key={item.id}
                                    sx={{
                                        width: "110px",
                                        height: "110px",
                                        mx: 1,
                                        p: 0.5,
                                        opacity: "0.5",


                                    }}
                                >
                                    <img
                                        onClick={() => {
                                            setselectedImg(index);

                                        }
                                        }
                                        style={{ borderRadius: 3 }}
                                        height={"100%"}
                                        width={"100%"}

                                        src={item.attributes.url} />



                                </ToggleButton>
                            )







                        }
                        )}
                    </ToggleButtonGroup>



                </Stack>
             
            </Box>

        </Box>
    );


}

export default ProductDetails;

