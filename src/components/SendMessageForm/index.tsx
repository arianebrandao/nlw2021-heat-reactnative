import React, { useState } from 'react';

import { TextInput, View } from 'react-native';
import { COLORS } from '../../theme';

import { Button } from '../Button'

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

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
        title="Enviar mensagem"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
      />
    </View>
  );
}