import React, { useEffect, useState } from 'react'
import DBCard from './DBCard'
import { fetchData } from './apiCall';
import AllDbModal from '@/components/Modals/AllDbModal';
import { Skeleton } from '@mui/material';
import { useRecoilState } from 'recoil';
import { DashBoardError } from '@/app/recoilContextProvider';

interface setUpProps {
  loading: boolean,
  supportedDB: []
}

const Setup = () => {
  const [loading, setLoading] = useState(false);
  const [supportedDB, setSupportedDB] = useState([]);
  
  const [error , setError] = useRecoilState(DashBoardError);

  const fetchDataAsync = async () => {
    setLoading(true);

      const result = await fetchData(true);
      if (result.error) {
        setError(result.error)
        setLoading(false)
      }else{
        setSupportedDB(result.data);
        setError(null);
        setLoading(false); 
      }

  };
  // const fetchAllDataAsync = async () => {
  //   setLoading(true);
  //   const data= await fetchData(false);
  //   setSupportedDBAll(data);
  //   setLoading(false);
  // };
  useEffect(() => {
    fetchDataAsync();

  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  return (
    <>
      {
        error ? (<>    {error}</>):(
          <div>
          <div className=' flex flex-col gap-2 mb-5'>
                {
                  loading ? (<>                  <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' }} />
                  </>) : (<>
                    <p className=' text-xl font-semibold '>Set up your Dataset</p>
                  </>)
                }
                {
                  loading ? (<><Skeleton variant="text" width={200} sx={{ fontSize: '1rem' }} />
                  </>) : (<>
                    <p className='text-xs text-[#1E283780]'>0 of 4 Steps Completed</p>
                  </>)
                }
              </div>
              <div className='bg-[#F5F5F8] mb-10 border p-3 rounded-md '>
                {
                  loading ? (<><Skeleton variant="rounded" width={150} height={50} /></>) : (<div className='border w-[170px] h-[50px] flex items-center gap-3 px-2 justify-center rounded-md bg-white'><input type="radio" name="" id="" checked className=' bg-blue-700 h-5 w-5' />Connect Data</div>
                  )
                }
                <div className=' border mt-10 mb-10'></div>
                <div className=' flex items-center justify-between px-7'>
                  <div className=' flex items-center justify-between w-full'>
                    <div>
                      {
                        loading ? (<>
                          <div className=' w-full'>
                            <Skeleton variant="text" width={300} sx={{ fontSize: '1rem' }} />
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          </div>
                          <div>
                          </div>
                        </>) : (
                          <>
                            <h1 className=' font-semibold text-2xl'>Connect Data</h1>
                            <p className=' text-[#1E2837]'>Add a connection to your database</p>
                          </>
        
                        )
                      }
        
                    </div>
                    {
                      loading ? (<Skeleton variant="rounded" width={100} height={50} />
                      ) : (<button onClick={handleOpen} className=' bg-gray-800 text-white p-2 hidden md:visible md:block rounded-md hover:scale-110 transition-all duration-200'>View All {">>"}</button>
                      )
                    }
                  </div>
        
                </div>
                {
                  loading ? (<>
                    <div className=' grid grid-cols-4 mt-10 ml-14'>
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                      <Skeleton variant="rounded" width={210} height={60} />
                    </div>
        
                  </>) : (
                    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                      {
                        supportedDB?.map((db) => (
                          <>
                            <DBCard key={db} dbDetails={db} flag={true} />
                          </>
                        ))
                      }
                    </div>
                  )
                }
                <div className=' w-full'>
                {
                      loading ? (<Skeleton variant="rounded" width={100} height={50} />
                      ) : (<button onClick={handleOpen} className=' bg-gray-800 text-white p-2  md:hidden  rounded-md hover:scale-110 flex  justify-center mx-auto transition-all duration-200'>View All {">>"}</button>
                      )
                    }
                </div>

              </div>
              
              <AllDbModal open={open} handleClose={handleClose} />
          </div>
        )
      }
    </>
  )
}

export default Setup