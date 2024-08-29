"use client"
import React, { useEffect, useState } from 'react'
import { fetchPlanData } from './PlanApi';
import { Box, Skeleton, ToggleButtonGroup } from '@mui/material';
import PlanCard from '../PlanCard';
import ToggleButton from '@/components/Common/ToggleButton';
const Plans = () => {
    const [loading, setLoading] = useState(true);
    const [pricing, setPricing] = useState(null);
    const [planType, setplanType] = useState('Monthly');

    const getPricingData = async () => {
        try {
            setLoading(true);
            const response = await fetchPlanData();
            if (response.data) {
                setPricing(response.data.details);
                setLoading(false);
            } else {
                alert("getting some error in fetchplanData");
                setLoading(false);
            }
        } catch (error) {
            console.log("error ->", error);
        }
    }
    useEffect(() => {
        getPricingData();
    }, [])


    const handleChange = (newValue) => {
        setplanType(newValue);
    };
    const filteredPlans = pricing ? pricing.find(plan => plan.type === planType)?.plans : [];

    console.log("filteredPlans ->", filteredPlans);

    return (
        <div>

            {
                loading ? (<div className=' w-[200px]'>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                </div>) : (
                    <div className=' flex flex-col gap-3'>
                        <h1 className=' text-2xl  font-semibold'>Manage plan</h1>
                        <p className=' text-[#1E283780]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                    </div>
                )
            }


            <div className=' mt-10'>
                {
                    loading ? (<>
                        <Skeleton variant="rounded" width={110} height={50} className=' mx-auto' />
                    </>) : (
                        <ToggleButton
                            options={[
                                { label: 'Monthly', value: 'Monthly' },
                                { label: 'Yearly', value: 'Yearly' },
                            ]}
                            value={planType}
                            onChange={handleChange}
                        />)
                }
            </div>
            {
                loading ? (<div className='flex flex-col md:flex-row gap-10 justify-evenly mt-10'>
                <Skeleton variant="rounded" width={270} height={550} />
                <Skeleton variant="rounded" width={270} height={550} />
                <Skeleton variant="rounded" width={270} height={550} />
                </div>) : (
                    <div className=' flex flex-col md:flex-row gap-10 justify-evenly mt-10 '>
                        {
                            filteredPlans?.map((plan,i) => {
                                return (

                                    <PlanCard key={i} plan={plan} />

                                )
                            })
                        }
                    </div>
                )
            }


            {/* plan cards  */}
        </div>
    )
}

export default Plans 