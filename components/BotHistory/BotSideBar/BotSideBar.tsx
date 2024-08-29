'use client';
import React, { useEffect, useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logo from '@/public/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { getConversationHistory } from './ApiCall';
import { useRecoilState } from 'recoil';
import { BotHistoryKeys, BotPageStatus, SelectedDataset } from '@/app/recoilContextProvider';
import { Skeleton, Box, Accordion } from '@mui/material';
function BotSideBar({ isCollapsed }: { isCollapsed: boolean }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [historyDetails, setHistoryDetails] = useState([]);
  const [botHistoryKeysData, setBotHistoryKeysData] = useRecoilState(BotHistoryKeys);
  const [botPageStatus, setBotPageStatus] = useRecoilState(BotPageStatus);
  const [selectedDataset, setselectedDataset] = useRecoilState(SelectedDataset);

  const DatasetId = selectedDataset;

  const callApi = async () => {
    setLoading(true);
    const response = await getConversationHistory({ id: DatasetId });
    if (response.error) {
      setError(response.error);
      setLoading(false);
    } else {
      const conversations = response.data.conversation;
      setHistoryDetails(conversations);
      // if (conversations && conversations.length > 0) {
      //   const firstConversation = conversations[0];
      //   setBotHistoryKeysData({
      //     datasetId: DatasetId,
      //     conversationId: firstConversation.conversationId,
      //     historyId: firstConversation.history[0]?.historyId || null,
      //   });
      // }
      setError(null);
      setLoading(false);
    }
  };
  console.log("historyDetails -->",historyDetails);
  
  useEffect(() => {
    callApi();
  }, []);
  useEffect(() => {
    callApi();
  }, [DatasetId]);
  
  const handleAccordionClick = (data, historyItem) => {
    console.log("Inside Handle Accordion ");
    console.log("Data ->",data);
    console.log("History Item ->",historyItem);
    setBotHistoryKeysData({
      datasetId: DatasetId,
      conversationId: data.conversationId,
      historyId: historyItem.historyId
    });
    
    setBotPageStatus('conversationDetail');
  };

  return (
    <div className={`w-full h-[100%] border-2 border-gray-200 transform perspective-3d`}>
      <Link href="/dashboard">
        <div className={`logo text-left p-4 cursor-pointer`}>
          <Image src={Logo} alt="logo" height={150} width={150} />
        </div>
      </Link>

      <div className={`${isCollapsed ? " hidden":" block"}`}>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} style={{ marginTop: 8 }} />
            <Skeleton variant="rectangular" width="100%" height={50} style={{ marginTop: 8 }} />
          </Box>
        ) : (
         
          historyDetails?.map((data, index) => (
  <Accordion
  key={index}
  defaultExpanded={index === 0}
  sx={{
    '&.Mui-expanded': {
      border: 'none',
      boxShadow: 'none', // Remove shadow if needed
    },
  }}
>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls={`panel${index}-content`}
    id={`panel${index}-header`}
    className="border-none custom-accordion"
    style={{ borderBottom: 'none' }}
  >
    <div className="flex flex-col gap-3">
      <p>{data.title}</p>
      <p className="text-[#878C96] text-xs">{data.createdOn}</p>
    </div>
  </AccordionSummary>
  {data.history?.map((history, i) => (
    <AccordionDetails
      key={i}
      className="bg-[#2329DB14] custom-accordion hover:bg-[#2329db2e] transition-all delay-150 cursor-pointer border-none"
      style={{ borderBottom: 'none' }}
      onClick={() => handleAccordionClick(data, history)}
    >
      {history.question}
    </AccordionDetails>
  ))}
 </Accordion>

))
        )}
      </div>
    </div>
  );
}

export default BotSideBar;



