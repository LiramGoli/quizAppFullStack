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
import CustomHeaderFront from "../utils/Headers/CustomHeaderFront";
import CounterContext from "../context/CounterContext";
import { useContext, useRef, useCallback, useState } from "react";
import SettingsButton from "../utils/Buttons/SettingsButton";
import SettingsModal from "../utils/Modals/SettingsModal";
import SettingsContext from "../context/SettingsContext";

const DifficultyMenu = ({ navigation }) => {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const { settings, setSettings } = useContext(SettingsContext);
  const { counter } = useContext(CounterContext);
  const animHard = useRef(new Animated.Value(0));
  const animMedium = useRef(new Animated.Value(0));

  const shake = useCallback((anim) => {
    settings.vibration ? Vibration.vibrate() : null;
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
  }, [settings]);

  const onPressSettings = () => {
    setOpenSettingsModal(!openSettingsModal);
  };

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

      <SettingsModal
        visible={openSettingsModal}
        onClose={onPressSettings}
        settings={settings}
        setSettings={setSettings}
      />

      <View style={{ ...styles.content, flex: 1 }}>
        <View>
          <TouchableOpacity
            key="Easy"
            hitSlop={10}
            style={{ ...styles.button }}
            onPress={() => {
              pressHandler("Easy");
            }}
          >
            <Text style={styles.buttonText}>Easy</Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{ transform: [{ translateX: animMedium.current }] }}
        >
          <TouchableOpacity
            key="Medium"
            style={[styles.button, counter < 15 && styles.disabledButton]}
            onPress={() => {
              counter < 15 ? shake(animMedium) : pressHandler("Medium");
            }}
          >
            {counter < 15 && (
              <Text style={styles.buttonText}>{counter % 25}/15</Text>
            )}
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateX: animHard.current }] }}
        >
          <TouchableOpacity
            key="Hard"
            style={[styles.button, counter < 25 && styles.disabledButton]}
            onPress={() => {
              counter < 25 ? shake(animHard) : pressHandler("Hard");
            }}
          >
            {counter < 25 && (
              <Text style={styles.buttonText}>{counter % 25}/25</Text>
            )}
            <Text style={styles.buttonText}>Hard</Text>
          </TouchableOpacity>
        </Animated.View>
        <SettingsButton onPressSettings={onPressSettings} />
      </View>
      <BottomBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "rgba(15, 50, 100, 0.7)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
    width: 190,
    height: 60,
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default DifficultyMenu;
