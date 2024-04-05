/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Progress({data , label}) {

const state = {
  labels: label,
  datasets: [
    {
      backgroundColor: 'rgba(219, 79, 142, 0.77)',
      borderColor: 'rgba(219, 79, 79, 0.77)',
      barThickness: 22,
      data: data,
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
                stepSize:20,
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
