import PeopleTile from "./PeopleTile";

export default function PeopleGrid(){
    return (
        <div className="grid grid-cols-2 gap-2  tablet:max-laptop:grid-cols-4 laptop:grid-cols-6 tablet:max-laptop:gap-6  tablet:p-4 mobile:max-tablet:px-3">
            <PeopleTile description='Principal'/>
            <PeopleTile description='Vice Principal'/>
            <PeopleTile description='Incharge'/>
            <PeopleTile description='Coordinator'/>
            <PeopleTile description='Coordinator'/>
            <PeopleTile description='Coordinator'/>
        </div>
    )
}