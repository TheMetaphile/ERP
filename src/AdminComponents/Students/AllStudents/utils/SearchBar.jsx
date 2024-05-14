
export default function SearchBar({rollNumber, handleClassChange,handleNameChange,handleRollNumberChange,handleSectionChange, name,Class,Section}) {
    

    return (
        <div className="mx-2">
        <div className="flex w-full overflow-x-auto no-scrollbar justify-between items-center self-center h-fit rounded-xl shadow-md border px-2 py-2 mb-3 mx-auto">
            
            <div className="flex">
            <input
                type="+number"
                id="rollNumber"
                name="rollNumber"
                value={rollNumber}
                onChange={handleRollNumberChange}
                placeholder="Search by ID"
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
            />
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Search by Name"
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
            />
            <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg mr-3 shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
        <option value="">Search by Class</option>
        <option value="9">Standard 9th</option>
        <option value="10">Standard 10th</option>
        <option value="11">Standard 11th</option>
        <option value="12">Standard 12th</option>
      </select>

      <select id="section" value={Section} onChange={handleSectionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg">
        <option value="">Search by Section</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
            </div>
            <button className="rounded-lg shadow-md px-3 py-1 ml-2 border-2 border-gray-200 text-lg bg-secondary">
                Search
            </button>
        </div>
       </div> 
    )
}