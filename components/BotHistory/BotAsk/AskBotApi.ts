import axiosInstance from '@/utils/axios';


export const AskBotAPI = async ({payload}: any) => {
    console.log("AskBot func Called");
    console.log("payload in api -->",payload);
    
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BOT_URL}/bot/ask?`,
      {
        ...payload,
      }
    );
    return {data:response.data, error:null}
  } catch (error) {
    console.error('There was an error fetching the data:', error.message);
    console.log(error);
    
    return {data:null, error:error}
  } 
};

