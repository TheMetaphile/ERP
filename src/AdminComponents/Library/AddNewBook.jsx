import React,{useState} from "react";

export default function AddNewBook(){
    const [formData, setFormData] = useState(
        {
            BookName: '',
            id: '',
            class: '',
            subject:'',
            bookEdition:'',
        }
    );
    const handleReset = () => {
        setFormData({
            BookName: '',
            id: '',
            class: '',
            subject:'',
            bookEdition:'',
        });
    };
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
    return(
        <>
        <div className="flex flex-col mx-16">
            <div className="mt-8 text-2xl">Fill Book Information</div>
            <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 mx-auto">
            <div className="flex w-full gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
            <div className="flex flex-col mt-8 gap-8">
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            Book Name
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.BookName}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            ID
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="id"
                                type="text"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="gender">
                            Class
                            <select
                                className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                id="class"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Class</option>
                                <option value="">Pre-Nursery</option>
                                <option value="">Nursery</option>
                                <option value="">L.K.G</option>
                            </select>
                        </label>
                    </div>

            </div>
            <div className="flex flex-col mt-8 gap-8">
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            Subject
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="subject"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            Book Edition
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="bookEdition"
                                type="text"
                                name="bookEdition"
                                value={formData.bookEdition}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            </div>
            <div className="flex flex-col mt-8 gap-8">
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            Writer Name
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="writerName"
                                type="text"
                                name="writerName"
                                value={formData.writerName}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            <div className="w-full rounded-md mobile:max-tablet:w-full">
            <label className="block text-lg mb-2" htmlFor="gender">
                            Uplaod Date
                            <select
                                className="border rounded-md w-full py-2 px-3 text-gray-500  focus:outline-none focus:shadow-outline mt-2"
                                id="uploadDate"
                                name="uploadDate"
                                value={formData.uploadDate}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Date</option>
                                <option value="">12-03-2020</option>
                                <option value="">12-03-2020</option>
                                <option value="">12-03-2020</option>
                            </select>
                        </label>
            </div>
            </div>
            </div>
            <div className="w-1/2 justify-end rounded-md mt-8 mobile:max-tablet:w-full mb-8">
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2 w-1/2 mobile:max-tablet:w-1/2"
                                type="reset"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 w-1/2 mobile:max-tablet:w-1/2"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                        </div>
                </form>
            </div>
        </div>
        </>
    )
}