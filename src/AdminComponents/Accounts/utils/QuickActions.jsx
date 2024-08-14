import React from "react";
import { electricity, insurance, internet, paper, holiday, furniture, events, bus, bills } from "../images";
import { FaCirclePlus } from "react-icons/fa6";
export default function QuickActions() {
    const cards = [
        { icon: electricity, title: "Electricity" },
        { icon: internet, title: "Internet" },
        { icon: bus, title: "Transport" },
        { icon: insurance, title: "Insurance" },
        { icon: furniture, title: "Furniture" },
        { icon: holiday, title: "Holidays" },
        { icon: events, title: "Events" },
        { icon: bills, title: "Bills and Utilities" },

    ]
    return (
        <div className="flex flex-col px-2 rounded-lg mobile:max-tablet:px-0 ">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl mt-4">Quick Actions</h1>
                </div>

                <button className=" text-blue-500 w-10 h-10 rounded-full  text-4xl  items-center">
                    <FaCirclePlus />
                </button>


            </div>
            <div className="w-full px-2 h-1 mx-auto border-b-2 mb-2"></div>
            <div className="flex flex-wrap justify-center items-center mobile:max-laptop:grid mobile:max-laptop:grid-rows-4 mobile:max-laptop:grid-flow-col">
                {cards.map((card, index) => (
                    <div key={index} className="max-w-xs rounded-lg overflow-hidden border m-4 tablet:max-laptop:m-2 flex flex-col items-center bg-gray-100 hover:cursor-pointer w-36 mobile:max-tablet:w-28 tablet:max-laptop:w-20 tablet:max-laptop:h-24">
                        <img className="w-12 h-12 mt-4" src={card.icon} alt={card.title} />
                        <div className="px-6 py-2">
                            <div className="text-lg mb-2 whitespace-nowrap mobile:max-laptop:text-sm">{card.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}