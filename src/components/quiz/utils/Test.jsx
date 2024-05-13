import TestSubjectGrid from "./TestSubjectGrid";

export default function Test() {
    return (
        <div className="flex flex-col  h-screen  items-start mt-2 ml-2 mr-3 no-scrollbar w-full">
            <h1 className="text-lg font-medium mt-4 px-2">Put your knowledge to Test</h1>
            <TestSubjectGrid />
        </div>
    )
}