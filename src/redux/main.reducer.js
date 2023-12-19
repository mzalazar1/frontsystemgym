import {
    LOAD_INITIAL_STATE,
    ADD_STATE,
    UPDATE_STATE,
    DELETE_STATE,
} from "./main.types";

const INITIAL_STATE = {
    socios: [],
    profesores: [],
    cuotas: [],
    valorescuota: [],
    estadoscuotas: [],
    tiposcuota: [],
    actividades: [],
    empleados: [],
    roles: [],
    logs: [],
    pagos: [],
    metodospagos: [],
    descuentos: [],
    asistencias: []

};

// en action vienen "action.type" y "action.payload"
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_INITIAL_STATE:
            return {
                ...state,
                [action.path]: [
                    ...state[action.path], //traemos los valores ya actuales
                    ...action.payload // viene como array desde el back, ya que trae una lista. aca si hacemos spread para que tire adentro todos los elementos
                ],
            };

        case ADD_STATE:
            return {
                ...state,
                [action.path]: [
                    ...state[action.path],
                    action.payload, // no hacemos spread porque no es un array, es un objeto directo. Aca lo agregamos como elemento al array
                ],
            };

        case UPDATE_STATE:
            const indexToUpdate = state[action.path].findIndex((e) => {
                return e._id === action.payload._id; // "+" para convertirlo en numero, porque del input viene como string
            });
            const updatedArray = [...state[action.path]];
            updatedArray[indexToUpdate] = action.payload;

            return {
                ...state,
                [action.path]: updatedArray,
            };

        case DELETE_STATE:

            const finalAfterDeleted = state[action.path].filter((e) => {
                return e._id !== action.payload;
            });

            return {
                ...state,
                [action.path]: finalAfterDeleted,
            };

        default:
            return state;
    }
};

export default reducer;
