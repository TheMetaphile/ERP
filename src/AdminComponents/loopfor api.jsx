import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_TimeTableStructure, BASE_URL_TimeTable, BASE_URL_AskDoubt, BASE_URL_Attendence, BASE_URL_ClassTeacher, BASE_URL_ClassWork, BASE_URL_Exam, BASE_URL_Fee, BASE_URL_Homework, BASE_URL_Login, BASE_URL_Notice, BASE_URL_Result, BASE_URL_Student_Leave, BASE_URL_Subject, BASE_URL_TeacherLeave } from '../Config';
const FetchDataComponent = () => {
  const [data, setData] = useState(null);

  const fetchData1 = async () => {
    try {
      let data = JSON.stringify({
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTgwMDkzNTAsImV4cCI6MTcxODYxNDE1MH0.DquvnjVSlmJrKkBxu_thH90mhaA6MLsn8h9WBvpNzF0",
        "class": "9th",
        "section": "A"
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
      console.log("\n\nassignsubject\n\n", response.data);
    } catch (error) {
      console.error("\n\nassignsubject error\n\n", error);
    }
  };

  const fetchData2 = async () => {
    try {
      let data = JSON.stringify({
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiU3R1ZGVudCIsImlhdCI6MTcxNzk3ODgxMiwiZXhwIjoxNzE4NTgzNjEyfQ.b_ZjX-iGk83YShe4wQu3wATnizJ3N9nKp9B_c_W5hhI",
        "class": "9th",
        "section": "A"
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
      console.log("\n\nclass teacher\n\n", response.data);
    } catch (error) {
      console.error("\n\nclass teacher error\n\n", error);
    }
  };


  const fetchData3 = async () => {
    try {
      let data = JSON.stringify({
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiU3R1ZGVudCIsImlhdCI6MTcxODYxNTUxNywiZXhwIjoxNzE5MjIwMzE3fQ.E3WCeTtv8srC4Ffr-_MGasFYRqtupCqaxi1inlP9_Dw",
        "class": "9th"
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_AskDoubt}/doubts/fetch/teacher?class=9th&section=A&subject=Maths`,
        headers: {
          'Content-Type': 'application/json'
        },
        
      };

      const response = await axios.request(config);
      console.log("\n\nexam api\n\n", response.data);
    } catch (error) {
      console.error("\n\nexam api error\n\n", error);
    }
  };


  const fetchData4 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Attendence}/studentAttendance/fetch/student?month=06&year=2024`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        },
      };

      const response = await axios.request(config);
      console.log("\n\nfee api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror fee api\n\n", error);
    }
  };


  const fetchData5 = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL_ClassTeacher}/classTeacher/fetch/single`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3NDc1MTksImV4cCI6MTcxOTM1MjMxOX0.bSTtA02kzS2zQPY6Bao2rloZaV7N6tfiEKjPlDzmntY'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const fetchData6 = async () => {
    try {

      let data = JSON.stringify({
        "email": "jioraaza@gmail.com",
        "password": "demo1234"
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_ClassWork}/classwork/fetch/student?class=9th&month=6&year=2024&section=A&subject=Physics`,
        headers: {
          'Content-Type': 'application/json'
        },
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log(' login :');

        })
    } catch (error) {
      console.log('error login :');
      // console.error('Error login :', error);
    };


  };

  const fetchData7 = async () => {
    try {

      let data = JSON.stringify({
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c",
        "class": "3rd",
        "section": "C",
        "day": "tuesday"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Exam}/fetchDateSheet`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log("\n\n timetable api\n\n");

        })
        .catch((error) => {
          //     console.log(error);
          console.log("\n\n errortimetable api\n\n");

        });
    } catch (error) {
      // console.error('Error fetching data:', error);
    };
  };



  const fetchData8 = async () => {
    try {

      let data = JSON.stringify({
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTgwMTMzMTMsImV4cCI6MTcxODYxODExM30.g5so7L_llJ9DIIplE4m8sUoBqjVbK-vF_RMjKPCilEk",
        "classRange": "1st-12th"
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Fee}/fee/fetch/structure?class=9th&session=2023-24`,
        headers: {
          'Content-Type': 'application/json'
        },
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log("\n\n time  table structure api\n\n");

        })
        .catch((error) => {
          console.log(error);
          console.log("\n\n errortime  table structure api\n\n");

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
        url: `${BASE_URL_Homework}/homework/fetch/student?class=9th&month=6&year=2024&section=A&subject=Maths`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
    }
  };

  const fetchData10 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Result}/result/fetch/student?email=jioraaza@gmail.com&class=9th&session=2023-24`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
    }
  };
  const fetchData11 = async () => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Login}/login/Student`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
    }
  };

  const fetchData12 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Notice}/notice/fetch/student?start&limit`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
    }
  };

  const fetchData13 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Student_Leave}/leave/fetch/admin?start=0&end=1`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
    }
  };

  const fetchData14 = async () => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BASE_URL_Subject}/fetch`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
    }
  };

  const fetchData15 = async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL_TeacherLeave}/leave/fetch/stats?session=2024-25`,
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
        }
      };

      const response = await axios.request(config);
      console.log("\n\nattendance api\n\n", response.data);
    } catch (error) {
      console.error("\n\nerror attendance api\n\n", error);
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
    const intervalId10 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
    const intervalId11 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
    const intervalId12 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
    const intervalId14 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
    const intervalId13 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
    const intervalId15 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes

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
