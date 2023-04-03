import { View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function BottomBanner() {
  return (
    <View style={{justifyContent: "center", alignItems: "center" }}>
      <BannerAd
        style={{ width: "100%", height: 100 }}
        unitId={TestIds.BANNER}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
