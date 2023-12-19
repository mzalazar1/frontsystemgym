import { useDispatch } from "react-redux";
import Boton from "../SharedComponents/Boton";
import styles from "./Modal.module.css";
import { DELETE } from "../../redux/main.actions";

const Modal = ({ id, entidad, texto, cerrar, tipo }) => {

  const dispatch = useDispatch();

  const deleteHandler = () => {

    const payload = { id }; // construimos un payload object con solo el ID ya que para DELETE no enviamos ninguna otra data.
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
