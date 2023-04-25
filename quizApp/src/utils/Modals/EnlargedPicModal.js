import { Modal, View, TouchableWithoutFeedback, Image } from "react-native";
import globalStyles from "../GlobalStyles";

import React from "react";

export default function EnlargedPicModal({
  picModalVisible,
  setPicModalVisible,
  image,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={picModalVisible}
      onRequestClose={() => {
        setPicModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback >
        <View style={globalStyles.modalImageContainer}>
          <Image style={globalStyles.modalImage} source={image} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
