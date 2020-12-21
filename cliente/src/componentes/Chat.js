import React, { useState, useEffect, useRef } from 'react'
import socket from './Socket'
import './Chat.css'
function Chat({ nombre }) {

    const [mensaje, setMensaje] = useState('')
    const [mensajes, setMensajes] = useState([])

    useEffect(() => {
        socket.emit('conectado', nombre);
    }, [nombre]);


    //obtener la ordenes emitidas por el servidor
    useEffect(() => {
        socket.on('mensajes', mensajeRecivido  => {
            setMensajes([...mensajes, mensajeRecivido]);
        })
        return () => { socket.off() }
    },[mensajes]);

    const divRef = useRef(null);

    useEffect( ()=>{
        divRef.current.scrollIntoView({behavior: 'smooth'});
    });

    const submit = (event) => {
        event.preventDefault();
        socket.emit('mensaje', nombre, mensaje);
        setMensaje('');
    }


    return (
        <div >

            <div className="chat">
                {mensajes.map((element, indice) =>
                    <div key={indice}>
                        <div>{element.nombre}</div><div>{element.mensaje}</div>
                    </div>)}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit} >
                <label> Escribe su mensaje</label>
                <textarea cols='30' rows='10' value={mensaje} onChange={event => setMensaje(event.target.value)} />
                <button> Enviar </button>
            </form>

        </div>
    )
}

export default Chat
