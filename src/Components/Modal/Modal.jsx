import { useDispatch } from 'react-redux'
import Boton from '../SharedComponents/Boton'
import styles from './Modal.module.css'
import { DELETE } from '../../redux/main.actions'

const Modal = ({ texto, cerrar, id, tipo, path }) => {
    console.log("🚀 ~ file: Modal.jsx:7 ~ Modal ~ id:", id)

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(DELETE(id, path))
        cerrar()
    }

    const cancelHandler = () => {
        cerrar()
    }

    return (
        <div className={styles.baseModal}>
            <p className='text'>{texto}</p>
            {tipo === 'elminiar' ?
                <div>
                    <Boton
                        tipo='confElimSocio'
                        texto='Eliminar'
                        onClick={deleteHandler} />
                    <Boton
                        tipo='cancElimSocio'
                        texto='Cancelar'
                        onClick={cancelHandler} />
                </div> : <div></div>}
        </div>
    )
}

export default Modal