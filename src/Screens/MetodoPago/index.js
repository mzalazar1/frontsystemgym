import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderSection from '../../Components/Header/Header';
import FooterSection from '../../Components/Footer/Footer';
import Boton from "../../Components/SharedComponents/Boton";
import styles from './Index.module.css'
import Tabla from '../../Components/Table/table'

import firebaseAapp from "../../Firebase/credenciales";
import { getAuth } from "firebase/auth"

const auth = getAuth(firebaseAapp)

const MetodoPago = () => {
    const [globalFilter, setGlobalFilter] = useState('')
    console.log("🚀 ~ file: index.js:16 ~ Cuotas ~ globalFilter:", globalFilter)
    console.log("🚀 ~ file: index.js:17 ~ Cuotas ~ setGlobalFilter:", setGlobalFilter)

    return (
        <div>
            <HeaderSection />
            {auth.currentUser != null ?
                <>
                    <div>
                        <label>Busqueda:</label>
                        <input
                            type="text"
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar..."
                        />
                    </div>
                    <div className={styles.botmetodoPago}>
                        <Link to="/addmetodoPago">
                            <Boton
                                tipo='metodoPagoABM'
                                texto='Agregar metodo Pago' />
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.thDatos}>Tipo</th>
                                <th className={styles.thDatos}>Acciones</th>
                            </tr>
                        </thead>

                        <Tabla entidad="metodospagos" globalFilter={globalFilter} />

                    </table>

                </> :
                <>
                    <p>Debe iniciar sesión para ingresar a este menú</p>
                    <Link to="/login">
                        <Boton
                            tipo='editMetodoPago'
                            texto='Iniciar sesión' />
                    </Link>
                </>
            }
            <FooterSection />
        </div>
    );

}

export default MetodoPago;
