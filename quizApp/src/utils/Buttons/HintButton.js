import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, StyleSheet, Text } from "react-native";
import { MaterialIcons,MaterialCommunityIcons } from "@expo/vector-icons";

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
      {/* <MaterialIcons name="lightbulb" size={40} color="#ffffff" /> */}
      <MaterialCommunityIcons name="lightbulb-on-outline" size={45} color='rgba(15, 50, 100, 0.9)' />
      <Text>Hint</Text>

    </TouchableOpacity>
  );
}
