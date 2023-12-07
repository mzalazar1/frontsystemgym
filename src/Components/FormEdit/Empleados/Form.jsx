import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditEmpleado = () => {
    const empleados = useSelector((state) => state.socios);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [modEditEmpleado, setModEditEmpleado] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditEmpleado(true);
        try {
            await dispatch(PUT("empleados", data)); // para el PUT enviamos el ID
            setModEditEmpleado(false);
            navigate("/empleados");
        } catch (error) {
            setModEditEmpleado(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/empleados");
    };

    useEffect(() => {
        const empleadoDetail = empleados.filter((empleado) => empleado.id === +currentId.id);
        setSelectedEmpleado(empleadoDetail[0]);
    }, [currentId, empleados]);

    return (
        <div className={styles.frmEmpleado}>
            {modEditEmpleado && (
                <Modal
                    id={selectedEmpleado?.id}
                    path={"empleados"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoEmpleado"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedEmpleado?.id}
                    path={"empleados"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoEmpleado"
                />
            )}
            {selectedEmpleado != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Id: </label>
                        <input
                            {...register("id")}
                            value={selectedEmpleado?.id}
                            type="number"
                        />
                    </div>
                    <div>
                        <label>Dni: </label>

                        <input {...register("dni")} defaultValue={selectedEmpleado?.dni} />
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input {...register("name")} defaultValue={selectedEmpleado?.name} />
                    </div>
                    <div>
                        <label>Apellido: </label>
                        <input
                            {...register("lastname")}
                            defaultValue={selectedEmpleado?.lastname}
                        />
                    </div>
                    <div>
                        <label>Mail: </label>
                        <input {...register("mail")} defaultValue={selectedEmpleado?.mail} />
                    </div>
                    <div>
                        <label>Fecha de nacimiento: </label>
                        <input
                            {...register("fechaNac")}
                            defaultValue={selectedEmpleado?.fechaNac}
                        />
                    </div>
                    <div>
                        <label>Rol: </label>
                        <input
                            {...register("rol")}
                            defaultValue={selectedEmpleado?.rol}
                        />
                    </div>
                    <Boton tipo="empleadoABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditEmpleado;