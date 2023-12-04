import Cookies from 'js-cookie';
import { ADD, UPDATE, DEL } from './main.types';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
console.log("🚀 ~ file: main.actions.js:5 ~ REACT_APP_API_URL:", REACT_APP_API_URL)

const getToken = () => {
    const tkn = Cookies.get('firebaseToken');
    return tkn
}

export const GET = (path) => async dispatch => {
    let respOk = false
    try {
        await fetch(`${REACT_APP_API_URL}/${path}/all`)
            .then((respuesta) => {
                console.log("🚀 ~ file: main.actions.js:14 ~ .then ~ respuesta:", respuesta)

                if (respuesta.ok) {
                    respOk = true
                }
                return respuesta.json()
            })
            .then((respuesta) => {
                console.log("🚀 ~ file: main.actions.js:21 ~ .then ~ respuesta:", respuesta)

                respuesta.entidad = path;

                if (respOk) {
                    console.log("🚀 ~ file: main.actions.js:26 ~ .then ~ respOk:", respOk)
                    if (respuesta.length > 0) {
                        console.log("🚀 ~ file: main.actions.js:28 ~ .then ~ respuesta.length:", respuesta.length)
                        dispatch({
                            type: ADD,
                            payload: respuesta
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

export const POST = (payload, path) => async dispatch => {
    const token = getToken()
    payload.entidad = path;

    try {
        await fetch(`${REACT_APP_API_URL}/${path}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:
                    JSON.stringify({ ...payload })
            })
            .then((respuesta) => {
                if (respuesta.ok) {
                    dispatch({
                        type: ADD,
                        payload
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

export const EDIT = (payload, path) => async dispatch => {
    const token = getToken()
    console.log(payload)
    try {
        await fetch(`${REACT_APP_API_URL}/${path}/${payload.id}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:
                    JSON.stringify({
                        ...payload
                    })
            })
            .then((respuesta) => {
                if (respuesta.ok) {
                    dispatch({
                        type: UPDATE,
                        payload
                    })
                } else {
                    console.log("fallo la edición")
                }
            })
    } catch (error) {
        console.log(error)
    }
};

export const DELETE = (id, path) => async dispatch => {
    const token = getToken()
    const payload = { id, entidad: path }
    try {
        await fetch(`${REACT_APP_API_URL}/${path}/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((respuesta) => {
                if (respuesta.ok) {
                    dispatch({
                        type: DEL,
                        payload
                    })
                } else {
                    console.log("fallo al borrar")
                }
            })
    } catch (error) {
        console.log(error)
    }
};