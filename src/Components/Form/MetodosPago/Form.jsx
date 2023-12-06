import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { POST } from "../../../redux/main.actions";
import SocInput from "../../SharedComponents/Input";
import Boton from "../../SharedComponents/Boton";
import styles from './Form.module.css';
import Modal from "../../Modal/Modal";

const Formulario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [modNewmetodoPago, setModNewmetodoPago] = useState(false)
    const [modFallametodoPago, setModFallametodoPago] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const metodopagoHandler = async (metodopago) => {
        setModNewmetodoPago(true);
        try {
            await dispatch(POST((metodopago), 'metodospagos'));
            setModNewmetodoPago(false)
            navigate('/metodospagos');
        } catch (error) {
            setModNewmetodoPago(false)
            setModFallametodoPago(true)
            setTimeout(() => {
                setModNewmetodoPago(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmmetodoPago}>
            {
                modNewmetodoPago ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevometodoPago'
                        path='metodospagos' /> : <div></div>
            }
            {
                modFallametodoPago ?
                    <Modal
                        texto='Falló al cargar el nuevo metodo de pago'
                        tipo='nuevometodoPago' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(metodopagoHandler)}>
                <div>
                    <label>Id: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="id"
                        name="id"
                        rules={{
                            required: 'ingrese número de ID'
                        }}
                    />
                    {errors.id && <span className={styles.claseError}>{errors.id.message}</span>}
                </div>
                <div>
                    <label>Tipo: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="tipo"
                        name="tipo"
                        rules={{
                            required: 'ingrese tipo'
                        }}
                    />
                    {errors.tipo && <span className={styles.claseError}>{errors.tipo.message}</span>}
                </div>

                <Boton
                    tipo='metodoPagoABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
