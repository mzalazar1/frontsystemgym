import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET } from "../../redux/main.actions";
import Boton from "../SharedComponents/Boton";
import styles from "./Table.module.css";
import Modal from "../Modal/Modal";
import { useState, Fragment, useEffect } from "react";

const Tabla = ({ entidad }) => {
  console.log("🚀 ~ file: table.jsx:11 ~ Tabla ~ entidad:", entidad)
  const dispatch = useDispatch();

  let stateValues = useSelector((state) => state && state[entidad]) || [];
  console.log("🚀 ~ file: table.jsx:15 ~ Tabla ~ stateValues:", stateValues)

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
      dispatch(GET(entidad));
    }
  }, [dispatch, entidad, stateValues?.length]);
  console.log("🚀 ~ file: table.jsx:32 ~ useEffect ~ entidad:", entidad)


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
                !key.startsWith("_") && <td key={keyIndex}>{element[key]}</td>
            )}

            <td key={stateValueIndex + "td"} className={styles.tdBotones}>
              {/* esta hardcodeado para socios tendria que ser algo asi edit${} */}

              <Link to={`/edit${entidad}/${element.id}`}>
                <Boton tipo="editSocio" texto="Editar" />
              </Link>

              <Boton
                tipo="editSocio"
                texto="Eliminar"
                onClick={() => deleteHandler(element.id)}
              />
            </td>
          </tr>
        ))
      ) : (
        <h4>No hay elementos cargados</h4>
      )}
    </Fragment>
  );
};
export default Tabla;
