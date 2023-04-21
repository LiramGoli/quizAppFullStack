import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Vibration,
} from "react-native";
import BottomBanner from "../utils/Ads/bottomBanners";
import LottieView from "lottie-react-native";
import globalStyles from "../utils/GlobalStyles";
import CustomHeaderFront from "../utils/CustomHeaderFront";
import CounterContext from "../context/CounterContext";
import { useContext, useRef, useCallback } from "react";

const DifficultyMenu = ({ navigation }) => {
  const { counter } = useContext(CounterContext);
  const animHard = useRef(new Animated.Value(0));
  const animMedium = useRef(new Animated.Value(0));

  const shake = useCallback((anim) => {
    Vibration.vibrate();
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start();
  }, []);

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
        <Animated.View
          style={{ transform: [{ translateX: animMedium.current }] }}
        >
          <TouchableOpacity
            key="Medium"
            style={[styles.button, counter < 3 && styles.disabledButton]}
            onPress={() => {
              counter < 3 ? shake(animMedium) : pressHandler("Hard");
            }}
          >
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateX: animHard.current }] }}
        >
          <TouchableOpacity
            key="Hard"
            style={[styles.button, counter < 5 && styles.disabledButton]}
            onPress={() => {
              counter < 5 ? shake(animHard) : pressHandler("Hard");
            }}
          >
            <Text style={styles.buttonText}>Hard</Text>
          </TouchableOpacity>
        </Animated.View>
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
    marginBottom: 50,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
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
    width: 120,
  },
  animation: {
    flexWrap: "wrap",
    alignContent: "flex-start",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default DifficultyMenu;
