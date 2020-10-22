import React, { useCallback, useEffect, useState } from 'react';
import { BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { formatDateToChart } from '../../utils/formatDate';

import ChartSelect from '../../components/ChartSelect';

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
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [chartData, setChartData] = useState(data);
  console.log('data', data);

  const handleFilter = useCallback((optionValue) => {
    setSelectedFilter(optionValue);
  }, []);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  useEffect(() => {
    //! editar date dos dados
    let editedData = [];
    data.map(dataToEdit => editedData.push({...dataToEdit, date: formatDateToChart(dataToEdit.date) }));

    //! filtrar dados
    let filteredData = [];
    if(selectedFilter !== 'all') {
      filteredData = editedData.filter(data => data.tag === selectedFilter);
    } else { 
      filteredData = editedData;
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
  }, [data, selectedFilter]);

  return (
    <Container>
      {data.length === 0 ?
        <h4>Não existem dados suficientes para gerar o gráfico de despesas.</h4>
      : <>
          {filterOptions && 
            <SelectContainer>
              <p>Filtrar por tags</p>
              <ChartSelect 
                nullValue="all"
                dataOptions={filterOptions}
                selectedOptionValue={selectedFilter}
                onChangeOption={handleFilter}
              />
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
            <Legend align="right" wrapperStyle={{ bottom: -16 }} />
            <Bar name="gasto diário" dataKey="value" fill="#ff9000" />
          </Chart>
        </>
      }
      </Container>
  );
}
export default BarChart;