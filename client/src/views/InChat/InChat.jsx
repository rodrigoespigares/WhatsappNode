import React from 'react';
import './InChat.css';
import Chat from '../../components/Chat/Chat';
import UsersList from '../../components/UsersList/UsersList';

export default function InChat() {
  return (
    <div className='carga'>
        <UsersList></UsersList>
        <Chat></Chat>
    </div>
  )
}
