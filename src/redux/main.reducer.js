import { ADD, UPDATE, DEL } from './main.types';

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
    metodospagos: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                [action.payload?.entidad]: [...state[action.payload.entidad], ...action.payload]
            };

        case UPDATE:
            const indexToUpdate = state[action.payload.entidad].findIndex(e => e.id === action.payload.id);
            const updatedArray = [...state[action.payload.entidad]];
            updatedArray[indexToUpdate] = action.payload;

            return {
                ...state,
                [action.payload.entidad]: updatedArray
            };

        case DEL:
            const finalAfterDeleted = state[action.payload.entidad].filter((e) => {
                return e.id !== action.payload.id;
            })

            return {
                ...state,
                [action.payload.entidad]: finalAfterDeleted
            }
    };

}

export default reducer;