import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditLog = () => {
    const logs = useSelector((state) => state.logs);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedLog, setSelectedLog] = useState(null);
    const [modEditLog, setModEditLog] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditLog(true);
        try {
            await dispatch(PUT("logs", data)); // para el PUT enviamos el ID
            setModEditLog(false);
            navigate("/logs");
        } catch (error) {
            setModEditLog(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/logs");
    };

    useEffect(() => {
        const logDetail = logs.filter((log) => log.id === +currentId.id);
        setSelectedLog(logDetail[0]);
    }, [currentId, logs]);

    return (
        <div className={styles.frmLog}>
            {modEditLog && (
                <Modal
                    id={selectedLog?.id}
                    path={"logs"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoLog"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedLog?.id}
                    path={"logs"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoLog"
                />
            )}
            {selectedLog != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Id: </label>
                        <input
                            {...register("id")}
                            value={selectedLog?.id}
                            type="number"
                        />
                    </div>
                    <div>
                        <label>Dni: </label>

                        <input {...register("dni")} defaultValue={selectedLog?.dni} />
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input {...register("name")} defaultValue={selectedLog?.name} />
                    </div>
                    <div>
                        <label>Apellido: </label>
                        <input
                            {...register("lastname")}
                            defaultValue={selectedLog?.lastname}
                        />
                    </div>
                    <div>
                        <label>Telefono: </label>
                        <input {...register("tel")} defaultValue={selectedLog?.tel} />
                    </div>
                    <div>
                        <label>Mail: </label>
                        <input {...register("mail")} defaultValue={selectedLog?.mail} />
                    </div>
                    <div>
                        <label>Fecha de nacimiento: </label>
                        <input
                            {...register("fechaNac")}
                            defaultValue={selectedLog?.fechaNac}
                        />
                    </div>
                    <Boton tipo="logABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditLog;