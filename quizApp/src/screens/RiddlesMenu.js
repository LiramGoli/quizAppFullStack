import riddles from "../utils/riddles.json";
import React, {useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {Entypo } from "@expo/vector-icons";
import UserContext from "../context/UserContext";

export default function RiddlesMenu({ route, navigation }) {
  const { difficulty } = route.params;
  const { userData, setUserData } = useContext(UserContext);

  const filteredRiddles = riddles.filter(
    (riddle) => riddle.difficulty === difficulty
  );

  const onPressHandler = (riddle) => {
    navigation.navigate("Riddle", {
      riddle: riddle,
    });
  };

  const findSolved = (id) => {
    if(userData!==null){
      const foundItem = userData.find(
        (item) => item.id === id && item.solved === true
      );
      return !!foundItem;
    }
    return false
    
  };

  const data = filteredRiddles.map((riddle, index) => ({
    key: index.toString(),
    button: (
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPressHandler(riddle)}
      >
        <View style={styles.iconContainer}>
          {findSolved(riddle.id) === false ? (
            <Entypo name="help" size={40} color="black" />
          ) : (
            <Entypo name="emoji-happy" size={40} color="black" />
          )}
        </View>
      </TouchableOpacity>
    ),
  }));

  const rows = [];
  for (let i = 0; i < data.length; i += 4) {
    rows.push(data.slice(i, i + 4));
  }

  return (
    <FlatList
      data={rows}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.content}>
          {item.map((i) => i.button)}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "center",
    paddingTop: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
