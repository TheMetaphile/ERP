import { motion } from 'framer-motion';

export default function TimeTableHeader({ fields = [], numberOfLecturesBeforeLunch }) {
  return (
    <motion.thead
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-100 dark:bg-dark-200 w-full text-black dark:text-white"
    >
      <tr className='w-full'>
        {['', ...fields].map((header, index) => (
          numberOfLecturesBeforeLunch && numberOfLecturesBeforeLunch === index ?
            (<>
              <th
                key={index}
                className="px-4 py-3 text-center border border-blue-300 dark:border-dark-300 text-sm whitespace-nowrap"
              >
                <div>Lecture: {header.lectureNo || '-'}</div>
                <div>{header.startTime} - {header.endTime}</div>
              </th>
              <th
                key={"lunch"}
                className="px-4 py-3 bg-yellow-600 text-center border border-blue-300 dark:border-dark-300 text-sm whitespace-nowrap"
              >

              </th>
            </>)
            :
            (
              <th
                key={index}
                className="px-4 py-3 text-center border border-blue-300 dark:border-dark-300 text-sm whitespace-nowrap"
              >
                <div>Lecture: {header.lectureNo || '-'}</div>
                <div>{header.startTime} - {header.endTime}</div>
              </th>
            )
        ))}
      </tr>
    </motion.thead>
  );
}