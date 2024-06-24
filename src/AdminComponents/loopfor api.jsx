import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            url: 'https://assignsubjectapi.onrender.com/fetch',
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
            url: 'https://class-teacher.onrender.com/classTeacher/fetch/single',
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
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://examapi-jep8.onrender.com/fetchDateSheet',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
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
            url: 'https://feeapi.onrender.com/fee/fetch/student',
            headers: {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3MDQzMTUsImV4cCI6MTcxOTMwOTExNX0.FjZShFliBQNrQIjFBcV--nWq4q4LEjp26qe3XstKb-c'
            },
            data: ''
          };
      
          const response = await axios.request(config);
          console.log("\n\nfee api\n\n", response.data);
        } catch (error) {
          console.error("\n\nerror fee api\n\n", error);
        }
      };
      

      const fetchData5 = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://studentleaveapi.onrender.com/leave/fetch/admin?start=0&end=10',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imppb3JhYXphQGdtYWlsLmNvbSIsImRlc2lnbmF0aW9uIjoiQWRtaW4iLCJpYXQiOjE3MTg3NDc1MTksImV4cCI6MTcxOTM1MjMxOX0.bSTtA02kzS2zQPY6Bao2rloZaV7N6tfiEKjPlDzmntY'
            },
            data : data
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
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://loginapi-y0aa.onrender.com/login/Teacher',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
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
                url: 'https://timetableapi-1wfp.onrender.com/timetable/fetch/student',
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
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://timetablestructureapi.onrender.com/timeTableStructure/fetch',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
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
            url: 'https://attendance-api-lako.onrender.com/studentAttendance/fetch/student/stats?month=06&year=2024',
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



        // Set up the interval
        const intervalId1 = setInterval(fetchData1, 420000);
        const intervalId2 = setInterval(fetchData2, 420000); // 180000ms = 3 minutes
        const intervalId3 = setInterval(fetchData3, 420000); // 180000ms = 3 minutes
        const intervalId4 = setInterval(fetchData4, 420000); // 180000ms = 3 minutes
        const intervalId5= setInterval(fetchData5, 420000); // 180000ms = 3 minutes
        const intervalId6 = setInterval(fetchData6, 420000); // 180000ms = 3 minutes
        const intervalId7 = setInterval(fetchData7, 420000); // 180000ms = 3 minutes
        const intervalId8 = setInterval(fetchData8, 420000); // 180000ms = 3 minutes
        const intervalId9 = setInterval(fetchData9, 420000); // 180000ms = 3 minutes
         // 180000ms = 3 minutes

        // Clean up the interval on component unmount
        return () =>{
            clearInterval(intervalId1);
            clearInterval(intervalId2);
            clearInterval(intervalId3);
            clearInterval(intervalId4);
            clearInterval(intervalId5);
            clearInterval(intervalId6);
            clearInterval(intervalId7);
            clearInterval(intervalId8);
            clearInterval(intervalId9);

            
        }
    }, []);

    return (
        <div>
            <h1 className='text-3xl font-bold text-black'>API Data</h1>
            
        </div>
    );
};

export default FetchDataComponent;
