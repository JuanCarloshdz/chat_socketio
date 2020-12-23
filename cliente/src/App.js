import { useState } from 'react'
import './App.css';
import Chat from './componentes/Chat';
//import socket from './componentes/Socket'


import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'


function App() {
  //socket.emit( 'conectado' ,'Hola desde el cliente' );

  const [nombre, setNombre] = useState('')
  const [registrado, setRegistrado] = useState(false);

  const registrar = (event) => {
    event.preventDefault();
    if (nombre !== "") {
      setRegistrado(true)
    }
  }
  return (

    <Router>
      <div className="">
        {!registrado &&
          <div className="login">

            <Link to="/" >
              <img
                className='login__logo'
                src="https://raw.githubusercontent.com/JuanCarloshdz/imagenes/main/icono.png"
                alt="" />
            </Link>

            <div className="login__container">
              <h1>Sign-in</h1>
              
              <form onSubmit={registrar}>
              <h5><label htmlFor="user">User</label></h5>
                
                <input
                  id='user'
                  value={nombre}
                  onChange={event => setNombre(event.target.value)} />

                <button className='login__signInButton'> Ir al chat</button>
              </form>

            </div>

          </div>

        }

        {registrado && <Chat nombre={nombre} />}
      </div>


    </Router>





  );
}

export default App;
