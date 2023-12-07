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
  const [modNewRol, setModNewRol] = useState(false);
  const [modFallaRol, setModFallaRol] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const rolHandler = async (rol) => {
    console.log("🚀 ~ file: Form.jsx:36 ~ rolHandler ~ rol:", rol);
    setModNewRol(true);
    try {
      await dispatch(POST("roles", rol));
      setModNewRol(false);
      navigate("/roles");
    } catch (error) {
      setModNewRol(false);
      setModFallaRol(true);
      setTimeout(() => {
        setModNewRol(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmRol}>
      {modNewRol ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoRol"
          path="roles"
        />
      ) : (
        <div></div>
      )}
      {modFallaRol ? (
        <Modal texto="Falló al cargar el nuevo rol" tipo="nuevoRol" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(rolHandler)}>
        <div>
          <label>Id: </label>
          <input {...register("id")} />
          {errors.id && (
            <span className={styles.claseError}>{errors.id.message}</span>
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
          <label>Rol: </label>
          <input {...register("rol")} />
          {errors.rol && (
            <span className={styles.claseError}>{errors.rol.message}</span>
          )}
        </div>

        <Boton tipo="rolABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;