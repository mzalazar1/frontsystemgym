import React from 'react';
import { useDispatch } from 'react-redux';
import { getSocioCloud } from './redux/Socios/soc.actions';
import RoutesAPP from './Routes'

function App() {
    const dispatch = useDispatch();
    dispatch(getSocioCloud());

    return (
        <RoutesAPP />
    );
}

export default App;
