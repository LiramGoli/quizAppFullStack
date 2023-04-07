import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function HintButton({
  hintAlertUsed,
  updateDBFunction,
  riddleID,
  answerAlertUsed,
  setAnswerAlertUsed,
  useAnswer,
  showRewardAd,
  styles = null,
}) {
  const [disabled, setDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

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
      style={{ ...globalStyles.button, ...styles, ...buttonStyle }}
      onPress={() => {
        if (!hintAlertUsed) {
          // show ads
          Alert.alert(
            "Warning",
            "You have to use the hint first..\natleast give it a shot"
          );
        } else {
          if (!answerAlertUsed) {
            showRewardAd();
            updateDBFunction(
              (id = riddleID),
              (solved = false),
              (hints = false),
              (answer = true)
            );
            setAnswerAlertUsed(true);
          }
          Alert.alert("Answer", useAnswer);
        }
      }}
      disabled={disabled}
    >
      {disabled && <Text style={{ color: "white" }}>{`${timeLeft}`}</Text>}
      <MaterialIcons name="support" size={40} color="#ffffff" />
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
