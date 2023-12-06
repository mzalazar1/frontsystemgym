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
    const [modNewRol, setModNewRol] = useState(false)
    const [modFallaRol, setModFallaRol] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const valoresRolHandler = async (rol) => {
        setModNewRol(true);
        try {
            await dispatch(POST((rol), 'rol'));
            setModNewRol(false)
            navigate('/valorescuota');
        } catch (error) {
            setModNewRol(false)
            setModFallaRol(true)
            setTimeout(() => {
                setModNewRol(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmRol}>
            {
                modNewRol ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoRol'
                        path='roles' /> : <div></div>
            }
            {
                modFallaRol ?
                    <Modal
                        texto='Falló al cargar el nuevo rol'
                        tipo='nuevoRol' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(valoresRolHandler)}>
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
                    <label>Rol: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="rol"
                        name="rol"
                        rules={{
                            required: 'ingrese el rol'
                        }}
                    />
                    {errors.rol && <span className={styles.claseError}>{errors.rol.message}</span>}
                </div>
                <Boton
                    tipo='rolABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
