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
    const [selectedActividad, setSelectedActividad] = useState(null);

    const { socios, actividades, profesores, tiposcuota, valorescuota, pagos, metodospagos } = useSelector((state) => state); // traigo todo el state

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const actividadHandler = async (actividad) => {
        setModNewActividad(true);
        try {
            await dispatch(POST("actividades", actividad));
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
                    <label>Id: </label>
                    <input {...register("id")} />
                    {errors.id && (
                        <span className={styles.claseError}>{errors.id.message}</span>
                    )}
                </div>
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
                    <select {...register("actividad")} defaultValue={selectedActividad?.actividad}>

                        <option value="">Seleccionar Profesor</option>

                        {actividades.map(actividad => {
                            return <option value={actividad.id}>{actividad.profesor}</option>
                        })}
                    </select>
                </div>

                <Boton tipo="actividadABM" texto="Enviar" />
            </form>
        </div>
    );
};

export default Formulario;