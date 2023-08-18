import React from 'react';
import styles from './Header.module.css';
import { Link } from "react-router-dom";

const HeaderSection = () => {
    return (
        <div className={styles.cabecera}>
            <p className={styles.titulo}>Aplicación Final MCGA - CRUD de productos</p>
            <div className={styles.navegacion}>
            <Link to="/">
              Home
            </Link>
            <Link to="/productos">
              Productos
            </Link>
            <Link to="/login">
              Perfil
            </Link>
            </div>
        </div>
    );
}

export default React.memo(HeaderSection);