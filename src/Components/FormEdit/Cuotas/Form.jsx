import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET, PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";


const EditCuota = () => {
    const { cuotas, socios, actividades, tiposcuota, valorescuota, pagos, metodospagos } = useSelector((state) => state); // traigo todo el state

    const dispatch = useDispatch();
    const currentId = useParams();
    const navigate = useNavigate();
    const [selectedCuota, setSelectedCuota] = useState(null);
    const [modEditCuota, setModEditCuota] = useState(false);
    const [modFallaEdit, setModFallaEdit] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmitHandler = async (data) => {
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

                        <select {...register("socio")}>
                            <option value="">Seleccionar Socio</option>

                            {socios.map(socio => {
                                return <option key={socio.dni} selected={socio.dni === selectedCuota.dni && "selected"} value={socio.dni}>{socio.dni}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Actividad: </label>

                        <select {...register("actividad")} defaultValue={selectedCuota?.actividad}>

                            <option value="">Seleccionar Actividad</option>

                            {actividades.map(actividad => {
                                return <option key={actividad.id} value={actividad.id}>{actividad.nombre}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <select {...register("tipo")} defaultValue={selectedCuota?.tipo}>

                            <option value="">Seleccionar Tipo de Cuota</option>

                            {tiposcuota.map(tipo => {
                                return <option key={tipo.id} value={tipo.tipo}>{tipo.tipo}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Valor: </label>
                        <select {...register("valorcuota")} defaultValue={selectedCuota?.valorcuota}>

                            <option value="">Seleccionar Valor Cuota</option>

                            {valorescuota.map(valorcuota => {
                                return <option key={valorcuota.id} value={valorcuota.id}>{valorcuota.importe}</option>
                            })}
                        </select>
                    </div>


                    <Boton tipo="cuotaABM" texto="Guardar" />
                </form>
            )
            }
        </div >
    );
};

export default EditCuota;