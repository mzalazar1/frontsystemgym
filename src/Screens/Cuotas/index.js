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

const Cuotas = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET("cuotas"));
    }, [dispatch])

    return (
        <div>
            <HeaderSection />
            {/* {auth.currentUser != null ? */}
            <>
                <div className={styles.botCuota}>
                    <Link to="/addcuota">
                        <Boton
                            tipo='socABM'
                            texto='Agregar cuota' />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.thDatos}>Id</th>
                            <th className={styles.thDatos}>Socio</th>
                            <th className={styles.thDatos}>Estado</th>
                            <th className={styles.thDatos}>Actividad</th>
                            <th className={styles.thDatos}>Fecha de pago</th>
                            <th className={styles.thDatos}>Tipo</th>
                            <th className={styles.thDatos}>Valor</th>
                            <th className={styles.thDatos}>Acciones</th>
                        </tr>
                    </thead>

                    <Tabla entidad="cuotas" />

                </table>

            </> :
            <>
                <p>Debe iniciar sesión para ingresar a este menú</p>
                <Link to="/login">
                    <Boton
                        tipo='editCuota'
                        texto='Iniciar sesión' />
                </Link>
            </>
            <FooterSection />
        </div>
    );

}

export default Cuotas;
