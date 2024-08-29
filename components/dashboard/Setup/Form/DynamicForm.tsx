import React, { useState } from 'react';
import { createDB } from './formApi';
import {  useSetRecoilState } from 'recoil';
import { FormSteps } from '@/app/recoilContextProvider';
const DynamicForm = (props) => {


  const setFormStepsNumber = useSetRecoilState(FormSteps);

    const dbId=props.dbId;
    const fields=props.formFields ;
    const [formData, setFormData] = useState(
    fields?.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const updatedFormData = { ...formData, dbSpecsId: `${dbId}` };
    console.log("updatedFormData =>",updatedFormData);
    const payload = {
      connection:{
        ...updatedFormData
      }
    }
    console.log("updated payload ->",payload);
    
    await createDB(updatedFormData);
    setFormStepsNumber(2);
  };

  return (
    <form onSubmit={handleSubmit} className=' p-6 flex flex-col gap-5'>
      
      {fields?.map((field) => (

        <div key={field.name} className='grid grid-cols-1 md:grid-cols-2 mb-4 '>
        
          <label className=''>
            {field.displayName}:
            </label>
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              placeholder={`Enter ${field.displayName} ${field.type === 'number'? 'number':''}`}
              className=' border p-2 rounded-md w-[90%]'
            />
        </div>
      ))}
     <button type='submit' className=' mx-auto flex justify-center bg-[#324DDD] p-3  rounded-md text-white'>Create Connection</button>
    </form>
  );
};

export default DynamicForm;
