import { useLocation, useParams } from "react-router-dom";

export default function StudentDetailScreen(){
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const Class = searchParams.get('class');
    return (
        <div className="overflow-y-auto items-start mb-2 px-2  no-scrollbar ">
            <h1 className="text-xl font-medium">
            {id} Details class {Class}
            </h1>
        </div>
    )
}