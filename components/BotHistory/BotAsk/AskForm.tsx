import React from 'react';
import { CiSearch } from 'react-icons/ci';
import clearImg from "@/public/AskBot/clear.svg";
import personalisedImg from "@/public/AskBot/personalised.svg";
import EfficiencyImg from "@/public/AskBot/Efficiency.svg";
import AskCard from './AskCard';

interface AskFormProps {
    setQuestion: (x: string) => void;
    question: string;
    handleSubmit: (e: React.FormEvent) => void;
}

const cardData = [
    {
        title: 'Clear & Precise',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
        img: clearImg,
    },
    {
        title: 'Personalized Answer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
        img: personalisedImg,
    },
    {
        title: 'Increased Efficiency',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
        img: EfficiencyImg,
    },
];

const AskForm: React.FC<AskFormProps> = ({ setQuestion, question, handleSubmit }) => {
    return (
        <div className='bg-white relative h-[100vh] overflow-x-hidden overflow-y-auto border-t'>
            <div className='rounded-full bg-[#2329DB40] h-[499px] w-[499px] relative top-[-350px] left-[50px] animate-pulse blur-3xl'></div>
            <div className='absolute top-[30%] flex flex-col items-center justify-center gap-5 my-auto w-full'>
                <h1 className='text-3xl font-semibold'>Ask a question:</h1>
                <form className="relative" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={question}
                        placeholder='Type your question here...'
                        onChange={(e) => setQuestion(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-3xl bg-[#F0F0F5] w-[500px]"
                    />
                    <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
                        <CiSearch className='text-[#878C96] h-6 w-6' />
                    </div>
                </form>
                <div className='flex flex-col md:flex-row gap-5 mt-11'>
                    {cardData.map((data, index) => (
                        <AskCard
                            key={index}
                            title={data.title}
                            description={data.description}
                            image={data.img}
                        />
                    ))}
                </div>
            </div>
            <div className='rounded-full bg-[#2329DB40] h-[499px] w-[499px] absolute bottom-[-150px] right-0 animate-pulse blur-3xl'></div>
        </div>
    );
}

export default AskForm;
