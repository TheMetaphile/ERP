
import InfoCard from "../../../../components/Result/utils/InfoCard";
import profile from '../../../../assets/Test Account.png';
import Attendance from "./Attendence";
import Academic from "./Academic";


export default function PerformanceProfile() {


  

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto items-start mt-2 px-2 no-scrollbar" id="divToPrint">
      <h3 className="text-xl font-medium">Performance Profile</h3>
      <InfoCard 
        class="2nd A" 
        name={id} 
        profileImg={profile}
        rollnumber="2001270100028"
        dob="27 Dec 1995"
        bloodgroup="B+"
        contactno="+91 8979020025"
        father="Mr. Raj kumar Tyagi"
        mother="Mrs. Manju Tyagi"
      />
      <div className="w-full border border-gray-300 shadow-md rounded-lg p-4 mt-4 ">
            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='w-full flex items-center justify-between px-3'>
                <h1 className='tablet:text-3xl mobile:max-tablet:text-xl font-medium text-text_blue text-center'>Attendance</h1>
                <h1 className='flex items-center text-sm bg-secondary p-2 rounded-lg shadow-md self-end'>Edit <MdEdit className='ml-1' /></h1>
            </div>

            <div className="border-t-2 border-text_blue my-3 tablet:mx-2 rounded-full "></div>
            <div className='flex w-full justify-between tablet:mx-2 mobile:max-tablet:flex-col'>
                <div className="w-full mx-2">
                    <h1 className="text-xl font-medium mb-3">
                        Term I
                    </h1>
                    <div className=" rounded-lg shadow-md bg-secondary text-center py-2">
                        <h1 className="text-xl font-medium">
                            {props.term[0].attendance}/{props.term[0].total} Days
                        </h1>
                        <h1 className="text-lg text-gray-500">
                            Total attendance of the student
                        </h1>
                    </div>
                </div>
               
            </div>
        </div>
      <Academic />
      <div className="text-xl font-medium my-3 bg-secondary text-black self-center rounded-lg shadow-md py-1 px-3 mt-3 hover:bg-blue-400 cursor-pointer hover:text-white" onClick={printDocument}>
        Download
      </div>
    </div>
  );
}
