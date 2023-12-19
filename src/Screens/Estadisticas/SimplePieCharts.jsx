import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
    "#ce93d8",
    "#5c6bc0",
    "#b39ddb",
    "#4dd0e1",
    "#f48fb1",
    "#d500f9",
];

const SimplePieCharts = () => {
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
            <PieChart>
                <Pie
                    dataKey="totalDelMes"
                    data={data}
                    innerRadius={60}
                    outerRadius={85}
                    fill="#82ca9d"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell - ${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={tooltipFormatter} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default SimplePieCharts;