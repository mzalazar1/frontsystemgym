import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const StackedAreaCharts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:6001/api/cuotas/all');
                setData(response.data);
                console.log('Data from API:', response.data); // Agregar este console.log

                // Agregar console.log para cada dato del eje X
                response.data.forEach(item => {
                    console.log('X Axis Data:', item.id);
                });

                // Agregar console.log para cada dato del eje
                response.data.forEach(item => {
                    console.log('Y Axis Data (actividad):', item.actividad);
                    console.log('Y Axis Data (socio):', item.socio);
                });

            } catch (error) {
                console.error('Error al obtener datos desde la API:', error);
            }
        };

        fetchData();
    }, []);
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
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="age" stackId="1" stroke='#8884d8' fill="#8884d8" />
                <Area type="monotone" dataKey="weight" stackId="1" stroke='#82caed' fill="#fad3cf" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default StackedAreaCharts;