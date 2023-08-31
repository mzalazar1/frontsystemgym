import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Boton from "../../Components/SharedComponents/Boton";
import { editSocio } from '../../redux/Socios/soc.actions';
import styles from './Form.module.css';
import Modal from "../Modal/Modal";

const EditSocio = () => {
    const [selectedSocio, setSelectedSocio] = useState({});
    const dispatch = useDispatch();
    const socios = useSelector((state) => state.redSocio.socios);
    const currentId = useParams();
    const [modEditSocio, setModEditSocio] = useState(false)
    const [modFallaEdit, setModFallaEdit] = useState(false)
    const navigate = useNavigate();
    const onSubmitHandler = async () => {
        try {
            await dispatch(editSocio(selectedSocio));
            setModEditSocio(false)
        } catch (error) {
            setModEditSocio(false)
            setModFallaEdit(true)
            setTimeout(() => {
                setModFallaEdit(false)
            }, 2000);
        }
        navigate("/socios");
    };
    useEffect(() => {
        const socioDetail = socios.filter(socio => socio.id === currentId.id);
        setSelectedSocio(socioDetail[0]);
    }, [currentId]);
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
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label>Dni:</label>
                    <input
                        type="text"
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, dni: e.target.value })}
                        value={selectedSocio.dni}
                        name="dni"
                        placeholder="Enter dni"
                        className={styles.inpForm}
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, name: e.target.value })}
                        value={selectedSocio.name}
                        name="name"
                        placeholder="Enter Name"
                        className={styles.inpForm}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, lastname: e.target.value })}
                        value={selectedSocio.lastname}
                        name="lastname"
                        placeholder="Ingrese el apellido"
                    />
                </div>
                <div>
                    <label>Tel:</label>
                    <input
                        type="text"
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, tel: e.target.value })}
                        value={selectedSocio.tel}
                        name="tel"
                        placeholder="Ingrese el tel"
                    />
                </div>
                <div>
                    <label>Mail:</label>
                    <input
                        type="text"
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, mail: e.target.value })}
                        value={selectedSocio.mail}
                        name="mail"
                        placeholder="Ingrese el mail"
                    />
                </div>
                <div>
                    <label>Fecha de nacimiento:</label>
                    <input
                        type="date"
                        onChange={(e) => setSelectedSocio({ ...selectedSocio, fecNac: e.target.value })}
                        value={selectedSocio.fecNac}
                        name="fecNac"
                        placeholder="Ingrese fecha de nacimiento"
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