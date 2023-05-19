import {InterstitialAd, TestIds,MaxAdContentRating,} from "react-native-google-mobile-ads";

const InterstatialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-8453281779869033/8649830769";

export const interstitial = InterstitialAd.createForAdRequest(InterstatialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,

});

