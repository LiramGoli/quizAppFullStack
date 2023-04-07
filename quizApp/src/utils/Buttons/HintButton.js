import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function HintButton({
  hintAlertUsed,
  setHintAlertUsed,
  useHint,
  editable,
  updateDBFunction,
  showRewardAd,
  riddleID,
}) {
  const [disabled, setDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setDisabled(false);
    }
  }, [timeLeft]);

  const buttonStyle = disabled ? style.disabledButton : style.enabledButton;

  return (
    <TouchableOpacity
      style={{ ...globalStyles.button, ...buttonStyle }}
      onPress={() => {
        if (!hintAlertUsed && !disabled) {
          const watched = showRewardAd();
          console.log(watched);
          if (watched) {
            updateDBFunction(
              (id = riddleID),
              (solved = false),
              (hints = true),
              (answer = false)
            );
            setHintAlertUsed(true);
            Alert.alert("Hint", useHint);
          }
        } else Alert.alert("Hint", useHint);
      }}
      disabled={!editable || disabled}
    >
      {disabled && <Text style={{ color: "white" }}>{`${timeLeft}`}</Text>}
      <MaterialIcons name="lightbulb" size={40} color="#ffffff" />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  disabledButton: {
    backgroundColor: "lightgrey",
  },
  enabledButton: {
    backgroundColor: "#2196F3",
  },
});
