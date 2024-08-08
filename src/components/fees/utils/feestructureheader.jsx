export default function FeeStructureHeader() {
    return (
        <>
            <thead className="  bg-aquamarine w-full flex rounded-t-lg border-b border-gray-300   whitespace-nowrap">
                <tr className=" w-full flex">
                    <th className=" text-center w-64  border-r border-gray-300  py-2">Month</th>
                    <th className=" text-center w-28 border-r border-gray-300  py-2">Amount</th>
                    <th className=" text-center w-24 border-r border-gray-300  py-2">Status</th>
                    <th className=" text-center  w-36  py-2">Action</th>
                </tr>
            </thead>
        </>
    );
}
