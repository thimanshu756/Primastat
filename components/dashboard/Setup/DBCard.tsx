"use client"
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { fetchFormData } from './apiCall';
import DynamicForm from './Form/DynamicForm';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { FormDetails } from '@/app/recoilContextProvider';
import DataSetForm from './DatasetForm/DatasetForm';
import { FormSteps  } from '@/app/recoilContextProvider';
import Image from 'next/image';
import { ScaleLoader } from 'react-spinners';
import resourceImg from "@/public/resources.svg"
const DBCard = ({ dbDetails , flag }: any) => {
  const FormDetailsData = useRecoilValue(FormDetails);
  const setFormDetailsData = useSetRecoilState(FormDetails);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const FormStepsNumber = useRecoilValue(FormSteps);
  
  const fetchDataAsync = async (id) => {
    setLoading(true);
    const data = await fetchFormData(id);
    setFormDetailsData(data);
    setLoading(false);
  };

  const openHandler = async (id) => {
    fetchDataAsync(id);
    handleOpen();
    console.log("formDetails -->", FormDetailsData);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '65%', // working nice wit create db modal
    // width: '85%', // working nice wit create dataset modal
    bgcolor: 'background.paper',
    minHeight:400,
    border:'none',
    borderRadius:5,
    boxShadow: 24,
    outline: 'none',  // Remove the default blue outline
  };
  return (
    <div>
      <div className={`border ${flag ? "flex bg-white flex-row-reverse  justify-evenly":" flex items-center justify-center shadow-xl "}  items-center gap-2 h-[70px] rounded-lg text-center py-4 hover:scale-110 cursor-pointer transition-all delay-120 p-3 m-5`} onClick={() => {
        openHandler(dbDetails.id)
      }}>
         {
          flag && (<h1 className={`${flag ? "block":"hidden"}`}>{dbDetails.name}</h1>)
        } 
        {
          flag? (<Image src={dbDetails.imageUrl} alt={dbDetails.name} width={50} height={50}/>):( <Image src={dbDetails.imageUrl} alt={dbDetails.name} width={120} height={120}/>)
        } 
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
       
          {
            loading ? (  
               <div className='flex items-center h-[50px] mt-20 justify-center w-full '>
              <ScaleLoader />
              </div>) : (<>
            {
             FormStepsNumber===1 ? (
                <>
               <div className=" flex items-center text-lg p-5 gap-2 ">
                <div>
                <p className=' text-[#8A8F97]'>Connect to DB {">"}</p>
                </div>
               <div className=' flex gap-1 items-center '>
                <Image src={dbDetails.imageUrl} alt={dbDetails.name} width={30} height={30}/>
                  <p>{dbDetails.name}</p>
                </div>
               </div>
               <div className='border '></div>
               <div className=' md:flex'>
              <div className=' md:w-[65%]'>
              <DynamicForm formFields={FormDetailsData} dbId={dbDetails.id} />
              </div>
               {/* Resources */}
                <div className='hidden md:block border-l-2 p-5'>
                <div className=' flex items-center my-3 gap-1'>
                  <Image  src={resourceImg} alt='resource Imf'/>
                  <h1 className=' text-xl'>Resources:</h1>
                </div>
                <div className=' pl-5'>
                    <ul className='  underline text-[#324DDD] list-disc font-light '>
                      <li>Data connection instructions</li>
                      <li>Our privacy policy</li>
                      <li>Supported databases</li>
                    </ul>
                  </div>
                </div>
               </div>
                </>
              ):(
                <>
                  <div className=" flex h-full  items-center text-lg p-3 gap-2 ">
                <div>
                <p className=' text-[#8A8F97]'>Add a Dataset {">"}</p>
                </div>
               <div className=' flex gap-1 items-center '>
               <p>Select Tables</p>
                </div>
               </div>
               <div className='border  '></div>
               <DataSetForm dataBaseId={'po9O8jx124'} />
                </>
              )
            }
            </>)
          }
        </Box>
      </Modal>
    </div>
  );
}
export default DBCard;
