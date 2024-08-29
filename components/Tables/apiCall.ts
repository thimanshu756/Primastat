import axiosInstance from '@/utils/axios';

export const getDataSet = async () => {
  
  try {
      const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/dataset/all?page=0&pageSize=5`
      );
      console.log('API Response:', response); // Log the response data
      return { data: response.data, error: null };
  } catch (error) {
      console.error('There was an error fetching the data:', error.message);
      return { data: null, error: error.message };
  } 
};
