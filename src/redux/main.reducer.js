import {
    LOAD_INITIAL_STATE,
    ADD_STATE,
    UPDATE_STATE,
    DELETE_STATE,
} from "./main.types";

const INITIAL_STATE = {
    socios: [],
    profesor: [],
    cuota: [],
    valoresCuotas: [],
    estadosCuotas: [],
    tipoCuotas: [],
    actividades: [],
    empleados: [],
    roles: [],
    logs: [],
    pagos: [],
    metodospagos: [],
};

// en action vienen "action.type" y "action.payload"
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_INITIAL_STATE:
            return {
                ...state,
                [action.payload?.entidad]: [
                    ...state[action.payload?.entidad],
                    ...action.payload, // viene como array desde el back, ya que trae una lista. aca si hacemos spread para que tire adentro todos los elementos
                ],
            };

        case ADD_STATE:
            return {
                ...state,
                [action.payload?.entidad]: [
                    ...state[action.payload?.entidad],
                    action.payload, // no hacemos spread porque no es un array, es un objeto directo. Aca lo agregamos como elemento al array
                ],
            };

        case UPDATE_STATE:
            const indexToUpdate = state[action.payload.entidad].findIndex((e) => {
                return e.id === +action.payload.id; // "+" para convertirlo en numero, porque del input viene como string
            });
            const updatedArray = [...state[action.payload.entidad]];
            updatedArray[indexToUpdate] = action.payload;

            return {
                ...state,
                [action.payload.entidad]: updatedArray,
            };

        case DELETE_STATE:
            const finalAfterDeleted = state[action.payload.entidad].filter((e) => {
                return e.id !== action.payload.id;
            });

            return {
                ...state,
                [action.payload.entidad]: finalAfterDeleted,
            };

        default:
            return state;
    }
};

export default reducer;
