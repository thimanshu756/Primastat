'use client'
import { BotHistoryKeys } from '@/app/recoilContextProvider';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { getConversationHistoryDetails } from './ApiCall';
import BarGraph from '@/components/Charts/BarGraph';
import { Box, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BotHistoryTable from '../BotHistoryTable/BotHistoryTable';
import SqlQuery from '../SqlQuery';

const BotHistoryGraph = () => {
    const [botHistoryKeysData, setBotHistoryKeysData] = useRecoilState(BotHistoryKeys);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [alignment, setAlignment] = useState('Chart');
    const [sqlQuery,setsqlQuery]=useState('');

    const fetchApi = async () => {
        setLoading(true);
        const response = await getConversationHistoryDetails({ botHistoryKeysData });
        if (response.error) {
            setError(response.error);
            setLoading(false);
        } else {
            console.log("response ->", response.data);
            setChartData(response.data.chartData);;
            setRawData(response.data.rawData);
            setsqlQuery(response.data.sqlQuery);
            setError(null);
            setLoading(false);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchApi();
    }, [])
    useEffect(() => {
        fetchApi();
    }, [botHistoryKeysData])
    console.log("Chart data is ->", chartData);
    const barColors = ['#6CB9AD', '#324DDD']; // Example colors

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    
    if (chartData === null) {
        return (<>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
                <Skeleton variant="rectangular" width="100%" height={400} />
            </Box>
        </>)
    }
    return (
        <div>
            {
            loading ? (<>
            
                    <Skeleton variant="rectangular" width="100%" height={400} />
                </>) : (<>
                <div className='flex flex-col md:flex-row justify-between gap-5   mb-10'>
                <div className=' flex flex-col gap-5'>
                   <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="Table">Table</ToggleButton>
                        <ToggleButton value="Chart">Chart</ToggleButton>
                    </ToggleButtonGroup>
                    <p className=' text-black text-2xl font-semibold'>
                        {chartData?.title}
                    </p>
                   </div>
                    <SqlQuery sqlQuery={sqlQuery}/>
                </div>
                  
       
                <div className='w-[100%] p-5 md:w-[65%] '>
                {
                        alignment==="Table" ?(
                            <BotHistoryTable rawData={rawData} />
                        ):(
                            <BarGraph data={chartData.options} barColors={barColors} />
                        )
                    }
                </div>
                </>)
            }
        </div>
    )
}

export default BotHistoryGraph