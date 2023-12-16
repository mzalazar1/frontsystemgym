import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditPago = () => {
    const pagos = useSelector((state) => state.pagos);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedPago, setSelectedPago] = useState(null);
    const [modEditPago, setModEditPago] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditPago(true);
        try {
            await dispatch(PUT("pagos", data)); // para el PUT enviamos el ID
            setModEditPago(false);
            navigate("/pagos");
        } catch (error) {
            setModEditPago(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/pagos");
    };

    useEffect(() => {
        const pagosDetail = pagos.filter((pagos) => pagos._id === currentId.id);
        setSelectedPago(pagosDetail[0]);
    }, [currentId, pagos]);

    return (
        <div className={styles.frmPago}>
            {modEditPago && (
                <Modal
                    id={selectedPago?._id}
                    path={"pagos"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoPago"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedPago?._id}
                    path={"pagos"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoPago"
                />
            )}
            {selectedPago != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Fecha: </label>

                        <input {...register("fecha")} defaultValue={selectedPago?.fecha} />
                    </div>
                    <div>
                        <label>Importe: </label>
                        <input {...register("importe")} defaultValue={selectedPago?.importe} />
                    </div>
                    <div>
                        <label>Metodo: </label>
                        <input
                            {...register("metodo")} defaultValue={selectedPago?.metodo} />
                    </div>

                    <Boton tipo="pagoABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditPago;