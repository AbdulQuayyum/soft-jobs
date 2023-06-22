import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "Home",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        CustomFontLight: require("../Assets/Fonts/Nunito-Light.ttf"),
        CustomFontMedium: require("../Assets/Fonts/Nunito-Medium.ttf"),
        CustomFontRegular: require("../Assets/Fonts/Nunito-Regular.ttf"),
        CustomFontBold: require("../Assets/Fonts/Nunito-Bold.ttf"),
        CustomFontSemiBold: require("../Assets/Fonts/Nunito-SemiBold.ttf"),
        CustomFontExtraBold: require("../Assets/Fonts/Nunito-ExtraBold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack initialRouteName="Home">
            <Stack.Screen name="Home" />
        </Stack>
    )
};

export default Layout;