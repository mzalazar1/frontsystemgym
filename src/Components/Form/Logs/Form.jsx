import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { POST } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";
import Modal from "../../Modal/Modal";

const Formulario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modNewLog, setModNewLog] = useState(false);
  const [modFallaLog, setModFallaLog] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const logHandler = async (log) => {
    setModNewLog(true);
    try {
      await dispatch(POST("logs", log));
      setModNewLog(false);
      navigate("/logs");
    } catch (error) {
      setModNewLog(false);
      setModFallaLog(true);
      setTimeout(() => {
        setModNewLog(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmLog}>
      {modNewLog ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoLog"
          path="logs"
        />
      ) : (
        <div></div>
      )}
      {modFallaLog ? (
        <Modal texto="Falló al cargar el nuevo log" tipo="nuevoLog" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(logHandler)}>

        <div>
          <label>Acción: </label>
          <input {...register("accion")} />
          {errors.accion && (
            <span className={styles.claseError}>{errors.accion.message}</span>
          )}
        </div>
        <div>
          <label>Usuario: </label>
          <input {...register("usuario")} />
          {errors.usuario && (
            <span className={styles.claseError}>{errors.usuario.message}</span>
          )}
        </div>
        <div>
          <label>Fecha: </label>
          <input {...register("fecha")} />
          {errors.fecha && (
            <span className={styles.claseError}>{errors.fecha.message}</span>
          )}
        </div>
        <div>
          <label>Hora: </label>
          <input {...register("hora")} />
          {errors.hora && (
            <span className={styles.claseError}>{errors.hora.message}</span>
          )}
        </div>

        <Boton tipo="logABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;