import CategoryTile from "./CategoryTile";

export default function CategoryGrid(){
    return (
        <div className=" tablet:max-laptop:grid laptop:grid tablet:max-laptop:grid-cols-2 laptop:grid-cols-4 tablet:max-laptop:gap-6  tablet:p-4 mobile:max-tablet:px-3">
            <CategoryTile description='Videos'/>
            <CategoryTile description='Photos'/>
            <CategoryTile description='Functions'/>
            <CategoryTile description='Tours'/>

        </div>
    )
}