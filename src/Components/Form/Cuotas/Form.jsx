import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";
import Modal from "../../Modal/Modal";

const Formulario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modNewCuota, setModNewCuota] = useState(false);
    const [modFallaCuota, setModFallaCuota] = useState(false);
    const [valorDescontado, setValorDescontado] = useState(null);

    const {
        getValues,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { socios, actividades, tiposcuota, valorescuota, descuentos } = useSelector(
        (state) => state
    ); // traigo todo el state

    console.log("🚀 ~ file: Form.jsx:25 ~ valorescuota:DEsde state", valorescuota)
    console.log("🚀 ~ file: Form.jsx:25 ~ descuentos:DESDE EL STATEEEE", descuentos)


    // const handleDescuentoChange = (event) => {
    //     // Set the value in React Hook Form
    //     const valor = event.target.value;
    //     if (valor === "0") {
    //         setValorDescontado(false);
    //         return;
    //     }
    //     const descontado = (getValues("valor") * event.target.value) / 100;
    //     setValorDescontado(descontado);
    // };

    const cuotaHandler = async (data) => {
        setModNewCuota(true);

        // sobreescribimos data.importe por el nuevo descontado
        // data.valor =
        //     valorDescontado > 0 ? data.valor - valorDescontado : data.valor;

        try {
            await dispatch(POST("cuotas", data));
            setModNewCuota(false);
            navigate("/cuotas");
        } catch (error) {
            setModNewCuota(false);
            setModFallaCuota(true);
            setTimeout(() => {
                setModNewCuota(false);
            }, 2000);
        }
    };

    return (
        <div className={styles.frmCuota}>
            {modNewCuota ? (
                <Modal
                    texto="Se estan enviando los datos"
                    tipo="nuevoCuota"
                    path="cuotas"
                />
            ) : (
                <div></div>
            )}
            {modFallaCuota ? (
                <Modal texto="Falló al cargar la nueva cuota" tipo="nuevoCuota" />
            ) : (
                <div></div>
            )}
            <h2>Formulario</h2>
            <form onSubmit={handleSubmit(cuotaHandler)}>

                <div>
                    <label>Socio: </label>
                    <select {...register("socio")}>
                        <option value="">Seleccionar Socio</option>

                        {socios.map((socio) => {
                            return (
                                <option key={socio.dni} value={socio.dni}>
                                    {socio.dni}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label>Actividad: </label>
                    <select {...register("actividad")}>
                        <option value="">Seleccionar Actividad</option>

                        {actividades.map((actividad) => {
                            return (
                                <option key={actividad._id} value={actividad.nombre}>
                                    {actividad.nombre}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label>Tipo: </label>
                    <select {...register("tipo")}>
                        <option value="">Seleccionar Tipo de Cuota</option>

                        {tiposcuota.map((tipo) => {
                            return (
                                <option key={tipo._id} value={tipo.tipo}>
                                    {tipo.tipo}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label>Valor: </label>
                    <select
                        {...register("valor", {
                            valueAsNumber: true,
                        })}
                    >
                        <option value="">Seleccionar Valor Cuota</option>

                        {valorescuota.map((valorcuota) => {
                            console.log("🚀 ~ file: Form.jsx:133 ~ {valorescuota.map ~ valorcuota: YYYYYY", valorcuota)
                            return (
                                <option key={valorcuota._id} value={valorcuota.importe}>
                                    {valorcuota.importe}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div>
                    <label>Porcentaje descuento: </label>
                    <select
                        {...register("descuento", {
                            valueAsNumber: true,
                        })}
                    >
                        <option value="">Seleccionar Descuento</option>

                        {descuentos.map((desc) => {
                            console.log("🚀 ~ file: Form.jsx:155 ~ {descs.map ~ desc:MIRA EL PORCENTAJEEE", desc)

                            return (
                                <option key={desc._id} value={desc.porcentaje}>
                                    {desc.descripcion}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* <div>
                <label>Descuento Opcional: </label>
                <select
                    {...register("descuento", {
                        valueAsNumber: true,
                    })}
                    onChange={handleDescuentoChange}
                >
                    <option selected value="0">
                        Seleccionar Descuento
                    </option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                    <option value="100">100%</option>
                </select>
            </div>
            {valorDescontado && valorDescontado !== 0 && (
                <p>Valor descontado ${valorDescontado}</p>
            )} */

                    <div>
            // Se trabaja todo en cuota y despues solo con el importe se va a la tabla pagos a registrar el pago
                        //Falta la logica de aplicar el descuento al total
                        <h3>{`Importe total: ${valorDescontado}`}</h3>
                    </div>
                }
                <Boton tipo="cuotaABM" texto="Enviar" />
            </form>
        </div>
    );


};

export default Formulario;