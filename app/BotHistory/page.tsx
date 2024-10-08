'use client'
import AskPage from '@/components/BotHistory/AskPage'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AuthToken } from '../recoilContextProvider';
import { ScaleLoader } from 'react-spinners';


const Page = () => {
  const router = useRouter();
  const setAuthToken =useSetRecoilState(AuthToken);
  const authToken =useRecoilValue(AuthToken);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    setLoading(true);
    // Redirect to login page if no authToken
    if (!authToken || authToken === 'null' || authToken === 'undefined') {
      router.push('/signIn'); // Adjust the path as necessary
    } else {
      setAuthToken(authToken);
      setLoading(false);
}},[authToken, router])
  return (
   <>
   {
    loading?(
      <>
      <div className='flex items-center justify-center h-[1000px] w-full '>
      <ScaleLoader />
      </div>
      </>
    ):(
      <AskPage/>
    )
   }

   </>
  )
}

export default Page