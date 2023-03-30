import globalStyles from "./GlobalStyles";
import { TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HintButton({
  hintAlertUsed,
  setHintAlertUsed,
  useHint,
  styles=null,
  editable
}) {
  return (
    <TouchableOpacity
      style={{ ...globalStyles.button, ...styles }}
      onPress={() => {
        if (!hintAlertUsed) {
          // show ads
          setHintAlertUsed(true);
        }
        Alert.alert("Hint", useHint);
      }}
      disabled={!editable}
    >
      <MaterialIcons name="support" size={40} color="#ffffff" />
    </TouchableOpacity>
  );
}
