import React, { useState, useEffect } from 'react';
import BotLayout from './BotLayout';
import BotHistoryGraph from './BotHistoryGraph/BotHistoryGraph';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AllDatasets, BotPageStatus, SelectedDataset } from '@/app/recoilContextProvider';
import AskBot from './BotAsk/AskBot';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getDataSet } from '../Tables/apiCall';
import { ScaleLoader } from 'react-spinners';

const AskPage = () => {
    const [botPageStatus] = useRecoilState(BotPageStatus);
    const [dataSetDetails, setDataSetDetails] = useRecoilState(AllDatasets);
    const [selectedDataset, setselectedDataset] = useRecoilState(SelectedDataset);
    const [open, setOpen] = useState(true); // Modal open state
    const [loading,setLoading]=useState(true);
    console.log("inside Ask page dataSetDetails ->",dataSetDetails);
    const handleSelectChange = (event) => {
        setselectedDataset(event.target.value); // Set selected dataset
        setOpen(false); // Close modal after selection
    };
    useEffect(() => {
        const callApi = async () => {
          setLoading(true);
          const response = await getDataSet();
          console.log("response in selectDataset Tables ->",response);
          if (response.error) {
            // setError(response.error)
            setLoading(false)
          }else{
            setDataSetDetails(response.data?.datasets);
            // setError(null);
            setLoading(false); 
          }
        }
        callApi();
      }, [])
    useEffect(() => {
        // Open modal if no dataset is selected
        if (!selectedDataset) {
            setOpen(true);
        }
    }, [selectedDataset]);

    return (
        <>
        {
            loading?(<>
                <div className='flex items-center justify-center h-[1000px] w-full '>
                <ScaleLoader />
                </div>
                </>):(
                <div>
            {/* Modal for selecting dataset */}
            <Modal open={open}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      outline: 'none',  // Remove the default blue outline
      border: 'none',    // Remove any border that might be applied
      borderRadius: '10px',  // Add border radius
    }}
  >
    <Typography variant="h6" component="h2">
      Select a Dataset
    </Typography>
    <Select
      value={selectedDataset || ''}
      onChange={handleSelectChange}
      fullWidth
      sx={{
        '&:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', // Removes the blue border
          },
          '&:hover fieldset': {
            borderColor: 'transparent', // Ensures no border on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent', // Ensures no border when focused
          },
        },
      }}
    >
      {dataSetDetails.map((dataset, index) => (
        <MenuItem key={index} value={dataset.id}>
          {dataset.name} {/* Adjust based on your data structure */}
        </MenuItem>
      ))}
    </Select>
  </Box>
</Modal>


            {/* Render AskBot or BotHistoryGraph based on botPageStatus */}
            {
                botPageStatus === 'askQuestion' && (
                    <BotLayout>
                        <AskBot />
                    </BotLayout>
                )
            }
            {
                botPageStatus === 'conversationDetail' && (
                    <BotLayout>
                        <BotHistoryGraph />
                    </BotLayout>
                )
            }
        </div>
            )
        }
        
        </>
    );
};

export default AskPage;
