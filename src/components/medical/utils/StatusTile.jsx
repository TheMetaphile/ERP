import profile from '../../../assets/Profile1.png'
import id from '../../../assets/id.png'
import age from '../../../assets/age.png'
import gender from '../../../assets/gender.png'
import blood from '../../../assets/blood.png'

export default function StatusTile(props) {
    const style = {
        paddingLeft: '0.5rem', 
        marginTop: '0.25rem', 
        fontWeight: 'normal',
        fontSize: '1.25rem', 
        display: 'flex',
        alignItems: 'center', 
    };
    return (
        <div className=" w-full p-2  rounded-lg shadow-md mt-3 flex items-center  justify-center">

            <img src={profile} alt="" className=' ml-8 '></img>
            <div className='px-2 ml-10'>
                <div style={style}><img src={id} alt="" className='w-10 h-10'></img><span className='px-3'>ID <span className='text-gray-500 px-32'>: &nbsp;&nbsp;{props.id}</span></span></div>
                <div style={style}><img src={age} alt="" className='w-10 h-10'></img><span className='px-3'>Age <span className='text-gray-500 px-28'>: &nbsp;&nbsp;{props.age}</span></span></div>
                <div style={style}><img src={gender} alt="" className='w-10 h-10'></img><span className='px-3'>Gender <span className='text-gray-500 px-20'>: &nbsp;&nbsp;{props.gender}</span></span></div>
                <div style={style}><img src={blood} alt="" className='w-10 h-10'></img><span className='px-3'>Blood Group  <span className='text-gray-500 px-8'>:&nbsp;&nbsp;{props.blood}</span></span></div>
                        
            </div>
            

        </div>
    )
}

