import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function StudentDetailTile({ userData }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      };
    
      const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      };

    return (
        <motion.div
        className="w-full space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {userData.map((user, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              to={{
                pathname: `/Admin-Dashboard/Students/studentdetails`,
                search: `?email=${user.email}&name=${user.name}&rollNumber=${user.rollNumber}&classs=${user.currentClass}`,
              }}
            >
              <motion.div
                className="flex items-center justify-between bg-white border border-purple-200 rounded-lg p-4 hover:bg-purple-50 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-purple-700 w-24">{user.rollNumber}</span>
                  <div className="flex items-center space-x-2 w-48">
                    <img src={user.profileLink} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <span className="text-base font-medium">{user.name}</span>
                  </div>
                </div>
                <span className="text-base w-24 text-center">{user.currentClass}</span>
                <span className="text-base w-24 text-center">{user.section}</span>
                <span className="text-base w-36 text-center">{user.fatherPhoneNumber}</span>
                <span className="text-base w-48 text-center truncate">{user.email}</span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
}

