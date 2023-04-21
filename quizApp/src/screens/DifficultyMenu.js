import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomBanner from "../utils/Ads/bottomBanners";
import LottieView from "lottie-react-native";
import globalStyles from "../utils/GlobalStyles";
import CustomHeaderFront from "../utils/CustomHeaderFront";
import CounterContext from "../context/CounterContext";
import { useContext } from "react";

const DifficultyMenu = ({ navigation }) => {
  const { counter } = useContext(CounterContext);

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
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/Lottie/background.json")}
        autoPlay
        loop
        style={globalStyles.background}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <CustomHeaderFront />
      </View>
      <View style={styles.content}>
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
          disabled={counter<3}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="Hard"
          style={styles.button}
          onPress={() => {
            pressHandler("Hard");
          }}
          disabled={counter<5}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>
      <BottomBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    marginBottom:50,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop:200
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
    width:120
  },
  animation: {
    flexWrap: "wrap",
    alignContent: "flex-start",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

export default DifficultyMenu;
