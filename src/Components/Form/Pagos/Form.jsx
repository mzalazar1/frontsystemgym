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
    const [modNewPago, setModNewPago] = useState(false);
    const [modFallaPago, setModFallaPago] = useState(false);
    const [selectedPago] = useState(null);
    const { metodospagos } = useSelector((state) => state); // traigo todo el state

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const pagoHandler = async (pago) => {
        setModNewPago(true);
        try {
            await dispatch(POST("pagos", pago));
            setModNewPago(false);
            navigate("/pagos");
        } catch (error) {
            setModNewPago(false);
            setModFallaPago(true);
            setTimeout(() => {
                setModNewPago(false);
            }, 2000);
        }
    };

    return (
        <div className={styles.frmPago}>
            {modNewPago ? (
                <Modal
                    texto="Se estan enviando los datos"
                    tipo="nuevoPago"
                    path="pagos"
                />
            ) : (
                <div></div>
            )}
            {modFallaPago ? (
                <Modal texto="Falló al cargar el nuevo pago" tipo="nuevoPago" />
            ) : (
                <div></div>
            )}
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(pagoHandler)}>

                <div>
                    <label>Fecha: </label>
                    <input {...register("fecha")} />
                    {errors.fecha && (
                        <span className={styles.claseError}>{errors.fecha.message}</span>
                    )}
                </div>
                <div>
                    <label>Importe: </label>
                    <input {...register("importe")} />
                    {errors.importe && (
                        <span className={styles.claseError}>{errors.importe.message}</span>
                    )}
                </div>
                <div>
                    <label>Metodo de Pago: </label>
                    <select {...register("metodopago")} defaultValue={selectedPago?.metodopago}>

                        <option value="">Seleccionar Metodo de Pago</option>

                        {metodospagos.map(metodopago => {
                            return <option value={metodopago.tipo}>{metodopago.tipo}</option>
                        })}
                    </select>
                </div>

                <Boton tipo="pagoABM" texto="Enviar" />
            </form>
        </div>
    );
};

export default Formulario;