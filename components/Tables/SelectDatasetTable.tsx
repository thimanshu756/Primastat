import React, { useEffect, useState } from 'react'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { getDataSet } from './apiCall'
import DetailsModal from '../dashboard/DataSetTables/DetailsModal'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { AllDatasets, DashBoardError, DatasetTableId } from '@/app/recoilContextProvider';
import Image from 'next/image'
import dataset from '@/public/dataset.svg';
import { Skeleton } from '@mui/material'

const SelectDatasetTable = () => {
  const setId = useSetRecoilState(DatasetTableId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useRecoilState(DashBoardError);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataSetDetails, setDataSetDetails] = useRecoilState(AllDatasets);
  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      const response = await getDataSet();
      console.log("response in selectDataset Tables ->",response);
      if (response.error) {
        setError(response.error)
        setLoading(false)
      }else{
        setDataSetDetails(response.data?.datasets);
        setError(null);
        setLoading(false); 
      }
    }
    callApi();
  }, [])

  const handleviewMore = (id) => {
    setId(id);
    setOpen(true);
  }
  return (
    <>
      {
        error ? (<></>) : (
          <>
              <div>
              <div className=' mb-6 flex items-center justify-between'>
                <div className=' flex items-center gap-4 w-[300px]'>
                  {
                    loading ? (<>
                    
                      <Skeleton variant="circular" width={40} height={40} />
                    </>) : (  dataSetDetails.length != 0 && <Image src={dataset} alt='dataset image' />)
                  }
                  {
                    loading ? (<>
                      <Skeleton variant="text" width={200} sx={{ fontSize: '1.5rem' }} />
                    </>) : ( dataSetDetails.length != 0 &&  <p className=' font-semibold text-2xl'>Select Dataset</p>)
                  }
                </div>
                {
                  loading ? (<>
                    <Skeleton variant="rounded" width={150} height={50} />
                  </>) : ( <button className=' bg-gray-800 text-white p-2 rounded-md hover:scale-110 transition-all duration-200'>+ Add Dataset</button>)
                }

              </div>
              {
                loading ? (<>
                  <Skeleton variant="rounded" className='w-full ' height={200} />

                </>) : (
               dataSetDetails.length != 0 &&
                  <div className="overflow-hidden rounded-2xl border">
                    <Table className="">
                      <Thead className=' '>
                        <Tr className='  bg-[#1E2837] text-white'>
                          <Th className='py-3 '>DATASET NAME</Th>
                          <Th className='py-3  '>TOTAL RECORDS</Th>
                          <Th className='py-3 '>DATE CREATED</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody className=''>
                        {
                          dataSetDetails?.map((data) => {
                            return (
                              <Tr className=' border-b ' key={data.id}>
                                <Td className=' lg:flex px-5 py-3 items-center' >{data.name}</Td>
                                <Td className=' text-center px-5 '>{data.tableCount}</Td>
                                <Td>{data.createdOn}</Td>
                                <Td className=' flex px-5 py-3 items-center' >
                                  <button className=' text-blue-700' onClick={(e) => {
                                    e.preventDefault
                                    handleviewMore(data.id);
                                  }}>view more</button>
                                </Td>
                              </Tr>
                            )
                          })
                        }
                      </Tbody>
                    </Table>
                  </div>
                )
              }
              <DetailsModal open={open} handleClose={handleClose} />
            </div>
          </>
        )
      }
    </>
  )
}

export default SelectDatasetTable;