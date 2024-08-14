import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_TimeTableStructure, BASE_URL_TimeTable, BASE_URL_AskDoubt, BASE_URL_Attendence, BASE_URL_ClassTeacher, BASE_URL_ClassWork, BASE_URL_Exam, BASE_URL_Fee, BASE_URL_Homework, BASE_URL_Login, BASE_URL_Notice, BASE_URL_Result, BASE_URL_Student_Leave, BASE_URL_Subject, BASE_URL_TeacherLeave } from '../Config';
import AuthContext from '../Context/AuthContext';
const FetchDataComponent = () => {

  const { authState } = useContext(AuthContext);
  const token = authState.accessToken;

  const fetchData1 = async () => {
    try {
      let data = JSON.stringify({
        "accessToken": token,
        "classRange" : "1st-12th"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_TimeTableStructure}/timeTableStructure/fetch`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      const response = await axios.request(config);
      console.log("\n\timetable structure successful\n\n");
    } catch (error) {
      console.error("\n\timetable structure successful\n\n", error);
    }
  };

  const fetchData2 = async () => {
    try {
      let data = JSON.stringify({
        "accessToken": token,
        'email' : "jioraaza@gmail.com",
        'day' : "Tuesday"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_TimeTable}/timetable/fetch/teacher`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      const response = await axios.request(config);
      console.log("\n\nTime table for class Teacher success\n\n");
    } catch (error) {
      console.error("\n\nTimetable for classteacher failed\n\n", error);
    }
  };


  const fetchData3 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=9th&section=A&subject=Maths`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        
      };

      const response = await axios.request(config);
      console.log("\n\ndoubts teacher fetch success\n\n", );
    } catch (error) {
      console.error("\n\ndoubts teacher fetch failed\n\n", error);
    }
  };


  const fetchData4 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Attendence}/studentAttendance/fetch/student/stats?month=06&year=2024`,
        headers: {
          'Authorization': `sd ${token}`
        },
      };

      const response = await axios.request(config);
      console.log("\n\n Attendance Success \n\n",);
    } catch (error) {
      console.error("\n\n attendance failed\n\n", error);
    }
  };


  const fetchData5 = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL_ClassTeacher}/classTeacher/fetch/single`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "accessToken" : token,
        "class" : "9th",
        "section" : "A"
      }
    };

    axios.request(config)
      .then((response) => {
        console.log("\n\n Class tteacher Success \n\n");
      })
      .catch((error) => {
        console.log("Class Teacher failed",error);
      });
  };


  const fetchData6 = async () => {
    try {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_ClassWork}/classwork/fetch/teacher?class=9th&month=6&year=2024&section=A&subject=Physics`,
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : `token ${token}`
        },
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log('\n\n Classwork success \n\n');

        })
    } catch (error) {
      console.log('\n\n classwork failed \n\n');
      // console.error('Error login :', error);
    };


  };

  const fetchData7 = async () => {
    try {

      let data = JSON.stringify({
        "accessToken": token,
        "class": "9th"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Exam}/fetchExams`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log("\n\n  Exam list success \n\n");

        })
        .catch((error) => {
          //     console.log(error);
          console.log("\n\n Exam list failed\n\n");

        });
    } catch (error) {
      // console.error('Error fetching data:', error);
    };
  };



  const fetchData8 = async () => {
    try {

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Fee}/fee/fetch/structure?class=9th&session=2023-24`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `dsg ${token}`
        },
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("\n\n fee success \n\n");

        })
        .catch((error) => {
          console.log(error);
          console.log("\n\n fee failed \n\n");

        });
    } catch (error) {
      // console.error('Error fetching data:', error);
    };


  };

  const fetchData9 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Homework}/homework/fetch/teacher?class=9th&month=6&year=2024&section=A&subject=Maths`,
        headers: {
          'Authorization': `s ${token}`
        }
      };

      const response = await axios.request(config);
      console.log("\n\homework success api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror homework api\n\n", error);
    }
  };

  const fetchData10 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Result}/result/fetch/teacher?email=jioraaza@gmail.com&class=9th&session=2023-24`,
        headers: {
          'Authorization': `dsg ${token}`
        }
      };

      const response = await axios.request(config);
      console.log("\n\nresult success\n\n", response.data);
    } catch (error) {
      console.error("\n\n result success \n\n", error);
    }
  };

  const fetchData11 = async () => {
    try {
     
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Login}/login/Student`,
        data : JSON.stringify({
          'email' : "jioraaza@gmail.com",
          'password' : "demo1234"
        })
      };

      const response = await axios.request(config);
      console.log("\n\ login success\n\n",);
    } catch (error) {
      console.error("\n\nerror login api\n\n", error);
    }
  };

  const fetchData12 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Notice}/notice/fetch/teacher?start&limit&session=2024-25`,
        headers: {
          'Authorization': `asdg ${token}`
        }
      };

      const response = await axios.request(config);
      console.log("\n\n notice api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror notice \n\n", error);
    }
  };

  const fetchData13 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Student_Leave}/leave/fetch/admin?start=0&end=1&session=2024-25`,
        headers: {
          'Authorization': `sdg ${token}`,
        }
      };

      const response = await axios.request(config);
      console.log("\n\ teacherleave api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror teacher leave api\n\n", error);
    }
  };

  const fetchData14 = async () => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Subject}/fetch`,
        data : JSON.stringify({
          "accessToken" : token,
          "class" : "9th",
          'section': "A"
        })
      };

      const response = await axios.request(config);
      console.log("\n\n assign subject success api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror assign subject api\n\n", error);
    }
  };

  const fetchData15 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_TeacherLeave}/leave/fetch/stats?session=2024-25`,
        headers: {
          'Authorization': `d ${token}`
        }
      };

      const response = await axios.request(config);
      console.log("\n\n teacher leavce stats api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror teacher leave api\n\n", error);
    }
  };
  useEffect(() => {
    // Initial fetch
    fetchData1();
    fetchData2();

    fetchData3();
    fetchData4();
    fetchData5();
    fetchData6();
    fetchData7();
    fetchData8();
    fetchData9();
    fetchData10();
    fetchData11();
    fetchData12();
    fetchData13();
    fetchData14();
    fetchData15();



    // Set up the interval
    const intervalId1 = setInterval(fetchData1, 420000);
    const intervalId2 = setInterval(fetchData2, 420000); // 180000ms = 3 minutes
    const intervalId3 = setInterval(fetchData3, 420000); // 180000ms = 3 minutes
    const intervalId4 = setInterval(fetchData4, 420000); // 180000ms = 3 minutes
    const intervalId5 = setInterval(fetchData5, 420000); // 180000ms = 3 minutes
    const intervalId6 = setInterval(fetchData6, 420000); // 180000ms = 3 minutes
    const intervalId7 = setInterval(fetchData7, 420000); // 180000ms = 3 minutes
    const intervalId8 = setInterval(fetchData8, 420000); // 180000ms = 3 minutes
    const intervalId9 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
    // 180000ms = 3 minutes
    const intervalId10 = setInterval(fetchData10, 420000); // 180000ms = 3 minutes
    const intervalId11 = setInterval(fetchData11, 420000); // 180000ms = 3 minutes
    const intervalId12 = setInterval(fetchData12, 420000); // 180000ms = 3 minutes
    const intervalId14 = setInterval(fetchData13, 420000); // 180000ms = 3 minutes
    const intervalId13 = setInterval(fetchData14, 420000); // 180000ms = 3 minutes
    const intervalId15 = setInterval(fetchData15, 420000); // 180000ms = 3 minutes

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
      clearInterval(intervalId4);
      clearInterval(intervalId5);
      clearInterval(intervalId6);
      clearInterval(intervalId7);
      clearInterval(intervalId8);
      clearInterval(intervalId9);
      clearInterval(intervalId10);
      clearInterval(intervalId11);
      clearInterval(intervalId12);
      clearInterval(intervalId13);
      clearInterval(intervalId14);
      clearInterval(intervalId15);



    }
  }, []);

  return (
    <div>
      

    </div>
  );
};

export default FetchDataComponent;
