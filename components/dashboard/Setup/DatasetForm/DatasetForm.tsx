import React, { useEffect, useState } from 'react';
import { createDB, fetchDatasetFormData } from '../Form/formApi';
import { createDataSet } from './createDataSetApi';
import { ScaleLoader } from 'react-spinners';
import { CiSearch } from 'react-icons/ci';

const DataSetForm = ({ dataBaseId }) => {
  const [tables, setTables] = useState([]);
  const [checkedTables, setCheckedTables] = useState({});
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDatasetFormData(dataBaseId);
        console.log('response in DataSetForm -->', data);

        if (data && data.tables && Array.isArray(data.tables)) {
          setTables(data.tables);

          const initialCheckedState = data.tables.reduce((acc, table) => {
            acc[table] = false;
            return acc;
          }, {});
          setCheckedTables(initialCheckedState);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dataBaseId]);

  const [datasetName, setdatasetName] = useState('');

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedTables((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectAll = () => {
    const newCheckedTables = tables.reduce((acc, table) => {
      acc[table] = true;
      return acc;
    }, {});
    setCheckedTables(newCheckedTables);
  };

  const handleClearAll = () => {
    const newCheckedTables = tables.reduce((acc, table) => {
      acc[table] = false;
      return acc;
    }, {});
    setCheckedTables(newCheckedTables);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const selectedTables = Object.keys(checkedTables).filter((table) => checkedTables[table]);
    console.log('Selected Tables:', selectedTables);
    const payload = {
      name: datasetName,
      databaseId: dataBaseId,
      tables: selectedTables,
    };
    console.log("the payload looks like this -->", payload);

    try {
      setLoading(true);
      await createDataSet({ payload });
      console.log('Database created successfully');
      setLoading(false);
      setFormLoading(false);
    } catch (error) {
      setFormLoading(false);
      console.error('Error creating database:', error);
    }
  };

  return (
    <>
      {loading ? (
        <div className='flex items-center h-[50px] mt-20 justify-center w-full '>
          <ScaleLoader />
        </div>
      ) : (
        <div className='flex h-[500px]'>
          <form  className='p-3'>

            <div className="relative w-[300px]">
              <div className="absolute inset-y-0 right-1 pl-3 flex items-center pointer-events-none">
                <span className='text-[#D1D3D5] mr-4'>|</span>
                <CiSearch className='text-[#878C96] h-6 w-6' />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-xl w-[300px]"
                placeholder="Enter Your DataSetName"
                value={datasetName}
                onChange={e => setdatasetName(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-5">
                <div className='flex items-center gap-3'>
                <input type="checkbox" name="selectall" id="selectall" onClick={handleSelectAll}/>
              <label htmlFor="selectall" className="cursor-pointer">
                    Select All 
                  </label> 
                </div>
               
              <button
                type="button"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>

            <div className='border rounded-md mt-5'>
              {tables.map((table, index) => (
                <div
                  key={index}
                  className={`flex rounded gap-5 p-2 ${checkedTables[table] ? 'bg-[#EDF5FF]' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    id={table}
                    name={table}
                    value={table}
                    checked={checkedTables[table] || false}
                    onChange={handleChange}
                  />
                  <label htmlFor={table} className="cursor-pointer">
                    {table}
                  </label>
                </div>
              ))}
            </div>
          </form>
          <div className='border-l-[1px] p-4 w-full  '>
            <h3 className=' my-3 font-medium'>Selected Dataset</h3>
            <div className=' flex flex-col gap-3 h-[75%] '>
              {Object.keys(checkedTables)
                .filter((table) => checkedTables[table])
                .map((table) => (
                  <div className=' border bg-[#EDF5FF] p-2 rounded-md' key={table}>{table}</div>
                ))}
            </div>
            <button
              type='submit'
              className='mx-auto flex justify-center bg-[#1E2837] p-2 w-full rounded-md text-white mt-5'
              onClick={handleSubmit}
            >
              Create Dataset
            </button>
          </div>
        </div>
      )}
    </>  
  );
};

export default DataSetForm;
