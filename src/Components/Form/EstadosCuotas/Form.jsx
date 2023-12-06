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
    const [modNewEstadoCuota, setModNewEstadoCuota] = useState(false)
    const [modFallaEstadoCuota, setModFallaEstadoCuota] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const estadoCuotaHandler = async (estadoCuota) => {
        setModNewEstadoCuota(true);
        try {
            await dispatch(POST((estadoCuota), 'estadocuota'));
            setModNewEstadoCuota(false)
            navigate('/estadocuota');
        } catch (error) {
            setModNewEstadoCuota(false)
            setModFallaEstadoCuota(true)
            setTimeout(() => {
                setModNewEstadoCuota(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmEstadoCuota}>
            {
                modNewEstadoCuota ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoEstadoCuota'
                        path='estadocuota' /> : <div></div>
            }
            {
                modFallaEstadoCuota ?
                    <Modal
                        texto='Falló al cargar el nuevo estado de cuota'
                        tipo='nuevoEstadoCuota' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(estadoCuotaHandler)}>
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
                    <label>Estado Actual </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="estadoActual"
                        name="estadoActual"
                        rules={{
                            required: 'ingrese estado Actual'
                        }}
                    />
                    {errors.estadoActual && <span className={styles.claseError}>{errors.estadoActual.message}</span>}
                </div>

                <Boton
                    tipo='estadoCuotaABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
