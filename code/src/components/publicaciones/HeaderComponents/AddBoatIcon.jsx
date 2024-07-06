import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Ship } from 'lucide-react';
export default function AddBoat() {
    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab size="small" color="primary" aria-label="add">
          <Ship/>
        </Fab>
      </Box>
    );
  }