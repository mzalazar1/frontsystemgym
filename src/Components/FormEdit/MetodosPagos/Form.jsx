import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditMetodoPago = () => {
    const metodosPago = useSelector((state) => state.metodosPago);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
    const [modEditMetodoPago, setModEditMetodoPago] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditMetodoPago(true);
        try {
            await dispatch(PUT("metodospagos", data)); // para el PUT enviamos el ID
            setModEditMetodoPago(false);
            navigate("/metodospagos");
        } catch (error) {
            setModEditMetodoPago(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/metodosPago");
    };

    useEffect(() => {
        const metodoPagoDetail = metodosPago.filter((metodoPago) => metodoPago.id === +currentId.id);
        setSelectedMetodoPago(metodoPagoDetail[0]);
    }, [currentId, metodosPago]);

    return (
        <div className={styles.frmMetodoPago}>
            {modEditMetodoPago && (
                <Modal
                    id={selectedMetodoPago?.id}
                    path={"metodosPago"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoMetodoPago"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedMetodoPago?.id}
                    path={"metodosPago"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoMetodoPago"
                />
            )}
            {selectedMetodoPago != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Id: </label>
                        <input
                            {...register("id")}
                            value={selectedMetodoPago?.id}
                            type="number"
                        />
                    </div>
                    <div>
                        <label>Dni: </label>

                        <input {...register("dni")} defaultValue={selectedMetodoPago?.dni} />
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input {...register("name")} defaultValue={selectedMetodoPago?.name} />
                    </div>
                    <div>
                        <label>Apellido: </label>
                        <input
                            {...register("lastname")}
                            defaultValue={selectedMetodoPago?.lastname}
                        />
                    </div>
                    <div>
                        <label>Telefono: </label>
                        <input {...register("tel")} defaultValue={selectedMetodoPago?.tel} />
                    </div>
                    <div>
                        <label>Mail: </label>
                        <input {...register("mail")} defaultValue={selectedMetodoPago?.mail} />
                    </div>
                    <div>
                        <label>Fecha de nacimiento: </label>
                        <input
                            {...register("fechaNac")}
                            defaultValue={selectedMetodoPago?.fechaNac}
                        />
                    </div>
                    <Boton tipo="metodoPagoABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditMetodoPago;