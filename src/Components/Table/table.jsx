import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Boton from "../SharedComponents/Boton";
import styles from './Table.module.css';
import Modal from "../Modal/Modal";
import { useState, Fragment } from "react";

const Tabla = ({ entidad }) => {

    let stateValues = useSelector((state) => state[entidad]);

    const [deleteValue, setDeleteValue] = useState(false);
    const [id, setId] = useState();

    const deleteHandler = (id) => {
        setDeleteValue(true)
        setId(id)
    }

    const cancelHandler = () => {
        setDeleteValue(false)
    }

    return (
        <Fragment>
            {
                deleteValue &&
                <Modal
                    texto='¿Desea eliminar el registro?'
                    cerrar={cancelHandler}
                    id={id}
                    path={entidad}
                    tipo='elminiar' />
            }
            {stateValues?.length > 0 ? (

                stateValues.map((element, index) => (
                    <tr key={element.id + 'tr'}>
                        {Object.keys(element).map((key, index) => (
                            !key.startsWith('_') && <td key={element.id + index + 'td'} >{element[key]}</td>
                        ))}

                        <td key={element.id + index + 'editar'} className={styles.tdBotones}>
                            <Link to={`/edit/${entidad.id}`}>
                                <Boton
                                    tipo='editSocio'
                                    texto='Editar' />
                            </Link>
                            <button key={element.id + 'eliminar'} className={styles.elimSocio} onClick={() => deleteHandler(element.id)}> Eliminar </button>
                        </td>
                    </tr >
                ))

            ) : (
                <h4>No hay socios cargados</h4>
            )}
        </Fragment>
    );
};
export default Tabla;
