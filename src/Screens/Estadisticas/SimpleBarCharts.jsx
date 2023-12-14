import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import axios from 'axios';


const SimpleBarCharts = () => {

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
        <ResponsiveContainer width="50%" height={300}>
            <BarChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="actividad" fill="##ff0000" />
                <Bar dataKey="socio" fill="#ff0000" />
            </BarChart>
        </ResponsiveContainer>


    );

};

export default SimpleBarCharts;