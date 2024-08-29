import axiosInstance from '@/utils/axios';


export const createDB = async (
  payload
: any) => {
    console.log("create Db func Called ->",payload);
    
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/db/create`,
      {
        ...payload,
      }
    );
    console.log("response ->",response);
    
  } catch (error) {
    console.error('There was an error fetching the data:', error.message);
  } 
};

export  const fetchDatasetFormData = async (dbId:any) => {

  console.log("dbId ->",dbId);
  
  console.log("hii there in fetchDatasetFormData");
try {
  console.log("hii there2 in fetchDatasetFormData");
  const response = await axiosInstance(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/db/ext/tables?databaseId=${dbId}`);
      console.log("response in fetchDatasetFormData ->",response.data.tables);
      
  return(response.data);
} catch (error) {
  console.error('There was an error fetching the data:', error.message);
} 
};
