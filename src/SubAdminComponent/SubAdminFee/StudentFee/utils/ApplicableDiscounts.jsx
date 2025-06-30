import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../../Config";
import AuthContext from "../../../../Context/AuthContext";
import { toast } from "react-toastify";
import { refreshAccessToken } from "../../../../RefreshTokenHelper";

export default function ApplicableDiscounts({ selectedStudent, selectedDiscount, setSelectedDiscount, appliedDis, removedDiscount, setRemovedDiscount }) {
    const { authState, darkMode, updateAccessToken, logout } = useContext(AuthContext);
    const [discounts, setDiscounts] = useState([]);
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    useEffect(() => {
        console.log("id here", selectedStudent);
        const fetchDiscounts = async () => {
            try {
                const date = new Date();
                const response = await axios.post(BASE_URL + '/fee/fetch/applicable-discounts/' + selectedStudent._id, { month: date.getMonth() }, {
                    headers: {
                        'Authorization': "Bearer " + authState?.accessToken
                    }
                });
                setDiscounts(response.data.applicableDiscounts);
                setAppliedDiscount(response.data.appliedDiscountId);
                setSelectedDiscount(null);
                setRemovedDiscount(null);
            } catch (err) {
                console.log(err);
                if (
                    err.response &&
                    err.response.data.error === 'You are not permitted to access this data. Please contact the admin'
                ) {
                    toast.warn('Access denied. Attempting to refresh token...');
                    try {
                        const newToken = await refreshAccessToken(authState, updateAccessToken, logout, toast);
                        await fetchDiscounts();
                    } catch (refreshError) {
                    }
                } else {
                    toast.error(err.response?.data?.error || "An error occurred");
                }
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
            <div className={`border-l-4 mt-3 rounded-lg shadow-md p-4 ${darkMode
                ? 'bg-red-900 border-red-600 text-red-300'
                : 'bg-red-50 border-red-700 text-red-700'
                }`}>
                <h2 className={`font-semibold text-lg ${darkMode ? 'text-red-300' : ''
                    }`}>
                    Note:
                </h2>
                <p className={`mt-1 text-sm ${darkMode ? 'text-red-200' : ''
                    }`}>
                    Discounts are applicable only for the current academic session and cannot be carried forward to the next session.
                    Regardless of the discount's duration, it will expire at the end of the current session and will not be transferable
                    to future sessions.
                </p>
            </div>
            <div className="w-full mt-3 flex flex-wrap gap-3">
                {discounts.map((discount, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-md border-2 cursor-pointer transition-all duration-300 ${darkMode
                            ? 'bg-gray-800 text-gray-200'
                            : 'bg-white'
                            } ${removedDiscount === discount._id
                                ? (darkMode ? "border-red-800" : "border-red-600")
                                : discount._id === appliedDiscount
                                    ? (darkMode ? "border-green-800" : "border-green-600")
                                    : discount._id === selectedDiscount
                                        ? (darkMode ? "border-blue-800" : "border-blue-300")
                                        : (darkMode ? "border-gray-700" : "border-gray-300")
                            }`}
                        onClick={() => handleDiscountClick(discount._id)}
                    >
                        <div className="text-xl font-semibold flex justify-between mb-4 capitalize">
                            {discount.title}
                            {removedDiscount === discount._id ? (
                                <div className={`px-2 text-sm py-1 rounded-full ${darkMode
                                    ? 'bg-red-700 text-red-200'
                                    : 'bg-red-400 text-white'
                                    }`}>
                                    Removed
                                </div>
                            ) : discount._id === appliedDiscount ? (
                                <div className={`px-2 text-sm py-1 rounded-full ${darkMode
                                    ? 'bg-green-700 text-green-200'
                                    : 'bg-green-400 text-white'
                                    }`}>
                                    Applied
                                </div>
                            ) : discount._id === selectedDiscount ? (
                                <div className={`px-2 text-sm py-1 rounded-full ${darkMode
                                    ? 'bg-blue-700 text-blue-200'
                                    : 'bg-blue-400 text-white'
                                    }`}>
                                    Selected
                                </div>
                            ) : null}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                {
                                    label: "Discount Type",
                                    value: discount.discountType,
                                    className: darkMode ? 'text-gray-400' : 'text-gray-500'
                                },
                                {
                                    label: "Duration",
                                    value: discount.duration === "-1" ? "For remaining session" : `${discount.duration} months`,
                                    className: darkMode ? 'text-gray-400' : 'text-gray-500'
                                },
                                {
                                    label: "Session",
                                    value: discount.session,
                                    className: darkMode ? 'text-gray-400' : 'text-gray-500'
                                },
                                {
                                    label: discount.discountType == 'fixed' ? "Amount" : "Percentage",
                                    value: `${discount.discountType == 'fixed' ? "₹" : ""} ${discount.amount}${discount.discountType == 'fixed' ? "" : " %"}`,
                                    className: darkMode ? 'text-gray-300' : ''
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-1">
                                    <p className={`text-sm ${item.className}`}>{item.label}</p>
                                    <p className={`font-medium capitalize ${darkMode ? 'text-gray-200' : ''
                                        }`}>
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
