export default function FeeStructureFooter({totalAmount}) {
    return (
        <div className="bg-aquamarine px-4 py-2 flex justify-end rounded-b-lg border-t  border-gray-300 ">
            <h4 className="w-40 text-center">Total Applicable Fee</h4>
            <h4 className="w-28 text-center">Rs. {totalAmount}</h4>
        </div>
    );
}
