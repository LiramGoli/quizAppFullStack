import { View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
const adUnitId = __DEV__ ? TestIds.BANNER: "ca-app-pub-8453281779869033/2340020393";

export default function BottomBanner() {
  return (
    <View style={{justifyContent: "center", alignItems: "center" }}>
      <BannerAd
        style={{ width: "100%", height: 100 }}
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
