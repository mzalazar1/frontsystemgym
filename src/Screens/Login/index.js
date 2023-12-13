
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import firebaseAapp from "../../Firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from './Index.module.css'
import Modal from "../../Components/Modal/Modal";

const auth = getAuth(firebaseAapp)

const Login = () => {

    const [modIniSes, setModIniSes] = useState(false)
    const [modFalIniSes, setModFalSes] = useState(false)
    const [modNuevoUsu, setModNuevoUsu] = useState(false)
    const [modFalNueUsu, setModFalNueUsu] = useState(false)
    const [modCieSes, setModCieSes] = useState(false)
    const [modFalCieSes, setModFalCieSes] = useState(false)
    const [noUserReg, setNoUserReg] = useState(false)
    const navigate = useNavigate()

    // se agrega dispatch para usarlo
    const dispatch = useDispatch();

    const regNuevoUsuario = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((usuReg) => {
                setModNuevoUsu(false)
                navigate('/')
            })
            .catch((error) => {
                setModNuevoUsu(false)
                setModFalNueUsu(true)
                setTimeout(() => {
                    setModFalNueUsu(false)
                }, 2500);
            })
    }

    const inciarSesion = async (email, password) => {
        try {
            setModIniSes(true)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            Cookies.set('firebaseToken', token, { expires: 1 / 24 });

            // aca guardamos email para los LOGS
            localStorage.setItem("email", email);

            navigate('/socios')
            setModIniSes(false)

            // aca cuando inicias sesion podes hacer un DISPATCH con el email, asi guardas el email en un estado de REDUX
            dispatch()
        } catch (error) {
            setModIniSes(false)
            setModFalSes(true)
            setTimeout(() => {
                setModFalSes(false)
            }, 2500);
        }
    }

    const cerrarSesion = async (e) => {
        setModCieSes(true)
        try {
            await signOut(auth)
                .then((resp) => {
                    setModCieSes(false)
                    navigate('/')
                })
        } catch {
            setModCieSes(false)
            setModFalCieSes(true)
            setTimeout(() => {
                setModFalCieSes(false)
            }, 2500);
        }

    }

    const sumbitHandler = (e) => {
        e.preventDefault()
        const email = e.target.elements.email.value
        const password = e.target.elements.password.value

        if (noUserReg) {
            regNuevoUsuario(email, password)
            setModNuevoUsu(true)
        } else {
            inciarSesion(email, password)
        }
    }

    return (
        <div>
            {
                modIniSes ?
                    <Modal
                        texto='Iniciando sesión'
                        tipo='nuevoSocio' /> : <div></div>
            }
            {
                modFalIniSes ?
                    <Modal
                        texto='Falló el inicio de sesión, verifique los datos'
                        tipo='nuevoSocio' /> : <div></div>
            }
            {
                modNuevoUsu ?
                    <Modal
                        texto='Creando nuevo usuario'
                        tipo='nuevoSocio' /> : <div></div>
            }
            {
                modFalNueUsu ?
                    <Modal
                        texto='Falló la creación del usuario, intente nuevamente mas tarde'
                        tipo='nuevoSocio' /> : <div></div>
            }
            {
                modCieSes ?
                    <Modal
                        texto='Cerrando sesión'
                        tipo='nuevoSocio' /> : <div></div>
            }
            {
                modFalCieSes ?
                    <Modal
                        texto='Falló el cierre de sesión, verifique los datos'
                        tipo='nuevoSocio' /> : <div></div>
            }
            <Header />
            <h1>Gestión del perfil</h1>
            {auth.currentUser == null ?
                <>
                    {noUserReg ? <><h2>Ingresa los datos para registrarte</h2></> : <><h2>Inicia sesión</h2></>}
                    <form onSubmit={sumbitHandler}>
                        <div>
                            <label>Email</label>
                            <input type="email" id="email"></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id="password"></input>
                        </div>
                        <input
                            type="submit"
                            value={noUserReg ? "Registrar" : "Iniciar sesión"}>
                        </input>
                    </form>
                    <div className={styles.buttonContainer}>
                        <button onClick={() => setNoUserReg(!noUserReg)}>{noUserReg ? "Ya tengo una cuenta" : "Quiero registrarme"}</button>
                    </div>
                </> : <>
                    <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
                </>}
            <Footer />
        </div>
    )
}

export default Login;
