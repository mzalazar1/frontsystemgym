import React from "react";
import HeaderSection from "../../Components/Header/Header";
import FooterSection from "../../Components/Footer/Footer";
import SimpleBarCharts from './SimpleBarCharts';
import SimplePieCharts from "./SimplePieCharts";
import StackedAreaCharts from "./StackedAreaCharts";
import { Link } from "react-router-dom";
import Boton from "../../Components/SharedComponents/Boton";

import firebaseAapp from "../../Firebase/credenciales";
import { getAuth } from "firebase/auth"

const auth = getAuth(firebaseAapp)


function Estadisticas() {
    return (
        <div>
            <HeaderSection />
            {auth.currentUser != null ?
                <>

                    <h1 className="text-center text-2xl leading-9 font-bold">ReCharts</h1>
                    <h1 className="text-center text-2xl leading-9 font-bold">Gráfico de Barras</h1>
                    <SimpleBarCharts />
                    <h1 className="text-center text-2xl leading-9 font-bold">Gráfico de área</h1>
                    <StackedAreaCharts />
                    <h1 className="text-center text-2xl leading-9 font-bold">Gráfico de torta</h1>
                    <SimplePieCharts />

                    <Link to="/">
                        <Boton
                            tipo='estadisticas'
                            texto='Volver' />
                    </Link>
                </> :
                <>
                    <p>Debe iniciar sesión para ingresar a este menú</p>
                    <Link to="/login">
                        <Boton
                            tipo='editEstadisticas'
                            texto='Iniciar sesión' />
                    </Link>
                </>

            }
            <FooterSection />

        </div>
    );
}

export default Estadisticas;