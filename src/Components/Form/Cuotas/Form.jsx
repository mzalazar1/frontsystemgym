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
    const [modNewCuota, setModNewCuota] = useState(false)
    const [modFallaCuota, setModFallaCuota] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const cuotaHandler = async (cuota) => {
        setModNewCuota(true);
        try {
            await dispatch(POST((cuota), 'cuotas'));
            setModNewCuota(false)
            navigate('/cuotas');
        } catch (error) {
            setModNewCuota(false)
            setModFallaCuota(true)
            setTimeout(() => {
                setModNewCuota(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmCuota}>
            {
                modNewCuota ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoCuota'
                        path='cuotas' /> : <div></div>
            }
            {
                modFallaCuota ?
                    <Modal
                        texto='Falló al cargar la nueva cuota'
                        tipo='nuevoCuota' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(cuotaHandler)}>
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
                    <label>Dni: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="dni"
                        name="dni"
                        rules={{
                            required: 'ingrese número de Dni'
                        }}
                    />
                    {errors.dni && <span className={styles.claseError}>{errors.dni.message}</span>}
                </div>
                <div>
                    <label>Socio: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="socio"
                        name="socio"
                        rules={{
                            required: 'ingrese socio'
                        }}
                    />
                    {errors.socio && <span className={styles.claseError}>{errors.socio.message}</span>}
                </div>
                <div>
                    <label>Estado: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="estado"
                        name="estado"
                        rules={{
                            required: 'ingrese estado'
                        }}
                    />
                    {errors.estado && <span className={styles.claseError}>{errors.estado.message}</span>}
                </div>
                <div>
                    <label>Actividad: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="actividad"
                        name="actividad"
                        rules={{
                            required: 'ingrese actividad'
                        }}
                    />
                    {errors.actividad && <span className={styles.claseError}>{errors.actividad.message}</span>}
                </div>
                <div>
                    <label>Fecha de pago: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="fecha de pago"
                        name="fechaPago"
                        rules={{
                            required: 'ingrese fecha de pago'
                        }}
                    />
                    {errors.fechaPago && <span className={styles.claseError}>{errors.fechaPago.message}</span>}
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
                <div>
                    <label>Valor: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="valor"
                        name="valor"
                        rules={{
                            required: 'ingrese valor'
                        }}
                    />
                    {errors.valor && <span className={styles.claseError}>{errors.valor.message}</span>}
                </div>
                <Boton
                    tipo='cuotaABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
