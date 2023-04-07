import {
    RewardedInterstitialAd,
    TestIds,
  } from "react-native-google-mobile-ads";
  
  const adUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : "ca-app-pub-8453281779869033/4258626782";
  
  const ansRewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
    adUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    }
  );
  
  export default ansRewardedInterstitial;
  