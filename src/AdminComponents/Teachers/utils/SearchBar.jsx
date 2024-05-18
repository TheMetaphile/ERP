
export default function SearchBar({ handleNameChange, name }) {


    return (
        <div className="flex w-full justify-between items-center self-center h-fit rounded-xl shadow-md border-2 px-2 py-2 mb-3 mobile:max-tablet:w-full tablet:overflow-y-auto">

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
            </div>
            <button className="rounded-lg shadow-md px-3 py-1 border-2 border-gray-200 text-lg bg-secondary w-40">
                Search
            </button>
        </div>
    )
}