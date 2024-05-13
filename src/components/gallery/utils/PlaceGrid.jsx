import PlaceTile from "./PlaceTile";

export default function PlaceGrid(){
    return (
        <div className=" tablet:max-laptop:grid laptop:grid tablet:max-laptop:grid-cols-2 laptop:grid-cols-4 tablet:max-laptop:gap-6  tablet:p-4 mobile:max-tablet:px-3">
            <PlaceTile description='Principal'/>
            <PlaceTile description='Vice Principal'/>
            <PlaceTile description='Incharge'/>
            <PlaceTile description='Coordinator'/>
        </div>
    )
}