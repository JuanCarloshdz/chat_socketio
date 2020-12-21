import {useState} from 'react'
import './App.css';
import Chat from './componentes/Chat';
//import socket from './componentes/Socket'

function App() {
  //socket.emit( 'conectado' ,'Hola desde el cliente' );

  const [nombre, setNombre] = useState('')
  const [registrado, setRegistrado] = useState(false);

  const registrar = (event) =>{
    event.preventDefault();
    if(nombre !== ""){
      setRegistrado(true)
    }
  }
  return (
    <div className="App">
      {!registrado && <form onSubmit={registrar}>
        <label htmlFor="">Introdusca su nombre</label>
        <input 
          value={nombre}
          onChange={ event => setNombre(event.target.value)}/>
        
        <button> Ir al chat</button>
      </form>}

      {registrado && <Chat nombre={nombre} />}
    </div>
  );
}

export default App;
