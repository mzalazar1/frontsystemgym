import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './Screens/Home';
import Socios from './Screens/Socios';
import Pagos from './Screens/Pagos';
import Cuotas from "./Screens/Cuotas";
import Actividades from "./Screens/Actividades";
import Empleados from "./Screens/Empleados";
import EstadosCuotas from "./Screens/EstadosCuotas";
import MetodoPago from "./Screens/MetodoPago";
import Profesores from "./Screens/Profesores";
import Logs from "./Screens/PantallaLogs";
import Roles from "./Screens/Roles";
import TiposCuotas from "./Screens/TiposCuotas";
import ValoresCuotas from "./Screens/ValoresCuotas";

import FormAddSocio from './Screens/FormAddSocio';
import FormAddPago from './Screens/FormAddPago';
import FormAddCuota from './Screens/FormAddCuota';
import FormEditCuota from './Screens/FormEditCuota';
import FormAddActividad from './Screens/FormAddActividad';
import FormEditActividad from './Screens/FormEditActividad';
import FormAddEmpleado from './Screens/FormAddEmpleado';
import FormEditEmpleado from './Screens/FormEditEmpleado';
import FormEditEstadoCuota from './Screens/FormEditEstadoCuota';
import FormAddEstadoCuota from './Screens/FormAddEstadoCuota';
import FormEditMetodoPago from './Screens/FormEditMetodoPago';
import FormEditTipoCuota from './Screens/FormEditTipoCuota';
import FormAddTipoCuota from './Screens/FormAddTipoCuota';
import FormAddValorCuota from './Screens/FormAddValorCuota';
import FormAddLog from './Screens/FormAddLog';
import FormAddRol from './Screens/FormAddRol';
import FormEditValorCuota from './Screens/FormEditValorCuota';

import FormAddMetodoPago from './Screens/FormAddMetodoPago';
import FormAddProfesor from './Screens/FormAddProfesor';
import FormEditProfesor from './Screens/FormEditProfesor';
import FormEditSocio from './Screens/FormEditSocio';
import FormEditPago from './Screens/FormEditPago';
import FormEditRol from './Screens/FormEditRol';
import FormEditLog from './Screens/FormEditLog';

import Login from "./Screens/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseAapp from "./Firebase/credenciales";

const auth = getAuth(firebaseAapp)

const RoutesAPP = () => {
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (userFirebase) => {
            if (userFirebase) {
                setUserLogin(true)
            } else {
                setUserLogin(false)
            }
        })
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/socios" element={<Socios />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/cuotas" element={<Cuotas />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/estadosCuota" element={<EstadosCuotas />} />
            <Route path="/metodospagos" element={<MetodoPago />} />
            <Route path="/profesores" element={<Profesores />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/tiposcuota" element={<TiposCuotas />} />
            <Route path="/valorescuota" element={<ValoresCuotas />} />

            <Route path='/login' element={<Login />} />
            {userLogin ?
                <>
                    <Route path="/addSocio" element={<FormAddSocio />} />
                    <Route path='/editsocios/:id' element={<FormEditSocio />} />
                    <Route path="/addcuota" element={<FormAddCuota />} />
                    <Route path="/addactividad" element={<FormAddActividad />} />
                    <Route path="/addempleado" element={<FormAddEmpleado />} />
                    <Route path="/editempleado/:id" element={<FormEditEmpleado />} />
                    <Route path="/addestadocuota" element={<FormAddEstadoCuota />} />
                    <Route path='/editestadocuota/:id' element={<FormEditEstadoCuota />} />
                    <Route path="/addprofesor" element={<FormAddProfesor />} />
                    <Route path="/addrol" element={<FormAddRol />} />
                    <Route path="/editprofesor/:id" element={<FormEditProfesor />} />
                    <Route path="/edittiposcuota/:id" element={<FormEditTipoCuota />} />
                    <Route path="/editlogs/:id" element={<FormEditLog />} />


                    <Route path="/addtipocuota" element={<FormAddTipoCuota />} />
                    <Route path="/addvalorcuota" element={<FormAddValorCuota />} />
                    <Route path="/addlog" element={<FormAddLog />} />


                    <Route path="/addmetodoPago" element={<FormAddMetodoPago />} />
                    <Route path='/editmetodospagos/:id' element={<FormEditMetodoPago />} />
                    <Route path='/editactividades/:id' element={<FormEditActividad />} />
                    <Route path='/editvalorcuota/:id' element={<FormEditValorCuota />} />
                    <Route path='/editroles/:id' element={<FormEditRol />} />

                    <Route path='/editcuotas/:id' element={<FormEditCuota />} />
                    <Route path="/addpago" element={<FormAddPago />} />
                    <Route path='/editpagos/:id' element={<FormEditPago />} />

                </> : <></>}
        </Routes>
    )
}

export default RoutesAPP;