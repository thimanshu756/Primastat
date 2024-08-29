import axiosInstance from "@/utils/axios";

export  const fetchPlanData = async () => {
    try {
      console.log("Inside fetchPlanData ");
      const response = await axiosInstance(
        `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/es/product/pricing`
      );
      return { data: response.data, error: null };
    } catch (error) {
      console.error('There was an error fetching the data:', error.message);
      return { data: null, error: error.message };
    } 
  };