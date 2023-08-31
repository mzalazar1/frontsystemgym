import { ADD_SOCIO, EDIT_SOCIO, REM_SOCIO } from './soc.types';

const INITIAL_STATE = {
    socios: [],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SOCIO:
            return {
                socios: [...state.socios, action.payload]
            };

        case EDIT_SOCIO:
            const updSocioDetail = action.payload;
            const updSocio = state.socios.map((socio) => {
                if (socio.id === updSocioDetail.id) {
                    return updSocioDetail;
                } else {
                    return socio;
                }
            });
            return { socios: updSocio };

        case REM_SOCIO:
            return {
                socios: state.socios.filter((socio) => {
                    return socio.id !== action.payload;
                })
            };

        default: return state;
    }
};

export default reducer;  