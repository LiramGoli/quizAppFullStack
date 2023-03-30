import globalStyles from "./GlobalStyles";
import { TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HintButton({
  hintAlertUsed,
  answerAlertUsed,
  setAnswerAlertUsed,
  useAnswer,
  styles = null,
}) {
  return (
    <TouchableOpacity
      style={{ ...globalStyles.button, ...styles }}
      onPress={() => {
        if (!hintAlertUsed) {
          // show ads
          Alert.alert(
            "Warning",
            "You have to use the hint first..\natleast give it a shot"
          );
        } else {
          if (!answerAlertUsed) {
            // show ads
            setAnswerAlertUsed(true);
          }
          Alert.alert("Answer", useAnswer);
        }
      }}
    >
      <MaterialIcons name="lightbulb" size={40} color="#ffffff" />
    </TouchableOpacity>
  );
}
