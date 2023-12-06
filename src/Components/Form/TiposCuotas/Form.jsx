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
    const [modNewValorCuota, setModNewValorCuota] = useState(false)
    const [modFallaValorCuota, setModFallaValorCuota] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const valoresCuotasHandler = async (valorCuota) => {
        setModNewValorCuota(true);
        try {
            await dispatch(POST((valorCuota), 'valorCuota'));
            setModNewValorCuota(false)
            navigate('/valorescuota');
        } catch (error) {
            setModNewValorCuota(false)
            setModFallaValorCuota(true)
            setTimeout(() => {
                setModNewValorCuota(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmValorCuota}>
            {
                modNewValorCuota ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoValorCuota'
                        path='valorescuota' /> : <div></div>
            }
            {
                modFallaValorCuota ?
                    <Modal
                        texto='Falló al cargar el nuevo empleado'
                        tipo='nuevoValorCuota' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(valoresCuotasHandler)}>
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
                    <label>Mes: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="mes"
                        name="mes"
                        rules={{
                            required: 'ingrese el mes'
                        }}
                    />
                    {errors.mes && <span className={styles.claseError}>{errors.mes.message}</span>}
                </div>
                <div>
                    <label>Importe: </label>
                    <SocInput
                        register={register}
                        type="number"
                        placeholder="importe"
                        name="importe"
                        rules={{
                            required: 'ingrese importe'
                        }}
                    />
                    {errors.importe && <span className={styles.claseError}>{errors.importe.message}</span>}
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
                    tipo='tipoABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
