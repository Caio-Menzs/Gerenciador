import React from 'react';
import ApexCharts from 'react-apexcharts';

const AreaChart = ({ data }) => {
  const formatCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const options = {
    title: {
      text: 'Análise de Vendas',
      align: 'left',
    },
    chart: {
      type: 'area',
    },
    xaxis: {
      type: 'datetime',
    },
    fill: {
      curve: 'smooth',
      colors: ['#001980'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },
    stroke: {
      curve: 'smooth',
      colors: ['#001980'],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatCurrency.format(value);
        },
      },
    },
  };

  return (
    <ApexCharts options={options} series={data.series} type="area" height={350} width={700} />
  );
};

export default AreaChart;