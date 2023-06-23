import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { shuffle } from "lodash"

import { COLORS } from "../Constants/Index"
import styles from "../Styles/NearByJobs"
import NearByJobCard from "../Components/Cards/NearByJobCard"
// import UseFetch from "../Utilities/UseFetch";
import FetchDummy from "../Utilities/FetchDummy";

const NearByJobs = () => {
    const router = useRouter();
    // const { data, isLoading, error } = UseFetch("search", {
    //     query: "React Native developer",
    //     num_pages: "1",
    // });
    const { data, isLoading, error } = FetchDummy();
    const newData = shuffle(data)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby jobs</Text>
                <TouchableOpacity onPress={() => { router.push('/NearBy') }}>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

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
    )
}

export default NearByJobs