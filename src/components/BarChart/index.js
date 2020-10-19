import React, { useCallback, useEffect, useState } from 'react';
import { BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { Container, SelectContainer, YAxisLabel, CustomTooltipContainer } from './styles';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <CustomTooltipContainer>
        <p>{label}</p>
        {payload[0]?.value && <p>{`Gasto diário: R$ ${Number.isInteger(payload[0].value) ? payload[0].value.toFixed(2) : payload[0].value}`}</p>}
      </CustomTooltipContainer>
    );
  }

  return null;
};

function BarChart({ filterOptions, data = [] }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [chartData, setChartData] = useState(data);
  
  const handleFilter = useCallback((event) => {
    setSelectedFilter(event.target.value);
  }, []);

  useEffect(() => {
    //! filtrar dados
    let filteredData = [];
    if(selectedFilter !== 'all') {
      filteredData = data.filter(data => data.tag === selectedFilter);
    } else { 
      filteredData = data;
    }

    //! agrupar dados
    let groupedData = [];
    filteredData.map(filteredObj => {
      const auxData = groupedData.filter(groupedObj => groupedObj?.date === filteredObj?.date);
      if(auxData.length === 0) {
        groupedData.push({ date: filteredObj.date, value: filteredObj.value });
      } else {
        groupedData.map(groupedObj => {
          if(groupedObj?.date === filteredObj?.date) {
            groupedObj.value += filteredObj.value;
            groupedObj.value = groupedObj.value.toFixed(2);
          }
        });
      }
    });

    //! ordenar dados por data

    
    setChartData(groupedData); 
  }, [selectedFilter, data]);

  return (
    <Container>
      {filterOptions && 
        <SelectContainer>
          <p>Filtrar por tags</p>
          <select name="select" onChange={handleFilter}>
          <option value="all"></option>
            {filterOptions.map(option => 
              <option key={option} value={option}>{option}</option> 
            )} 
          </select>
        </SelectContainer>
      }
      <YAxisLabel><p>R$</p></YAxisLabel>
      <Chart
        width={500}
        height={300}
        data={chartData}
      >
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend align="right" />
        <Bar name="gasto diário" dataKey="value" fill="#ff9000" />
      </Chart>
    </Container>
  );
}
export default BarChart;