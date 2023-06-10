import React from 'react';
import { Grid } from '@mui/material';

export default function Schedule() {
  const totalCells = 40;
  const cellsPerRow = 7;
  const rows = Math.ceil(totalCells / cellsPerRow);

  return (
    <Grid container spacing={1}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Grid container item xs={12} spacing={1} key={rowIndex}>
          {Array.from({ length: cellsPerRow }).map((_, cellIndex) => (
            <Grid item xs={Math.floor(12 / cellsPerRow)} key={cellIndex}>
              Cell
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
