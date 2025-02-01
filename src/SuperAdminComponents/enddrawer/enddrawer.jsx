import Activities from './activity.jsx';
import Ballroom from "./../../assets/BallroomDance.png";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaBell, FaBook, FaChevronRight } from 'react-icons/fa';
import Notice from './notice.jsx';

export default function SuperAdminEnddrawer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };


  return (
    <motion.div
      className=" h-full overflow-auto px-2 py-1 bg-white "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="flex justify-between items-center text-xl font-bold mb-2 text-gray-800">
        <div className="flex items-center text-lg whitespace-nowrap">
          <FaBell className="mr-2 text-purple-500" />
          Daily Notice
        </div>
        <Link to="/Admin-Dashboard/Notice" className="text-purple-600 hover:text-purple-800 text-sm flex items-center">
          See All
          <FaChevronRight className="ml-1" />
        </Link>
      </h2>
      <motion.section className="mb-6 h-1/2" variants={itemVariants}>

        <motion.div
          className=" h-full overflow-y-auto hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Notice />
        </motion.div>
      </motion.section>
      <motion.section className="mb-6 h-1/2" variants={itemVariants}>
        <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
        <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
        <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
        <Activities image={Ballroom} title="Rhyme Time: A Night of Poetry" time="24 Jan 21, 09:00 AM" description="April is also a National Poetry Month. Now there is a great theme for a fun family night!" />
      </motion.section>
    </motion.div>

  );
}
