import React,{useState} from "react";

export default function NewExam() {
    const [formData, setFormData] = useState(
        {
            ExamName: '',
            AddSubject: '',
            SelectClass: '',
            SelectTime: '',
            SelectDate: '',
            GapBetween: '',
        }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <>
            <div className="flex flex-col rounded-xl px-2 w-full shadow-lg">
                <div className="mt-8 text-3xl">Schedule New Exam</div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 mx-auto">
                        <div className="flex w-full gap-8 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
                            <div className="flex flex-col mt-8 gap-8">
                                <div className="w-full rounded-md mobile:max-tablet:w-full">
                                    <label className="block text-lg mb-2" htmlFor="">
                                        Exam Name
                                        <input
                                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                            id="ExamName"
                                            type="text"
                                            name="ExamName"
                                            value={formData.ExamName}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="w-full rounded-md mobile:max-tablet:w-full">
                                    <label className="block text-lg mb-2" htmlFor="">
                                        Select Time
                                        <input
                                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                            id="time"
                                            type="text"
                                            name="time"
                                            value={formData.SelectTime}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col mt-8 gap-8">
                                <div className="w-full rounded-md mobile:max-tablet:w-full">
                                    <label className="block text-lg mb-2" htmlFor="addSubject">
                                        Add Subjects
                                        <select
                                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                            id="addSubject"
                                            name="addSubject"
                                            value={formData.AddSubject}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a Subject</option>
                                            <option value="Math">Math</option>
                                            <option value="Science">Science</option>
                                            <option value="History">History</option>
                                          
                                        </select>
                                    </label>
                                </div>
                                <div className="w-full rounded-md mobile:max-tablet:w-full">
                                    <label className="block text-lg mb-2" >
                                        Select Date
                                        <input
                                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                            id="date"
                                            type="number"
                                            name="date"
                                            value={formData.SelectDate}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col mt-8 gap-8">
                                <div className="w-full rounded-md mobile:max-tablet:w-full">
                                    <label className="block text-lg mb-2" htmlFor="">
                                       Select Class
                                        <input
                                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                            id="class"
                                            type="text"
                                            name="class"
                                            value={formData.SelectClass}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </label>
                                    <div className="w-full rounded-md mobile:max-tablet:w-full mt-10">
                                    <label className="block text-lg mb-2" htmlFor="">
                                      Gap In Between
                                        <input
                                            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                            id="gap"
                                            type="text"
                                            name="gap"
                                            value={formData.GapBetween}
                                            onChange={handleChange}
                                            placeholder=""
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="w-1/2 rounded-md mt-4 mobile:max-tablet:w-full mb-8 ">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2 mobile:max-tablet:w-1/2"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                      
                    </form>
                </div>
            </div>

        </>
    )
}