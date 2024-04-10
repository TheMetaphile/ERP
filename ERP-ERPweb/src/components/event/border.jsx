import Event from './utils/Eventcard.jsx';
import Allevents from './utils/Allevents.jsx';
import first from './../../assets/ChildrenCrossing.png';

export default function Border() {
  return (
    <div className="flex flex-col w-full h-screen items-start mt-2 ml-1 mr-3 p-4 bg-gray-300">
      <h1 className="text-lg">Events</h1>

      <div className="flex flex-col h-fit w-full mt-2 mb-3 bg-white shadow-lg rounded-lg py-3 px-3 overflow-x-auto no-scrollbar">
         <div className="w-fit px-4 py-2 bg-green-400 rounded-lg shadow-md text-center self-center">
            Upcoming Events
         </div> 
         <div className='flex w-96 h-fit'>
         <Event color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Event color="bg-blue-500" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Event color="bg-yellow-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Event color="bg-pink-600" img={first} text="School is going for vacation at March." date="10 March 2024" />
         </div>
      </div>


      <h1 className="pl-1 mt-3 text-lg">All Events</h1>

      <div className="w-full bg-white shadow-lg rounded-lg  overflow-auto grid grid-cols-2  whitespace-nowrap">
        
        <Allevents color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Allevents color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Allevents color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Allevents color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Allevents color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    <Allevents color="bg-green-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
        </div>
      </div>
    
  );
}


//  <div className="w-fit mb-1 mt-3 mx-3 px-4 py-2 bg-green-400 rounded-lg shadow-md text-center">
//     Upcoming Events
//   </div> 





