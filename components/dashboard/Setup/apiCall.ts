import axiosInstance from '@/utils/axios';

export  const fetchFormData = async (dbId:any) => {
    console.log("dbId ->",dbId);
    
  try {
    const response = await axiosInstance(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/db/conn/form?dbSpecsId=${dbId}`
    );
        
    return(response.data.formFields);
  } catch (error) {
    console.error('There was an error fetching the data:', error.message);
  } 
};


export  const fetchData = async (bool) => {
  try {
    console.log("hii there2");
    const response = await axiosInstance(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/supported_db?main=${bool}`
    );
    return { data: response.data.supportedDatabases, error: null };
  } catch (error) {
    console.error('There was an error fetching the data:', error.message);
    return { data: null, error: error.message };
  } 
};