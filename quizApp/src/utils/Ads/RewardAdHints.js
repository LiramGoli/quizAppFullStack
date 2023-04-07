import {
  RewardedInterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : "ca-app-pub-8453281779869033/8304262128";

const hintRewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  adUnitId,
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

export default hintRewardedInterstitial;
