import React from 'react'
import "./tryIt.css"
import HomeButton from '../Common/HomeButton'
const TryIt = () => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Hii")
    }
  return (
    <div className='mt-20 p-2'>
        <div className=' section rounded-3xl p-2  h-[437px] lg:w-[1237px] mx-auto flex flex-col gap-5 items-center justify-center'>
            <h1 className=' text-white text-2xl'>Experience the Future of Data Analysis - Try Nova Free Today!</h1>
            <p className=' text-gray-400'>Sign up for our free trial and revolutionize how you interact with your data.</p>
            <HomeButton name='Try It' handlefunction={handleSubmit}/>
        </div>
    </div>
  )
}

export default TryIt