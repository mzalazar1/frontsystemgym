import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditDescuento = () => {
    const { descuentos } = useSelector((state) => state); // traigo el state
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedDescuento, setSelectedDescuento] = useState(null);
    const [modEditDescuento, setModEditDescuento] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();


    const onSubmitHandler = async (data) => {
        data._id = currentId.id;

        setModEditDescuento(true);
        try {
            await dispatch(PUT("descuentos", data)); // para el PUT enviamos el ID
            setModEditDescuento(false);
            navigate("/descuentos");
        } catch (error) {
            setModEditDescuento(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/descuentos");
    };

    useEffect(() => {
        const descuentoDetail = descuentos.filter((descuento) => descuento._id === currentId.id);
        setSelectedDescuento(descuentoDetail[0]);
    }, [currentId, descuentos]);

    return (
        <div className={styles.frmDescuento}>
            {modEditDescuento && (
                <Modal
                    id={selectedDescuento?._id}
                    path={"descuentos"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoDescuento"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedDescuento?._id}
                    path={"descuentos"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoDescuento"
                />
            )}
            {selectedDescuento != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>
                    <div>
                        <label>Descripción: </label>

                        <input {...register("descripcion")} defaultValue={selectedDescuento?.descripcion} />
                    </div>
                    <div>
                        <label>Porcentaje: </label>
                        <input {...register("porcentaje", {
                            valueAsNumber: true,
                        })} defaultValue={selectedDescuento?.porcentaje} />
                    </div>

                    <Boton tipo="descuentoABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditDescuento;