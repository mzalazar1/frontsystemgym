import React, { useState, useEffect } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import axios from "axios";

const SimpleBarCharts = () => {
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
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <YAxis dataKey="totalDelMes" />
                <XAxis dataKey="mes" />
                <Tooltip
                    formatter={tooltipFormatter}
                />
                <Legend content={<p>Meses</p>} />
                <Bar dataKey="totalDelMes" fill="#ff0000" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SimpleBarCharts;