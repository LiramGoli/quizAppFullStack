import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  TextInput,
  Vibration,
} from "react-native";

import riddles from "../utils/riddles.json";
import UserContext from "../context/UserContext";
import CounterContext from "../context/CounterContext";
import SettingsContext from "../context/SettingsContext";
import HintButton from "../utils/Buttons/HintButton";
import AnswerButton from "../utils/Buttons/AnswerButton";
import SubmitButton from "../utils/Buttons/SubmitButton";

import LoadingModal from "../utils/Modals/LoadingModal";
import EnlargePicModals from "../utils/Modals/EnlargedPicModal";
import SuccessModal from "../utils/Modals/CorrectAnswerModal";
import LastQuestionModal from "../utils/Modals/LastQuestionModal";

import ImageDict from "../utils/ImageDict";
import { storeData, clearData } from "../localStorage/localStorage";
import { createUpdateRiddle, updateRiddle } from "../API/CollectDataAPI";

import BottomBanner from "../utils/Ads/bottomBanners";
import { interstitial } from "../utils/Ads/InterstitialAd";
import {
  hintRewardedInterstitial,
  loadRewardHintAd,
} from "../utils/Ads/RewardAdHints";
import {
  ansRewardedInterstitial,
  loadRewardAnsAd,
} from "../utils/Ads/RewardAnsAd";
import globalStyles from "../utils/GlobalStyles";
import { AdEventType } from "react-native-google-mobile-ads";
import LottieView from "lottie-react-native";
import fullScreenAnimationDict from "../utils/FullScreenAnimationDict";
import CustomHeader from "../utils/Headers/CustomHeader";

