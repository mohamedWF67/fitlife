import {ScrollView, View} from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import GlobalGradientBackground from "@/components/GlobalGradientBackground";
import ProgressPhotoCarousel from "@/Features/Workouts/Presentation/components/ProgressPhotoCarousel";

const SafeAreaView = styled(RNSafeAreaView);

export default function ProgressPhotosScreen() {

    return <View className="flex-1 pl-4 pr-4 justify-center flex-row bg-[#18152b]">
        <GlobalGradientBackground/>
        <SafeAreaView className="flex-1 w-full max-w-2xl justify-center">
            <ScrollView>
                <ProgressPhotoCarousel/>
            </ScrollView>
        </SafeAreaView>
    </View>
}
