import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import myReducer from './main.reducer';
import { GET } from './main.actions';
import auditMiddleware from './auditMiddleware';

const middlewares = [thunk, auditMiddleware];


const store = createStore(
    myReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

// Despachamos acciones iniciales aca. Aca se pueden ejecutar asi:
store.dispatch(GET("socios")); // traigo cuotas y las cargo en el redux state
store.dispatch(GET("profesores")); // traigo cuotas y las cargo en el redux state
store.dispatch(GET("cuotas")); // traigo cuotas y las cargo en el redux state
store.dispatch(GET("valorescuota")); // traigo valorescuota y las cargo en el redux state
store.dispatch(GET("estadoscuota")); // traigo valorescuota y las cargo en el redux state
store.dispatch(GET("tiposcuota")); // traigo tiposcuota y las cargo en el redux state
store.dispatch(GET("actividades")); // traigo actividades y las cargo en el redux state
store.dispatch(GET("empleados")); // traigo actividades y las cargo en el redux state
store.dispatch(GET("roles")); // traigo actividades y las cargo en el redux state
store.dispatch(GET("logs")); // traigo pagos y las cargo en el redux state
store.dispatch(GET("pagos")); // traigo pagos y las cargo en el redux state
store.dispatch(GET("metodospagos")); // traigo metodospagos y las cargo en el redux state

export default store; 