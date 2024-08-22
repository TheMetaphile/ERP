
export default function SearchBar({ rollNumber, handleClassChange, handleNameChange, handleRollNumberChange, handleSectionChange, handlebothEventsCalled, name, Class, Section }) {


    return (
        <div className=" w-full">

            <div className="flex tablet:flex-wrap mobile:max-tablet:flex-col w-full mobile:max-tablet:gap-2 mobile:max-tablet:p-2 tablet:w-full tablet:max-laptop:mx-2 tablet:max-laptop:gap-2 tablet:z-0 my-4">
                <input
                    type="+number"
                    id="rollNumber"
                    name="rollNumber"
                    value={rollNumber}
                    onChange={handleRollNumberChange}
                    placeholder="Search by ID"
                    className="rounded-lg shadow-md mr-3 mobile:max-tablet:mr-0 px-3 py-1 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg flex-1"
                />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Search by Name"
                    className="rounded-lg shadow-md px-3 py-1 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1"
                />
                <select id="class" value={Class} onChange={handleClassChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                    <option value="">Search by Class</option>
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="Nursery">Nursery</option>
                    <option value="L.K.G">L.K.G</option>
                    <option value="U.K.G">U.K.G</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                </select>

                <select id="section" value={Section} onChange={handleSectionChange} className="rounded-lg shadow-md px-3 py-1 border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 text-lg mr-3 mobile:max-tablet:mr-0 flex-1">
                    <option value="">Search by Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>

                </select>
            </div>
        </div>

    )
}