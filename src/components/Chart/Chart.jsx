import React from 'react';
import { Bar, HorizontalBar, Line, Radar } from 'react-chartjs-2'

const ClientListItem = (props) => {
  const colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9'];
  const borderColors = ['#cf1643', '#36a243', '#e5ca16', '#3c59c2', '#dc752c', '#821ba2', '#3bbedb', '#d82dcf', '#abd73e', '#e1abab', '#3f8981', '#cfabe5', '#8a5920', '#e5e1b4', '#730000', '#99e5af', '#737300', '#e5c29f', '#000069', '#989898'];
  let datasets = [];
  let labels = [];

  if (props.flip) {
    if (props.metrics.length <= 20) {
      for (let i = 0; i < props.users.length; i++) {
        labels.push(props.users[i].user_name);
      };

      for (let i = 0; i < props.metrics.length; i++) {
        let setData = [];
        props.users.forEach(user => {
          let hit = false;
          user.events.forEach(event => {
            if (event.metric === props.metrics[i].metric) {
              setData.push(event.value)
              hit = true;
            }
          });
          if (!hit) {
            setData.push(0)
          }
        });
        datasets.push({
          label: props.metrics[i].metric,
          backgroundColor: colors[i],
          fill: false,
          borderColor: borderColors[i],
          borderWidth: 1,
          data: setData
        })
      };
    }

  } else {
    if (props.users.length <= 20) {
      for (let i = 0; i < props.metrics.length; i++) {
        labels.push(props.metrics[i].metric);
      };

      for (let i = 0; i < props.users.length; i++) {
        let setData = [];
        labels.forEach(label => {
          let hit = false;
          props.users[i].events.forEach(event => {
            if (event.metric === label) {
              setData.push(event.value)
              hit = true;
            }
          });
          if (!hit) {
            setData.push(0)
          }
        });
        datasets.push({
          label: props.users[i].user_name,
          backgroundColor: colors[i],
          fill: false,
          borderColor: borderColors[i],
          borderWidth: 1,
          data: setData
        })
      };
    }
  }

  let chartData = {
    labels: labels,
    datasets: datasets
  };
  let chartOptions = {
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
    <div className="chart">
      {props.metrics.length === 0 && props.users.length === 0 ?
        <div className="noInput">Add Users and Metrics from Lists on the left to create a graph!</div>
        :
        null
      }
      {!props.flip && props.users.length > 20 ?
        <div className="noInput">Too many users selected! (Max 20)</div>
        :
        null
      }
      {props.flip && props.metrics.length > 20 ?
        <div className="noInput">Too many metrics selected! (Max 20)</div>
        :
        null
      }
      {props.chartType === 'bar' ?
        <Bar
          data={chartData}
          options={chartOptions}
          height={600}
          width={900}
        />
        : props.chartType === 'horizontal' ?
          <HorizontalBar
            data={chartData}
            options={chartOptions}
            height={600}
            width={900}
          />
          : props.chartType === 'line' ?
            <Line
              data={chartData}
              options={chartOptions}
              height={600}
              width={900}
            />
            : props.chartType === 'radar' ?
              <Radar
                data={chartData}
                options={chartOptions}
                height={600}
                width={900}
              />
              : null
      }
    </div>
  )
}

export default ClientListItem;