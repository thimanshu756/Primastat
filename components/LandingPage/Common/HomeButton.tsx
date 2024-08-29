import React from 'react'
interface buttonProps{
    name:string,
    handlefunction:(e: any)=>void 
}
const HomeButton = ({name,handlefunction}:buttonProps) => {

  return (
    <button className=' bg-[#5932EA] h-[48px] w-[121px] rounded-lg text-white' onClick={handlefunction}>{name}</button>
  )
}

export default HomeButton