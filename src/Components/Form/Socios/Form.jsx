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
    const [modNewSocio, setModNewSocio] = useState(false)
    const [modFallaSocio, setModFallaSocio] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const socioHandler = async (socio) => {
        setModNewSocio(true);
        try {
            await dispatch(POST((socio), 'socios'));
            setModNewSocio(false)
            navigate('/socios');
        } catch (error) {
            setModNewSocio(false)
            setModFallaSocio(true)
            setTimeout(() => {
                setModNewSocio(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmSocio}>
            {
                modNewSocio ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoSocio'
                        path='socios' /> : <div></div>
            }
            {
                modFallaSocio ?
                    <Modal
                        texto='Falló al cargar el nuevo socio'
                        tipo='nuevoSocio' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(socioHandler)}>
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
                    <label>Nombre: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="nombre"
                        name="name"
                        rules={{
                            required: 'ingrese nombre'
                        }}
                    />
                    {errors.name && <span className={styles.claseError}>{errors.name.message}</span>}
                </div>
                <div>
                    <label>Apellido: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="apellido"
                        name="lastname"
                        rules={{
                            required: 'ingrese apellido'
                        }}
                    />
                    {errors.lastname && <span className={styles.claseError}>{errors.lastname.message}</span>}
                </div>
                <div>
                    <label>Telefono: </label>
                    <SocInput
                        register={register}
                        type="number"
                        placeholder="tel"
                        name="tel"
                        rules={{
                            required: 'ingrese telefono'
                        }}
                    />
                    {errors.tel && <span className={styles.claseError}>{errors.tel.message}</span>}
                </div>
                <div>
                    <label>Mail: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="mail"
                        name="mail"
                        rules={{
                            required: 'ingrese mail'
                        }}
                    />
                    {errors.mail && <span className={styles.claseError}>{errors.mail.message}</span>}
                </div>
                <div>
                    <label>Fecha de nacimiento: </label>
                    <SocInput
                        register={register}
                        type="text"
                        placeholder="fecha de nacimiento"
                        name="fechaNac"
                        rules={{
                            required: 'ingrese fecha de nacimiento'
                        }}
                    />
                    {errors.fechaNac && <span className={styles.claseError}>{errors.fechaNac.message}</span>}
                </div>
                <Boton
                    tipo='socioABM'
                    texto='Enviar' />
            </form>
        </div>
    )
}

export default Formulario;
