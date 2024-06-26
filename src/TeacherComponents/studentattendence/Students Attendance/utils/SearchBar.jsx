export default function SearchBar({ handleMonthChange, month }) {
    return (
        <div className="mx-2">
            <div className="flex w-full overflow-x-auto no-scrollbar justify-between items-center self-center h-fit rounded-xl shadow-md border-2 px-2 py-2 mb-3">
                
                <div className="flex">

                    <select
                        id="month"
                        name="month"
                        value={month}
                        onChange={handleMonthChange}
                        className="rounded-lg shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
                    >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                        
                    </select>
  
                </div>

            </div>
        </div>
    );
}
