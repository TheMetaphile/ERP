import EventCard from './utils/Eventcard.jsx';
import Allevents from './utils/Allevents.jsx';
import first from './../../assets/ChildrenCrossing.png';
import { useState } from 'react';
import NewEvent from './utils/NewEvent.jsx';

export default function Event() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpen = () => {
    setIsDialogOpen(true);
  }
  const handleClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <div className=" flex flex-col w-full h-screen overflow-y-auto items-start px-2 py-3 no-scrollbar">
      <div className='flex justify-between items-center w-full'>
        <h1 className="text-xl font-medium">Events</h1>
        <h1 className="text-base font-medium rounded-lg bg-green-300 p-2 cursor-pointer" onClick={handleOpen}>Create</h1>
      </div>
      <div className="flex flex-col h-fit w-full mt-2 mb-3 bg-white shadow-lg rounded-lg py-3 px-3">
        <div className="w-fit px-4 py-2 bg-green-300 rounded-lg shadow-md text-center self-center">
          Upcoming Events
        </div>
        <div className='flex w-full  overflow-x-auto mr-3'>
          <div className="flex mobile:max-tablet:flex-col mobile:max-tablet:w-full"> {/* Ensures that events div takes up the complete black space */}
            <EventCard color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
            <EventCard color="bg-sky-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
            <EventCard color="bg-yellow-200" img={first} text="School is going for vacation at March." date="10 March 2024" />
            <EventCard color="bg-pink-400" img={first} text="School is going for vacation at March." date="10 March 2024" />
          </div>
        </div>
      </div>



      <h1 className="pl-1 mt-3 text-xl font-medium">All Events</h1>

      <div className="w-full bg-white shadow-lg rounded-lg   grid grid-cols-2 whitespace-nowrap mobile:max-tablet:grid-cols-1">

        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
        <Allevents color="bg-green-300" img={first} text="School is going for vacation at March." date="10 March 2024" />
      </div>

      {isDialogOpen && <NewEvent onClose={handleClose}/>}
    </div>

  );
}


//  <div className="w-fit mb-1 mt-3 mx-3 px-4 py-2 bg-green-400 rounded-lg shadow-md text-center">
//     Upcoming Events
//   </div> 





