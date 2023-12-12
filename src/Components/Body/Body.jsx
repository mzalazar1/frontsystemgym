import React, { useState } from "react";
import styles from "./Body.module.css";
import { useForm } from "react-hook-form";
import { CHECK_DNI } from "./../../redux/main.actions";
import { useDispatch, useSelector } from "react-redux";

const BodySection = () => {
  const { register, handleSubmit } = useForm(); // Asegúrate de usar useForm para obtener estas funciones
  // const [modNewAccesoSocio, setModNewAccesoSocio] = useState()
  const dispatch = useDispatch();
  const [acceso, setAcceso] = useState(null);

  const onSubmit = async (data) => {
    // setModNewAccesoSocio(true);
    try {
      const respuesta = await dispatch(CHECK_DNI("accesosocio", data)); // nose si se mezclara con otra cosa con el "/" sino le puedo poner /accesosocio
      setAcceso(respuesta);
      // setModNewAccesoSocio(false)
      // setModNewAccesoSocio(false)
      // setModFallaAccesoSocio(true)
      setTimeout(() => {
        // setModNewAccesoSocio(false)
      }, 2000);
    } catch (error) {
      console.log("🚀 ~ file: Body.jsx:28 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <div className={styles.cuerpo}>
      <h1 className={styles.h1}>SYSTEMGYM</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>DNI:</label>
          <input
            type="text"
            {...register("socio")} // Registra el campo en RHF
            placeholder="Ingrese su DNI"
          />
        </div>
        <button type="submit" className={styles.redButton}>
          Enviar
        </button>
      </form>

      {acceso === true && <h1>ACCESO AUTORIZADO</h1>}
      {acceso === false && <h1>ACCESO DENEGADO</h1>}
      {acceso === "not found" && <h1>DNI NO ENCONTRADO</h1>}

      <h2 className={styles.h2}>
        Esta aplicación fue desarrollada por Marcos Zalazar y Pablo Toledo para
        rendir el final de la materia MCGA en Agosto del 2023
      </h2>
      <p className={styles.texto}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim officiis
        ducimus eaque in dolores quam. Quos quis labore quia. Mollitia deleniti
        fugit quo quae necessitatibus quam animi odit maxime soluta.
      </p>
    </div>
  );
};

export default React.memo(BodySection);
