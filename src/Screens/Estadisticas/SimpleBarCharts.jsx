import React, { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import axios from 'axios';

//Datos de ejemplo
// const data = [
//     {name: "María", age: 10, weight: 60},
//     {name: 'Karina', age: 25, weight: 70},
//     {name: 'Susana', age: 15, weight: 65},
//     {name: 'Pedro', age: 35, weight: 85},
//     {name: 'Felipe', age: 12, weight: 48},
//     {name: 'Laura', age: 30, weight: 69},
//     {name: 'Adrián', age: 15, weight: 78},
// ]



const SimpleBarCharts = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:6001/api/valorescuota/all');
                setData(response.data);
                console.log('Data from API:MUESTRA LOS DATOS QUE TRAIGO', response.data); // Agregar este console.log

                // Agregar console.log para cada dato del eje X
                response.data.forEach(item => {
                    console.log('X Axis Data:', item.mes);
                });

                // Agregar console.log para cada dato del eje Y (weight y age)
                response.data.forEach(item => {
                    console.log('Y Axis Data (mes):', item.importe);
                    // console.log('Y Axis Data (tipo):', item.tipo);
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