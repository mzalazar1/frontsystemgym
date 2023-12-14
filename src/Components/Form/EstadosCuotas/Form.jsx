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
      await dispatch(POST("estadoscuotas", estadoCuota));
      setModNewEstadoCuota(false);
      navigate("/estadoscuotas");
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
          path="estadoscuotas"
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
          <label>Estado Actual: </label>
          <input {...register("estado")} />
          {errors.estado && (
            <span className={styles.claseError}>{errors.estado.message}</span>
          )}
        </div>

        <Boton tipo="estadoCuotaABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;