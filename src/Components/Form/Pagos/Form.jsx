import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { POST } from "../../../redux/main.actions";
import SocInput from "../../SharedComponents/Input";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";
import Modal from "../../Modal/Modal";

const Formulario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modNewPago, setModNewPago] = useState(false);
  const [modFallaPago, setModFallaPago] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const pagoHandler = async (pago) => {
    setModNewPago(true);
    try {
      await dispatch(POST("pagos", pago));
      setModNewPago(false);
      navigate("/pagos");
    } catch (error) {
      setModNewPago(false);
      setModFallaPago(true);
      setTimeout(() => {
        setModNewPago(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmPago}>
      {modNewPago ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoPago"
          path="pagos"
        />
      ) : (
        <div></div>
      )}
      {modFallaPago ? (
        <Modal texto="Falló al cargar el nuevo pago" tipo="nuevoPago" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(pagoHandler)}>
        <div>
          <label>Id: </label>
          <SocInput
            register={register}
            type="text"
            placeholder="id"
            name="id"
            rules={{
              required: "ingrese número de ID",
            }}
          />
          {errors.id && (
            <span className={styles.claseError}>{errors.id.message}</span>
          )}
        </div>
        <div>
          <label>Fecha: </label>
          <SocInput
            register={register}
            type="text"
            placeholder="fecha"
            name="fecha"
            rules={{
              required: "ingrese Fecha",
            }}
          />
          {errors.fecha && (
            <span className={styles.claseError}>{errors.fecha.message}</span>
          )}
        </div>
        <div>
          <label>Importe: </label>
          <SocInput
            register={register}
            type="number"
            placeholder="importe"
            name="importe"
            rules={{
              required: "ingrese importe",
            }}
          />
          {errors.importe && (
            <span className={styles.claseError}>{errors.importe.message}</span>
          )}
        </div>
        <div>
          <label>Metodo: </label>
          <SocInput
            register={register}
            type="text"
            placeholder="metodo"
            name="metodo"
            rules={{
              required: "ingrese metodo",
            }}
          />
          {errors.metodo && (
            <span className={styles.claseError}>{errors.metodo.message}</span>
          )}
        </div>

        <Boton tipo="pagoABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;
