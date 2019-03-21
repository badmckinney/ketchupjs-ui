import React from 'react';
import ChartMetric from '../ChartMetric';

const ChartMetricList = (props) => {
  let count = 0;
  const ChartMetricList = props.metrics.map(metric => {
    return (
      <ChartMetric
        id={count}
        key={count++}
        metric={metric}
        click={props.click}
      />
    )
  })

  return (
    <>
      {ChartMetricList}
    </>
  )
}

export default ChartMetricList;