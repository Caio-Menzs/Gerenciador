// Chart.js
import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart = ({ data }) => {
  const options = {
    labels: ['Produtos Abaixo do Estoque', 'Produtos Sem Estoque', 'Produtos Acima do Estoque'],
    colors: ['#FF9A01', '#e60000', '#001980'],
    legend: {
      show: true,
    },
  };

  return (
    <Chart
      options={options}
      series={data.series}
      type="donut"
      width="550"
    />
  );
};

export default DonutChart;