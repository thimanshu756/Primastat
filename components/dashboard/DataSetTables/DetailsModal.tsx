import React, { useEffect, useState } from 'react';
import { getDataSetDetail } from './ApiCall';
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilValue } from 'recoil';
import { DatasetTableId } from '@/app/recoilContextProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ScaleLoader } from 'react-spinners';

const DetailsModal = ({ open, handleClose }) => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = useRecoilValue(DatasetTableId);

    const fetchDatasetDetails = async () => {
        try {
            setLoading(true);
            const response = await getDataSetDetail(id);
            if (response.data) {
                setApiData(response.data.samples);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error fetching dataset details:", error);
        }
    };

    useEffect(() => {
        fetchDatasetDetails();
    }, [id]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '700px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
    };

    const globalStyle = `
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }
    `;

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = globalStyle;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {loading ? (
                    <ScaleLoader />
                ) : (
                    <Swiper
                        pagination={{
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + '"></span>';
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper h-full"
                        style={{ height: '100%', overflowY: 'auto' }}
                    >
                        {apiData.map((tableData, index) => (
                            <SwiperSlide key={index}>
                                <div>
                                    <h2 className='text-[#8A8F97]'>Dataset Sample {'>'} {tableData.tableName}</h2>
                                    <div className='border w-full mt-7 mb-5'></div>
                                    <div className='overflow-hidden rounded-xl border'>
                                        <div className="overflow-x-auto">  {/* Added container with horizontal scrolling */}
                                            <Table className='min-w-full border-collapse'>
                                                <Thead>
                                                    <Tr className='bg-[#1E2837] text-white'>
                                                        {Object.keys(tableData.sampleRows[0]).map((fieldName) => (
                                                            <Th className='p-3' key={fieldName}>{fieldName}</Th>
                                                        ))}
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {tableData.sampleRows.map((row, rowIndex) => (
                                                        <Tr key={rowIndex}>
                                                            {Object.values(row).map((value, cellIndex) => (
                                                                <Td key={cellIndex} className='border-b py-4 p-3 text-center'>{value}</Td>
                                                            ))}
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </Box>
        </Modal>
    );
};

export default DetailsModal;
