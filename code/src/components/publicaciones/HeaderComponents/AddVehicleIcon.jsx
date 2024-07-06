import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import {CarFront} from 'lucide-react';
export default function AddCar() {
    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab size="small" color="primary" aria-label="add">
          <CarFront/>
        </Fab>
      </Box>
    );
  }