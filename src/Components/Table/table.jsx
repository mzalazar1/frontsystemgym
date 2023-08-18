import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Boton from "../SharedComponents/Boton";
import styles from './Table.module.css';
import Modal from "../Modal/Modal";
import { useState } from "react";

const Tabla = () => {
    let products = useSelector((state) => state.redProduct.products);
    const [delProd, setDelProd] = useState(false)
    const [eliProd, setEliProd] = useState()
    const delProdu = (prod) => {
        setEliProd(prod)
        setDelProd(true)
    }
    const cancDelProd = () => {
        setDelProd(false)
    }
    return (
        <div>    
            {
            delProd ? 
            <Modal 
                texto='¿Desea eliminar el producto?'
                cerrar={cancDelProd}
                producto={eliProd}
                tipo='elimProd' /> : <div></div>
            }
            {products.length > 0 ? (
                <div>
                    {products.map((product) => (
                        <table className={styles.Table} key={product.id}>
                            <tbody>
                                <tr>
                                    <td className={styles.tdDatos}>{product.id}</td>
                                    <td className={styles.tdDatos}>{product.name}</td>
                                    <td className={styles.tdDatos}>{product.price}</td>
                                    <td className={styles.tdDatos}>{product.stock}</td>
                                    <td className={styles.tdDatos}>{product.description}</td>
                                    <td className={styles.tdBotones}>
                                        <Link to={`/edit/${product.id}`}>
                                        <Boton
                                                tipo='editProd'
                                                texto='Editar' />
                                        </Link>
                                        <button className={styles.elimProd} onClick={() => delProdu(product)}> Eliminar </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            ) : (
                <h4>No hay productos cargados</h4>
            )}
        </div>
    );
};
export default Tabla;
