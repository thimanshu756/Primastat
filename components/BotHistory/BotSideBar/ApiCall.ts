import axiosInstance from '@/utils/axios';

export const getConversationHistory = async ({id}:any) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BOT_URL}/bot/history/list?datasetId=${id}`
    );
    return {data:response.data, error:null}
  } catch (error) {
    console.error('There was an error fetching the data:', error.message);
    return {data:null, error:error}
  } 
};
