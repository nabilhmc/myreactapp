// @ts-nocheck
import {
  Box,
  Container,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import WindowIcon from "@mui/icons-material/Window";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import {
  SportsEsportsOutlined,
  ElectricBikeOutlined,
  LaptopChromebookOutlined,
  MenuBookOutlined,
  Close,
} from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Links from "./Links";

const Header3 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
    <Container

      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 5,
      }}
    >


      {useMediaQuery("(min-width:1200px)") && (
        <>
          <Box>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                width: 222,
                // @ts-ignore
                bgcolor: theme.palette.myColor.main,

                color: theme.palette.text.secondary,
              }}
            >
              <WindowIcon />
              <Typography
                sx={{
                  padding: "0",
                  textTransform: "capitalize",
                  mx: 1,
                }}
              >
                Categories
              </Typography>
              <Box flexGrow={1} />

              <KeyboardArrowRightOutlinedIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                ".MuiPaper-root": {
                  width: 220,
                  // @ts-ignore
                  bgcolor: theme.palette.myColor.main,
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ElectricBikeOutlined fontSize="small" />
                </ListItemIcon>

                <ListItemText>Vélos</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LaptopChromebookOutlined fontSize="small" />
                </ListItemIcon>

                <ListItemText>Électronique</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <MenuBookOutlined fontSize="small" />
                </ListItemIcon>

                <ListItemText>Livres</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SportsEsportsOutlined fontSize="small" />
                </ListItemIcon>

                <ListItemText>Jeux</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
          <Stack gap={4} direction={"row"} alignItems={"center"}>
            <Links title={"Accueil"} />
            <Links title={"Menu"} />
            <Links title={"Menu plein écran"} />
            <Links title={"Pages"} />
            <Links title={"Compte d'utilisateur"} />
            <Links title={"Compte fournisseur"} />
          </Stack>
        </>
      )}


    </Container>
  );
};

export default Header3;