import React,{useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import CounterContext from "../../context/CounterContext";
import riddles from '../riddles.json'

const CapsuleHeader = () => {
  const { counter, setCounter } = useContext(CounterContext);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{counter}/{riddles.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: 'rgba(15, 50, 100, 0.9)',
    borderRadius: 50,
    padding: 5,
    marginTop: 40,
    marginRight: 15,
    height: 30,
    width: 66,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CapsuleHeader;
