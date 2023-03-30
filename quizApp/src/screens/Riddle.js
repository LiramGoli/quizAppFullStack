import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import EnlargePicModals from "../utils/EnlargedPicModal";
import SubmitButton from "../utils/SubmitButton";
import HintButton from "../utils/HintButton";
import AnswerButton from "../utils/AnsweButton";
import ImageDict from "../utils/ImageDict";
import { storeData, clearData } from "../localStorage/localStorage";
import UserContext from "../context/UserContext";

export default function Riddle({ route }) {
  const { riddle } = route.params;
  const { userData, setUserData } = useContext(UserContext);

  const [answerByUser, setAnswerByUser] = useState("your answer");
  const [textAnswer, setTextAnswer] = useState("");
  const [picModalVisible, setPicModalVisible] = useState(false);
  const [hintAlertUsed, setHintAlertUsed] = useState(false);
  const [answerAlertUsed, setAnswerAlertUsed] = useState(false);
  const [wrongCounter, setWrongCounter] = useState(1);
  const [editablebuttons, setEditableButtons] = useState(true);

  useEffect(() => {
    checkDidQuestion();
  }, []);

  // taking the image fom ImageDict if id!=0
  let image;
  {
    riddle.image != 0
      ? (image = ImageDict[riddle.image].image)
      : (image = "no");
  }

  const saveAnswer = async (Correct) => {
    console.log("here");
    let newAnswer = [];
    let userAnswer = {
      id: riddle.id,
      difficulty: riddle.difficulty,
      usedHints: false,
      usedAnswer: false,
    };
    if (Correct) {
      console.log("im here");
      answer = {
        ...userAnswer,
        answer: textAnswer,
        solved: true,
        usedHints: hintAlertUsed,
        usedAnswer: answerAlertUsed,
      };
      newAnswer = userData.filter((obj) => obj.id !== answer.id);
      newAnswer = userData != null ? [...newAnswer, answer] : [answer];
    } else {
      answer = { ...userAnswer, answer: "", solved: false };
      newAnswer = userData != null ? [...userData, answer] : [answer];
    }
    setUserData(newAnswer);
    const jsonValue = JSON.stringify(newAnswer);
    try {
      await storeData("@riddleData", jsonValue);
    } catch (error) {}
  };

  const textChangeHandler = (value) => {
    setTextAnswer(value);
  };

  const checkDidQuestion = () => {
    let didQuestion = false;
    if (!(userData == null)) {
      userData.forEach((answer, index) => {
        // user visited the question
        if (answer.id === riddle.id) {
          didQuestion = true;
          //need to think about it...
          // setHintAlertUsed(answer.usedHints);
          // setAnswerAlertUsed(answer.usedAnswer);
          if (answer.solved) {
            setEditableButtons(false);
            setAnswerByUser(answer.answer);
            setHintAlertUsed(true);
            setAnswerAlertUsed(true);
          }
          return false; // this will exit the forEach loop entirely
        }
      });
    }
    if (userData == null || didQuestion === false) {
      saveAnswer(false);
    }
  };

  const checkAnswer = () => {
    for (let answer of riddle.answers) {
      if (
        answer.answer.toString().toLowerCase() ===
        textAnswer.toString().toLowerCase().trim()
      ) {
        Alert.alert("Correct", "yes! you have the right answer");
        setEditableButtons(false);
        setHintAlertUsed(true);
        setAnswerAlertUsed(true);
        saveAnswer(true);
        return;
      }
    }
    setWrongCounter((wrongCounter + 1) % 3);
    Alert.alert("Wrong", "Try Again");
    if (!wrongCounter) {
      console.log("ad video here");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>{riddle.title}</Text>

        {image !== "no" && (
          <TouchableOpacity onPress={() => setPicModalVisible(true)}>
            <Image style={styles.image} source={image} />
          </TouchableOpacity>
        )}

        {image !== "no" && (
          <EnlargePicModals
            picModalVisible={picModalVisible}
            setPicModalVisible={setPicModalVisible}
            image={image}
          />
        )}

        <TextInput
          style={styles.TextInput}
          placeholder={answerByUser}
          onChangeText={textChangeHandler}
          editable={editablebuttons}
        />

        <HintButton
          hintAlertUsed={hintAlertUsed}
          useHint={riddle.hint}
          setHintAlertUsed={setHintAlertUsed}
          editable={editablebuttons}
        />

        <AnswerButton
          hintAlertUsed={hintAlertUsed}
          answerAlertUsed={answerAlertUsed}
          setAnswerAlertUsed={setAnswerAlertUsed}
          useAnswer={riddle.explanation}
          styles={{ left: 90 }}
        />

        <SubmitButton
          onPressFunction={checkAnswer}
          editable={editablebuttons}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    margin: 30,
    width: 250,
    height: 150,
    resizeMode: "stretch",
  },
  TextInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    textAlign: "center",
    margin: 30,
    borderStyle: "dotted",
  },
});
