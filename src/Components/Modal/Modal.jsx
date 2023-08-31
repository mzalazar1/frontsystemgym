import { useDispatch } from 'react-redux'
import Boton from '../SharedComponents/Boton'
import styles from './Modal.module.css'
import { remSocio } from '../../redux/Socios/soc.actions'

const Modal = ({ texto, cerrar, socio, tipo }) => {
    const dispatch = useDispatch()
    const elimSocio = () => {
        dispatch(remSocio(socio))
        cerrar()
    }
    const cancElimSocio = () => {
        cerrar()
    }
    return (
        <div className={styles.baseModal}>
            <p className='text'>{texto}</p>
            {tipo === 'elimSocio' ?
                <div>
                    <Boton
                        tipo='confElimSocio'
                        texto='Eliminar'
                        onClick={elimSocio} />
                    <Boton
                        tipo='cancElimSocio'
                        texto='Cancelar'
                        onClick={cancElimSocio} />
                </div> : <div></div>}
        </div>
    )
}

export default Modal