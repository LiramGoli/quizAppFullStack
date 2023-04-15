import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HintButton({
  updateDBFunction,
  showRewardAd,
  riddleID,
  userUsedHint,
}) {
  return (
    <TouchableOpacity
      style={{ ...globalStyles.button}}
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
    >
      <MaterialIcons name="lightbulb" size={40} color="#ffffff" />
    </TouchableOpacity>
  );
}
