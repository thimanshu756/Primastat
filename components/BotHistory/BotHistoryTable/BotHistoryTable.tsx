
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BotHistoryTable = ({ rawData }) => {
  if (!rawData || rawData.length === 0) {
    return <div>No Data Available</div>;
  }

  // Extract the headers dynamically from the keys of the first object in the array
  const headers = Object.keys(rawData[0]);

  return (
    <TableContainer component={Paper} className='  mx-auto'>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header.replace(/_/g, ' ')}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rawData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header, index) => (
                <TableCell key={index}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BotHistoryTable;