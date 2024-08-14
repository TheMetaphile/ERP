import HomeSubjectTile from "./HomeSubjectTile";
import Math from '../../../assets/Math 1.png';
import English from '../../../assets/Brick.png';
import Hindi from '../../../assets/Vector.png';
import Physics from '../../../assets/Mu.png';
import Chemistry from '../../../assets/flask.png';
import Biology from '../../../assets/bioImage.png';
import SocialScience from '../../../assets/SSTImage.png';
import Computer from '../../../assets/computer.png';

export default function HomeSubjectGrid(){
    return (
        <div className=" mt-2 mx-3 grid grid-cols-2 border border-gray-300 tablet:grid-cols-4 gap-6 rounded-lg shadow-md p-4">
            <HomeSubjectTile subject='Maths' image={Math}/>
            <HomeSubjectTile subject='English' image={English}/>
            <HomeSubjectTile subject='Hindi' image={Hindi}/>
            <HomeSubjectTile subject='Physics' image={Physics}/>
            <HomeSubjectTile subject='Chemistry' image={Chemistry}/>
            <HomeSubjectTile subject='Biology' image={Biology}/>
            <HomeSubjectTile subject='Social Science' image={SocialScience}/>
            <HomeSubjectTile subject='Computer' image={Computer}/>
        </div>
    )
}