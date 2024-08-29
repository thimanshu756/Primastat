import React from 'react'
interface GradientProps{
    text:string
}
const GradientText = ({text}:GradientProps) => {
  return (
    <span className='bg-gradient-to-r mt-10  from-[#0FACFE] text-3xl to-[#A20CFF] inline-block text-transparent bg-clip-text'>{text}</span>
  )
}

export default GradientText