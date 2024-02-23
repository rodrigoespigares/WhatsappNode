import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import './App.css'
import Chat from './components/Chat/Chat';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  

  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    
    socket.on("entradaUsuarios", (msg) => {console.log(msg)})
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
    
  }, []);

  
  
  return (
    <div className="App">
      <Chat></Chat>
      
    </div>
  );
}
