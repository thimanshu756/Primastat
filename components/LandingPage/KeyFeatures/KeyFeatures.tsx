import React from 'react'
import GradientText from '../Common/GradientText'
import Image1 from "@/public/Landing_Page_Assets/KeyFeatures/Image1.webp"
import Image2 from "@/public/Landing_Page_Assets/KeyFeatures/Image2.svg"
import Image3 from "@/public/Landing_Page_Assets/KeyFeatures/Image3.svg"
import Image4 from "@/public/Landing_Page_Assets/KeyFeatures/Image4.svg"
import FlexBox from '../Common/FlexBox'

const cardData=[
  {
  title:'Natural Language Queries',
  description:'Ask questions in plain English and get instant answers from your data.'
},
{
  title:'Seamless Database Integration',
  description:'Connect to your existing databases with ease, no migration needed.'
},
{
  title:'Intelligent Visualization',
  description:'Automatically generate the most relevant charts and graphs for your queries.'
},
{
  title:'Dataset Creation',
  description:'Organize your tables into custom datasets for focused analysis.'
},
]

const ImagData=[Image1,Image2,Image3,Image4];

const KeyFeatures = () => {
  return (
    <div className=' bg-black h-fit text-white'>
        <div className=' relative mt-20 mb-20 text-center'>
        <GradientText text='Key Features' />
        </div>
        <FlexBox texts={cardData} images={ImagData} width='70'/>
    </div>
  )
}

export default KeyFeatures