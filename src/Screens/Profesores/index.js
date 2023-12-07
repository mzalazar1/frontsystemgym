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

const Profesores = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET("profesores"));
    }, [dispatch])

    return (
        <div>
            <HeaderSection />
            {/* {auth.currentUser != null ? */}
            <>
                <div className={styles.botProfesores}>
                    <Link to="/addprofesor">
                        <Boton
                            tipo='socABM'
                            texto='Agregar profesor' />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.thDatos}>Id</th>
                            <th className={styles.thDatos}>Dni</th>
                            <th className={styles.thDatos}>Nombre</th>
                            <th className={styles.thDatos}>Apellido</th>
                            <th className={styles.thDatos}>Tel</th>
                            <th className={styles.thDatos}>Mail</th>
                            <th className={styles.thDatos}>Fecha de Nacimiento</th>
                            <th className={styles.thDatos}>Acciones</th>
                        </tr>
                    </thead>

                    <Tabla entidad="profesores" />

                </table>

            </> :
            <>
                <p>Debe iniciar sesión para ingresar a este menú</p>
                <Link to="/login">
                    <Boton
                        tipo='editProfesores'
                        texto='Iniciar sesión' />
                </Link>
            </>
            <FooterSection />
        </div>
    );

}

export default Profesores;
