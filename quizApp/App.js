import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RiddleStack from "./src/routes/RiddleStack";
import { retrieveData } from "./src/localStorage/localStorage";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import CounterContext from "./src/context/CounterContext";
import LottieView from "lottie-react-native";
import globalStyles from "./src/utils/GlobalStyles";

export default function App() {
  const [userData, setUserData] = useState();
  const [counter, setCounter] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMyObject().then(({ data, numSolved }) => {
      if (isMounted) {
        setUserData(data);
        setCounter(numSolved);
        // setLoading(false);
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
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      const numSolved = solvedJson != null ? JSON.parse(solvedJson) : 0;
      return { data, numSolved };
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
      <CounterContext.Provider value={{ counter, setCounter }}>
        <StatusBar translucent backgroundColor="transparent" style="" />
        <NavigationContainer>
          <RiddleStack />
        </NavigationContainer>
      </CounterContext.Provider>
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
