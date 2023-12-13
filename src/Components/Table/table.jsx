import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET } from "../../redux/main.actions";
import Boton from "../SharedComponents/Boton";
import styles from "./Table.module.css";
import Modal from "../Modal/Modal";
import { useState, Fragment, useEffect } from "react";

const DATES_PROPERTIES = ["updated_at"];

const transformDate = (date) => {

  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  const mm = newDate.getMonth() + 1; //se hace +1 porque enero es cero
  const dd = newDate.getDate();

  const finalDate = dd + "/" + mm + "/" + yyyy;

  return finalDate
}

const Tabla = ({ entidad }) => {
  console.log("🚀 ~ file: table.jsx:25 ~ Tabla ~ entidad:", typeof entidad)
  const dispatch = useDispatch();

  let stateValues = useSelector((state) => state && state[entidad]) || [];

  const [deleteValue, setDeleteValue] = useState(false);
  const [id, setId] = useState();

  const deleteHandler = (id) => {
    setDeleteValue(true);
    setId(id);
  };

  const cancelHandler = () => {
    setDeleteValue(false);
  };

  useEffect(() => {
    if (stateValues?.length === 0) {
      dispatch(GET(entidad)); // traigo la netidad en la que estoy
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
        stateValues.map((element, stateValueIndex) => (
          <tr key={stateValueIndex}>
            {Object.keys(element).map(
              (key, keyIndex) =>
                !DATES_PROPERTIES.includes(key) && !key.startsWith("_") && <td key={keyIndex}>{key === "created_at" ? transformDate(element[key]) : element[key]}</td>
            )}
            {entidad !== 'logs' && (
              <td key={stateValueIndex + "td"} className={styles.tdBotones}>

                <Fragment>
                  <Link to={`/edit${entidad}/${element.id}`}>
                    <Boton tipo="editSocio" texto="Editar" />
                  </Link>

                  <Boton
                    tipo="editSocio"
                    texto="Eliminar"
                    onClick={() => deleteHandler(element.id)}
                  />
                </Fragment>

              </td>
            )}
          </tr>
        ))
      ) : (
        <h4>No hay elementos cargados</h4>
      )}
    </Fragment>
  );
};
export default Tabla;
