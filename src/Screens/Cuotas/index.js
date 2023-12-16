import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderSection from "../../Components/Header/Header";
import FooterSection from "../../Components/Footer/Footer";
import Boton from "../../Components/SharedComponents/Boton";
import styles from "./Index.module.css";
import Tabla from "../../Components/Table/table";

import firebaseAapp from "../../Firebase/credenciales";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseAapp);

const Cuotas = () => {

  const [globalFilter, setGlobalFilter] = useState('')
  console.log("🚀 ~ file: index.js:16 ~ Cuotas ~ globalFilter:", globalFilter)
  console.log("🚀 ~ file: index.js:17 ~ Cuotas ~ setGlobalFilter:", setGlobalFilter)
  return (
    <div>
      <HeaderSection />
      {auth.currentUser != null ? (
        <>
          <div>
            <label>Busqueda:</label>
            <input
              type="text"
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Buscar..."
            />
          </div>
          <div className={styles.botCuota}>
            <Link to="/addcuota">
              <Boton tipo="cuotaABM" texto="Agregar cuota" />
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th className={styles.thDatos}>Id</th>
                <th className={styles.thDatos}>Socio</th>
                <th className={styles.thDatos}>Actividad</th>
                <th className={styles.thDatos}>Tipo</th>
                <th className={styles.thDatos}>Valor</th>
                <th className={styles.thDatos}>Descuento</th>
                <th className={styles.thDatos}>Fecha</th>
                <th className={styles.thDatos}>Acciones</th>
              </tr>
            </thead>

            <Tabla entidad="cuotas" globalFilter={globalFilter} />
          </table>
        </>
      ) : (
        <>
          <p>Debe iniciar sesión para ingresar a este menú</p>
          <Link to="/login">
            <Boton tipo="editCuota" texto="Iniciar sesión" />
          </Link>
        </>
      )}
      <FooterSection />
    </div>
  );
};

export default Cuotas;
