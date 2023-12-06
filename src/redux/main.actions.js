import Cookies from "js-cookie";
import {
  LOAD_INITIAL_STATE,
  ADD_STATE,
  UPDATE_STATE,
  DELETE_STATE,
} from "./main.types";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  const tkn = Cookies.get("firebaseToken");
  return tkn;
};

export const GET = (path) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_API_URL}/${path}/all`)
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        }
      })
      .then((respuesta) => {
        respuesta.entidad = path; // asignamos a la propiedad nueva 'entidad' el valor de path, para que el reducer lo tenga en "payload.entidad",

        if (respuesta.length > 0) {
          dispatch({
            type: LOAD_INITIAL_STATE,
            payload: respuesta,
          });
        } else {
          console.log("fallo la conexion");
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const POST = (path, payload) => async (dispatch) => {
  const token = getToken();
  payload.entidad = path; // asignamos a la propiedad nueva 'entidad' el valor de path, para que el reducer lo tenga en "payload.entidad",

  try {
    await fetch(`${REACT_APP_API_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload }),
    }).then((respuesta) => {
      if (respuesta.ok) {
        dispatch({
          type: ADD_STATE,
          payload: payload,
        });
      } else {
        console.log("fallo la subida");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = (path, payload) => async (dispatch) => {
  const token = getToken();
  payload.entidad = path; // asignamos a la propiedad nueva 'entidad' el valor de path, para que el reducer lo tenga en "payload.entidad",

  try {
    await fetch(`${REACT_APP_API_URL}/${path}/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...payload,
      }),
    }).then((respuesta) => {
      if (respuesta.ok) {
        dispatch({
          type: UPDATE_STATE,
          payload: payload,
        });
      } else {
        console.log("fallo la edición");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = (path, payload) => async (dispatch) => {
  const token = getToken();
  payload.entidad = path; // asignamos a la propiedad nueva 'entidad' el valor de path, para que el reducer lo tenga en "payload.entidad",

  try {
    await fetch(`${REACT_APP_API_URL}/${path}/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((respuesta) => {
      if (respuesta.ok) {
        dispatch({
          type: DELETE_STATE,
          payload: payload,
        });
      } else {
        console.log("fallo al borrar");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
