import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditActividad = () => {
    const { actividades, profesores } = useSelector((state) => state); // traigo el state
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedActividad, setSelectedActividad] = useState(null);
    const [modEditActividad, setModEditActividad] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    console.log("🚀 ~ file: Form.jsx:13 ~ EditActividad ~ actividades:miraaa primero", actividades._id)


    console.log("🚀 ~ file: Form.jsx:16 ~ EditActividad ~ currentId MIRAAA:", currentId.id)


    const onSubmitHandler = async (data) => {
        setModEditActividad(true);
        try {
            await dispatch(PUT("actividades", data)); // para el PUT enviamos el ID
            setModEditActividad(false);
            navigate("/actividades");
        } catch (error) {
            setModEditActividad(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/actividades");
    };

    useEffect(() => {
        const actividadDetail = actividades.filter((actividad) => actividad._id === currentId.id);
        console.log("🚀 ~ file: Form.jsx:39 ~ useEffect ~ currentId._id: miaaa tambien", currentId.id)
        setSelectedActividad(actividadDetail[0]);
    }, [currentId, actividades]);

    return (
        <div className={styles.frmActividad}>
            {modEditActividad && (
                <Modal
                    id={selectedActividad?._id}
                    path={"actividades"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoActividad"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedActividad?._id}
                    path={"actividades"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoActividad"
                />
            )}
            {selectedActividad != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>
                    <div>
                        <label>Nombre: </label>

                        <input {...register("nombre")} defaultValue={selectedActividad?.nombre} />
                    </div>
                    <div>
                        <label>Horarios: </label>
                        <input {...register("horarios")} defaultValue={selectedActividad?.horarios} />
                    </div>
                    <div>
                        <label>Profesor: </label>
                        <select {...register("profesor")} defaultValue={selectedActividad?.profesor}>

                            <option value="">Seleccionar Profesor</option>

                            {profesores.map(profesor => {
                                return <option value={profesor.name}>{profesor.name}</option>
                            })}
                        </select>
                    </div>
                    <Boton tipo="actividadABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditActividad;