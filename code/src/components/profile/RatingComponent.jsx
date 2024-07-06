"use client"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function RatingComponent({number=0,format='normal'}) {
  console.log(number)
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >

      {/* 
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
      */}
      {format === 'table' ? (
        <div className='flex'>
         <Rating name="read-only" value={number} readOnly className='text-lg' />
         <span className='ml-1'>({number})</span>
        </div>
      ) : (
        <div>
          <h1 className='font-semibold'>Puntuación</h1>
          <Rating name="read-only" value={number} readOnly />
        </div>

      )}

    </Box>
  );
}
