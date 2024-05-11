import HomeWorkTile from "./HomeWorkTile";

export default function HomeWorkGrid(){
    return (
        <div className=" tablet:max-laptop:grid laptop:grid tablet:max-laptop:grid-cols-2 laptop:grid-cols-4 tablet:max-laptop:gap-6  tablet:p-4 mobile:max-tablet:px-3">
            <HomeWorkTile classwork='Write a essay on "My Mother".' subject='English'/>
            <HomeWorkTile classwork='Complete question and answer of chapter 2.' subject='Computer'/>
            <HomeWorkTile classwork='Complete exercise 2.9 .' subject='Math'/>
            <HomeWorkTile classwork='Complete Exercise 2.9 .".' subject='Hindi'/>

        </div>
    )
}