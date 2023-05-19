import globalStyles from "../GlobalStyles";
import { TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import { MaterialIcons,Entypo } from "@expo/vector-icons";

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
      style={{ ...globalStyles.button, ...styles,bottom:18}}
      onPress={() => {
        if (!hintAlertUsed) {
          // show ads
          Alert.alert(
            "Warning",
            "Before diving straight into the answer, take a peek at the helpful hint provided."
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
      <Entypo name="lifebuoy" size={40} color='rgba(15, 50, 100, 0.9)'/>
      <Text>Answer</Text>
    </TouchableOpacity>
  );
}
