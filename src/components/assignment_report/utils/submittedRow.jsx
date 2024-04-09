import SubmittedAssignment from "./submittedAssignments.jsx"

export default function(){
    return (
        <div>
            <SubmittedAssignment subject='Maths' topic='Partial Differential Calculas' status='Pending' color='text-red-500'/>
            <SubmittedAssignment subject='Science' topic='PhotoSynthesis' status='Submitted' color='text-green-500'/>
            <SubmittedAssignment subject='Physics' topic='Gause theory of electro magnetic induction' status='Waiting for check' color='text-blue-400'/>
            <SubmittedAssignment subject='English' topic='Past Tense' status='Pending' color='text-red-500'/>
            <SubmittedAssignment subject='Biology' topic='Plant anatony' status='Submitted' color='text-green-500'/>
            <SubmittedAssignment subject='Hindi' topic='Vakaya' status='Waiting for check' color='text-blue-400'/>

        </div>
    )
}