export default function Riddle({ navigation, route }) {
  const { riddle, unsolvedRiddles } = route.params;
  const { userData, setUserData } = useContext(UserContext);
  const { counter, setCounter } = useContext(CounterContext);
  const { settings } = useContext(SettingsContext);
  const [userUsedHint, setUserUsedHint] = useState(false);
  const [userUsedAnswer, setUserUsedAnswer] = useState(false);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [hintRewardInterstitialLoaded, setHintRewardInterstitialLoaded] =
    useState(false);
  const [ansRewardInterstitialLoaded, setAnsRewardInterstitialLoaded] =
    useState(false);
  const [answerByUser, setAnswerByUser] = useState("your answer");
  const [textAnswer, setTextAnswer] = useState("");
  const [picModalVisible, setPicModalVisible] = useState(false);
  const [hintAlertUsed, setHintAlertUsed] = useState(false);
  const [answerAlertUsed, setAnswerAlertUsed] = useState(false);
  const [wrongCounter, setWrongCounter] = useState(1);
  const [editablebuttons, setEditableButtons] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [finishedQuestion, setFinishedQuestion] = useState(false);

  //adHints
  useEffect(() => {
    if (hintRewardInterstitialLoaded) {
      setLoadingModal(false);
      hintRewardedInterstitial.show();
      setHintRewardInterstitialLoaded(false);
    }
  }, [hintRewardInterstitialLoaded]);

  //adAns
  useEffect(() => {
    if (ansRewardInterstitialLoaded) {
      setLoadingModal(false);
      ansRewardedInterstitial.show();
      setAnsRewardInterstitialLoaded(false);
    }
  }, [ansRewardInterstitialLoaded]);

  //interstaial
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    interstitial.load();
    checkDidQuestion();

    return unsubscribe;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingModal === true) {
        Alert.alert("ERROR", "can't load ads at the moment,\ntry again later");
        setLoadingModal(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [loadingModal]);

  const chooseAnimation = () => {
    let size = Object.keys(fullScreenAnimationDict).length;
    const num = Math.floor(Math.random() * size) + 1;
    return fullScreenAnimationDict[num].image;
  };

  // taking the image from ImageDict if id!=0
  let image;
  {
    riddle.image != 0
      ? (image = ImageDict[riddle.image].image)
      : (image = "no");
  }

  //save to asyncStorage
  const saveAnswer = async (Correct) => {
    let newAnswer = [];
    let userAnswer = {
      id: riddle.id,
      difficulty: riddle.difficulty,
      usedHints: false,
      usedAnswer: false,
    };
    if (Correct) {
      try {
        await storeData("@NumSolved", (counter + 1).toString());
      } catch (e) {
        console.log(e);
      }

      answer = {
        ...userAnswer,
        answer: textAnswer,
        solved: true,
        usedHints: userUsedHint ? userUsedHint : hintAlertUsed,
        usedAnswer: userUsedAnswer ? userUsedAnswer : answerAlertUsed,
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
  //checking if user already answered
  const checkDidQuestion = async () => {
    // clearData()
    let didQuestion = false;
    if (!(userData == null)) {
      userData.forEach((answer, index) => {
        // user visited the question
        if (answer.id === riddle.id) {
          didQuestion = true;
          setUserUsedHint(answer.usedHint);
          setUserUsedAnswer(answer.usedAnswer);
          if (answer.solved) {
            setEditableButtons(false);
            setAnswerByUser(answer.answer);
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

  //checking if the question is correct if so update db
  const checkAnswer = async () => {
    for (let answer of riddle.answers) {
      if (
        answer.answer.toString().toLowerCase() ===
        textAnswer.toString().toLowerCase().trim()
      ) {
        setCounter(counter + 1);
        setFinishedQuestion(true);
        await updateRiddle(riddle.id, (solved = true));
        setEditableButtons(false);
        saveAnswer(true);
        return;
      }
    }
    setWrongCounter((wrongCounter + 1) % 3);
    Alert.alert("Wrong", "Try Again");

    settings.vibration ? Vibration.vibrate() : null;
    if (!wrongCounter) {
      interstitial.show();
    }
  };

  const onPressHint = () => {
    if (!hintAlertUsed) {
      Alert.alert(
        "Watch Hint",
        "You are about to watch an ad. Do you agree?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              loadRewardHintAd(
                riddle.hint,
                setHintRewardInterstitialLoaded,
                setHintAlertUsed
              );
              setLoadingModal(true);

            },
          },
        ]
      );
      return true;
    } else {
      Alert.alert("Hint", riddle.hint);
      return false;
    }
  };

  const onPressAnswer = () => {
    if (!answerAlertUsed) {
      Alert.alert(
        "Watch Answer",
        "You are about to watch an ad. Do you agree?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              loadRewardAnsAd(
                riddle.explanation,
                setAnsRewardInterstitialLoaded,
                setAnswerAlertUsed
              );
              setLoadingModal(true);
            },
          },
        ]
      );
    } else {
      Alert.alert("Answer", riddle.explanation);
    }
  };
  

  const goToMenu = () => {
    setFinishedQuestion(false);
    unsolvedRiddles.length === 1 ? navigation.pop(2) : navigation.goBack();
  };

  const nextQuestion = () => {
    console.log(unsolvedRiddles);
    function findNextNumber(id) {
      if (unsolvedRiddles.includes(id)) {
        for (let i = 0; i <= unsolvedRiddles.length - 1; i++) {
          if (unsolvedRiddles[i] === id) {
            if (i === unsolvedRiddles.length - 1) return unsolvedRiddles[0];
            else return unsolvedRiddles[i + 1];
          }
        }
      } else {
        if (unsolvedRiddles.length === 0 || unsolvedRiddles === null)
          return null;
        else return unsolvedRiddles[0];
      }

      return null; // givenNumber not found or is the last number in the list
    }

    const nextNumber = findNextNumber(riddle.id);
    const index = unsolvedRiddles.indexOf(riddle.id);
    if (index > -1) unsolvedRiddles.splice(index, 1);
    console.log(riddle.id);
    if (nextNumber !== null) {
      //reset all the states
      setUserUsedHint(false);
      setUserUsedAnswer(false);
      setInterstitialLoaded(false);
      setHintRewardInterstitialLoaded(false);
      setAnsRewardInterstitialLoaded(false);
      setAnswerByUser("your answer");
      setTextAnswer("");
      setPicModalVisible(false);
      setHintAlertUsed(false);
      setAnswerAlertUsed(false);
      setWrongCounter(1);
      setEditableButtons(true);
      setLoadingModal(false);
      setFinishedQuestion(false);
      const nextRiddle = riddles.filter((riddle) => riddle.id === nextNumber);
      navigation.replace("Riddle", {
        riddle: nextRiddle[0],
        unsolvedRiddles,
      });
    }
  };
  return (
    <>
      <LottieView
        source={require("../../assets/Lottie/background.json")}
        autoPlay
        loop
        style={globalStyles.background}
        resizeMode="cover"
      />
      <CustomHeader />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={globalStyles.riddleContainer}
          enabled={false}
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

          <LoadingModal visible={loadingModal} />
          {unsolvedRiddles.length === 1 ? (
            <LastQuestionModal
              visible={finishedQuestion}
              setFinishedQuestion={setFinishedQuestion}
              onGoToMenu={goToMenu}
            />
          ) : (
            <SuccessModal
              visible={finishedQuestion}
              onNextQuestion={nextQuestion}
              onGoToMenu={goToMenu}
              setFinishedQuestion={setFinishedQuestion}
              riddleID={riddle.id}
            />
          )}

          <TextInput
            style={globalStyles.riddleTextInput}
            placeholder={answerByUser}
            value={textAnswer}
            onChangeText={textChangeHandler}
            editable={editablebuttons}
          />
          {finishedQuestion && (
            <LottieView
              source={chooseAnimation()}
              autoPlay
              loop={false}
              style={{ flex: 1 }}
            />
          )}
          <HintButton
            updateDBFunction={updateRiddle}
            riddleID={riddle.id}
            showRewardAd={onPressHint}
            userUsedHint={userUsedHint}
          />

          <AnswerButton
            hintAlertUsed={hintAlertUsed}
            updateDBFunction={updateRiddle}
            riddleID={riddle.id}
            showRewardAd={()=>onPressAnswer()}
            styles={{ left: 90 }}
            userUsedAnswer={userUsedAnswer}
          />

          <SubmitButton
            onPressFunction={
              unsolvedRiddles.length === 0
                ? goToMenu
                : editablebuttons === true
                ? checkAnswer
                : nextQuestion
            }
            editable={unsolvedRiddles.length === 0 ? 2 : editablebuttons}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <BottomBanner />
    </>
  );
}
