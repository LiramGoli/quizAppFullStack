import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import EnlargePicModals from "../utils/Modals/EnlargedPicModal";
import SubmitButton from "../utils/Buttons/SubmitButton";
import AnsHintButtons from "../utils/Buttons/AnsAndHint";
import ImageDict from "../utils/ImageDict";
import { storeData, clearData } from "../localStorage/localStorage";
import UserContext from "../context/UserContext";
import { createUpdateRiddle, updateRiddle } from "../API/CollectDataAPI";
import BottomBanner from "../utils/Ads/bottomBanners";
import interstitial from "../utils/Ads/InterstitialAd";
import { AdEventType } from "react-native-google-mobile-ads";
import globalStyles from "../utils/GlobalStyles";

export default function Riddle({ route }) {
  const { riddle } = route.params;
  const { userData, setUserData } = useContext(UserContext);
  
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [answerByUser, setAnswerByUser] = useState("your answer");
  const [textAnswer, setTextAnswer] = useState("");
  const [picModalVisible, setPicModalVisible] = useState(false);
  const [hintAlertUsed, setHintAlertUsed] = useState(false);
  const [answerAlertUsed, setAnswerAlertUsed] = useState(false);
  const [wrongCounter, setWrongCounter] = useState(1);
  const [editablebuttons, setEditableButtons] = useState(true);

  useEffect(() => {
    checkDidQuestion();
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );
    interstitial.load();
    return unsubscribe;
  }, []);

  // taking the image fom ImageDict if id!=0
  let image;
  {
    riddle.image != 0
      ? (image = ImageDict[riddle.image].image)
      : (image = "no");
  }

  const saveAnswer = async (Correct) => {
    let newAnswer = [];
    let userAnswer = {
      id: riddle.id,
      difficulty: riddle.difficulty,
      usedHints: false,
      usedAnswer: false,
    };
    if (Correct) {
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

  const checkDidQuestion = async () => {
    // clearData()
    let didQuestion = false;
    if (!(userData == null)) {
      userData.forEach((answer, index) => {
        // user visited the question
        if (answer.id === riddle.id) {
          didQuestion = true;
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
      await createUpdateRiddle(riddle.id, riddle.difficulty);
      saveAnswer(false);
    }
  };

  const checkAnswer = async () => {
    for (let answer of riddle.answers) {
      if (
        answer.answer.toString().toLowerCase() ===
        textAnswer.toString().toLowerCase().trim()
      ) {
        Alert.alert("Correct", "yes! you have the right answer");
        await updateRiddle(riddle.id, (solved = true));
        setEditableButtons(false);
        saveAnswer(true);
        return;
      }
    }
    setWrongCounter((wrongCounter + 1) % 3);
    Alert.alert("Wrong", "Try Again");
    if (!wrongCounter) {
      interstitial.show();
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={globalStyles.riddleContainer}
        >
          <Text style={globalStyles.riddleTitle}>{riddle.title}</Text>

          {image !== "no" && (
            <TouchableOpacity onPress={() => setPicModalVisible(true)}>
              <Image style={globalStyles.riddleImage} source={image} />
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
            style={globalStyles.riddleTextInput}
            placeholder={answerByUser}
            onChangeText={textChangeHandler}
            editable={editablebuttons}
          />

          <AnsHintButtons
            hintAlertUsed={hintAlertUsed}
            useHint={riddle.hint}
            setHintAlertUsed={setHintAlertUsed}
            updateDBFunction={updateRiddle}
            riddleID={riddle.id}
            editable={editablebuttons}
            answerAlertUsed={answerAlertUsed}
            setAnswerAlertUsed={setAnswerAlertUsed}
            useAnswer={riddle.explanation}
          />

          <SubmitButton
            onPressFunction={checkAnswer}
            editable={editablebuttons}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <BottomBanner />
    </>
  );
}
