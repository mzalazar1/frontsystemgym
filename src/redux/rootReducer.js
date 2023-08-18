import { combineReducers } from "redux";
import reducer from './Productos/prod.reducer';

const rootReducer = combineReducers({
    redProduct: reducer,
});

export default rootReducer;
