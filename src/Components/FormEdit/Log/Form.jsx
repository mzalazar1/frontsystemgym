import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PUT } from "../../../redux/main.actions";
import Boton from "../../SharedComponents/Boton";
import styles from "./Form.module.css";

import Modal from "../../Modal/Modal";

const EditLog = () => {
  const logs = useSelector((state) => state.logs);
  const dispatch = useDispatch();
  const currentId = useParams();
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState(null);
  const [modEditLog, setModEditLog] = useState(false);
  const [modFallaEdit, setModFallaEdit] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmitHandler = async (data) => {
    data._id = currentId.id;

    setModEditLog(true);
    try {
      await dispatch(PUT("logs", data)); // para el PUT enviamos el ID
      setModEditLog(false);
      navigate("/logs");
    } catch (error) {
      setModEditLog(false);
      setModFallaEdit(true);
      setTimeout(() => {
        setModFallaEdit(false);
      }, 2000);
    }
    navigate("/logs");
  };

  useEffect(() => {
    const logDetail = logs.filter((log) => log._id === currentId.id);
    setSelectedLog(logDetail[0]);
  }, [currentId, logs]);

  return (
    <div className={styles.frmLog}>
      {modEditLog && (
        <Modal
          id={selectedLog?._id}
          path={"logs"}
          texto="Aguarde mientras se actualizan los datos"
          tipo="nuevoLog"
        />
      )}
      {modFallaEdit && (
        <Modal
          id={selectedLog?._id}
          path={"logs"}
          texto="Falló al actualizar los datos"
          tipo="nuevoLog"
        />
      )}
      {selectedLog != null && (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Editar datos</h2>

          <div>
            <label>Id: </label>
            <input
              {...register("id", {
                valueAsNumber: true,
              })}
              value={selectedLog?.id}
              type="number"
            />
          </div>
          <div>
            <label>Acción: </label>

            <input {...register("accion")} defaultValue={selectedLog?.accion} />
          </div>
          <div>
            <label>Usuario: </label>
            <input
              {...register("usuario")}
              defaultValue={selectedLog?.usuario}
            />
          </div>
          <div>
            <label>Fecha: </label>
            <input {...register("fecha")} defaultValue={selectedLog?.fecha} />
          </div>
          <div>
            <label>Hora: </label>
            <input {...register("hora")} defaultValue={selectedLog?.hora} />
          </div>

          <Boton tipo="logABM" texto="Guardar" />
        </form>
      )}
    </div>
  );
};

export default EditLog;
