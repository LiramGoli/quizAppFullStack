import { TouchableOpacity, Alert } from "react-native";
import globalStyles from "../GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function AnsHintButtons({
    hintAlertUsed,
    setHintAlertUsed,
    useHint,
    editable,
    updateDBFunction,
    riddleID,
    answerAlertUsed,
    setAnswerAlertUsed,
    useAnswer,
}) {
  return (
    <>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => {
          if (!hintAlertUsed) {
            updateDBFunction(
              (id = riddleID),
              (solved = false),
              (hints = true),
              (answer = false)
            );
            // show ads
            setHintAlertUsed(true);
          }
          Alert.alert("Hint", useHint);
        }}
        disabled={!editable}
      >
        <MaterialIcons name="lightbulb" size={40} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...globalStyles.button, left: 90 }}
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
      >
        <MaterialIcons name="support" size={40} color="#ffffff" />
      </TouchableOpacity>
    </>
  );
}
