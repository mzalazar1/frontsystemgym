import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditMetodoPago = () => {
    const metodosPago = useSelector((state) => state.metodospagos);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedMetodoPago, setSelectedMetodoPago] = useState(null);
    const [modEditMetodoPago, setModEditMetodoPago] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        data._id = currentId.id;

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
        navigate("/metodospagos");
    };

    useEffect(() => {
        const metodoPagoDetail = metodosPago.filter((metodoPago) => metodoPago._id === currentId.id);
        setSelectedMetodoPago(metodoPagoDetail[0]);
    }, [currentId, metodosPago]);

    return (
        <div className={styles.frmMetodoPago}>
            {modEditMetodoPago && (
                <Modal
                    id={selectedMetodoPago?._id}
                    path={"metodosPago"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoMetodoPago"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedMetodoPago?._id}
                    path={"metodosPago"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoMetodoPago"
                />
            )}
            {selectedMetodoPago != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Tipo: </label>

                        <input {...register("tipo")} defaultValue={selectedMetodoPago?.tipo} />
                    </div>

                    <Boton tipo="metodoPagoABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditMetodoPago;