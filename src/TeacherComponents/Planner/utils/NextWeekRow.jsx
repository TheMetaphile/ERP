import React from 'react'

function NextWeekRow({ details, index }) {
    return (
        <tr key={index}>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.date}
            </td>

            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.chapter}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.topic}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.plan}
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                { details.Activity}
            </td>
        </tr>
    )
}

export default NextWeekRow

// editable ? (
//     <input
//         className='border-secondary border-2 rounded-md p-2'
//         type="text"
//         value={nextWeekActivities[index]}
//         onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
//     />
// ) :