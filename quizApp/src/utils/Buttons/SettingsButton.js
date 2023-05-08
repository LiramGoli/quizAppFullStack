import globalStyles from "../GlobalStyles";
import { TouchableOpacity} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function SettingsButton({ onPressSettings }) {
  return (
    <TouchableOpacity
      style={{ ...globalStyles.button, bottom: 10, left: 5 }}
      onPress={onPressSettings}
    >
      <SimpleLineIcons name="settings" size={40} color='rgba(15, 50, 100, 0.9)' />
    </TouchableOpacity>
  );
}
