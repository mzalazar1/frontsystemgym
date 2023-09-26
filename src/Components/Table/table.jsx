import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Boton from "../SharedComponents/Boton";
import styles from './Table.module.css';
import Modal from "../Modal/Modal";
import { useState } from "react";

const Tabla = () => {
    let socios = useSelector((state) => state.redSocio.socios);
    console.log(socios)
    const [delSocio, setDelSocio] = useState(false)
    const [eliSocio, setEliSocio] = useState()
    const delSoc = (socio) => {
        setEliSocio(socio)
        setDelSocio(true)
    }
    const cancDelSocio = () => {
        setDelSocio(false)
    }
    return (
        <div>
            {
                delSocio ?
                    <Modal
                        texto='¿Desea eliminar el socio?'
                        cerrar={cancDelSocio}
                        socio={eliSocio}
                        tipo='elimSocio' /> : <div></div>
            }
            {socios.length > 0 ? (
                <div>
                    {socios.map((socio) => (
                        <table className={styles.Table} key={socio.id}>
                            <tbody>
                                <tr>
                                    <td className={styles.tdDatos}>{socio.id}</td>
                                    <td className={styles.tdDatos}>{socio.dni}</td>
                                    <td className={styles.tdDatos}>{socio.name}</td>
                                    <td className={styles.tdDatos}>{socio.lastname}</td>
                                    <td className={styles.tdDatos}>{socio.tel}</td>
                                    <td className={styles.tdDatos}>{socio.mail}</td>
                                    <td className={styles.tdDatos}>{socio.fechaNac}</td>
                                    <td className={styles.tdBotones}>
                                        <Link to={`/edit/${socio.id}`}>
                                            <Boton
                                                tipo='editSocio'
                                                texto='Editar' />
                                        </Link>
                                        <button className={styles.elimSocio} onClick={() => delSoc(socio)}> Eliminar </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            ) : (
                <h4>No hay socios cargados</h4>
            )}
        </div>
    );
};
export default Tabla;
