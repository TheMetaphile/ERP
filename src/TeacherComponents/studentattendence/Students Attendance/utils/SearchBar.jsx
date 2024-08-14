export default function SearchBar({ handleMonthChange, month }) {
    return (
        <div className="flex">

            <select
                id="month"
                name="month"
                value={month}
                onChange={(e) => { handleMonthChange(e.target.value) }}
                className="rounded-lg mobile:max-tablet:text-sm shadow-md mr-3 px-3 py-1 border-2 border-gray-200 text-lg"
            >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>

            </select>

        </div>
    );
}
