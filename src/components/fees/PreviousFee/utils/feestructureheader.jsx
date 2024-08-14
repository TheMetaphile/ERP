export default function FeeStructureHeader() {
    return (
        <>
            <thead className="  bg-aquamarine w-full flex rounded-t-lg border-b border-gray-300   whitespace-nowrap">
                <tr className=" w-full flex">
                    <th className=" text-center w-full border-r border-gray-300  py-2">Class</th>
                    <th className=" text-center w-full border-r border-gray-300  py-2">Session</th>
                    <th className=" text-center w-full  border-r border-gray-300  py-2">Month</th>
                    <th className=" text-center w-full border-r border-gray-300  py-2">Amount</th>
                    <th className=" text-center w-full border-r border-gray-300  py-2">Discount</th>
                    <th className=" text-center  w-full  py-2">Action</th>
                </tr>
            </thead>
        </>
    );
}
