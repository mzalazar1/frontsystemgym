import React from "react";
import { Link } from "react-router-dom";
import HeaderSection from '../../Components/Header/Header';
import FooterSection from '../../Components/Footer/Footer';
import Boton from "../../Components/SharedComponents/Boton";
import styles from './Index.module.css'
import Tabla from '../../Components/Table/table'

import firebaseAapp from "../../Firebase/credenciales";
import { getAuth } from "firebase/auth"

const auth = getAuth(firebaseAapp)

const Rol = () => {
    return (
        <div>
            <HeaderSection />
            {auth.currentUser != null ?
                <>
                    <div className={styles.botRol}>
                        <Link to="/addrol">
                            <Boton
                                tipo='rolABM'
                                texto='Agregar rol' />
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.thDatos}>Id</th>
                                <th className={styles.thDatos}>Usuario</th>
                                <th className={styles.thDatos}>Rol</th>
                                <th className={styles.thDatos}>Acciones</th>
                            </tr>
                        </thead>

                        <Tabla entidad="roles" />

                    </table>

                </> :
                <>
                    <p>Debe iniciar sesión para ingresar a este menú</p>
                    <Link to="/login">
                        <Boton
                            tipo='editRoles'
                            texto='Iniciar sesión' />
                    </Link>
                </>
            }
            <FooterSection />
        </div>
    );

}

export default Rol;
