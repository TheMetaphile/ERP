import logo from './../../../assets/school logo.png';

export default function InfoCard(props){
    return (
        <div className="w-full border border-gray-300 shadow-md rounded-lg p-4 mt-4 ">
           <div className="flex justify-center">
                <img src={logo} alt="img" className='mobile:max-tablet:w-20' />
                <div className='self-center ml-3'>
                    <h1 className='tablet:text-3xl mobile:max-tablet:text-lg font-medium text-text_blue'>
                        Metaphile Public School
                    </h1>
                    <h3 className='tablet:text-xl text-gray-400 mb-4'>
                        'O' Block, Ganganagar, Meerut-250001
                    </h3>
                </div>
           </div>
           <div className="border-t-2 border-text_blue my-2 tablet:mx-3 rounded-full "></div>
           <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Performance Profile</h1>
           <div className="border-t-2 border-text_blue my-3 tablet:mx-3 rounded-full "></div>
           <div className='flex w-full justify-evenly mobile:max-tablet:flex-col'>
                <div className='flex flex-col text-center items-center'>
                    <img src={props.profileImg} alt="img" className='tablet:h-24 tablet:w-24'/>
                    <h1 className='mt-2 teblet:text-2xl mobile:max-tablet:text-xl font-medium '>{props.name}</h1>
                    <h3 className='text-lg font-medium text-gray-400'>Class {props.class}</h3>
                </div>
                <div className='flex'>
                <div className='text-lg font-medium tablet:w-60 mobile:max-tablet:w-48 my-2'>
                    <h1>Roll Number</h1>
                    <h1>Date of Birth</h1>
                    <h1>Blood Group</h1>
                    <h1>Contact No.</h1>
                    <h1>Class</h1>
                    <h1>Father's Name</h1>
                    <h1>Mother's Name</h1>
                </div>
                <div className='text-lg w-60 text-gray-400 my-2'>
                    <h1>{props.rollnumber}</h1>
                    <h1>{props.dob}</h1>
                    <h1>{props.bloodgroup}</h1>
                    <h1>{props.contactno}</h1>
                    <h1>{props.class}</h1>
                    <h1>{props.father}</h1>
                    <h1>{props.mother}</h1>
                </div>
                </div>
           </div>
        </div>
    )
}