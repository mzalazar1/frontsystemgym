import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StackedAreaCharts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:6001/api/valorescuota/all"
        );

        // Group the data by month and calculate the sum of importe for each month
        const groupedData = data.reduce((result, current) => {
          const month = current.mes;

          if (!result[month]) {
            result[month] = {
              mes: month,
              totalDelMes: 0,
            };
          }

          result[month].totalDelMes += current.importe;

          return result;
        }, {});

        // Convert the groupedData object into an array of objects and revert the Order. ENERO primero DICIEMBRE ULTIMO
        const resultArray = Object.values(groupedData).reverse();

        setData(resultArray);
      } catch (error) {
        console.error("Error al obtener datos desde la API:", error);
      }
    };

    fetchData();
  }, []);

  const tooltipFormatter = (value, name, props) => {
    // Assuming 'mes' is the property you want to show in the tooltip
    return [props.payload.mes, `Total: $ ${value}`];
  };

  return (
    <ResponsiveContainer width="50%" aspect={2}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip formatter={tooltipFormatter} />
        <Area
          type="monotone"
          dataKey="totalDelMes"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedAreaCharts;
