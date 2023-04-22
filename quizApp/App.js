import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RiddleStack from "./src/routes/RiddleStack";
import { retrieveData } from "./src/localStorage/localStorage";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import CounterContext from "./src/context/CounterContext";


export default function App() {
  const [userData, setUserData] = useState();
  const [counter, setCounter] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyObject().then(({data,numSolved}) => {
      console.log(numSolved);
      console.log(typeof(numSolved));
      setUserData(data);
      setCounter(numSolved)
      setLoading(false);
    });
  }, []);

  const getMyObject = async () => {
    try {
      const jsonValue = await retrieveData("@riddleData");
      const solvedJson= await retrieveData("@NumSolved");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      const numSolved= solvedJson != null ? JSON.parse(solvedJson):0;
      return {data,numSolved};
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <CounterContext.Provider value={{ counter, setCounter }}>
        <StatusBar translucent backgroundColor="transparent" />
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
