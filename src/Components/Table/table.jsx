import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET } from "../../redux/main.actions";
import Boton from "../SharedComponents/Boton";
import styles from "./Table.module.css";
import Modal from "../Modal/Modal";
import { useState, Fragment, useEffect } from "react";
import AuthorizationComponent from './../../redux/authorizationComponent';

const DATES_PROPERTIES = ["updated_at"];

const transformDate = (date) => {

  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  const mm = newDate.getMonth() + 1; //se hace +1 porque enero es cero
  const dd = newDate.getDate();

  const finalDate = dd + "/" + mm + "/" + yyyy;

  return finalDate
}

const Tabla = ({ entidad, globalFilter }) => {
  console.log("🚀 ~ file: table.jsx:27 ~ Tabla ~ globalFilter:", globalFilter)
  console.log("🚀 ~ file: table.jsx:25 ~ Tabla ~ entidad:", typeof entidad)
  const dispatch = useDispatch();

  let stateValues = useSelector((state) => state && state[entidad]) || [];

  const [deleteValue, setDeleteValue] = useState(false);
  const [_id, setId] = useState();

  const deleteHandler = (id) => {
    setDeleteValue(true);
    setId(_id);
  };

  const cancelHandler = () => {
    setDeleteValue(false);
  };

  useEffect(() => {
    if (stateValues?.length === 0) {
      dispatch(GET(entidad)); // traigo la netidad en la que estoy
    }
  }, [dispatch, entidad, stateValues?.length]);

  // Filtrar los elementos según el texto de búsqueda
  //búsqueda
  const filteredValues = stateValues.filter((element) => {
    const match = Object.values(element).some((value) =>
      String(value).toLowerCase().includes(globalFilter.toLowerCase())
    );
    console.log(`Filtering: ${JSON.stringify(element)} - Match: ${match}`);
    return match;
  });

  return (
    <Fragment>

      {deleteValue && (
        <Modal
          id={_id}
          entidad={entidad}
          texto="¿Desea eliminar el registro?"
          cerrar={cancelHandler}
          tipo="elminiar"
        />
      )}

      {filteredValues.length > 0 ? (
        filteredValues.map((element, stateValueIndex) => (
          <tr key={stateValueIndex}>
            {Object.keys(element).map(
              (key, keyIndex) =>
                !DATES_PROPERTIES.includes(key) &&
                !key.startsWith("_") && (
                  <td key={keyIndex}>
                    {key === "created_at" ? transformDate(element[key]) : element[key]}
                  </td>
                )
            )}
            {entidad !== 'logs' && (
              <td key={stateValueIndex + "td"} className={styles.tdBotones}>
                <Fragment>
                  <Link to={`/edit${entidad}/${element._id}`}>
                    <Boton tipo="editSocio" texto="Editar" />
                  </Link>

                  <AuthorizationComponent requiredRole='supervisor'>
                    <Boton
                      tipo="editSocio"
                      texto="Eliminar"
                      onClick={() => deleteHandler(element._id)}
                    />
                  </AuthorizationComponent>
                </Fragment>
              </td>
            )}
          </tr>
        ))
      ) : (
        <Fragment>
          <h4>No hay elementos cargados</h4>
          {/* Puedes agregar aquí un mensaje o contenido alternativo cuando no hay coincidencias */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Tabla;
