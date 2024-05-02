import ClassWorkTile from "./ClassWorkTile";

export default function ClassWorkGrid(){
    return (
        <div className="grid grid-cols-4 gap-6 rounded-lg shadow-md p-4">
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