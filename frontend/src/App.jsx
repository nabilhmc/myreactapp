// @ts-nocheck
import Header2 from "./components/header/Header2";
import Header1 from "./components/header/Header1";
import Header3 from "./components/header/Header3";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from "./components/main/CheckoutPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Succes from "./components/main/Succes";
import Test from "./components/main/Test";


function Home() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header1 />
        <Header2 theme={theme} />

        <Header3 />

        <Box
          bgcolor={theme.palette.bg.main}
        >
          <Hero />
          <Main />
          

        </Box>
        

        <Footer />

        <ScrollToTop />

      </ThemeProvider>
    
    </ColorModeContext.Provider>
  );
}
function Checkout() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header1 />
        <Header2 />
        <Header3 />

        <Box bgcolor={theme.palette.ckeckout.main} >
          <CheckoutPage />
          
        </Box>

        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
function Checkoutsucces() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header1 />



        <Box bgcolor={"#F6F9FC"} >
          <Succes />

        </Box>

        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
function Testt() {
 

  return (
    <Test/>

  );
}






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Testt />} />
      
       
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-succes" element={<Checkoutsucces />} />
        {/* Add more routes as needed */}
      </Routes>

    </Router>
  );
}

export default App;