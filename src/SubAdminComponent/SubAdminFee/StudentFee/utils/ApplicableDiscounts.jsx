import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL_Login } from "../../../../Config";
import AuthContext from "../../../../Context/AuthContext";

export default function ApplicableDiscounts({ selectedStudent, selectedDiscount, setSelectedDiscount, appliedDis, removedDiscount, setRemovedDiscount }) {
    const { authState } = useContext(AuthContext);
    const [discounts, setDiscounts] = useState([]);
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    useEffect(() => {
        console.log("id here", selectedStudent);
        const fetchDiscounts = async () => {
            try {
                const date = new Date();
                const response = await axios.post(BASE_URL_Login + '/fee/fetch/applicable-discounts/' + selectedStudent._id, { month: date.getMonth() }, {
                    headers: {
                        'Authorization': "Bearer " + authState.accessToken
                    }
                });
                setDiscounts(response.data.applicableDiscounts);
                setAppliedDiscount(response.data.appliedDiscountId);
                setSelectedDiscount(null);
                setRemovedDiscount(null);
            } catch (err) {
                console.log(err);
            }
        };

        if (selectedStudent) {
            fetchDiscounts();
        } else {
            setDiscounts([]);
        }
    }, [selectedStudent]);

    useEffect(() => {
        console.log("appliedDis: ", appliedDis)
        setAppliedDiscount(appliedDis);

    }, [appliedDis]);

    const handleDiscountClick = (discountId) => {
        if (discountId === appliedDiscount) {
            removedDiscount == null ? setRemovedDiscount(discountId) : setRemovedDiscount(null);
        } else {
            selectedDiscount == null ? setSelectedDiscount(discountId) : selectedDiscount != discountId ? setSelectedDiscount(discountId) : setSelectedDiscount(null);
        }
    };

    return (
        <div>
            <div className="bg-red-50 border-l-4 mt-3 border-red-700 text-red-700 p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-lg ">Note:</h2>
                <p className="mt-1 text-sm ">
                    Discounts are applicable only for the current academic session and cannot be carried forward to the next session.
                    Regardless of the discount's duration, it will expire at the end of the current session and will not be transferable
                    to future sessions.
                </p>
            </div>
            <div className="w-full mt-3 flex flex-wrap gap-3">

                {discounts.map((discount, index) => (
                    <div
                        key={index}
                        className={`p-4 bg-white rounded-lg shadow-md border-2 
                        ${removedDiscount === discount._id ? "border-red-600" :
                                discount._id === appliedDiscount ? "border-green-600" :
                                    discount._id === selectedDiscount ? "border-blue-300" :
                                        "border-gray-300"}`}
                        onClick={() => handleDiscountClick(discount._id)}
                    >
                        <div className="text-xl font-semibold flex justify-between mb-4 capitalize">
                            {discount.title}
                            {removedDiscount === discount._id ? (
                                <div className="px-2 text-sm py-1 bg-red-400 text-white rounded-full">
                                    Removed
                                </div>
                            ) : discount._id === appliedDiscount ? (
                                <div className="px-2 text-sm py-1 bg-green-400 text-white rounded-full">
                                    Applied
                                </div>
                            ) : discount._id === selectedDiscount ? (
                                <div className="px-2 text-sm py-1 bg-blue-400 text-white rounded-full">
                                    Selected
                                </div>
                            ) : null}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Discount Type</p>
                                <p className="font-medium capitalize">{discount.discountType}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium">{discount.duration === "-1" ? "For remaining session" : `${discount.duration} months`}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">Session</p>
                                <p className="font-medium">{discount.session}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">{discount.discountType == 'fixed' ? "Amount" : "Percentage"}</p>
                                <p className="font-medium">{discount.discountType == 'fixed' ? "₹" : ""} {discount.amount}{discount.discountType == 'fixed' ? "" : " %"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
