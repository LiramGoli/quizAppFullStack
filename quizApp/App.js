import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RiddleStack from "./src/routes/RiddleStack";
import { retrieveData } from "./src/localStorage/localStorage";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import CounterContext from "./src/context/CounterContext";
import SettingsContext from "./src/context/SettingsContext";
import LottieView from "lottie-react-native";
import globalStyles from "./src/utils/GlobalStyles";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

export default function App() {
  const [userData, setUserData] = useState();
  const [counter, setCounter] = useState();
  const [settings, setSettings] = useState();
  const [loading, setLoading] = useState(true);

  //google mobile ads
  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ["EMULATOR","personal phone"],
      })
      .then(() => {
        // Request config successfully set!
      });
  },[]);

  useEffect(() => {
    let isMounted = true;
    getMyObject().then(({ data, numSolved, settingsAsync }) => {
      if (isMounted) {
        setUserData(data);
        setCounter(numSolved);
        setSettings(settingsAsync);
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const getMyObject = async () => {
    try {
      const jsonValue = await retrieveData("@riddleData");
      const solvedJson = await retrieveData("@NumSolved");
      const settingsJson = await retrieveData("@Settings");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      const numSolved = solvedJson != null ? JSON.parse(solvedJson) : 0;
      const settingsAsync =
        settingsJson != null
          ? JSON.parse(settingsJson)
          : { sound: true, vibration: true };
      return { data, numSolved, settingsAsync };
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require("./assets/Lottie/background.json")}
          autoPlay
          loop
          style={globalStyles.background}
          resizeMode="cover"
        />
        <LottieView
          source={require("./assets/Lottie/logo.json")}
          style={{ height: 200, width: 200 }}
          autoPlay
          loop
          resizeMode="cover"
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <CounterContext.Provider value={{ counter, setCounter }}>
          <StatusBar translucent backgroundColor="transparent" style="" />
          <NavigationContainer>
            <RiddleStack />
          </NavigationContainer>
        </CounterContext.Provider>
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
