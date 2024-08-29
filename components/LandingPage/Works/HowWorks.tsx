import React, { useEffect, useState, useMemo, useCallback } from 'react';
import GradientText from '../Common/GradientText';
import AskQuestionImg from "@/public/Landing_Page_Assets/HowWorks/AskQuestions.webp";
import ConnectDatabaseImg from "@/public/Landing_Page_Assets/HowWorks/ConnectDatabase.webp";
import CreateDatasetImg from "@/public/Landing_Page_Assets/HowWorks/CreateDataset.webp";
import VisualiseImg from "@/public/Landing_Page_Assets/HowWorks/VisualiseResults.webp";
import Image from 'next/image';

const tabsName = [
  "Connect Database",
  "Create Datasets",
  "Ask Questions",
  "Visualise Results"
];

const tabsData = [
  {
    tag: "Connect Database",
    title: "Connect your Database",
    description: "Securely link Nova to your existing data sources",
    image: ConnectDatabaseImg
  },
  {
    tag: "Create Datasets",
    title: "Create your Dataset",
    description: "Securely link Nova to your existing data sources",
    image: CreateDatasetImg
  },
  {
    tag: "Ask Questions",
    title: "Ask your Questions",
    description: "Securely link Nova to your existing data sources",
    image: AskQuestionImg
  },
  {
    tag: "Visualise Results",
    title: "Visualise your Results",
    description: "Securely link Nova to your existing data sources",
    image: VisualiseImg
  }
];

const HowWorks = () => {
  const [activeTab, setActiveTab] = useState(tabsName[0]);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const activeTabData = useMemo(() => tabsData.find(tab => tab.tag === activeTab), [activeTab]);

  // Automatic tab switching
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabsName.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabsName.length;
        return tabsName[nextIndex];
      });
    }, 5000); // Switch tab every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-20 bg-[#090B25]">
      <div className='relative mb-20 left-[45%]'>
        <GradientText text='How It Works' />
      </div>
      <div className="flex items-center justify-center px-2 space-x-1 sm:space-x-2">
        {tabsName.map((tab, index) => (
          <React.Fragment key={tab}>
            <div className={`w-[250px] rounded-[1.8rem] to-[#A20CFF] ${activeTab === tab ? "bg-gradient-to-r from-[#0FACFE]" : "bg-black"} p-[0.07rem]`}>
              <button
                onClick={() => handleTabClick(tab)}
                className={`py-4 gap-3 h-full w-full ${activeTab === tab ? "text-white" : "text-gray-400"} rounded-[1.8rem] bg-black`}
              >
                {tab}
              </button>
            </div>

            {index < tabsName.length - 1 && (
              <div className="border-dotted border-t-2 border-gray-400 w-12"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-8 p-2 text-white flex flex-col md:flex-row items-center justify-around">
        <div>
          <h2 className="text-2xl font-bold">{activeTabData.title}</h2>
          <p className="mt-4">{activeTabData.description}</p>
        </div>
        <div className="mt-4 md:w-[50%] px-5 md:px-3">
          <Image src={activeTabData.image} alt={activeTabData.title} priority />
        </div>
      </div>
    </div>
  );
}

export default HowWorks;
