import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { confirmUnfreeze, cancelUnfreeze } from '../store/cardSlice';

const CORRECT_PIN = '1234'; // In a real app, this would be stored securely

export default function PinModal({ visible }: { visible: boolean }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (pin === CORRECT_PIN) {
      dispatch(confirmUnfreeze());
      setPin('');
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const handleCancel = () => {
    dispatch(cancelUnfreeze());
    setPin('');
    setError('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Enter PIN to Unfreeze</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            placeholder="Enter 4-digit PIN"
            placeholderTextColor="#666"
          />
          <View style={styles.buttons}>
            <Pressable style={styles.button} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable 
              style={[styles.button, styles.confirmButton]} 
              onPress={handleConfirm}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  error: {
    color: '#ff3b30',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    color: '#ffffff',
    fontSize: 24,
    height: 48,
    marginBottom: 24,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  buttonText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30',
  },
  confirmButtonText: {
    color: '#ffffff',
  },
});