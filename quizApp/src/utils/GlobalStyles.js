import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(15, 50, 100, 0.9)',
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
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
  background: {
    flexWrap: "wrap",
    alignContent: "flex-start",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
export default globalStyles;
