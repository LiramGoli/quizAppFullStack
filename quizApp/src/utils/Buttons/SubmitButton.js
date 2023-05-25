import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
const CustomButton = (props) => {

  let buttonText = "Next Question";
  if (props.editable == 1) {
    buttonText = "Submit Answer";
  } else if (props.editable === 2) {
    buttonText = "Back to Menu";
  }
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={props.onPressFunction}
      underlayColor="#dddddd"
    >
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "rgba(15, 50, 100, 0.8)",
    alignItems: "center",
    borderRadius: 6,
  },
});
export default CustomButton;
