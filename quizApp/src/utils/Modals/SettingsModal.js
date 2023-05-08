import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { storeData } from "../../localStorage/localStorage";

const openWebsite = (url) => {
  Linking.openURL(url);
};

export default function SettingsModal({
  visible,
  onClose,
  settings,
  setSettings,
}) {
  const updateSettings = async (option) => {
    let settingsDict;

    if (option === "vibration") {
      settingsDict = { ...settings, vibration: !settings.vibration };
    } else if (option === "sound") {
      settingsDict = { ...settings, sound: !settings.sound };
    }

    setSettings(settingsDict);
    const jsonValue = JSON.stringify(settingsDict);

    try {
      await storeData("@Settings", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Entypo name="cross" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.heading}>Settings</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  openWebsite(
                    "https://brainteaseprivacypolicy.blogspot.com/2023/05/privacy-policy-for-brain-tease.html"
                  );
                }}
              >
                <Text style={styles.buttonText}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  updateSettings("sound");
                }}
              >
                {settings.sound ? (
                  <Text style={styles.buttonText}>Sound On</Text>
                ) : (
                  <Text style={styles.buttonText}>Sound Off</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => {
                  updateSettings("vibration");
                }}
              >
                {settings.vibration ? (
                  <Text style={styles.buttonText}>Vibration On</Text>
                ) : (
                  <Text style={styles.buttonText}>Vibration Off</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.aboutText}>Developed by: Liram Golibroda</Text>
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
    padding: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  heading: {
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "110%",
    backgroundColor: "rgba(15, 50, 100, 0.9)",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  aboutText: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
    fontSize: 16,
  },
};
