import riddles from "../utils/riddles.json";
import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import UserContext from "../context/UserContext";
import BottomBanner from "../utils/Ads/bottomBanners";
import LottieView from "lottie-react-native";
import globalStyles from "../utils/GlobalStyles";
import CustomHeader from "../utils/CustomHeader";

export default function RiddlesMenu({ route, navigation }) {
  const { difficulty } = route.params;
  const { userData } = useContext(UserContext);

  const difficultyEnum = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
  };

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
      unsolvedRiddles: unsolvedRiddles,
    });
  };

  const findSolved = (id) => {
    if (userData !== null) {
      const foundItem = userData.find(
        (item) => item.id === id && item.solved === true
      );
      if (!!foundItem)
        unsolvedRiddles = unsolvedRiddles.filter((item) => item !== id);
      return !!foundItem;
    }
    return false;
  };

  const data = filteredRiddles.map((riddle, index) => ({
    key: index.toString(),
    button: (
      <TouchableOpacity
        style={
          findSolved(riddle.id) === false ? styles.button : {...styles.button,backgroundColor: "rgba(90, 250, 30, 0.3)"}
        }
        onPress={() => OpenRiddle(riddle.id)}
      >
        <View style={styles.iconContainer}>
          {findSolved(riddle.id) === false ? (
            <Entypo name="help" size={30} color="black" />
          ) : (
            <Entypo name="check" size={30} color="black" />
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
      <LottieView
        source={require("../../assets/Lottie/background.json")}
        autoPlay
        loop
        style={globalStyles.background}
        resizeMode="cover"
      />
      <CustomHeader title={difficultyEnum[difficulty]} />
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
    borderStyle: "dashed",
    backgroundColor: "rgba(50, 90, 120, 0.2)",
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
