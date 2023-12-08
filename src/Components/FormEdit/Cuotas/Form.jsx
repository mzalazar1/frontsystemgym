import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditCuota = () => {
    const cuotas = useSelector((state) => state.cuotas);
    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedCuota, setSelectedCuota] = useState(null);
    const [modEditCuota, setModEditCuota] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
        console.log("🚀 ~ file: Form.jsx:22 ~ onSubmitHandler ~ data:", data)
        setModEditCuota(true);
        try {
            await dispatch(PUT("cuotas", data)); // para el PUT enviamos el ID
            setModEditCuota(false);
            navigate("/cuotas");
        } catch (error) {
            setModEditCuota(false);
            setModFallaEdit(true);
            setTimeout(() => {
                setModFallaEdit(false);
            }, 2000);
        }
        navigate("/cuotas");
    };

    useEffect(() => {
        const cuotasDetail = cuotas.filter((cuotas) => +cuotas.id === +currentId.id);
        console.log("🚀 ~ file: Form.jsx:39 ~ useEffect ~ cuotasDetail:", cuotasDetail)
        setSelectedCuota(cuotasDetail[0]);
    }, [currentId, cuotas]);


    return (
        <div className={styles.frmCuota}>
            {modEditCuota && (
                <Modal
                    id={selectedCuota?.id}
                    path={"cuotas"}
                    texto="Aguarde mientras se actualizan los datos"
                    tipo="nuevoCuota"
                />
            )}
            {modFallaEdit && (
                <Modal
                    id={selectedCuota?.id}
                    path={"cuotas"}
                    texto="Falló al actualizar los datos"
                    tipo="nuevoCuota"
                />
            )}
            {selectedCuota != null && (
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <h2>Editar datos</h2>

                    <div>
                        <label>Id: </label>
                        <input
                            {...register("id", {
                                valueAsNumber: true,
                            })}
                            value={selectedCuota?.id}
                            type="number"
                        />
                    </div>
                    <div>
                        <label>Socio: </label>

                        <input {...register("socio")} defaultValue={selectedCuota?.socio} />
                    </div>
                    <div>
                        <label>Estado: </label>
                        <input {...register("estado")} defaultValue={selectedCuota?.estado} />
                    </div>
                    <div>
                        <label>Actividad: </label>
                        <input
                            {...register("actividad")} defaultValue={selectedCuota?.actividad} />
                    </div>
                    <div>
                        <label>Fecha de Pago: </label>
                        <input
                            {...register("fechaPago")} defaultValue={selectedCuota?.fechaPago} />
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <input
                            {...register("tipo")} defaultValue={selectedCuota?.tipo} />
                    </div>
                    <div>
                        <label>Valor: </label>
                        <input
                            {...register("valor")} defaultValue={selectedCuota?.valor} />
                    </div>


                    <Boton tipo="cuotaABM" texto="Guardar" />
                </form>
            )}
        </div>
    );
};

export default EditCuota;