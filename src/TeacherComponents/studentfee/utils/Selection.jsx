import React from 'react'

function Selection({setFilter}) {
    const handleChange=(e)=>{
        setFilter(e.target.value);
    }
  return (
    <div className="w-1/4">
                        <select className="w-full px-4 py-2 border rounded-md" onChange={handleChange}>
                            <option value="">Select Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
    // <div className="border rounded-lg shadow-md w-fit flex flex-col px-3 mobile:max-tablet:px-0  overflow-y-auto items-start mt-2  mb-3 no-scrollbar">
    //         <div className="container p-3  ">
        
    //     <div className="flex justify-between">
    //                 {/* <div className="w-1/4">
    //                     <select className="w-full px-4 py-2 border rounded-md">
    //                         <option value="">Select Class</option>
    //                         <option value="Pre-Nursery">Pre-Nursery</option>
    //                         <option value="Nursery">Nursery</option>
    //                         <option value="L.K.J">L.K.J</option>
    //                         <option value="U.K.J">U.K.J</option>
    //                         <option value="1st">1st</option>
    //                         <option value="2nd">2nd</option>
    //                         <option value="3rd">3rd</option>
    //                         <option value="4th">4th</option>
    //                         <option value="5th">5th</option>
    //                         <option value="6th">6th</option>
    //                         <option value="7th">7th</option>
    //                         <option value="8th">8th</option>
    //                         <option value="9th">9th</option>
    //                         <option value="10th">10th</option>
    //                         <option value="11th">11th</option>
    //                         <option value="12th">12th</option>
    //                     </select>
    //                 </div>
    //                 <div className="w-1/4">
    //                     <select className="w-full px-4 py-2 border rounded-md">
    //                         <option value="">Select Session</option>
    //                         <option value="2025">2025</option>
    //                         <option value="2024">2024</option>
    //                         <option value="2023">2023</option>
    //                     </select>
    //                 </div> */}
                    
                  
    //             </div>
    //             </div>

    // </div>
  )
}

export default Selection