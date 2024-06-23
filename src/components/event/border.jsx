import Event from './utils/Eventcard.jsx';
import Allevents from './utils/Allevents.jsx';
import first from './../../assets/ChildrenCrossing.png';

export default function Border() {
  return (
    <div className=" flex flex-col w-full h-screen overflow-y-auto items-start px-2 py-3 no-scrollbar">
      <h1 className="text-xl font-medium">Events</h1>

      <div className="border border-gray-300 flex flex-col h-fit w-full mt-2 mb-3 bg-white shadow-lg rounded-lg py-3 px-3">
  <div className="w-fit px-4 py-2 bg-green-300 rounded-lg shadow-md text-center self-center border border-gray-300">
    Upcoming Events
  </div>
  <div className='flex w-full  overflow-x-auto mr-3'>
    <div className="flex mobile:max-tablet:flex-col mobile:max-tablet:w-full"> {/* Ensures that events div takes up the complete black space */}
      <Event color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
      <Event color="bg-sky-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
      <Event color="bg-yellow-200" img={first} text="School is going for vacation at March." date="10 March 2024" />
      <Event color="bg-pink-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
    </div>
  </div>
</div>



      <h1 className="pl-1 mt-3 text-xl font-medium mb-2">All Events</h1>

      <div className="w-full bg-white shadow-lg rounded-lg  border border-gray-300 grid grid-cols-2 whitespace-nowrap mobile:max-tablet:grid-cols-1">

        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
      </div>
    </div>

  );
}


//  <div className="w-fit mb-1 mt-3 mx-3 px-4 py-2 bg-green-400 rounded-lg shadow-md text-center">
//     Upcoming Events
//   </div> 





