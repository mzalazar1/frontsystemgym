import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditCuota = () => {
  const { cuotas, socios, actividades, tiposcuota, valorescuota } = useSelector(
    (state) => state
  ); // traigo todo el state

  const dispatch = useDispatch();
  const currentId = useParams();
  const navigate = useNavigate();
  const [selectedCuota, setSelectedCuota] = useState(null);
  const [modEditCuota, setModEditCuota] = useState(false);
  const [modFallaEdit, setModFallaEdit] = useState(false);
  const [valorDescontado, setValorDescontado] = useState(null);

  const { getValues, register, handleSubmit } = useForm();

  const handleDescuentoChange = (event) => {
    // Set the value in React Hook Form
    const valor = event.target.value;
    if (valor === "0") {
      setValorDescontado(false);
      return;
    }
    const descontado = (getValues("valor") * event.target.value) / 100;
    console.log(
      "🚀 ~ file: Form.jsx:34 ~ handleDescuentoChange ~ descontado:",
      descontado
    );

    setValorDescontado(descontado);
  };

  const onSubmitHandler = async (data) => {
    setModEditCuota(true);

    // sobreescribimos el valor por el descontado
    data.valor =
      valorDescontado > 0 ? data.valor - valorDescontado : data.valor;
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
    const cuotasDetail = cuotas.filter(
      (cuotas) => +cuotas.id === +currentId.id
    );
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

            <select {...register("socio")} defaultValue={selectedCuota?.socio}>
              <option value="">Seleccionar Socio</option>

              {socios.map((socio) => {
                return (
                  <option
                    key={socio.dni}
                    selected={socio.dni === selectedCuota.dni && "selected"}
                    value={socio.dni}
                  >
                    {socio.dni}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Actividad: </label>

            <select
              {...register("actividad")}
              defaultValue={selectedCuota?.actividad}
            >
              <option value="">Seleccionar Actividad</option>

              {actividades.map((actividad) => {
                return (
                  <option key={actividad.id} value={actividad.id}>
                    {actividad.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Tipo: </label>
            <select {...register("tipo")} defaultValue={selectedCuota?.tipo}>
              <option value="">Seleccionar Tipo de Cuota</option>

              {tiposcuota.map((tipo) => {
                return (
                  <option key={tipo.id} value={tipo.tipo}>
                    {tipo.tipo}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <>
              <label>Valor: </label>
              <select
                {...register("valor", {
                  valueAsNumber: true,
                })}
                defaultValue={selectedCuota?.valor}
              >
                <option value="">Seleccionar Valor Cuota</option>

                {valorescuota.map((valorcuota) => {
                  return (
                    <option key={valorcuota.id} value={valorcuota.importe}>
                      {valorcuota.importe}
                    </option>
                  );
                })}

                {selectedCuota?.valor && (
                  <option value={selectedCuota?.valor}>
                    {selectedCuota?.valor}
                  </option>
                )}
              </select>
            </>
          </div>
          <div>
            <label>Descuento Opcional: </label>
            <select
              {...register("descuento", {
                valueAsNumber: true,
              })}
              onChange={handleDescuentoChange}
            >
              <option selected value="0">
                Seleccionar Solo si aplica nuevo Descuento
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
          )}
          <Boton tipo="cuotaABM" texto="Guardar" />
        </form>
      )}
    </div>
  );
};

export default EditCuota;
