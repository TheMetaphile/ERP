import profile from '../../../assets/Profile1.png'
import id from '../../../assets/id.png'
import age from '../../../assets/age.png'
import gender from '../../../assets/gender.png'
import blood from '../../../assets/blood.png'

export default function StatusTile(props) {
    return (
        <div className=" w-full p-2  rounded-lg shadow-md mt-3 flex items-center bg-orange-300">

            <img src={profile} alt="" className='bg-blue-400 '></img>
            <div className='px-2  bg-yellow-300 ml-10'>
                <div className="pl-2 mt-1 font-normal text-xl flex items-center"><img src={id} alt="" className='w-10 h-10'></img>ID: <span className='text-gray-500'>{props.id}</span></div>
                <div className="pl-2 mt-1 font-normal text-xl flex items-center"><img src={age} alt="" className='w-10 h-10'></img>Age: <span className='text-gray-500'>{props.age}</span></div>
                <div className="pl-2 mt-1 font-normal text-xl flex items-center"><img src={gender} alt="" className='w-10 h-10'></img>Gender: <span className='text-gray-500'>{props.gender}</span></div>
                <div className="pl-2 mt-1 font-normal text-xl flex items-center"><img src={blood} alt="" className='w-10 h-10'></img>Blood Group: <span className='text-gray-500'>{props.blood}</span></div>
                        
            </div>
            

        </div>
    )
}

