import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from './Form.module.css';
import Modal from "../../Modal/Modal";

const Formulario = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [modNewCuota, setModNewCuota] = useState(false)
    const [modFallaCuota, setModFallaCuota] = useState(false)
    const [selectedCuota, setSelectedCuota] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm()

    const { socios, actividades, tiposcuota, valorescuota, pagos, metodospagos } = useSelector((state) => state); // traigo todo el state

    const cuotaHandler = async (data) => {
        setModNewCuota(true);
        try {
            await dispatch(POST("cuotas", data));
            console.log("🚀 ~ file: Form.jsx:28 ~ cuotaHandler ~ data:", data)
            //error 500 falló la subida
            setModNewCuota(false)
            navigate('/cuotas');
        } catch (error) {
            setModNewCuota(false)
            setModFallaCuota(true)
            setTimeout(() => {
                setModNewCuota(false)
            }, 2000);
        }
    }

    return (
        <div className={styles.frmCuota}>
            {
                modNewCuota ?
                    <Modal
                        texto='Se estan enviando los datos'
                        tipo='nuevoCuota'
                        path='cuotas' /> : <div></div>
            }
            {
                modFallaCuota ?
                    <Modal
                        texto='Falló al cargar la nueva cuota'
                        tipo='nuevoCuota' /> : <div></div>
            }
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(cuotaHandler)}>
                <div>
                    <label>Id: </label>
                    <input {...register("id")} />
                    {errors.id && (
                        <span className={styles.claseError}>{errors.id.message}</span>
                    )}
                </div>
                <div>
                    <label>Socio: </label>
                    <select {...register("socio")}>
                        <option value="">Seleccionar Socio</option>

                        {socios.map(socio => {
                            return <option key={socio.dni} value={socio.dni}>{socio.dni}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label>Actividad: </label>
                    <select {...register("actividad")} defaultValue={selectedCuota?.actividad}>

                        <option value="">Seleccionar Actividad</option>

                        {actividades.map(actividad => {
                            return <option key={actividad.id} value={actividad.nombre}>{actividad.nombre}</option>
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
                            return <option key={valorcuota.id} value={valorcuota.importe}>{valorcuota.importe}</option>
                        })}
                    </select>
                </div>
                <Boton tipo="cuotaABM" texto="Enviar" />
            </form>
        </div>
    )
}

export default Formulario;
