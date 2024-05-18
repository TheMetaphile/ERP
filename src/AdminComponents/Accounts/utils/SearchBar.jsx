
export default function SearchBar({handleNameChange,handleIdChange,name,Id}) {
    

    return (
        <div className="mx-2">
        <div className="flex w-full overflow-x-auto no-scrollbar justify-between items-center self-center h-fit rounded-xl shadow-md border-2 px-2 py-2 mb-3">
            
            <div className="flex">
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Search by Name"
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
            />
            <input
                type="id"
                id="id"
                name="id"
                value={Id}
                onChange={handleIdChange}
                placeholder="Search by ID"
                className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
            />
            </div>
            <button className="rounded-lg shadow-md px-3 py-1 ml-2 border-2 border-gray-200 text-lg bg-secondary">
                Search
            </button>
        </div>
        </div>
    )
}