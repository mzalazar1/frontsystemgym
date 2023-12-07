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
    const [modNewEmpleado, setModNewEmpleado] = useState(false);
    const [modFallaEmpleado, setModFallaEmpleado] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const empleadoHandler = async (empleado) => {
        console.log("🚀 ~ file: Form.jsx:36 ~ empleadoHandler ~ empleado:", empleado);
        setModNewEmpleado(true);
        try {
            await dispatch(POST("empleados", empleado));
            setModNewEmpleado(false);
            navigate("/empleados");
        } catch (error) {
            setModNewEmpleado(false);
            setModFallaEmpleado(true);
            setTimeout(() => {
                setModNewEmpleado(false);
            }, 2000);
        }
    };

    return (
        <div className={styles.frmEmpleado}>
            {modNewEmpleado ? (
                <Modal
                    texto="Se estan enviando los datos"
                    tipo="nuevoEmpleado"
                    path="empleados"
                />
            ) : (
                <div></div>
            )}
            {modFallaEmpleado ? (
                <Modal texto="Falló al cargar el nuevo empleado" tipo="nuevoEmpleado" />
            ) : (
                <div></div>
            )}
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(empleadoHandler)}>
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
                <div>
                    <label>Rol: </label>
                    <input {...register("rol")} />
                    {errors.rol && (
                        <span className={styles.claseError}>{errors.rol.message}</span>
                    )}
                </div>

                <Boton tipo="empleadoABM" texto="Enviar" />
            </form>
        </div>
    );
};

export default Formulario;