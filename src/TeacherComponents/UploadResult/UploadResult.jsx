import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import AuthContext from '../../Context/AuthContext';
import { BASE_URL_Login } from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Switch from './utils/switch';
import Selection from '../notebook/utils/Selection';
import CoScholasticTable from './utils/CoScholasticTable';
import ScholasticTable from './utils/ScholasticTable';

function UploadResult() {
  const [students, setStudents] = useState([]);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const end = 100;
  const [Class, setClass] = useState(authState.subject[0].class);
  const [Section, setSection] = useState(authState.subject[0].section);
  const [Subject, setSubject] = useState(authState.subject[0].subject);
  const [scholastic, setScholastic] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('term1');

  const terms = [
    {
      label: 'Term 1',
      value: "term1"
    },
    {
      label: 'Half Yearly',
      value: "halfYearly"
    },
    {
      label: 'Term 2',
      value: "term2"
    },
    {
      label: 'Final',
      value: "final"
    }
  ];

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  }
  const handleRoleChange = (event) => {
    setScholastic(event);
  };

  useEffect(() => {
    setStudents([]);
    fetchStudents();
  }, [Class, Section]);




  const fetchStudents = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL_Login}/fetchMultiple/student`, {
        accessToken: authState.accessToken,
        currentClass: authState.ClassDetails.class,
        section: authState.ClassDetails.section,
        end: end
      });
      if (response.status == 200) {
        console.log("API response:", response.data.Students);
        setStudents(prevData => [...prevData, ...response.data.Students]);
        console.log("API responserrrrrr:", response.data.Students);

      }

    } catch (error) {
      console.error("Error fetching student:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);



  return (
    <div className="overflow-y-auto w-full items-start px-2 py-1 no-scrollbar">
      <ToastContainer />
      <div className='w-full flex items-center justify-between my-2 '>
        <div className=' flex-1'>
          <h1 className="text-xl font-medium mb-2 mobile:max-tablet:text-lg whitespace-nowrap">Upload Report Card</h1></div>
        <div className="block flex-1 justify-end laptop:hidden w-full items-end mobile:max-laptop:text-end">
          <button
            className="p-2 border rounded "
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            Filter
          </button>
          {isDropdownVisible && (
            <div className='flex absolute left-0 right-0 bg-white p-4 gap-2 justify-between mobile:max-tablet:flex-col'>
              <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
              <div className="w-36 mr-3 self-center">
                <select id="section" className="w-full px-2 py-2 border rounded-md" onChange={handleTermChange}>
                  <option value="">Select Term</option>
                  {terms.map((sectionOption, index) => (
                    <option key={index} value={sectionOption.value}>{sectionOption.label}</option>
                  ))}
                </select>
              </div>
              <Switch checked={scholastic} changeRole={handleRoleChange} />
            </div>
          )}

        </div>


        <div className='flex items-end mobile:max-laptop:hidden'>
          <Selection setClass={setClass} setSection={setSection} setSubject={setSubject} />
          <div className="w-36 mr-3 self-center">
            <select id="section" className="w-full px-2 py-2 border rounded-md" onChange={handleTermChange}>
              <option value="">Select Term</option>
              {terms.map((sectionOption, index) => (
                <option key={index} value={sectionOption.value}>{sectionOption.label}</option>
              ))}
            </select>
          </div>
          <Switch checked={scholastic} changeRole={handleRoleChange} />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) :
        scholastic
          ?
          (
            <ScholasticTable students={students} subject={Subject} term={selectedTerm} Class={Class} />
          )
          :
          (
            <CoScholasticTable students={students} Class={Class} term={selectedTerm} />
          )

      }

    </div>
  )
}

export default UploadResult











