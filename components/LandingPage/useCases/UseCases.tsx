import React from 'react'
import GradientText from '../Common/GradientText'
import FlexBox from '../Common/FlexBox'
import Image1 from "../../../public/Landing_Page_Assets/UseCases/Image12.svg"
import Image2 from "../../../public/Landing_Page_Assets/UseCases/Image2.svg"
import Image3 from "../../../public/Landing_Page_Assets/UseCases/Image3.svg"
import Image4 from "../../../public/Landing_Page_Assets/UseCases/Image4.svg"

const cardData=[
  {
  title:'Business Intelligence',
  description:'Make data-driven decisions without the learning curve.'
},
{
  title:'Market Research',
  description:'Analyze trends and patterns with ease.'
},
{
  title:'Financial Analysis',
  description:'Gain quick insights into complex financial data.'
},
{
  title:'Customer Behavior',
  description:'Understand your audience through intuitive data exploration.'
},
]

const ImagData=[Image1,Image2,Image3,Image4];

const UseCases = () => {
  return (
    <div className=' bg-black h-fit text-white'>
    <div className=' relative mt-20 mb-20 text-center'>
    <GradientText text='Use Cases' />
    </div>
    <FlexBox texts={cardData} images={ImagData} width="50"/>
</div>  )
}

export default UseCases