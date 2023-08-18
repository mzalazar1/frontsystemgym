import styles from './Table.module.css'

const TablaCabecera = () => {
    return(
        <table> 
            <thead>
                <tr>
                    <th className={styles.thDatos}>Id</th>
                    <th className={styles.thDatos}>Nombre</th>
                    <th className={styles.thDatos}>Precio</th>
                    <th className={styles.thDatos}>Stock</th>
                    <th className={styles.thDatos}>Descripción</th>
                    <th className={styles.thBotones}>Acción</th>
                </tr>
            </thead>
        </table>
    );

}

export default TablaCabecera;