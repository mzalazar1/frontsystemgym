import React, { useEffect, useRef, useState } from "react";
import styles from "./Body.module.css";
import { useForm } from "react-hook-form";
import { CHECK_DNI } from "./../../redux/main.actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Boton from "../SharedComponents/Boton";

const BodySection = () => {
    const { register, handleSubmit } = useForm(); // Asegúrate de usar useForm para obtener estas funciones
    const dispatch = useDispatch();
    const [acceso, setAcceso] = useState(null);
    const { socios, cuotas } = useSelector((state) => state); // traigo todo el state
    const selectedSocioRef = useRef({ dni: null, data: null });
    const selectedCuotaRef = useRef({ dni: null, data: null });
    //manejo de fecha vencimiento
    const [fechaVenc, setFechaVenc] = useState(null);



    useEffect(() => {

        if (selectedCuotaRef.current.dni) {

            //ver aca atributo dni ??? se llama usuario
            const usuarioEncontradoCuota = cuotas.find((cuota) => cuota.dni === selectedCuotaRef.current.dni);

            selectedCuotaRef.current = { ...selectedCuotaRef.current, data: usuarioEncontradoCuota || null };

            setAcceso((prev) => ({ ...prev }));
        }
    }, [cuotas]);

    useEffect(() => {

        if (selectedSocioRef.current.dni) {

            const usuarioEncontradoSocio = socios.find((socio) => socio.dni === selectedSocioRef.current.dni);

            selectedSocioRef.current = { ...selectedSocioRef.current, data: usuarioEncontradoSocio || null };

            setAcceso((prev) => ({ ...prev }));
        }
    }, [socios]);

    const onSubmit = async (data) => {

        try {
            const respuesta = await dispatch(CHECK_DNI("accesosocio", data)); // nose si se mezclara con otra cosa con el "/" sino le puedo poner /accesosocio
            setAcceso(respuesta);

            const usuarioEncontradoSocio = socios.find((socio) => socio.dni === data.socio);
            selectedSocioRef.current = { dni: data.socio, data: usuarioEncontradoSocio || null };

            const usuarioEncontradoCuota = cuotas.find((cuota) => cuota.dni === data.cuota);
            selectedCuotaRef.current = { dni: data.socio, data: usuarioEncontradoCuota || null };

            setTimeout(() => {
            }, 2000);
        } catch (error) {
            console.log("🚀 ~ file: Body.jsx:28 ~ onSubmit ~ error:", error);
        }
    };

    return (
        <div className={styles.cuerpo}>
            <h1 className={styles.h1}>SYSTEMGYM</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>DNI:</label>
                    <input
                        type="text"
                        {...register("socio")} // Registra el campo en RHF
                        placeholder="Ingrese su DNI"
                    />
                </div>
                <button type="submit" className={styles.redButton}>
                    Enviar
                </button>
            </form>
            {acceso === true && selectedSocioRef.current.data && (
                <div>
                    <h1>ACCESO AUTORIZADO</h1>
                    <h3>{`Usuario: ${selectedSocioRef.current.data.name} ${selectedSocioRef.current.data.lastname} -  Actividad: ${selectedCuotaRef.current.data.actividad}`}</h3>
                    {/* Otras propiedades del usuario que quieras mostrar */}
                </div>
            )}

            {acceso === false && <h1>!!!!!CUOTA VENCIDA!!!!!!</h1>}
            {acceso === "dni not found" && <h1>DNI NO ENCONTRADO</h1>}
            {acceso === "cuota not found" && <h1>CUOTA NO ENCONTRADO</h1>}


            <h2 className={styles.h2}>
                Esta aplicación fue desarrollada por Marcos Zalazar para rendir final de Trabajo de campo y Trabajo de Diploma
            </h2>
            <p className={styles.texto}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim officiis
                ducimus eaque in dolores quam. Quos quis labore quia. Mollitia deleniti
                fugit quo quae necessitatibus quam animi odit maxime soluta.
            </p>
            <div className={styles.Estadisticas}>
                <Link to="/estadisticas">
                    <Boton
                        tipo='estadisticas'
                        texto='VER ESTADISTICAS' />
                </Link>
            </div>
            <div className={styles.Estadisticas}>
                <Link to="/asistencias">
                    <Boton
                        tipo='asistencias'
                        texto='REPORTE ASISTENCIAS' />
                </Link>
            </div>
        </div>
    );
};

export default React.memo(BodySection);
