import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client'

import { api } from '../../services/api';
import { Message } from '../Message';

import { styles } from './styles';

import { MESSAGES_EXAMPLE } from '../../utils/messages'

type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

//let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE
let messagesQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {

  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([])

  // Traz as 3 últimas msg
  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3')
      setCurrentMessages(messagesResponse.data)
    }

    fetchMessages();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0], prevState[0], prevState[1]
        ]);

        messagesQueue.shift()
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [])

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(message => <Message key={message.id} data={message} />)}

    </ScrollView>
  );
}