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

const Empleados = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET("empleados"));
    }, [dispatch])

    return (
        <div>
            <HeaderSection />
            {/* {auth.currentUser != null ? */}
            <>
                <div className={styles.botEmpleados}>
                    <Link to="/addempleado">
                        <Boton
                            tipo='socABM'
                            texto='Agregar empleado' />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.thDatos}>Id</th>
                            <th className={styles.thDatos}>Dni</th>
                            <th className={styles.thDatos}>Nombre</th>
                            <th className={styles.thDatos}>Apellido</th>
                            <th className={styles.thDatos}>Mail</th>
                            <th className={styles.thDatos}>Fecha de Nacimiento</th>
                            <th className={styles.thDatos}>Rol</th>
                            <th className={styles.thDatos}>Acciones</th>
                        </tr>
                    </thead>

                    <Tabla entidad="empleados" />

                </table>

            </> :
            <>
                <p>Debe iniciar sesión para ingresar a este menú</p>
                <Link to="/login">
                    <Boton
                        tipo='editEmpleados'
                        texto='Iniciar sesión' />
                </Link>
            </>
            <FooterSection />
        </div>
    );

}

export default Empleados;
