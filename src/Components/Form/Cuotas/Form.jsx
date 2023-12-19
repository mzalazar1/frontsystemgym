import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET, POST } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";
import Modal from "../../Modal/Modal";

const Formulario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modNewCuota, setModNewCuota] = useState(false);
  const [modFallaCuota, setModFallaCuota] = useState(false);
  const [valorDescontado, setValorDescontado] = useState(0);

  const {
    getValues,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { socios, actividades, tiposcuota, valorescuota, descuentos } =
    useSelector((state) => state); // traigo todo el state

  const handleDescuentoChange = (event) => {
    // Set the value in React Hook Form
    const valor = event.target.value;
    if (valor === "0") {
      setValorDescontado(false);
      return;
    }
    const descontado = (getValues("valor") * event.target.value) / 100;
    setValorDescontado(descontado);
  };

  const cuotaHandler = async (data) => {
    setModNewCuota(true);

    //        sobreescribimos data.valor por el nuevo descontado
    data.valor =
      valorDescontado > 0 ? data.valor - valorDescontado : data.valor;

    // construimos el objeto de pago para el post de pago
    const pagoObj = {
      dni: data.socio,
      importe: Number(getValues("valor")) - Number(valorDescontado),
      metodo: "Contado",
    };

    try {
      await dispatch(POST("cuotas", data));
      await dispatch(POST("pagos", pagoObj));
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

  // traemos el campo valor
  const cuotaAPagar = getValues("valor");

  // descuenta el porcentaje al importe total
  const totalApagar = Number(getValues("valor")) - Number(valorDescontado);

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
                  {`${socio.dni} - ${socio.name} ${socio.lastname}`}
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
              return (
                <option key={valorcuota._id} value={valorcuota.importe}>
                  {`${valorcuota.importe}$ - ${valorcuota.mes} ${valorcuota.tipo}`}
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
            onChange={handleDescuentoChange}
          >
            <option value="0">Seleccionar Descuento</option>

            {descuentos.map((desc) => {
              return (
                <option key={desc._id} value={desc.porcentaje}>
                  {`${desc.descripcion} - ${desc.porcentaje}% `}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          {!isNaN(cuotaAPagar) && <h3>{`Cuota: ${cuotaAPagar} $`}</h3>}
          {!isNaN(valorDescontado) && valorDescontado > 0 && (
            <h3>{`Descuento: ${valorDescontado} $`}</h3>
          )}
          {!isNaN(totalApagar) && <h3>{`Importe Total: ${totalApagar} $`}</h3>}
        </div>

        <Boton tipo="cuotaABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;
