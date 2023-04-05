import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0080ff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    bottom: 20,
    elevation: 5,
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  riddleContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  riddleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  riddleImage: {
    margin: 30,
    width: 250,
    height: 150,
    resizeMode: "stretch",
  },
  riddleTextInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    textAlign: "center",
    margin: 30,
    borderStyle: "dotted",
  },
});
export default globalStyles;
