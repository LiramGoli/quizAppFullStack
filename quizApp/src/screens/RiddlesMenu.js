import riddles from "../utils/riddles.json";
import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import UserContext from "../context/UserContext";
import BottomBanner from "../utils/Ads/bottomBanners";

export default function RiddlesMenu({ route, navigation }) {
  const { difficulty } = route.params;
  const { userData } = useContext(UserContext);

  const filteredRiddles = riddles.filter(
    (riddle) => riddle.difficulty === difficulty
  );

  let unsolvedRiddles = [];
  for (let i = 0; i < filteredRiddles.length; i++) {
    unsolvedRiddles.push(filteredRiddles[i].id);
  }
  

  const OpenRiddle = (id) => {
    const riddle = filteredRiddles.find((obj) => obj.id === id);
    navigation.navigate("Riddle", {
      riddle: riddle,
      unsolvedRiddles:unsolvedRiddles,
      OpenRiddle:OpenRiddle
    });
  };

  const findSolved = (id) => {
    if (userData !== null) {
      const foundItem = userData.find(
        (item) => item.id === id && item.solved === true
      );
      unsolvedRiddles = unsolvedRiddles.filter((item) => item.id !== id);
      return !!foundItem;
    }
    return false;
  };

  const data = filteredRiddles.map((riddle, index) => ({
    key: index.toString(),
    button: (
      <TouchableOpacity
        style={styles.button}
        onPress={() => OpenRiddle(riddle.id)}
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
    <>
      <FlatList
        data={rows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.content}>{item.map((i) => i.button)}</View>
        )}
      />
      <BottomBanner />
    </>
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
