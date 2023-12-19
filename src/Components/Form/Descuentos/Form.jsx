import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";
import Modal from "../../Modal/Modal";

const Formulario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modNewDescuento, setModNewDescuento] = useState(false);
  const [modFallaDescuento, setModFallaDescuento] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const descuentoHandler = async (data) => {
    setModNewDescuento(true);
    try {
      await dispatch(POST("descuentos", data));
      setModNewDescuento(false);
      navigate("/descuentos");
    } catch (error) {
      setModNewDescuento(false);
      setModFallaDescuento(true);
      setTimeout(() => {
        setModNewDescuento(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmDescuento}>
      {modNewDescuento ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoDescuento"
          path="descuentos"
        />
      ) : (
        <div></div>
      )}
      {modFallaDescuento ? (
        <Modal
          texto="Falló al cargar el nuevo descuento"
          tipo="nuevoDescuento"
        />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(descuentoHandler)}>
        <div>
          <label>Descripción: </label>
          <input {...register("descripcion")} />
          {errors.descripcion && (
            <span className={styles.claseError}>
              {errors.descripcion.message}
            </span>
          )}
        </div>
        <div>
          <label>Porcentaje: </label>
          <input
            {...register("porcentaje", {
              valueAsNumber: true,
            })}
          />
          {errors.porcentaje && (
            <span className={styles.claseError}>
              {errors.porcentaje.message}
            </span>
          )}
        </div>

        <Boton tipo="descuentoABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;
