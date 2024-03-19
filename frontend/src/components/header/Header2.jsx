// @ts-nocheck
import { Close, ExpandMore, ShoppingCartOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  InputBase,
  ListItemButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Cart from "./Cart";
import { useSelector } from 'react-redux';



const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const options = ["Catégories", "CAR", "Clothes", "Electronics"];

const Header2 = () => {
  const products = useSelector(state=>state.cart.products)

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // @ts-ignore
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  return (



    < Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      {useMediaQuery("(min-width:1200px)") && (
        <>


          <Stack alignItems={"center"}>


            <ShoppingCartOutlined />
            


            < Typography variant="body2">Maitresse Hamici</Typography>

          </Stack>



          <Search
            sx={{
              display: "flex",
              borderRadius: "22px",
              justifyContent: "space-between",
            }}
          >


            < SearchIconWrapper>


              < SearchIcon />
            </SearchIconWrapper>


            <StyledInputBase
              placeholder="Recherche…"
              inputProps={{ "aria-label": "search" }} />

            <div>


              < List
                component="nav"
                aria-label="Device settings"
                sx={{

                  bgcolor: theme.palette.myColor.main,
                  borderBottomRightRadius: 22,
                  borderTopRightRadius: 22,
                  p: "0",
                }}
              >


                < ListItem
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >


                  < ListItemText
                    // className="border"
                    sx={{
                      width: 93,
                      textAlign: "center",
                      "&:hover": { cursor: "pointer" },
                    }}
                    secondary={options[selectedIndex]} />


                  < ExpandMore sx={{ fontSize: "16px" }} />
                </ListItem>
              </List>


              < Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {options.map((option, index) => (
                  <
                    // @ts-ignore
                    MenuItem
                    sx={{ fontSize: "13px" }}
                    key={option}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Search>



          < Stack direction={"row"} alignItems={"center"}>


            <Cart/>





            <IconButton>


              <Person2OutlinedIcon />
            </IconButton>
          </Stack>
        </>
      )}
      {useMediaQuery("(max-width:1200px)") && (

        <>


          < Stack direction={"row"} alignItems={"center"}>


            < IconButton onClick={toggleDrawer("top", true)}>


              < MenuIcon />
            </IconButton>


            <Drawer 
             
              anchor={"top"}
              open={state["top"]}
              onClose={toggleDrawer("top", false)}

            >


              <Box className=""
                sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}
              >


                <IconButton
                  sx={{
                    ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
                    position: "absolute",
                    top: 0,
                    right: 10,
                  }}
                  onClick={toggleDrawer("top", false)}
                >


                  <Close />
                </IconButton>
                {[
                  { mainLink: "Accueil", subLinks: ["test 1", "test 2", "test 3"] },
                  { mainLink: " menu", subLinks: ["test 1", "test 2", "test 3"] },
                 
                  { mainLink: "pages", subLinks: ["Link 1", "Link 2", "Link 3"] },
                  {
                    mainLink: "compte d'utilisateur",
                    subLinks: ["test 1", "test 2", "test 3"],
                  },
                  {
                    mainLink: "compte fournisseur",
                    subLinks: ["test 1", "test 2", "test 3"],
                  },
                ].map((item) => {
                  return (


                    < Accordion
                      key={item.mainLink}
                      elevation={0}
                      sx={{ bgcolor: "initial" }}
                    >


                      < AccordionSummary
                        // @ts-ignore
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <
                          // @ts-ignore
                          Typography>{item.mainLink}</Typography>
                      </AccordionSummary>



                      <List sx={{ py: 0, my: 0 }}>
                        {item.subLinks.map((link) => {
                          return (


                            <ListItem key={link} sx={{ py: 0, my: 0 }}>


                              <ListItemButton>


                                < ListItemText primary={link} />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Accordion>
                  );
                })}

              </Box>
            </Drawer>


          </Stack>



          < Stack direction={"row"} alignItems={"center"}>
            <img width={"80"} src="" alt="" />

          </Stack>



          <Stack direction={"row"} alignItems={"center"} >


            <IconButton>


              <SearchIcon />
            </IconButton>


           <Cart/>



            < IconButton>


              
            </IconButton>



          </Stack>
        </>

      )}
    </Container>


  );
};

export default Header2;