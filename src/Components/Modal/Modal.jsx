import { useDispatch } from 'react-redux'
import Boton from '../SharedComponents/Boton'
import styles from './Modal.module.css'
import { remProd } from '../../redux/Productos/prod.actions'

const Modal = ({ texto, cerrar, producto, tipo }) => {
    const dispatch = useDispatch()
    const elimProd = () => {
        dispatch(remProd(producto))
        cerrar()
    }
    const cancElimProd = () => {
        cerrar()
    }
    return(
        <div className={styles.baseModal}>
            <p className='text'>{texto}</p>
            {tipo === 'elimProd' ? 
            <div>
                <Boton 
                tipo='confElimProd'
                texto='Eliminar' 
                onClick={elimProd}/>
                <Boton
                tipo='cancElimProd'
                texto='Cancelar' 
                onClick={cancElimProd} />
            </div> : <div></div> }
        </div>
    )
}

export default Modal