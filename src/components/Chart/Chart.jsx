import React from 'react';
import { Bar } from 'react-chartjs-2'

const ClientListItem = (props) => {
  console.log(props.data);
  const colors = ['rgb(255, 80, 80)', 'rgb(0, 153, 255)', 'rgb(51, 204, 51)', 'rgb(255, 255, 0)', 'rgb(153, 102, 255)'];
  const borderColors = ['rgb(255, 0, 0)', 'rgb(0, 102, 204)', 'rgb(0, 153, 51)', 'rgb(204, 204, 0)', 'rgb(102, 102, 255)'];


  let metricLength = props.length || 5;
  if (props.data.metrics.length < metricLength) {
    metricLength = props.data.metrics.length;
  }

  let datasets = [];

  for (let i = 0; i < metricLength; i++) {
    datasets.push({
      label: props.data.metrics[i].metric,
      backgroundColor: colors[i],
      borderColor: borderColors[i],
      borderWidth: 1,
      data: []
    })
  };

  let labels = [];
  let userLength = props.user || 8;
  if (props.data.users.length < userLength) {
    userLength = props.data.users.length;
  }
  for (let i = 0; i < userLength; i++) {
    labels.push(props.data.users[i].user_name);
    for (let j = 0; j < metricLength; j++) {
      if (props.data.users[i].events[j].metric === datasets[j].label) {
        datasets[j].data.push(props.data.users[i].events[j].value);
      } else {
        datasets[j].data.push(0);
      }
    }
  };
  console.log(labels);
  console.log(props.data.name, datasets);

  let chartData = {
    labels: labels,
    datasets: datasets
  };
  let chartOptions = {
    title: {
      display: true,
      text: props.data.name,
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  return (
    <div className={props.chartClass}>
      <Bar
        data={chartData}
        options={chartOptions}
        height={300}
        width={900}
      />
    </div>
  )
}

export default ClientListItem;