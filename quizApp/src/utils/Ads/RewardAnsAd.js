import {
  RewardedInterstitialAd,
  TestIds,
  RewardedAdEventType,
  AdEventType,
} from "react-native-google-mobile-ads";
import { Alert } from "react-native";

const ansAdUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : "ca-app-pub-8453281779869033/4258626782";

export const ansRewardedInterstitial =
  RewardedInterstitialAd.createForAdRequest(ansAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

export const loadRewardAnsAd = (
  ans,
  setAnsRewardInterstitialLoaded,
  setAnswerAlertUsed
) => {
  ansRewardedInterstitial.removeAllListeners();
  const ansRewardUnsubscribeLoaded = ansRewardedInterstitial.addAdEventListener(
    RewardedAdEventType.LOADED,
    () => {
      setAnsRewardInterstitialLoaded(true);
    }
  );

  const ansRewardUnsubscribeEarned = ansRewardedInterstitial.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    (reward) => {
      setAnswerAlertUsed(true);
    }
  );
  const AnsRewardUnsubscribeClosed = ansRewardedInterstitial.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      Alert.alert("Answer", ans);
    }
  );

  ansRewardedInterstitial.load();

  return () => {
    ansRewardUnsubscribeLoaded();
    ansRewardUnsubscribeEarned();
    AnsRewardUnsubscribeClosed();
  };
};
