import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/LogoTextNoBG.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <View/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height:100,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#fff",
    paddingHorizontal: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  logo: {
    marginTop:11,
    width: 130,
    height: 80,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default CustomHeader;
