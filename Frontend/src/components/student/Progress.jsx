/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import useGetAllSubjects from "../../customHook/useGetAllSubjects";
import { useSelector } from 'react-redux';
Chart.register(...registerables);

export default function Progress(props) {
  // const course = useSelector(state => state.user.user.enrolledCourseName)
  // const semester = useSelector(state => state.user.user.semester)
  // console.log(semester)
  // console.log(course)
  // const subjects = useGetAllSubjects({courseName:course,semester:semester});
  // console.log(subjects)

const state = {
  labels: [
    'MIS',
    'OS',
    'FM',
    'ML',
    'MCS',
    'PS7'
  ],
  datasets: [
    {
      backgroundColor: 'rgba(219, 79, 142, 0.77)',
      borderColor: 'rgba(219, 79, 79, 0.77)',
      barThickness: 22,
      data: props.data,
      label:"",
      borderWidth: 1
    },
  ],
}
  return (
    <div>
      <Bar
        data={state}
        options={{
          scales:{
            y:{
              beginAtZero:true,
              ticks:{
                stepSize:30,
              }
            }
          },
          aspectRatio: 1.2,
          plugins:{
            legend:{
              labels:{
                boxWidth:0
              }
            }
          },
        }}
      />
    </div>
  )
}
