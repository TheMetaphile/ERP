import SubjectTile from "./SubjectTile";
import Math from '../../../assets/Math 1.png';
import English from '../../../assets/Brick.png';
import Hindi from '../../../assets/Vector.png';
import Physics from '../../../assets/Mu.png';
import Chemistry from '../../../assets/flask.png';
import Biology from '../../../assets/bioImage.png';
import SocialScience from '../../../assets/SSTImage.png';
import Computer from '../../../assets/computer.png';

export default function SubjectGrid(){
    return (
        <div className=" w-full grid grid-cols-2 tablet:grid-cols-4 gap-6 rounded-lg shadow-md p-4">
            <SubjectTile subject='Maths' image={Math}/>
            <SubjectTile subject='English' image={English}/>
            <SubjectTile subject='Hindi' image={Hindi}/>
            <SubjectTile subject='Physics' image={Physics}/>
            <SubjectTile subject='Chemistry' image={Chemistry}/>
            <SubjectTile subject='Biology' image={Biology}/>
            <SubjectTile subject='Social Science' image={SocialScience}/>
            <SubjectTile subject='Computer' image={Computer}/>
        </div>
    )
}