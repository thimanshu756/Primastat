import axiosInstance from '@/utils/axios';

export const getDataSetDetail = async (id:any) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/dataset/sample?datasetId=${id}`
    );
    console.log("response  in getDataSetDetail->",response);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('There was an error fetching the data:', error.message);
    return { data: null, error: error.message };
  } 
};

