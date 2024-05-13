import TestSubjectTile from "./TestSubjectTile";
import Math from '../../../assets/Math 1.png';
import English from '../../../assets/Brick.png';
import Hindi from '../../../assets/Vector.png';
import Physics from '../../../assets/Mu.png';
import Chemistry from '../../../assets/flask.png';
import Biology from '../../../assets/bioImage.png';
import SocialScience from '../../../assets/SSTImage.png';
import Computer from '../../../assets/computer.png';

export default function TestSubjectGrid(){
    return (
        <div className=" w-full grid grid-cols-2 tablet:grid-cols-4 gap-6 rounded-lg shadow-md p-4">
            <TestSubjectTile subject='Maths' image={Math}/>
            <TestSubjectTile subject='English' image={English}/>
            <TestSubjectTile subject='Hindi' image={Hindi}/>
            <TestSubjectTile subject='Physics' image={Physics}/>
            <TestSubjectTile subject='Chemistry' image={Chemistry}/>
            <TestSubjectTile subject='Biology' image={Biology}/>
            <TestSubjectTile subject='Social Science' image={SocialScience}/>
            <TestSubjectTile subject='Computer' image={Computer}/>
        </div>
    )
}