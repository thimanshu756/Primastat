import { Box, Modal, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DBCard from '../dashboard/Setup/DBCard'
import { fetchData } from '../dashboard/Setup/apiCall';

const AllDbModal = ({ open, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const [supportedDBAll, setSupportedDBAll] = useState([]);
    const fetchAllDataAsync = async () => {
        setLoading(true);
        const result = await fetchData(false);
        setSupportedDBAll(result.data);
        setLoading(false);
    };
    useEffect(() => {
        fetchAllDataAsync();
    }, []);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className=" rounded-xl">
                    <div className=' text-[#8A8F97]'>
                        Add a Dataset {">"} Select database type
                    </div>
                    <div className=' border-[0.5px] mt-5'></div>
                    {
                        loading ? (<div className=' grid grid-cols-3 gap-5 mt-10'>
                            <Skeleton variant="rounded" width={210} height={70} />
                            <Skeleton variant="rounded" width={210} height={70} />
                            <Skeleton variant="rounded" width={210} height={70} />
                            <Skeleton variant="rounded" width={210} height={70} />
                        </div>) : (
                            <div className=' grid grid-cols-3'>
                                {
                                    supportedDBAll?.map((db) => (
                                        <>
                                            <DBCard dbDetails={db} flag={false} />
                                        </>
                                    ))
                                }
                            </div>
                        )
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default AllDbModal