// @ts-nocheck

import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollToTop = () => {
    return (
    <Zoom in={useScrollTrigger()} >
           
                <Fab size='small'
                 sx={{ position: "fixed",
                  bottom: 33,
                   right: 33 
                   }} color="primary"
                    aria-label="add"
                    onClick={(params) => {
                        window.scrollTo(0, 0);
                    }
                    }
                   >
                    <KeyboardArrowUp fontSize="medium" />
        
                </Fab>
        
            
    </Zoom>
    );
}

export default ScrollToTop;
