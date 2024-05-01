import Assignments from './Assignment';

export default function AssignmentRow() {
    return (
        <div className="flex justify-between overflow-x-auto pb-4 mt-3 no-scrollbar">
            <Assignments subject='English' topic='Future present tenses' assignedOn='4 April 24' deadline='10 April 2024' bg='bg-blue-100'/>
            <Assignments subject='Maths' topic='Partial Differential Calculus' assignedOn='4 April 24' deadline='10 April 2024' bg='bg-green-200'/>
            <Assignments subject='Physics' topic='Newton\s Laws of motion' assignedOn='4 April 24' deadline='10 April 2024' bg='bg-purple-200'/>
            <Assignments subject='Biology' topic='Plants Anatomy' assignedOn='4 April 24' deadline='10 April 2024' bg='bg-green-200'/>
        </div>
    );
}
