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
  const [modNewSocio, setModNewSocio] = useState(false);
  const [modFallaSocio, setModFallaSocio] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const socioHandler = async (socio) => {
    console.log("🚀 ~ file: Form.jsx:36 ~ socioHandler ~ socio:", socio);
    setModNewSocio(true);
    try {
      await dispatch(POST("socios", socio));
      setModNewSocio(false);
      navigate("/socios");
    } catch (error) {
      setModNewSocio(false);
      setModFallaSocio(true);
      setTimeout(() => {
        setModNewSocio(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmSocio}>
      {modNewSocio ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoSocio"
          path="socios"
        />
      ) : (
        <div></div>
      )}
      {modFallaSocio ? (
        <Modal texto="Falló al cargar el nuevo socio" tipo="nuevoSocio" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(socioHandler)}>
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
        <Boton tipo="socioABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;
