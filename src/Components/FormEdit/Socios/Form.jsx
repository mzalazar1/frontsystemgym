import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EDIT } from '../../../redux/main.actions';
import Boton from "../../SharedComponents/Boton";
import styles from './Form.module.css'
import Modal from "../../Modal/Modal";

const EditSocio = () => {
    const socios = useSelector((state) => state.socios);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedSocio, setSelectedSocio] = useState('');
    const [modEditSocio, setModEditSocio] = useState(false)
    const [modFallaEdit, setModFallaEdit] = useState(false)
    const { register, handleSubmit, reset
    } = useForm();


    const onSubmitHandler = async (data) => {
        console.log("🚀 ~ file: Form.jsx:24 ~ onSubmitHandler ~ data:", data)


        setModEditSocio(true)
        try {
            console.log("va al action editar")
            const payload = data;
            payload.entidad = "socios";
            await dispatch(EDIT(data, 'socios'));
            setModEditSocio(false)
            navigate('/socios')
        } catch (error) {
            setModEditSocio(false)
            setModFallaEdit(true)
            setTimeout(() => {
                setModFallaEdit(false)
            }, 2000);
        }
        console.log("anduvo")
        navigate("/socios");
    };

    useEffect(() => {
        const socioDetail = socios.filter(socio => socio.id === +currentId.id);
        setSelectedSocio(socioDetail[0]);
    }, [currentId, socios]);


    // seteamos el dafault value del formulario una vez cargado en selectedSocio, poqrue al 1er render, esta vacio. UseEffect lo ejecuta cuando selectedSocio cambio
    useEffect(() => {
        reset({
            data: selectedSocio,
        })
    }, [reset, selectedSocio])

    return (
        <div className={styles.frmSocio}>
            {
                modEditSocio &&
                <Modal
                    id={selectedSocio?.id}
                    path={"socios"}
                    texto='Aguarde mientras se actualizan los datos'
                    tipo='nuevoSocio' />
            }
            {
                modFallaEdit &&
                <Modal
                    id={selectedSocio?.id}
                    path={"socios"}
                    texto='Falló al actualizar los datos'
                    tipo='nuevoSocio' />
            }
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <h2>Editar datos</h2>

                <div>
                    <label>Id: </label>
                    <input {...register('id')} value={selectedSocio?.id} />
                </div>
                <div>
                    <label>Dni: </label>

                    <input {...register('dni')} defaultValue={selectedSocio?.dni} />
                </div>
                <div>
                    <label>Nombre: </label>
                    <input {...register('name')} defaultValue={selectedSocio?.name} />
                </div>
                <div>
                    <label>Apellido: </label>
                    <input {...register('lastname')} defaultValue={selectedSocio?.lastname} />
                </div>
                <div>
                    <label>Telefono: </label>
                    <input {...register('tel')} defaultValue={selectedSocio?.tel} />
                </div>
                <div>
                    <label>Mail: </label>
                    <input {...register('mail')} defaultValue={selectedSocio?.mail} />
                </div>
                <div>
                    <label>Fecha de nacimiento: </label>
                    <input {...register('fechaNac')} defaultValue={selectedSocio?.fechaNac} />
                </div>
                <Boton
                    tipo='socioABM'
                    texto='Guardar' />
            </form>
        </div>
    );
};

export default EditSocio;