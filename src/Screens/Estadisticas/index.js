import React from "react";
import HeaderSection from "../../Components/Header/Header";
import FooterSection from "../../Components/Footer/Footer";
import SimpleBarCharts from './SimpleBarCharts';
import SimplePieCharts from "./SimplePieCharts";
import StackedAreaCharts from "./StackedAreaCharts";


function Estadisticas() {
    return (
        <div>
            <HeaderSection />

            <h1 className="text-center text-2xl leading-9 font-bold">ReCharts</h1>
            <h1 className="text-center text-2xl leading-9 font-bold">Gráfico de Barras</h1>
            <SimpleBarCharts />
            <h1 className="text-center text-2xl leading-9 font-bold">Gráfico de área</h1>
            <StackedAreaCharts />
            <h1 className="text-center text-2xl leading-9 font-bold">Gráfico de torta</h1>
            <SimplePieCharts />


            <FooterSection />
        </div>
    );
}

export default Estadisticas;