import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditCuota = () => {
  const { cuotas, socios, actividades, tiposcuota, valorescuota, descuentos } =
    useSelector((state) => state); // traigo todo el state

  const dispatch = useDispatch();
  const currentId = useParams();
  const navigate = useNavigate();
  const [selectedCuota, setSelectedCuota] = useState(null);
  const [modEditCuota, setModEditCuota] = useState(false);
  const [modFallaEdit, setModFallaEdit] = useState(false);

  const [valorDescontado, setValorDescontado] = useState(null);

  const { register, handleSubmit } = useForm();

  const onSubmitHandler = async (data) => {
    data._id = currentId.id;

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
    const cuotasDetail = cuotas.filter((cuota) => cuota._id === currentId.id);

    if (cuotasDetail.length > 0) {
      setSelectedCuota(cuotasDetail[0]);
    } else {
      console.log("Cuota no encontrada");
    }
  }, [currentId, cuotas]);

  return (
    <div className={styles.frmCuota}>
      {modEditCuota && (
        <Modal
          id={selectedCuota?._id}
          path={"cuotas"}
          texto="Aguarde mientras se actualizan los datos"
          tipo="nuevoCuota"
        />
      )}
      {modFallaEdit && (
        <Modal
          id={selectedCuota?._id}
          path={"cuotas"}
          texto="Falló al actualizar los datos"
          tipo="nuevoCuota"
        />
      )}
      {selectedCuota != null && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Editar datos</h2>
          <div>
            <label>Socio:</label>

            <select {...register("socio")} defaultValue={selectedCuota?.socio}>
              <option value="">Seleccionar Socio</option>

              {socios.map((socio) => {
                return (
                  <option
                    key={socio.dni}
                    selected={socio.dni === selectedCuota.socio && "selected"}
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
              <option value="">Seleccionar actividad</option>

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
            <select {...register("tipo")} defaultValue={selectedCuota?.tipo}>
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
                    <option key={valorcuota._id} value={valorcuota.importe}>
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
            <label>Porcentaje descuento: </label>
            <select
              {...register("descuento", { valueAsNumber: true })}
              defaultValue={selectedCuota?.descuento}
            >
              <option value="">Seleccionar Descuento</option>

              {descuentos.map((desc) => {
                return (
                  <option key={desc._id} value={desc.porcentaje}>
                    {desc.porcentaje}
                  </option>
                );
              })}
            </select>
          </div>
          // Se trabaja todo en cuota y despues solo con el importe se va a la
          tabla pagos a registrar el pago //Falta la logica de aplicar el
          descuento al total
          <h3>{`Importe total: ${valorDescontado}`}</h3>
          <Boton tipo="cuotaABM" texto="Guardar" />
        </form>
      )}
    </div>
  );
};

export default EditCuota;
