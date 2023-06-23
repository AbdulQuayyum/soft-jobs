import React, { useState } from 'react'
import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { shuffle } from "lodash"

import { Icons, Images, COLORS, SIZES } from "../Constants/Index"
import styles from '../Styles/NearByJobs';
import { ScreenHeaderBtn, NearByJobCard, Welcome } from '../Components/Index';
import FetchDummy from '../Utilities/FetchDummy';

const NearBy = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading, error } = FetchDummy()
    const newData = shuffle(data)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={Icons.Left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={Images.Profile} dimension='100%' />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        HandleClick={() => {
                            if (searchTerm) {
                                router.push(`/Search/${searchTerm}`)
                            }
                        }}
                    />
                    <Text style={styles.headerTitle}>Available Jobs near you</Text>
                    <View style={styles.cardsContainer}>
                        {isLoading ? (
                            <ActivityIndicator size='large' color={COLORS.primary} />
                        ) : error ? (
                            <Text>Something went wrong</Text>
                        ) : (
                            newData?.map((job) => (
                                <NearByJobCard
                                    job={job}
                                    key={`nearby-job-${job.job_id}`}
                                    HandleNavigate={() => router.push(`/JobDetails/${job.job_id}`)}
                                />
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NearBy