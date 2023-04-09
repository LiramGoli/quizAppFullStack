import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function HintButton({
  editable,
  updateDBFunction,
  showRewardAd,
  riddleID,
  userUsedHint,
}) {
  const [disabled, setDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

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
          const watched = showRewardAd();
          if (watched && !userUsedHint) {
            updateDBFunction(
              (id = riddleID),
              (solved = false),
              (hints = true),
              (answer = false)
            );
          }
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
