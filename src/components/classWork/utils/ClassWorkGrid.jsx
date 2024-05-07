import ClassWorkTile from "./ClassWorkTile";

export default function ClassWorkGrid(){
    return (
        <div className="tablet:max-laptop:grid laptop:grid tablet:max-laptop:grid-cols-2 laptop:grid-cols-4 tablet:max-laptop:gap-6 rounded-lg shadow-md tablet:p-4 mobile:max-tablet:px-3">
            <ClassWorkTile classwork='Write a essay on "My Mother".' subject='English'/>
            <ClassWorkTile classwork='Complete question and answer of chapter 2.' subject='Computer'/>
            <ClassWorkTile classwork='Complete exercise 2.9 .' subject='Math'/>
            <ClassWorkTile classwork='Complete Exercise 2.9 .".' subject='Hindi'/>
            <ClassWorkTile classwork='Complete Exercise 2.9.' subject='Physics'/>
            <ClassWorkTile classwork='Complete Exercise 2.9.' subject='Chemistry'/>
            <ClassWorkTile classwork='Complete Exercise 2.9.' subject='Biology'/>
        </div>
    )
}