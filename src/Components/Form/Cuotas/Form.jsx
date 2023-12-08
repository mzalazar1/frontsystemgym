import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { POST } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from './Form.module.css';
import Modal from "../../Modal/Modal";

const Formulario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [modNewCuota, setModNewCuota] = useState(false)
    const [modFallaCuota, setModFallaCuota] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const cuotaHandler = async (data) => {
        console.log("🚀 ~ file: Form.jsx:19 ~ cuotaHandler ~ data:", data)
        setModNewCuota(true);
        try {
            await dispatch(POST("cuotas", data));
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
                    <input {...register("id")} />
                    {errors.id && (
                        <span className={styles.claseError}>{errors.id.message}</span>
                    )}
                </div>
                <div>
                    <label>Socio: </label>
                    <input {...register("socio")} />
                    {errors.socio && (
                        <span className={styles.claseError}>{errors.socio.message}</span>
                    )}
                </div>
                <div>
                    <label>Estado: </label>
                    <input {...register("estado")} />
                    {errors.estado && (
                        <span className={styles.claseError}>{errors.estado.message}</span>
                    )}
                </div>
                <div>
                    <label>Actividad: </label>
                    <input {...register("actividad")} />
                    {errors.actividad && (
                        <span className={styles.claseError}>{errors.actividad.message}</span>
                    )}
                </div>
                <div>
                    <label>Fecha de Pago: </label>
                    <input {...register("fechaPago")} />
                    {errors.fechaPago && (
                        <span className={styles.claseError}>{errors.fechaPago.message}</span>
                    )}
                </div>
                <div>
                    <label>Tipo: </label>
                    <input {...register("tipo")} />
                    {errors.tipo && (
                        <span className={styles.claseError}>{errors.tipo.message}</span>
                    )}
                </div>
                <div>
                    <label>Valor: </label>
                    <input {...register("valor", {
                        valueAsNumber: true,
                    })} />
                    {errors.valor && (
                        <span className={styles.claseError}>{errors.valor.message}</span>
                    )}
                </div>
                <Boton tipo="cuotaABM" texto="Enviar" />
            </form>
        </div>
    )
}

export default Formulario;
