// auditMiddleware.js
import axios from 'axios';

const backendURL = 'http://localhost:6001/api/logs';  // Reemplaza con la URL correcta de tu backend

const auditMiddleware = (store) => (next) => (action) => {
    if (action.type === 'ADD_STATE') {
        const customPayload = { usuario: localStorage.getItem('email'), accion: `Se agregó ${action.path}` }
        console.log('Datos que se enviarán al backend:', action.payload);
        enviarRegistroAuditoria(customPayload);
    } else if (action.type === 'UPDATE_STATE') {
        const customPayload = { usuario: localStorage.getItem('email'), accion: `Se editó ${action.path}` }
        console.log('Datos que se enviarán al backend:', action.payload);
        enviarRegistroAuditoria(customPayload);
    } else if (action.type === 'DELETE_STATE') {
        const customPayload = { usuario: localStorage.getItem('email'), accion: `Se eliminó ${action.path}` }
        console.log('Se registró el evento de eliminar estado.');
        enviarRegistroAuditoria(customPayload);
    }

    return next(action);
};

const enviarRegistroAuditoria = (evento) => {
    // Ejemplo de envío de log a un servidor
    console.log("🚀 ~ file: auditMiddleware.js:32 ~ enviarRegistroAuditoria ~ evento:", evento)

    axios.post(backendURL, evento)
        .then(response => {
            console.log('Registro de auditoría enviado con éxito:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar el registro de auditoría:', error);
        });
};

export default auditMiddleware;