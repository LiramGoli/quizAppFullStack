import React from 'react';
import { View, Modal, ActivityIndicator, Text } from 'react-native';

const LoadingModal = ({ visible }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={() => {}}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading ad...</Text>
      </View>
    </View>
  </Modal>
);

export default LoadingModal;
