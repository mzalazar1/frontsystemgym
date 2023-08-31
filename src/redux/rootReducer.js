import { combineReducers } from "redux";
import reducer from './Socios/soc.reducer';

const rootReducer = combineReducers({
    redSocio: reducer,
});

export default rootReducer;
