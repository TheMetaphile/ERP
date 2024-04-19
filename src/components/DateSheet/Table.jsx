import React from 'react'

export default function Table(props) {
  return (
    <div className=' flex justify-evenly'>
    <table className='mt-12  w-full justify-evenly items-center'>
      <tr className='outline  outline-slate-500 mt-5  no-underline text-xl'>
        <th className='no-underline text-xl'>Date </th>
        <th className='no-underline text-xl'>Subject </th>
        <th className='no-underline text-xl'>Time </th>
 </tr>
 <tr className='mt-2'>
  <td className='text-sm text-gray-700 text-center'>02/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>maths</td>
  <td className='text-sm text-gray-700 text-center'>10:00 to 12:00</td>
  
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center'>03/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>English</td>
  <td className='text-sm text-gray-700 text-center'>10:00 to 12:00</td>
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center '>04/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>Hindi</td>
  <td  className='text-sm text-gray-700 text-center '>10:00 to 12:00</td>
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center' >05/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>S.S.T</td>
  <td className='text-sm text-gray-700 text-center '>10:00 to 12:00</td>
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center'>06/04/2024</td>
  <td className='text-sm text-gray-700 text-center '>Moral-value</td>
  <td className='text-sm text-gray-700 text-center'>10:00 to 12:00</td>
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center'>07/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>science</td>
  <td className='text-sm text-gray-700 text-center'>10:00 to 12:00</td>
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center'>08/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>Drawing</td>
  <td className='text-sm text-gray-700 text-center'>10:00 to 12:00</td>
 </tr>
 <tr>
  <td className='text-sm text-gray-700 text-center'>09/04/2024</td>
  <td className='text-sm text-gray-700 text-center'>G.k</td>
  <td className='text-sm text-gray-700 text-center'>10:00 to 12:00</td>
 </tr>
    </table>
    
    
    
    </div>
         
    
  )
}
