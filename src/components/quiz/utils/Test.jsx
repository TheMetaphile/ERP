import TestSubjectGrid from "./TestSubjectGrid";

export default function Test() {
    return (
        <div className=" flex flex-col   items-start mt-2  no-scrollbar w-full">
            <h1 className="text-lg font-medium mt-4 px-2">Put your knowledge to Test</h1>
            <TestSubjectGrid />
        </div>
    )
}