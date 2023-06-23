import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { shuffle } from "lodash"

import { COLORS, SIZES } from '../Constants/Theme';
import styles from "../Styles/PopularJobs"
import PopularJobCard from "../Components/Cards/PopularJobCard"
// import UseFetch from "../Utilities/UseFetch"
import FetchDummy from '../Utilities/FetchDummy';

const PopularJobs = () => {
    const router = useRouter();
    const { data, isLoading, error } = FetchDummy()
    const newData = shuffle(data)
    // const { data, isLoading, error } = UseFetch("search", {
    //     query: "React developer",
    //     num_pages: "1",
    // });

    const [selectedJob, setSelectedJob] = useState();

    const HandleCardPress = (item) => {
        router.push(`/JobDetails/${item.job_id}`);
        setSelectedJob(item.job_id);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular jobs</Text>
                <TouchableOpacity onPress={() => { router.push('/Popular') }}>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size='large' color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : (
                    <FlatList
                        data={newData}
                        renderItem={({ item }) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                HandleCardPress={HandleCardPress}
                            />
                        )}
                        keyExtractor={(item) => item.job_id}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default PopularJobs