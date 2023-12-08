import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditEstadoCuota = () => {
    const estadosCuota = useSelector((state) => state.estadoscuota);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedEstadoCuota, setSelectedEstadoCuota] = useState(null);
    const [modEditEstadoCuota, setModEditEstadoCuota] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        setModEditEstadoCuota(true);
        try {
            await dispatch(PUT("estadoscuota", data)); // para el PUT enviamos el ID
            setModEditEstadoCuota(false);
            navigate("/estadoscuota");
        } catch (error) {
            setModEditEstadoCuota(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/estadoscuota");
    };

    useEffect(() => {
        const estadoCuotaDetail = estadosCuota.filter((estadoCuota) => +estadoCuota.id === +currentId.id);
        setSelectedEstadoCuota(estadoCuotaDetail[0]);
    }, [currentId, estadosCuota]);

    return (
        <div className={styles.frmEstadoCuota}>
            {modEditEstadoCuota && (
                <Modal
                    id={selectedEstadoCuota?.id}
                    path={"estadosCuota"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoEstadoCuota"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedEstadoCuota?.id}
                    path={"estadosCuota"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoEstadoCuota"
                />
            )}
            {selectedEstadoCuota != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Id: </label>
                        <input
                            {...register("id", {
                                valueAsNumber: true,
                            })}
                            value={selectedEstadoCuota?.id}
                            type="number"
                        />
                    </div>
                    <div>
                        <label>Estado Actual: </label>

                        <input {...register("estadoActual")} defaultValue={selectedEstadoCuota?.estadoActual} />
                    </div>

                    <Boton tipo="estadoCuotaABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditEstadoCuota;