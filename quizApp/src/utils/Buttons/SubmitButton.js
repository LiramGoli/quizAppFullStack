import React from "react";
import { Text, TouchableHighlight,StyleSheet } from "react-native";
const CustomButton=(props)=>{
    return(
        <TouchableHighlight
          style={styles.button}
          onPress={props.onPressFunction}
          underlayColor="#dddddd"
          disabled={!props.editable}
        >
          <Text style={styles.text}>Submit Answer</Text>
        </TouchableHighlight>
    )
}

const styles= StyleSheet.create({
    text: {
        color: "#ffffff",
        fontSize: 20,
        margin: 10,
        textAlign: "center",
      },
      button: {
        width: 250,
        height: 50,
        backgroundColor: 'rgba(15, 50, 100, 0.8)',
        alignItems: "center",
        borderRadius: 6,
      },
})
export default CustomButton;