export default function SearchBar({ handleClassChange, handleSessionChange, handleMonthChange, handleSectionChange, classValue, session, month, section }) {
    return (
        <div className="mx-2">
            <div className="flex w-full overflow-x-auto no-scrollbar justify-between items-center self-center h-fit rounded-xl shadow-md border-2 px-2 py-2 mb-3">
                
                <div className="flex">
                    <select
                        id="class"
                        name="class"
                        value={classValue}
                        onChange={handleClassChange}
                        className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
                    >
                        <option value="">Select Class</option>
                        <option value="class1">Class 1</option>
                        <option value="class2">Class 2</option>
                        {/* Add more options as needed */}
                    </select>
                    <select
                        id="session"
                        name="session"
                        value={session}
                        onChange={handleSessionChange}
                        className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
                    >
                        <option value="">Select Session</option>
                        <option value="session1">Session 1</option>
                        <option value="session2">Session 2</option>
                        {/* Add more options as needed */}
                    </select>
                    <select
                        id="month"
                        name="month"
                        value={month}
                        onChange={handleMonthChange}
                        className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
                    >
                        <option value="">Select Month</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        {/* Add more options as needed */}
                    </select>
                    <select
                        id="section"
                        name="section"
                        value={section}
                        onChange={handleSectionChange}
                        className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
                    >
                        <option value="">Select Section</option>
                        <option value="sectionA">Section A</option>
                        <option value="sectionB">Section B</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <button className="rounded-lg shadow-md px-3 py-1 ml-2 border-2 border-gray-200 text-lg bg-secondary">
                    Search
                </button>
            </div>
        </div>
    );
}
