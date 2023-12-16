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
  const [modNewValorCuota, setModNewValorCuota] = useState(false);
  const [modFallaValorCuota, setModFallaValorCuota] = useState(false);
  const [selectedTipo] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { tiposcuota } = useSelector((state) => state); // traigo todo el state


  const valorCuotaHandler = async (valorCuota) => {

    setModNewValorCuota(true);
    try {
      await dispatch(POST("valorescuota", valorCuota));
      setModNewValorCuota(false);
      navigate("/valorescuota");
    } catch (error) {
      setModNewValorCuota(false);
      setModFallaValorCuota(true);
      setTimeout(() => {
        setModNewValorCuota(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.frmValorCuota}>
      {modNewValorCuota ? (
        <Modal
          texto="Se estan enviando los datos"
          tipo="nuevoValorCuota"
          path="valorescuota"
        />
      ) : (
        <div></div>
      )}
      {modFallaValorCuota ? (
        <Modal texto="Falló al cargar el nuevo valorCuota" tipo="nuevoValorCuota" />
      ) : (
        <div></div>
      )}
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit(valorCuotaHandler)}>

        <div>
          <label>Mes: </label>
          <input {...register("mes")} />
          {errors.mes && (
            <span className={styles.claseError}>{errors.mes.message}</span>
          )}
        </div>
        <div>
          <label>Importe: </label>
          <input {...register("importe")} />
          {errors.importe && (
            <span className={styles.claseError}>{errors.importe.message}</span>
          )}
        </div>
        <div>
          <label>Tipo: </label>
          <select {...register("tipo")} defaultValue={selectedTipo?.tipo}>

            <option value="">Seleccionar tipo</option>

            {tiposcuota.map(tipocuota => {
              return <option value={tipocuota.tipo}>{tipocuota.tipo}</option>
            })}
          </select>
        </div>

        <Boton tipo="valorCuotaABM" texto="Enviar" />
      </form>
    </div>
  );
};

export default Formulario;