import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditTipoCuota = () => {
    const tiposcuota = useSelector((state) => state.tiposcuota);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedTipoCuota, setSelectedTipoCuota] = useState(null);
    const [modEditTipoCuota, setModEditTipoCuota] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditTipoCuota(true);
        try {
            await dispatch(PUT("tiposcuota", data)); // para el PUT enviamos el ID
            setModEditTipoCuota(false);
            navigate("/tiposcuota");
        } catch (error) {
            setModEditTipoCuota(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/tiposcuota");
    };

    useEffect(() => {
        const tipoCuotaDetail = tiposcuota.filter((tipoCuota) => tipoCuota._id === currentId.id);
        setSelectedTipoCuota(tipoCuotaDetail[0]);
    }, [currentId, tiposcuota]);

    return (
        <div className={styles.frmTipoCuota}>
            {modEditTipoCuota && (
                <Modal
                    id={selectedTipoCuota?._id}
                    path={"tiposcuota"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoTipoCuota"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedTipoCuota?._id}
                    path={"tiposcuota"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoTipoCuota"
                />
            )}
            {selectedTipoCuota != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Descripcion: </label>

                        <input {...register("tipo")} defaultValue={selectedTipoCuota?.tipo} />
                    </div>
                    <div>
                        <label>Importe: </label>
                        <input {...register("importe")} defaultValue={selectedTipoCuota?.importe} />
                    </div>

                    <Boton tipo="tipoABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditTipoCuota;