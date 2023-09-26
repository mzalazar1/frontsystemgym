import Cookies from 'js-cookie';
import { ADD_SOCIO, EDIT_SOCIO, REM_SOCIO } from './soc.types';

const getToken = () => {
    const tkn = Cookies.get('firebaseToken');
    return tkn
}


export const addSocio = (socio) => async dispatch => {
    const token = getToken()
    try {
        await fetch("https://backsystemgym.vercel.app/socios/all",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:
                    JSON.stringify({
                        id: socio.id,
                        name: socio.name,
                        price: socio.price,
                        stock: socio.stock,
                        description: socio.description
                    })
            })
            .then(function (respuesta) {
                if (respuesta.ok) {
                    dispatch({
                        type: ADD_SOCIO,
                        payload: socio
                    })
                }
                else {
                    console.log("fallo la subida")
                }
            })
    } catch (error) {
        console.log(error)
    }
};

export const editSocio = (socio) => async dispatch => {
    const token = getToken()
    try {
        await fetch("https://backsystemgym.vercel.app/socios" + socio.id,
            {
                method:
                    "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:
                    JSON.stringify({
                        id: socio.id,
                        name: socio.name,
                        price: socio.price,
                        stock: socio.stock,
                        description: socio.description
                    })
            })
            .then(function (respuesta) {
                if (respuesta.ok) {
                    dispatch({
                        type: EDIT_SOCIO,
                        payload: socio
                    })
                } else {
                    console.log("fallo la edición")
                }
            })
    } catch (error) {
        console.log(error)
    }
};

export const remSocio = (socio) => async dispatch => {
    const token = getToken()
    try {
        await fetch('https://backsystemgym.vercel.app/socios' + socio.id,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(function (respuesta) {
                if (respuesta.ok) {
                    dispatch({
                        type: REM_SOCIO,
                        payload: socio.id
                    })
                } else {
                    console.log("fallo al borrar")
                }
            })
    } catch (error) {
        console.log(error)
    }
};

export const getSocioCloud = () => async dispatch => {
    let respOk = false
    try {
        await fetch('https://backsystemgym.vercel.app/socios/all')
            .then(function (respuesta) {
                if (respuesta.ok) {
                    respOk = true
                }
                return respuesta.json()
            })
            .then((data) => {
                if (respOk) {
                    const socioCloud = data.data
                    if (socioCloud.length > 0) {
                        socioCloud.map((socio) => {
                            dispatch({
                                type: ADD_SOCIO,
                                payload: socio
                            })
                        })
                    }
                } else {
                    console.log("fallo la conexion")
                }
            })
    }
    catch (error) {
        console.log(error)
    }
}