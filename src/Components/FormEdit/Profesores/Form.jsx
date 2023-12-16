import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditProfesor = () => {
    const profesores = useSelector((state) => state.profesores);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [modEditProfesor, setModEditProfesor] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditProfesor(true);
        try {
            await dispatch(PUT("profesores", data)); // para el PUT enviamos el ID
            setModEditProfesor(false);
            navigate("/profesores");
        } catch (error) {
            setModEditProfesor(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/profesores");
    };

    useEffect(() => {
        const profesorDetail = profesores.filter((profesor) => profesor._id === currentId.id);
        setSelectedProfesor(profesorDetail[0]);
    }, [currentId, profesores]);

    return (
        <div className={styles.frmProfesor}>
            {modEditProfesor && (
                <Modal
                    id={selectedProfesor?._id}
                    path={"profesores"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoProfesor"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedProfesor?._id}
                    path={"profesores"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoProfesor"
                />
            )}
            {selectedProfesor != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Dni: </label>

                        <input {...register("dni")} defaultValue={selectedProfesor?.dni} />
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input {...register("name")} defaultValue={selectedProfesor?.name} />
                    </div>
                    <div>
                        <label>Apellido: </label>
                        <input
                            {...register("lastname")}
                            defaultValue={selectedProfesor?.lastname}
                        />
                    </div>
                    <div>
                        <label>Telefono: </label>
                        <input {...register("tel")} defaultValue={selectedProfesor?.tel} />
                    </div>
                    <div>
                        <label>Mail: </label>
                        <input {...register("mail")} defaultValue={selectedProfesor?.mail} />
                    </div>
                    <div>
                        <label>Fecha de nacimiento: </label>
                        <input
                            {...register("fechaNac")}
                            defaultValue={selectedProfesor?.fechaNac}
                        />
                    </div>
                    <Boton tipo="profesorABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditProfesor;