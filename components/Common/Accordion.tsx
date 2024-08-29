import React, { useState } from 'react';

const Accordion = ({historyDetails ,handleAccordionClick}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="hs-accordion-group">
      {historyDetails.map((item, index) => (
        <div
          key={index}
          className={`hs-accordion ${activeIndex === index ? 'active' : ''}`}
          id={`hs-basic-with-arrow-heading-${item}`}
        >
          <button
            className={`hs-accordion-toggle ${
              activeIndex === index
                ? 'hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500'
                : ''
            } py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400`}
            aria-expanded={activeIndex === index}
            aria-controls={`hs-basic-with-arrow-collapse-${item}`}
            onClick={() => handleToggle(index)}
          >
            <svg
              className={`${
                activeIndex === index ? 'hidden' : 'block'
              } size-4`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
            <svg
              className={`${
                activeIndex === index ? 'block' : 'hidden'
              } size-4`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6"></path>
            </svg>
           {item.title}
          </button>
          <div
            id={`hs-basic-with-arrow-collapse-${item}`}
            className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
              activeIndex === index ? '' : 'hidden'
            }`}
            role="region"
            aria-labelledby={`hs-basic-with-arrow-heading-${item}`}
          >
            <p className="text-gray-800 dark:text-neutral-200">
              <em>This is the accordion body for item #{item}.</em> It is hidden
              by default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
