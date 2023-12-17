import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditValorCuota = () => {
    const valorescuota = useSelector((state) => state.valorescuota);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedValorCuota, setSelectedValorCuota] = useState(null);
    const [modEditValorCuota, setModEditValorCuota] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        data._id = currentId.id;

        setModEditValorCuota(true);
        try {
            await dispatch(PUT("valorescuota", data)); // para el PUT enviamos el ID
            setModEditValorCuota(false);
            navigate("/valorescuota");
        } catch (error) {
            setModEditValorCuota(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/valorescuota");
    };

    useEffect(() => {
        const valorCuotaDetail = valorescuota.filter((valorCuota) => valorCuota._id === currentId.id);
        setSelectedValorCuota(valorCuotaDetail[0]);
    }, [currentId, valorescuota]);

    return (
        <div className={styles.frmValorCuota}>
            {modEditValorCuota && (
                <Modal
                    id={selectedValorCuota?._id}
                    path={"valorescuota"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoValorCuota"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedValorCuota?._id}
                    path={"valorescuota"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoValorCuota"
                />
            )}
            {selectedValorCuota != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Mes: </label>

                        <input {...register("mes")} defaultValue={selectedValorCuota?.mes} />
                    </div>
                    <div>
                        <label>Importe: </label>
                        <input {...register("importe")} defaultValue={selectedValorCuota?.importe} />
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <input
                            {...register("tipo")}
                            defaultValue={selectedValorCuota?.tipo}
                        />
                    </div>

                    <Boton tipo="valorCuotaABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditValorCuota;