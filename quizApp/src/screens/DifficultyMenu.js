
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomBanner from "../utils/Ads/bottomBanners";


const DifficultyMenu = ({ navigation}) => {

  const Difficulty = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  const pressHandler = (title) => {
    navigation.navigate("Riddles_Menu", {
      difficulty: Difficulty[title],
    });
  };

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity
        key="Easy"
        style={styles.button}
        onPress={() => {
          pressHandler("Easy");
        }}
      >
        <Text style={styles.buttonText}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key="Medium"
        style={styles.button}
        onPress={() => {
          pressHandler("Medium");
        }}
      >
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key="Hard"
        style={styles.button}
        onPress={() => {
          pressHandler("Hard");
        }}
      >
        <Text style={styles.buttonText}>Hard</Text>
      </TouchableOpacity>
    </View>
    <BottomBanner/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
});

export default DifficultyMenu;
