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
  const [modNewEstadoCuota, setModNewEstadoCuota] = useState(false);
  const [modFallaEstadoCuota, setModFallaEstadoCuota] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const estadoCuotaHandler = async (estadoCuota) => {
    setModNewEstadoCuota(true);
    try {
      await dispatch(POST("estadoCuotas", estadoCuota));
      setModNewEstadoCuota(false);
      navigate("/estadoCuotas");
    } catch (error) {
      setModNewEstadoCuota(false);
      setModFallaEstadoCuota(true);
      setTimeout(() => {
        setModNewEstadoCuota(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmEstadoCuota}>
      {modNewEstadoCuota ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoEstadoCuota"
          path="estadoCuotas"
        />
      ) : (
        <div></div>
      )}
      {modFallaEstadoCuota ? (
        <Modal texto="Falló al cargar el nuevo estadoCuota" tipo="nuevoEstadoCuota" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(estadoCuotaHandler)}>
        <div>
          <label>Id: </label>
          <input {...register("id")} />
          {errors.id && (
            <span className={styles.claseError}>{errors.id.message}</span>
          )}
        </div>
        <div>
          <label>Dni: </label>
          <input {...register("dni")} />
          {errors.dni && (
            <span className={styles.claseError}>{errors.dni.message}</span>
          )}
        </div>
        <div>
          <label>Nombre: </label>
          <input {...register("name")} />
          {errors.name && (
            <span className={styles.claseError}>{errors.name.message}</span>
          )}
        </div>
        <div>
          <label>Apellido: </label>
          <input {...register("lastname")} />
          {errors.lastname && (
            <span className={styles.claseError}>{errors.lastname.message}</span>
          )}
        </div>
        <div>
          <label>Telefono: </label>
          <input {...register("tel")} />
          {errors.tel && (
            <span className={styles.claseError}>{errors.tel.message}</span>
          )}
        </div>
        <div>
          <label>Mail: </label>
          <input {...register("mail")} />
          {errors.mail && (
            <span className={styles.claseError}>{errors.mail.message}</span>
          )}
        </div>
        <div>
          <label>Fecha de nacimiento: </label>
          <input {...register("fechaNac")} />
          {errors.fechaNac && (
            <span className={styles.claseError}>{errors.fechaNac.message}</span>
          )}
        </div>
        <Boton tipo="estadoCuotaABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;