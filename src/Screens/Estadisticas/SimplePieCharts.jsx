import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts'


const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1', '#d500f9']

const SimplePieCharts = () => {
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

                // Agregar console.log para cada dato del eje Y (weight y age)
                response.data.forEach(item => {
                    console.log('Y Axis Data (actividadPie):', item.actividad);
                    console.log('Y Axis Data (socioPie):', item.socio);
                });

            } catch (error) {
                console.error('Error al obtener datos desde la API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        innerRadius={60}
                        outerRadius={85}
                        fill="#82ca9d"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>

            </ResponsiveContainer>
        </div>
    )
}

export default SimplePieCharts;