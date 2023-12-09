import { useDispatch } from "react-redux";
import { GET } from "../../redux/main.actions";

import HeaderSection from '../../Components/Header/Header';
import BodySectionHome from '../../Components/Body/Body';
import FooterSection from '../../Components/Footer/Footer';
import React from 'react';
import { useState, useEffect } from "react";


const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  //  EJECUTAMOS TODOS LOS GETS DE TODO PARA TENER LA NUBE CON LOS DATOS A USAR.
  useEffect(() => {
    setTimeout(() => {

      if (!loaded) {
        // ponemos condicion para que solo se cargue 1 vez, y si tienen valores, no dupliquee en el state global
        dispatch(GET("socios")); // traigo cuotas y las cargo en el redux state
        dispatch(GET("profesores")); // traigo cuotas y las cargo en el redux state
        dispatch(GET("cuotas")); // traigo cuotas y las cargo en el redux state
        dispatch(GET("valorescuota")); // traigo valorescuota y las cargo en el redux state
        dispatch(GET("estadoscuota")); // traigo valorescuota y las cargo en el redux state
        dispatch(GET("tiposcuota")); // traigo tiposcuota y las cargo en el redux state
        dispatch(GET("actividades")); // traigo actividades y las cargo en el redux state
        dispatch(GET("empleados")); // traigo actividades y las cargo en el redux state
        dispatch(GET("roles")); // traigo actividades y las cargo en el redux state
        dispatch(GET("logs")); // traigo pagos y las cargo en el redux state
        dispatch(GET("pagos")); // traigo pagos y las cargo en el redux state
        dispatch(GET("metodospagos")); // traigo metodospagos y las cargo en el redux state

        setLoaded(true);// listo cambiamos el estado y la proxima que se re-renderice no entra al if
      }
    }, 1000);
  }, [dispatch, loaded])

  return (
    <div>
      <HeaderSection />
      <BodySectionHome />
      <FooterSection />
    </div>
  )
}

export default Home;