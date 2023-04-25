import React from "react";
import { StyleSheet, View, Image } from "react-native";
import CapsuleHeader from "./CapsuleHeader";


const CustomHeaderFront = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.capsuleContainer}>
        <CapsuleHeader />
      </View>
      <Image
        source={require("../../../assets/logoNoBG.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 350,
    // alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  capsuleContainer: {
    marginTop: -20,
    // marginLeft:260,
  },
  logo: {
    flex: 1,
    height: "100%",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default CustomHeaderFront;
