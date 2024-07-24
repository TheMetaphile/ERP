export default function FeeStructureHeader() {
    return (
        <>
            <thead className="bg-aquamarine w-full flex rounded-t-lg border-b border-gray-300   whitespace-nowrap">
                <tr className=" w-full flex justify-between">
                    <th className=" text-center w-24  border-r border-gray-300  py-2">Sr. No.</th>
                    <th className=" text-center w-64  border-r border-gray-300  py-2">Particular</th>
                    <th className=" text-center w-28 border-r border-gray-300  py-2">Session</th>
                    <th className=" text-center w-28 border-r border-gray-300  py-2">Amount</th>
                    <th className=" text-center w-20 border-r border-gray-300  py-2">Discount</th>
                    <th className=" text-center w-60 border-r border-gray-300  py-2 whitespace-nowrap">Payable Amount</th>
                    <th className=" text-center w-36 border-r border-gray-300  py-2">Deadline</th>
                    <th className=" text-center w-24 border-r border-gray-300  py-2">Status</th>
                    <th className=" text-center  w-36  py-2">Mode</th>
                </tr>
            </thead>
        </>
    );
}
