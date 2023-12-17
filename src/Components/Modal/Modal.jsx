import { useDispatch } from "react-redux";
import Boton from "../SharedComponents/Boton";
import styles from "./Modal.module.css";
import { DELETE } from "../../redux/main.actions";

const Modal = ({ id, entidad, texto, cerrar, tipo }) => {

  console.log("🚀 ~ file: Modal.jsx:42 ~ Modal ~ id EL ID QUE LLEGA AL MODAL:", id) //llega el id al modal

  const dispatch = useDispatch();

  const deleteHandler = () => {

    const payload = { id }; // construimos un payload object con solo el ID ya que para DELETE no enviamos ninguna otra data.
    console.log("🚀 ~ file: Modal.jsx:15 ~ deleteHandler ~ deleteHandler.entidad:miraaaa", entidad)
    console.log("🚀 ~ file: Modal.jsx:16 ~ deleteHandler ~ id: ESTE ES EL ID ANTES DEL DISPATCH", id)
    console.log("🚀 ~ file: Modal.jsx:15 ~ deleteHandler ~ deleteHandler.payload.id miraaaa:", payload.id)

    dispatch(DELETE(entidad, payload.id));
    cerrar();
  };

  const cancelHandler = () => {
    cerrar();
  };

  return (
    <div className={styles.baseModal}>
      <p className="text">{texto}</p>
      {tipo === "elminiar" && (
        <div>
          <Boton
            tipo="confElimSocio"
            texto="Eliminar"
            onClick={deleteHandler}
          />
          <Boton
            tipo="cancElimSocio"
            texto="Cancelar"
            onClick={cancelHandler}
          />
        </div>
      )}
    </div>
  );
};

export default Modal;
