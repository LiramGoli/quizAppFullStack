import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import LottieView from "lottie-react-native";
import ModalAnimationDict from "../ModalAnimationDict";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function SuccessModal({
  visible,
  onNextQuestion,
  onGoToMenu,
  setFinishedQuestion,
}) {
  const closeModal = () => {
    setFinishedQuestion(false);
  };
  const chooseAnimation = () => {
    let size = Object.keys(ModalAnimationDict).length;
    const num = Math.floor(Math.random() * size) + 1;
    return ModalAnimationDict[num].image;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={chooseAnimation()}
              autoPlay
              loop={false}
              style={{ width: 100, height: 100 }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.successText}>
              Correct!{"\n"}You have the right answer.
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ ...styles.button }}
                onPress={onGoToMenu}
              >
                <Entypo name="back" size={25} color="white" />
                {/* <FontAwesome5 name="backward" size={25} color="white"/> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, flex: 5 }}
                onPress={onNextQuestion}
              >
                <Text style={styles.buttonText}>Next Question</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#3f9dfc",
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    margin: 3,
    // minWidth: "50%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22
  },
};
