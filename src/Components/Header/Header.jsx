import React from 'react';
import styles from './Header.module.css';
import { Link } from "react-router-dom";

const HeaderSection = () => {
  return (
    <div className={styles.cabecera}>
      <p className={styles.titulo}>Aplicación Final TC - TD SystemGym</p>
      <div className={styles.navegacion}>
        <Link to="/">
          Home
        </Link>
        <Link to="/socios">
          Socios
        </Link>
        <Link to="/pagos">
          Pagos
        </Link>
        <Link to="/login">
          Perfil
        </Link>
      </div>
    </div>
  );
}

export default React.memo(HeaderSection);