import React from "react";
import './Boton.css';

const Boton = ({ tipo, texto, onClick }) => {
    return(
        <button className={`btnStyle ${tipo}`} onClick={onClick}>
            {texto}
        </button>
    );
}

export default Boton;