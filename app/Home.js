import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { Icons, Images, COLORS, SIZES } from "../Constants/Index"
import { NearByJobs, PopularJobs, ScreenHeaderBtn, Welcome } from "../Components/Index"

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={Icons.Menu} dimension='60%' />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={Images.Profile} dimension='100%' />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <Welcome
                        // searchTerm={searchTerm}
                        // setSearchTerm={setSearchTerm}
                        // handleClick={() => {
                        //     if (searchTerm) {
                        //         router.push(`/Search/${searchTerm}`)
                        //     }
                        // }}
                    />

                    <PopularJobs />
                    <NearByJobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home