
export default function CheckStructure({handleFetch, structureData,handleChange}){

    return (
        <form onSubmit={handleFetch} className='bg-slate-400 mt-4 w-full p-3 rounded-lg shadow-md '>
                {structureData.map((value, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 mb-4 rounded-lg ">
                        <h1 className='text-xl'>Check Structure</h1>
                        <div>
                            <label className='text-black font-medium'>Class Range</label>
                            <select
                                className="w-full border p-2"
                                name="Class"
                                value={value.Class}
                                onChange={(e) => handleChange(index, e)}
                                required
                            >
                                <option value="" disabled>Select Class</option>
                                <option value="Pre-Nursery - U.K.J">Pre-Nursery - U.K.J</option>
                                <option value="1st- 12th">1st - 12th</option>
                            </select>
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-between mt-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleFetch}
                    >
                        Done
                    </button>
                </div>
            </form>
    )
}