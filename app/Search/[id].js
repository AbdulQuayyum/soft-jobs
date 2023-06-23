import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { Text, SafeAreaView } from 'react-native'

import { COLORS, Icons, SIZES } from "../../Constants/Index"
import { ScreenHeaderBtn } from "../../Components/Index"
import NearByJobCard from '../../Components/Cards/NearByJobCard'
import styles from "../../Styles/Search"
import FetchDummy from '../../Utilities/FetchDummy'
import MainData from "../../Data/Data.json"

const Search = () => {
    const NewMainData = MainData.data
    const params = useSearchParams();
    const router = useRouter()

    // const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [page, setPage] = useState(1);
    const { SearchByValue } = FetchDummy();

    const response = SearchByValue(params.id, NewMainData)
    const searchResult = response

    const HandlePagination = (direction) => {
        if (direction === 'left' && page > 1) {
            setPage(page - 1)
            HandleSearch()
        } else if (direction === 'right') {
            setPage(page + 1)
            HandleSearch()
        }
    }

    useEffect(() => {
        if (!searchResult) {
            setSearchLoader(true);
        } else {
            setSearchLoader(false);
        }
    }, [searchResult])
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
                    headerTitle: "",
                }}
            />

            <FlatList
                data={searchResult}
                renderItem={({ item }) => (
                    <NearByJobCard
                        job={item}
                        HandleNavigate={() => router.push(`/JobDetails/${item.job_id}`)}
                    />
                )}
                keyExtractor={(item) => item.job_id}
                contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.searchTitle}>{params.id}</Text>
                            <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
                        </View>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
                ListFooterComponent={() => (
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => HandlePagination('left')}
                        >
                            <Image
                                source={Icons.ChevronLeft}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <View style={styles.paginationTextBox}>
                            <Text style={styles.paginationText}>{page}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.paginationButton}
                            onPress={() => HandlePagination('right')}
                        >
                            <Image
                                source={Icons.ChevronRight}
                                style={styles.paginationImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Search