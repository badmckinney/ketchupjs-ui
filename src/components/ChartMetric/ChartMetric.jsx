import React from 'react';

const ChartMetric = (props) => {

  return (
    <li className="listItem" onClick={props.click} data-metric={props.id}>{props.metric.metric}</li>
  )
}

export default ChartMetric;