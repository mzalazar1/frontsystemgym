import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET } from "../../redux/main.actions";
import { Link } from "react-router-dom";
import HeaderSection from '../../Components/Header/Header';
import FooterSection from '../../Components/Footer/Footer';
import Boton from "../../Components/SharedComponents/Boton";
import styles from './Index.module.css'
import Tabla from '../../Components/Table/table'
// import TablaCabecera from '../../Components/Table/tableHead'

// import firebaseAapp from "../../Firebase/credenciales";
// import { getAuth } from "firebase/auth"

// const auth = getAuth(firebaseAapp)

const Actividades = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET("actividades"));
    }, [dispatch])

    return (
        <div>
            <HeaderSection />
            {/* {auth.currentUser != null ? */}
            <>
                <div className={styles.botActividad}>
                    <Link to="/addactividad">
                        <Boton
                            tipo='actividadABM'
                            texto='Agregar actividad' />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.thDatos}>Id</th>
                            <th className={styles.thDatos}>Nombre</th>
                            <th className={styles.thDatos}>Horarios</th>
                            <th className={styles.thDatos}>Profesor</th>
                            <th className={styles.thDatos}>Acciones</th>
                        </tr>
                    </thead>

                    <Tabla entidad="actividades" />

                </table>

            </> :
            <>
                <p>Debe iniciar sesión para ingresar a este menú</p>
                <Link to="/login">
                    <Boton
                        tipo='editActividad'
                        texto='Iniciar sesión' />
                </Link>
            </>
            <FooterSection />
        </div>
    );

}

export default Actividades;
