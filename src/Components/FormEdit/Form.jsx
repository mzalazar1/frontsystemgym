import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EDIT } from '../../redux/main.actions';
import SocInput from "../SharedComponents/Input";
import Boton from "../SharedComponents/Boton";
import styles from './Form.module.css';
import Modal from "../Modal/Modal";

const EditSocio = () => {
    const [selectedSocio, setSelectedSocio] = useState('');
    const dispatch = useDispatch();
    const socios = useSelector((state) => state.redSocio.socios);
    const currentId = useParams();
    const [modEditSocio, setModEditSocio] = useState(false)
    const [modFallaEdit, setModFallaEdit] = useState(false)
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm()


    const onSubmitHandler = async () => {
        setModEditSocio(true)
        try {
            console.log("va al action editar")
            await dispatch(EDIT(selectedSocio, 'socio'));
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
        const socioDetail = socios.filter(socio => socio.id == currentId.id);
        setSelectedSocio(socioDetail[0]);
    }, [currentId]);
    // console.log(selectedSocio)
    // console.log(socios)
    // console.log(currentId)
    return (
        <div className={styles.frmSocio}>
            {
                modEditSocio ?
                    <Modal
                        texto='Aguarde mientras se actualizan los datos'
                        tipo='nuevoSocio' /> : <div></div>
            }
            {
                modFallaEdit ?
                    <Modal
                        texto='Falló al actualizar los datos'
                        tipo='nuevoSocio' /> : <div></div>
            }
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <h2>Editar datos</h2>

                <div>
                    <label>Id: </label>
                    <SocInput
                        register={register}
                        type="text"
                        value={selectedSocio.id}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, id: e.target.value })}
                        placeholder="id"
                        name="id"
                    />
                </div>
                <div>
                    <label>Dni: </label>
                    <SocInput
                        register={register}
                        type="text"
                        value={selectedSocio.dni}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, dni: e.target.value })}
                        placeholder="dni"
                        name="dni"
                    />
                </div>
                <div>
                    <label>Nombre: </label>
                    <SocInput
                        register={register}
                        type="text"
                        value={selectedSocio.name}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, name: e.target.value })}
                        placeholder="nombre"
                        name="name"
                    />
                </div>
                <div>
                    <label>Apellido: </label>
                    <SocInput
                        register={register}
                        type="text"
                        value={selectedSocio.lastname}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, lastname: e.target.value })}
                        placeholder="apellido"
                        name="lastname"
                    />
                </div>
                <div>
                    <label>Telefono: </label>
                    <SocInput
                        register={register}
                        type="number"
                        value={selectedSocio.tel}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, tel: e.target.value })}
                        placeholder="tel"
                        name="tel"
                    />
                </div>
                <div>
                    <label>Mail: </label>
                    <SocInput
                        register={register}
                        type="text"
                        value={selectedSocio.mail}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, mail: e.target.value })}
                        placeholder="mail"
                        name="mail"
                    />
                </div>
                <div>
                    <label>Fecha de nacimiento: </label>
                    <SocInput
                        register={register}
                        type="text"
                        value={selectedSocio.fechaNac}
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, fechaNac: e.target.value })}
                        placeholder="fecha de nacimiento"
                        name="fechaNac"
                    />
                </div>
                <Boton
                    tipo='socioABM'
                    texto='Guardar' />
            </form>
        </div>
    );
};

export default EditSocio;