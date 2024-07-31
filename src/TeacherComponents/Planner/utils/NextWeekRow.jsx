import React from 'react'

function NextWeekRow({ details, index,setDetails }) {

    console.log(details);

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setDetails(prevPlans =>
            prevPlans.map(plan =>
              plan.date === details.date ? { ...plan, [name]:value } : plan
            )
          );
    }

    return (
        <tr key={index}>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                {details.date}
            </td>

            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                <input
                    className='border-secondary border-2 rounded-md p-2'
                    type="text"
                    name='chapter'
                    value={details.chapter}
                    onChange={(e) => handleChange(e)}

                />
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                <input
                    className='border-secondary border-2 rounded-md p-2'
                    type="text"
                    name='topic'
                    value={details.topic}
                    onChange={(e) => handleChange(e)}

                />
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                <input
                    className='border-secondary border-2 rounded-md p-2'
                    type="text"
                    name='teachingAids'
                    value={details.teachingAids}
                    onChange={(e) => handleChange(e)}

                />
            </td>
            <td className='border-y p-4 border-black whitespace-nowrap gap-2'>
                <input
                    className='border-secondary border-2 rounded-md p-2'
                    type="text"
                    name='Activity'
                    value={details.Activity}
                    onChange={(e) => handleChange(e)}

                />
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