import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL_Login } from "../../../../Config";
import AuthContext from "../../../../Context/AuthContext";

export default function ApplicableDiscounts({ selectedStudent, selectedDiscount, setSelectedDiscount, appliedDis }) {
    const { authState } = useContext(AuthContext);
    const [discounts, setDiscounts] = useState([]);
    const [appliedDiscount, setAppliedDiscount] = useState();
    const [removedDiscount, setRemovedDiscount] = useState(null);

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
        if (appliedDis) {
            setAppliedDiscount(appliedDis);
            setSelectedDiscount(appliedDis);
        }
    }, [appliedDis]);

    const handleDiscountClick = (discountId) => {
        if (discountId === appliedDiscount) {
            if (removedDiscount === discountId) {
                setRemovedDiscount(null);
                setSelectedDiscount(discountId);
            } else {
                setRemovedDiscount(discountId);
                setSelectedDiscount(null);
            }
        } else {
            setRemovedDiscount(null);
            setSelectedDiscount(selectedDiscount === discountId ? null : discountId);
        }
    };

    return (
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
                            <p className="font-medium">{discount.discountType}</p>
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
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium">₹ {discount.amount}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
