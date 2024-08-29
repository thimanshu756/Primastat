
'use client'
import { AllDatasets, BotLoader, SelectedDataset } from '@/app/recoilContextProvider';
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { AskBotAPI } from './AskBotApi';
import { LinearProgress, Skeleton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SqlQuery from '../SqlQuery';
import BotHistoryTable from '../BotHistoryTable/BotHistoryTable';
import BarGraph from '@/components/Charts/BarGraph';
import AskForm from './AskForm';


const AskBot = () => {
    const [question, setQuestion] = useState('');
    const [botLoader, setBotLoader] = useRecoilState(BotLoader);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('1');
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [alignment, setAlignment] = useState('Chart');
    const [sqlQuery, setsqlQuery] = useState('');
    const [dataSetDetails, setDataSetDetails] = useRecoilState(AllDatasets);

    const [selectedDataset, setselectedDataset] = useRecoilState(SelectedDataset);

    const DatasetId = selectedDataset; // set this in recoilstate;
    const payload = {
        "datasetId": DatasetId,
        "question": question
    };
    
    const callApi = async () => {
        setLoading(true);
        const response = await AskBotAPI({payload});
        if (response.error) {
            setError(response.error);
            setLoading(false);
        }else{
            console.log("response ->", response.data);
            setChartData(response.data.chartData);;
            setRawData(response.data.rawData);
            setsqlQuery(response.data.sqlQuery);
            setError(null);
            setStep('2');
            setLoading(false);
        }
        setLoading(false);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        callApi();
    }
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

  
    const barColors = ['#6CB9AD', '#324DDD']; 
    return (
        <>
            {
                step === '1' && (<>
                <div className=' h-[59px] bg-white   '>
                    {/* <div className='absolute right-1 w-[18%]'>
                        <div className=' flex flex-col md:flex-row gap-5'>
                        <button className=' border w-[100px] p-2 rounded-md border-black mr-4'>Back</button>
                        <button className='border bg-black text-white w-[100px] p-2 rounded-md border-black'>Next</button>
                        </div>
                    </div> */}
                </div>

                <div>
                {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center z-10">
                    <LinearProgress className="w-full" />
                </div>
            )}

                   <AskForm setQuestion={setQuestion} question={question} handleSubmit={handleSubmit} />
                  
                </div>
                </>)
            }
            {
                step === '2' && (<>
                  <div>
            {
                loading ? (<><p>
                    <Skeleton variant="rectangular" width="100%" height={400} />
                </p></>) : (<>
                <div className='flex justify-between   mb-10'>
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
                    <p className=' text-[#2329DB] text-2xl font-semibold'>
                        {chartData?.title}
                    </p>
                   </div>
                    <SqlQuery sqlQuery={sqlQuery}/>
                </div>
                  
       
                    {
                        alignment==="Table" ?(
                            <BotHistoryTable rawData={rawData} />
                        ):(
                            <BarGraph data={chartData.options} barColors={barColors} />
                        )
                    }
                </>)
            }
        </div>
                </>)
            }
        </>

    )
}

export default AskBot