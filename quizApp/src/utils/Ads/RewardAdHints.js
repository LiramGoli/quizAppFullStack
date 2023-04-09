import {
  RewardedInterstitialAd,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from "react-native-google-mobile-ads";
import { Alert } from "react-native";

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : "ca-app-pub-8453281779869033/8304262128";

export const hintRewardedInterstitial =
  RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

export const loadRewardHintAd = (hint, setHintRewardInterstitialLoaded,setHintAlertUsed) => {
  hintRewardedInterstitial.removeAllListeners()
  const hintRewardUnsubscribeLoaded =
    hintRewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setHintRewardInterstitialLoaded(true);
      }
    );

  const hintRewardUnsubscribeEarned =
    hintRewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        setHintAlertUsed(true)
      }
    );

  const hintRewardUnsubscribeClosed =
    hintRewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      Alert.alert("Hint", hint);
    });

  hintRewardedInterstitial.load();
  console.log(hintRewardedInterstitial);
  
  return () => {
    
    hintRewardUnsubscribeLoaded();
    hintRewardUnsubscribeEarned();
    hintRewardUnsubscribeClosed();
  };
};
