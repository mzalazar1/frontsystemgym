import React from "react";
import { Link } from "react-router-dom";
import HeaderSection from '../../Components/Header/Header';
import FooterSection from '../../Components/Footer/Footer';
import Boton from "../../Components/SharedComponents/Boton";
import styles from './Index.module.css'
import Tabla from '../../Components/Table/table'
import TablaCabecera from '../../Components/Table/tableHead'

import firebaseAapp from "../../Firebase/credenciales";
import { getAuth } from "firebase/auth"

const auth = getAuth(firebaseAapp)

const Productos = () => {

    return (
        <div> 
        <HeaderSection />
        {auth.currentUser != null ? 
        <>
            <div className={styles.botProd}>
                <Link to="/addproduct">
                    <Boton 
                        tipo='prodABM'
                        texto='Agregar producto' />
                </Link>
            </div>
            <TablaCabecera />
            <Tabla />
        </> : 
        <>
            <p>Debe iniciar sesión para ingresar a este menú</p>
            <Link to="/login">
                <Boton 
                    tipo='editProd'
                    texto='Iniciar sesión' />
            </Link>
        </>
        }
        <FooterSection />
        </div>    
    );
}

export default Productos;
