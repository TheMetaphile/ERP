import React from 'react'
import signature from './../../assets/signature.jpg';

export default function Table() {
  return (
    <div className=' flex justify-evenly'>
      <table className=' mt-7  w-full justify-evenly items-center ml-5 mr-5'>

        <tr className='outline  outline-slate-500 mt-3  no-underline text-xl'>
          <th className='no-underline text-xl'>Date </th>
          <th className='no-underline text-xl'>Subject </th>
          <th className='no-underline text-xl'>Time </th>
        </tr>
        <br></br>

        <tr className='mt-2'>
          <td className='text-sm text-gray-700 text-center'>11 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>Maths</td>
          <td className='text-sm text-gray-700 text-center'>10:00 am to 12:00 pm</td>

        </tr>
        <br></br>
        <tr>
          <td className='text-sm text-gray-700 text-center'>12 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>English</td>
          <td className='text-sm text-gray-700 text-center'>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td className='text-sm text-gray-700 text-center '>13 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>Hindi</td>
          <td className='text-sm text-gray-700 text-center '>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td className='text-sm text-gray-700 text-center' >14 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>S.S.T</td>
          <td className='text-sm text-gray-700 text-center '>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td className='text-sm text-gray-700 text-center'>15 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center '>Moral-value</td>
          <td className='text-sm text-gray-700 text-center'>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td className='text-sm text-gray-700 text-center'>18 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>Science</td>
          <td className='text-sm text-gray-700 text-center'>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td className='text-sm text-gray-700 text-center'>19 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>Drawing</td>
          <td className='text-sm text-gray-700 text-center'>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td className='text-sm text-gray-700 text-center'>20 Jan 2024</td>
          <td className='text-sm text-gray-700 text-center'>G.k</td>
          <td className='text-sm text-gray-700 text-center'>10:00 am to 12:00 pm</td>
        </tr>
        <br></br>

        <tr>
          <td></td>
          <td></td>
          <td className='flex items-center justify-center font-medium'>
            <h1>
              <img src={signature} alt="" />
              Principal
            </h1>
          </td>

        </tr>
      </table>




    </div>


  )
}
