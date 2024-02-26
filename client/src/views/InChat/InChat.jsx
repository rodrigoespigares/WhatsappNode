import React from 'react';
import './InChat.css';
import Chat from '../../components/Chat/Chat';
import UsersList from '../../components/UsersList/UsersList';
import Info from '../../components/Info/Info';

export default function InChat() {
  return (
    <div className='carga'>
        <div className='h-100 users__confi'>
          <Info></Info>
          <UsersList></UsersList>
        </div>
        <Chat></Chat>
    </div>
  )
}
