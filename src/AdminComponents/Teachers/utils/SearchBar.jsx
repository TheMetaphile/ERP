
export default function SearchBar({ handleNameChange, name, newest }) {


    return (
        <div className="flex w-full justify-between items-center self-center h-fit rounded-xl shadow-md border-2 px-2 py-2 mb-3 mobile:max-tablet:w-full">

            <div className="flex">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Search by Name"
                    className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:w-1/2  placeholder-sm:text-sm"
                />
                <select id="class" value={newest} onChange={""} className="rounded-lg mr-3 shadow-md px-3 py-1 border-2 border-gray-200 text-lg mobile:max-tablet:w-1/2 mobile:max-tablet:text-sm">
                    <option value="">Search by Newest</option>
                    <option value="9">Joining year 2011</option>
                    <option value="10">Joining year 2012</option>
                    <option value="11">Joining year 2013</option>
                    <option value="12">Joining year 2014</option>
                </select>
               

            </div>
            <button className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg bg-secondary">
                Search
            </button>
        </div>
    )
}