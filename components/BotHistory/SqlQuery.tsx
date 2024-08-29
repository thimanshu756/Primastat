import React from 'react'

const SqlQuery = ({ sqlQuery }) => {
   // Split the SQL query by line breaks to create an array of lines
   const lines = sqlQuery.split('\n');

   return (
     <div className=' border p-4 max-w-[350px]'>
       {lines.map((line, index) => (
         <p key={index}>{line}</p>
       ))}
     </div>
   );
}

export default SqlQuery