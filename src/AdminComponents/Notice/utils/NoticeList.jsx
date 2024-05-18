import React from 'react';

const AnnouncementList = () => {

  const announcements = [
    {
      date: '26 Feb 2023',
      time: '10:00 am',
      message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
    {
        date: '26 Feb 2023',
        time: '10:00 am',
        message: 'All The Teacher have to Come on Sunday Due to Some important Meeting.',
    },
   ];
   const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

  return (
    <div className="mt-4 mx-2">
      <div className="">
      <div className="flex flex-col space-y-4 mb-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className={`rounded-md border p-4 ${colors[index % colors.length]}`}
          >
            <p className="text-lg font-semibold mb-2">{announcement.message}</p>
            <div className="flex justify-between text-gray-600">
              <span>Date: {announcement.date}</span>
              <span>Time: {announcement.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AnnouncementList;