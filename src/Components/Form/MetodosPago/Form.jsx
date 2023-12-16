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
  const [modNewMetodoPago, setModNewMetodoPago] = useState(false);
  const [modFallaMetodoPago, setModFallaMetodoPago] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const metodoPagoHandler = async (metodoPago) => {
    setModNewMetodoPago(true);
    try {
      await dispatch(POST("metodospagos", metodoPago));
      setModNewMetodoPago(false);
      navigate("/metodospagos");
    } catch (error) {
      setModNewMetodoPago(false);
      setModFallaMetodoPago(true);
      setTimeout(() => {
        setModNewMetodoPago(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmMetodoPago}>
      {modNewMetodoPago ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoMetodoPago"
          path="metodospagos"
        />
      ) : (
        <div></div>
      )}
      {modFallaMetodoPago ? (
        <Modal texto="Falló al cargar el nuevo metodoPago" tipo="nuevoMetodoPago" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(metodoPagoHandler)}>
        <div>
          <label>Tipo: </label>
          <input {...register("tipo")} />
          {errors.tipo && (
            <span className={styles.claseError}>{errors.tipo.message}</span>
          )}
        </div>

        <Boton tipo="metodoPagoABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;