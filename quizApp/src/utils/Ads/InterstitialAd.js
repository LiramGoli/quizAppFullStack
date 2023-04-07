import {InterstitialAd, TestIds} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-8453281779869033/8649830769";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default interstitial;
