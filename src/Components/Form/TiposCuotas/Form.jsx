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
  const [modNewTipoCuota, setModNewTipoCuota] = useState(false);
  const [modFallaTipoCuota, setModFallaTipoCuota] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const tipoCuotaHandler = async (data) => {
    setModNewTipoCuota(true);
    try {
      await dispatch(POST("tiposcuota", data));
      setModNewTipoCuota(false);
      navigate("/tiposcuota");
    } catch (error) {
      setModNewTipoCuota(false);
      setModFallaTipoCuota(true);
      setTimeout(() => {
        setModNewTipoCuota(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmTipoCuota}>
      {modNewTipoCuota && (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoTipoCuota"
          path="tiposcuota"
        />
      )}
      {modFallaTipoCuota && (
        <Modal texto="Falló al cargar el nuevo socio" tipo="nuevoTipoCuota" />
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(tipoCuotaHandler)}>
        <div>
          <label>Id: </label>
          <input {...register("id")} />
          {errors.id && (
            <span className={styles.claseError}>{errors.id.message}</span>
          )}
        </div>
        <div>
          <label>Tipo: </label>
          <input {...register("tipo")} />
          {errors.tipo && (
            <span className={styles.claseError}>{errors.tipo.message}</span>
          )}
        </div>
        <div>
          <label>Importe: </label>
          <input {...register("importe")} />
          {errors.importe && (
            <span className={styles.claseError}>{errors.importe.message}</span>
          )}
        </div>

        <Boton tipo="tipoABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;