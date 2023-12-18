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
    const [modNewActividad, setModNewActividad] = useState(false);
    const [modFallaActividad, setModFallaActividad] = useState(false);
    const [selectedActividad] = useState(null);

    const { profesores } = useSelector((state) => state); // traigo todo el state
    console.log("🚀 ~ file: Form.jsx:18 ~ Formulario ~ actividades:", profesores);
    console.log("🚀 ~ file: Form.jsx:19 ~ Formulario ~ actividades: acaaaaa", profesores._id);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const actividadHandler = async (data) => {
        setModNewActividad(true);
        try {
            await dispatch(POST("actividades", data));
            setModNewActividad(false);
            navigate("/actividades");
        } catch (error) {
            setModNewActividad(false);
            setModFallaActividad(true);
            setTimeout(() => {
                setModNewActividad(false);
            }, 2000);
        }
    };

    return (
        <div className={styles.frmActividad}>
            {modNewActividad ? (
                <Modal
                    texto="Se estan enviando los datos"
                    tipo="nuevoActividad"
                    path="actividades"
                />
            ) : (
                <div></div>
            )}
            {modFallaActividad ? (
                <Modal texto="Falló al cargar el nuevo actividad" tipo="nuevoActividad" />
            ) : (
                <div></div>
            )}
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(actividadHandler)}>
                <div>
                    <label>Nombre: </label>
                    <input {...register("nombre")} />
                    {errors.nombre && (
                        <span className={styles.claseError}>{errors.nombre.message}</span>
                    )}
                </div>
                <div>
                    <label>Horarios: </label>
                    <input {...register("horarios")} />
                    {errors.horarios && (
                        <span className={styles.claseError}>{errors.horarios.message}</span>
                    )}
                </div>
                <div>
                    <label>Profesor: </label>
                    <select {...register("profesor")} defaultValue={selectedActividad?.profesor}>

                        <option value="">Seleccionar Profesor</option>

                        {profesores.map(profesor => {
                            console.log("🚀 ~ file: Form.jsx:83 ~ Formulario ~ profesores.nombre:", profesor.name)
                            console.log("Valor de profesor._id: ultima linea", profesor._id); // Agregar este console.log
                            return <option key={profesor._id} value={profesor.name}>{profesor.name}</option>
                        })}
                    </select>
                </div>

                <Boton tipo="actividadABM" texto="Enviar" />
            </form>
        </div>
    );
};

export default Formulario;