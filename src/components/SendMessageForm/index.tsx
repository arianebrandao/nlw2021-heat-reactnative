import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button'

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {

      try {
        setSendingMessage(true)
        await api.post('/messages', { message: messageFormatted })

        setMessage('')
        Keyboard.dismiss()
        setSendingMessage(false)
        Alert.alert('Mensagem enviada com sucesso!')
      } catch (err) {
        if( err instanceof Error) {
          Alert.alert('Oops... algo deu errado. Por favor, tente novamente.', err.message)
        } else {
          Alert.alert('Oops... algo deu errado. Por favor tente novamente')
          console.log(err)
        }
      }
      
    } else {
      Alert.alert('Escreva a mensagem para enviar.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setMessage}
        value={message}
        style={styles.input}
        editable={!sendingMessage}

        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
      />

      <Button
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}

        title="Enviar mensagem"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
      />
    </View>
  );
}