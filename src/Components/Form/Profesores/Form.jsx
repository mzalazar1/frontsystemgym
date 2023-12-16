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
  const [modNewProfesor, setModNewProfesor] = useState(false);
  const [modFallaProfesor, setModFallaProfesor] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const profesorHandler = async (profesor) => {
    setModNewProfesor(true);
    try {
      await dispatch(POST("profesores", profesor));
      setModNewProfesor(false);
      navigate("/profesores");
    } catch (error) {
      setModNewProfesor(false);
      setModFallaProfesor(true);
      setTimeout(() => {
        setModNewProfesor(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmProfesor}>
      {modNewProfesor ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoProfesor"
          path="profesores"
        />
      ) : (
        <div></div>
      )}
      {modFallaProfesor ? (
        <Modal texto="Falló al cargar el nuevo profesor" tipo="nuevoProfesor" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(profesorHandler)}>

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
        <Boton tipo="profesorABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;