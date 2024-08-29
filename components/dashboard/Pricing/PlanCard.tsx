import React from 'react'

const PlanCard = ({plan}) => {
    
  return (
    <div className='relative border min-h-[550px] shadow-lg rounded-md p-5 min-w-[320px] max-w-[400px]'>
   <div className=' flex flex-col gap-10'>
        <div className=' flex flex-col gap-4'>
        <p className=' mt-16 text-[30px] font-semibold'>{plan.name}</p>
        <p className=' text-sm text-[#1E283780]'>{plan.description}</p>
        </div>
      
        {/* {plan.price} */}
        <p className=' flex gap-2 items-end'>
            <p className=' flex gap-2'>
            <span className=' text-[#1E283780]'>$</span>
            <span className=' text-4xl font-semibold'>{plan.price}</span>
            </p>

        
            <p className=' text-[#1E283780]'>Per paid user/Mo</p>
        </p>
      <div className=' flex gap-3 flex-col min-h-[250px]'>
      <p className='text-xl font-semibold'>Features:</p>
         <ul className='list-disc list-inside text-[#1E283780] flex flex-col gap-3'>
            {
                plan.features.map((feature,i)=>{
                    return(
                        <li key={i}>{feature.description}</li>
                    )
                })
            }
        </ul>
      </div>
      <button className='   border p-3 rounded-lg bg-[#1E2837] text-white hover:scale-105 transition-all delay-200'>Choose This Plan</button>

    </div>
    </div>
 
  )
}

export default PlanCard