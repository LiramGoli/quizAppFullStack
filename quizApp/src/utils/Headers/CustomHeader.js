import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import CapsuleHeader from "./CapsuleHeader";

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <CapsuleHeader />
      <View style={{marginBottom:13}}/>
      <Image
        source={require("../../../assets/LogoTextNoBG.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  logo: {
    marginTop: 13,
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default CustomHeader;
