import axiosInstance from '@/utils/axios';


export const createDataSet = async ({payload}: any) => {
    console.log("createDataSet func Called");
    console.log("payload in api -->",payload);
    
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/dataset/create`,
      {
        ...payload,
      }
    );
    console.log("response in createDataSet ->",response);
    
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  } 
};