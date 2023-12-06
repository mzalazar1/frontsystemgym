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
    const [modNewActividad, setModNewActividad] = useState(false)
    const [modFallaActividad, setModFallaActividad] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const cuotaHandler = async (actividad) => {
        setModNewActividad(true);
        try {
            await dispatch(POST((actividad), 'actividades'));
            setModNewActividad(false)
            navigate('/cuotas');
        } catch (error) {
            setModNewActividad(false)
            setModFallaActividad(true)
            setTimeout(() => {
                setModNewActividad(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmActividad}>
            {
                modNewActividad ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoActividad'
                        path='actividades' /> : <div></div>
            }
            {
                modFallaActividad ?
                    <Modal
                        texto='Falló al cargar la nueva actividad'
                        tipo='nuevoActividad' /> : <div></div>
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
                    <label>Nombre: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="nombre"
                        name="nombre"
                        rules={{
                            required: 'ingrese nombre de actividd'
                        }}
                    />
                    {errors.nombre && <span className={styles.claseError}>{errors.nombre.message}</span>}
                </div>
                <div>
                    <label>horarios: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="horarios"
                        name="horarios"
                        rules={{
                            required: 'ingrese horarios'
                        }}
                    />
                    {errors.horarios && <span className={styles.claseError}>{errors.horarios.message}</span>}
                </div>
                <div>
                    <label>Profesor: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="profesor"
                        name="profesor"
                        rules={{
                            required: 'ingrese profesor'
                        }}
                    />
                    {errors.profesor && <span className={styles.claseError}>{errors.profesor.message}</span>}
                </div>
                <Boton
                    tipo='actividadABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
