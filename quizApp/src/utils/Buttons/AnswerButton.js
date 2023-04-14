import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HintButton({
  hintAlertUsed,
  updateDBFunction,
  riddleID,
  showRewardAd,
  styles = null,
  userUsedAnswer,
}) {

  return (
    <TouchableOpacity
      style={{ ...globalStyles.button, ...styles}}
      onPress={() => {
        if (!hintAlertUsed) {
          // show ads
          Alert.alert(
            "Warning",
            "You have to use the hint first..\natleast give it a shot"
          );
        } else {
          const watched = showRewardAd();
          if (watched && !userUsedAnswer) {
            showRewardAd();
            updateDBFunction(
              (id = riddleID),
              (solved = false),
              (hints = false),
              (answer = true)
            );
          }
        }
      }}
    >
      <MaterialIcons name="support" size={40} color="#ffffff" />
    </TouchableOpacity>
  );
}
