import React, { useState, useEffect, useRef } from 'react'
import socket from './Socket'
import './Chat.css'
import InfoBar from './InfoBar/InfoBar'

import ReactEmoji from 'react-emoji';

function Chat({ nombre }) {

    const [mensaje, setMensaje] = useState('')
    const [mensajes, setMensajes] = useState([])

    useEffect(() => {
        socket.emit('conectado', nombre);
    }, [nombre]);


    //obtener la ordenes emitidas por el servidor
    useEffect(() => {
        socket.on('mensajes', mensajeRecivido => {
            setMensajes([...mensajes, mensajeRecivido]);
        })
        return () => { socket.off() }
    }, [mensajes]);

    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    const submit = (event) => {
        event.preventDefault();
        socket.emit('mensaje', nombre, mensaje);
        setMensaje('');
    }


    console.log(mensajes);
    return (
        <div className="chat__outerContainer" >
            <div className="chat__container">
                <InfoBar user={nombre} />


                <div className="messages">

                    {mensajes.map((element, indice) =>

                        <>{element.servidor ?  <div className="messageContainer justifyCenter" >
                            <p className="messageServer">
                            {element.mensaje }
                            </p>
                        </div>
                             :element.nombre !== nombre ?
                                <div key={indice} className="messageContainer justifyEnd">
                                    <p className="sentText pr-10">{element.nombre}</p>
                                    <div className="messageBox backgroundBlue">
                                        <p className="messageText colorWhite" > {ReactEmoji.emojify(element.mensaje)} </p>
                                    </div>
                                </div> :


                                <div key={indice} className="messageContainer justifyStart" >
                                    <div className="messageBox backgroundLight" >
                                        <p className="messageText colorDark" > {ReactEmoji.emojify(element.mensaje)} </p>
                                    </div>
                                </div>}

                        </>
                    )}
                    <div ref={divRef}></div>
                </div>
                <form onSubmit={submit} className='form'>

                    <input
                        className="input"
                        type="text"
                        placeholder="Type a message ..."
                        value={mensaje}
                        onChange={event => setMensaje(event.target.value)}
                        onKeyPress={event => event.key === 'Enter' ? submit : null} />
                    <button className="sendButton"> Send </button>
                </form>

            </div>


        </div>
    )
}

export default Chat
