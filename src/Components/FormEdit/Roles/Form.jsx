import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditRol = () => {
    const roles = useSelector((state) => state.roles);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedRol, setSelectedRol] = useState(null);
    const [modEditRol, setModEditRol] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditRol(true);
        try {
            await dispatch(PUT("roles", data)); // para el PUT enviamos el ID
            setModEditRol(false);
            navigate("/roles");
        } catch (error) {
            setModEditRol(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/roles");
    };

    useEffect(() => {
        const rolDetail = roles.filter((rol) => rol.id === +currentId.id);
        setSelectedRol(rolDetail[0]);
    }, [currentId, roles]);

    return (
        <div className={styles.frmRol}>
            {modEditRol && (
                <Modal
                    id={selectedRol?.id}
                    path={"roles"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoRol"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedRol?.id}
                    path={"roles"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoRol"
                />
            )}
            {selectedRol != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Id: </label>
                        <input
                            {...register("id")}
                            value={selectedRol?.id}
                            type="number"
                        />
                    </div>
                    <div>
                        <label>Usuario: </label>

                        <input {...register("usuario")} defaultValue={selectedRol?.usuario} />
                    </div>
                    <div>
                        <label>Rol: </label>
                        <input {...register("rol")} defaultValue={selectedRol?.rol} />
                    </div>

                    <Boton tipo="rolABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditRol;