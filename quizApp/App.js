import { StatusBar } from "expo-status-bar";
import "expo-dev-client";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RiddleStack from "./src/routes/RiddleStack";
import { retrieveData } from "./src/localStorage/localStorage";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";

export default function App() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyObject().then((data) => {
      setUserData(data);
      setLoading(false);
    });
  }, []);

  const getMyObject = async () => {
    try {
      const jsonValue = await retrieveData("@riddleData");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      return data;
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
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationContainer>
        <RiddleStack />
      </NavigationContainer>
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
