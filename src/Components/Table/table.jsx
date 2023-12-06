import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET } from "../../redux/main.actions";
import Boton from "../SharedComponents/Boton";
import styles from "./Table.module.css";
import Modal from "../Modal/Modal";
import { useState, Fragment, useEffect } from "react";

const Tabla = ({ entidad }) => {
  const dispatch = useDispatch();

  let stateValues = useSelector((state) => state && state[entidad]) || [];

  const [deleteValue, setDeleteValue] = useState(false);
  const [id, setId] = useState();

  const deleteHandler = (id) => {
    console.log("🚀 ~ file: table.jsx:19 ~ deleteHandler ~ id:", id);
    setDeleteValue(true);
    setId(id);
  };

  const cancelHandler = () => {
    setDeleteValue(false);
  };

  useEffect(() => {
    if (stateValues?.length === 0) {
      dispatch(GET(entidad));
    }
  }, [dispatch, entidad, stateValues?.length]);

  return (
    <Fragment>
      {deleteValue && (
        <Modal
          id={id}
          entidad={entidad}
          texto="¿Desea eliminar el registro?"
          cerrar={cancelHandler}
          tipo="elminiar"
        />
      )}
      {stateValues?.length > 0 ? (
        stateValues.map((entidad, stateValueIndex) => (
          <tr key={stateValueIndex}>
            {Object.keys(entidad).map(
              (key, keyIndex) =>
                !key.startsWith("_") && <td key={keyIndex}>{entidad[key]}</td>
            )}

            <td key={stateValueIndex + "td"} className={styles.tdBotones}>
              <Link to={`/edit/${entidad.id}`}>
                <Boton tipo="editSocio" texto="Editar" />
              </Link>
              <button
                key={stateValueIndex + "eliminar"}
                className={styles.elimSocio}
                onClick={() => deleteHandler(entidad.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))
      ) : (
        <h4>No hay socios cargados</h4>
      )}
    </Fragment>
  );
};
export default Tabla;
