import axiosInstance from '@/utils/axios';

export const getConversationHistoryDetails = async ({botHistoryKeysData}:any) => {
    // datasetId: string;
    // historyId: string;
    // conversationId: string;
    let datasetId=botHistoryKeysData.datasetId;
    let historyId=botHistoryKeysData.historyId;
    let conversationId=botHistoryKeysData.conversationId;
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BOT_URL}/bot/history/${conversationId}?datasetId=${datasetId}&historyId=${historyId}`
    );
    return {data:response.data, error:null}
  } catch (error) {
    console.error('There was an error fetching the data:', error);
    return {data:null, error:error}
  } 

};

