import { useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Boton from "../../Components/SharedComponents/Boton";
import { editProd } from '../../redux/Productos/prod.actions';
import styles from './Form.module.css';
import Modal from "../Modal/Modal";

const EditProd = () => {
    const [selectedProd, setSelectedProd] = useState({});
    const dispatch = useDispatch();
    const products = useSelector((state) => state.redProduct.products);
    const currentId = useParams();
    const [modEditProd, setModEditProd] = useState(false)
    const [modFallaEdit, setModFallaEdit] = useState(false)
    const navigate = useNavigate();
    const onSubmitHandler = async () => {
        try {
            await dispatch(editProd(selectedProd));
            setModEditProd(false)
        } catch (error) {
            setModEditProd(false)
            setModFallaEdit(true)
            setTimeout(() => {
                setModFallaEdit(false)
            }, 2000);
        }
        navigate("/productos");
    };
    useEffect(() => {
        const prodDetail = products.filter(prod => prod.id === currentId.id);
        setSelectedProd(prodDetail[0]);
    }, [currentId]);
    return (
        <div className={styles.frmProd}>
            {
                modEditProd ? 
                <Modal 
                texto='Aguarde mientras se actualizan los datos'
                tipo='nuevoProd' /> : <div></div>
            }
            {
                modFallaEdit ? 
                <Modal 
                texto='Falló al actualizar los datos'
                tipo='nuevoProd' /> : <div></div>
            }
            <form onSubmit={onSubmitHandler}>
                <div>
                <label>Nombre:</label>
                    <input
                    type="text"
                    onChange = {(e) => setSelectedProd({...selectedProd, name: e.target.value})}
                    value={selectedProd.name}
                    name="name"
                    placeholder="Enter Name"
                    className={styles.inpForm}
                    />
                </div>
                <div>
                <label>Precio:</label>
                    <input
                    type="number"
                    onChange = {(e) => setSelectedProd({...selectedProd, price: e.target.value})}
                    value={selectedProd.price}
                    name="price"
                    placeholder="Ingrese el precio"
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                    type="number"
                    onChange = {(e) => setSelectedProd({...selectedProd, stock: e.target.value})}
                    value={selectedProd.stock}
                    name="stock"
                    placeholder="Ingrese el stock"
                    /> 
                </div>
                <div>
                    <label>Descripcion:</label>
                    <input
                    type="text"
                    onChange = {(e) => setSelectedProd({...selectedProd, description: e.target.value})}
                    value={selectedProd.description}
                    name="description"
                    placeholder="Ingrese la descripción"
                    />
                </div>
                <Boton 
                    tipo='prodABM'
                    texto='Guardar' />
            </form>
        </div>
    );
};

export default EditProd;