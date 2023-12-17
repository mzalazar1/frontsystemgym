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
        console.log("🚀 ~ file: main.actions.js:20 ~ .then ~ respuesta:", respuesta)
        if (respuesta.ok) {
          return respuesta.json();
        }
      })
      .then((respuesta) => {
        console.log("🚀 ~ file: main.actions.js:25 ~ .then ~ respuesta:", respuesta)

        if (respuesta.length > 0) {
          dispatch({
            type: LOAD_INITIAL_STATE,
            payload: respuesta,
            path: path
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
  console.log("🚀 ~ file: main.actions.js:44 ~ POST ~ payload:", payload)
  const token = getToken();

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
          path: path
        });
      } else {
        console.log("fallo la subida");
      }
    })
  } catch (error) {
    console.log(error)
  }
};

export const PUT = (path, payload) => async (dispatch) => {
  const token = getToken();

  console.log("🚀 ~ file: main.actions.js:101 ~ PUT ~ payload:ESTO LLEGÓ AL ACTION PUT", payload)


  try {
    await fetch(`${REACT_APP_API_URL}/${path}/${payload._id}`, {
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
          path: path

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

  try {
    await fetch(`${REACT_APP_API_URL}/${path}/${payload}`, {     //el payload ya es el id
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
          path: path

        });
      } else {
        console.log("fallo al borrar");
      }
    });
  } catch (error) {
    console.log(error);
  }
};



export const CHECK_DNI = (path, payload) => async (dispatch) => {
  const token = getToken();

  try {
    const respuesta = await fetch(`${REACT_APP_API_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...payload,
      }),
    });

    if (respuesta.ok) {
      const data = await respuesta.json();
      return data;

    } else {
      // Handle non-OK responses, e.g., dispatch an action to handle errors
      console.error("Error in fetch:", respuesta.status);
      return null;
    }

    // aca van los logs id created

  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

