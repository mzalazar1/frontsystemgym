import styles from './Table.module.css'

const TablaCabecera = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th className={styles.thDatos}>Id</th>
                    <th className={styles.thDatos}>Dni</th>
                    <th className={styles.thDatos}>Nombre</th>
                    <th className={styles.thDatos}>Apellido</th>
                    <th className={styles.thDatos}>Tel</th>
                    <th className={styles.thDatos}>Mail</th>
                    <th className={styles.thDatos}>Fecha de Nacimiento</th>
                    <th className={styles.thBotones}>Acción</th>
                </tr>
            </thead>
        </table>
    );

}

export default TablaCabecera;