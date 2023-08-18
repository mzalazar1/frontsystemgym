import React from 'react';
import { useDispatch } from 'react-redux';
import { getProdCloud } from './redux/Productos/prod.actions';
import RoutesAPP from './Routes'

function App() {
    const dispatch = useDispatch();
    dispatch(getProdCloud());

    return (
        <RoutesAPP />
    );
}

export default App;
