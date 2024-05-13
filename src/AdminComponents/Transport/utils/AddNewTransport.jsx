import React,{useState} from "react";

export default function AddNewTransport(){
    const [formData, setFormData] = useState(
        {
            RouteName: '',
            vehicleNumber: '',
            driverName: '',
            licenseNumber:'',
            phoneNumber:'',
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
    return(
        <>
        <div className="flex flex-col mx-16">
            <div className="mt-8 text-2xl">Add New Transport</div>
            <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 mx-auto">
            <div className="flex w-full gap-4 mobile:max-tablet:flex-col mobile:max-tablet:gap-2">
            <div className="flex flex-col mt-8 gap-8">
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            Route Name
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="routeName"
                                type="text"
                                name="routeName"
                                value={formData.RouteName}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            License Number
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="license"
                                type="text"
                                name="license"
                                value={formData.licenseNumber}
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
                            Vehicle Number
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="vehicle"
                                type="text"
                                name="vehicle"
                                value={formData.vehicleNumber}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            <div className="w-full rounded-md mobile:max-tablet:w-full">
                        <label className="block text-lg mb-2" htmlFor="firstName">
                            Phone Number
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="phone"
                                type="number"
                                name="phone"
                                value={formData.phoneNumber}
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
                            Driver Name
                            <input
                                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                                id="driverName"
                                type="text"
                                name="driverName"
                                value={formData.driverName}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                        </label>
            </div>
            </div>
            </div>
            <div className="w-1/2 justify-end rounded-md mt-4 mobile:max-tablet:w-full mb-8">
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