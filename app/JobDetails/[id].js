import React, { useCallback, useState, useEffect } from 'react'
import { Stack, useRouter, useSearchParams } from "expo-router";
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../Components/Index"
import { COLORS, Icons, Images, SIZES } from "../../Constants/Index"
import FetchDummy from '../../Utilities/FetchDummy';

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetail = () => {
    const params = useSearchParams();
    const router = useRouter();

    const { isLoading, error, refetch, GetDataByJobId } = FetchDummy();
    const data = GetDataByJobId(params.id)

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);

    const OnRefresh = useCallback(() => {
        setRefreshing(true);
        refetch()
        setRefreshing(false)
    }, []);

    const DisplayTabContent = () => {
        if (!data || data.length === 0) {
            return <Text>No data available</Text>;
        }

        const jobData = data;

        switch (activeTab) {
            case "Qualifications":
                return (
                    <Specifics
                        title="Qualifications"
                        points={jobData.job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );

            case "About":
                return <JobAbout info={jobData.job_description ?? "No data provided"} />;

            case "Responsibilities":
                return (
                    <Specifics
                        title="Responsibilities"
                        points={jobData.job_highlights?.Responsibilities ?? ["N/A"]}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
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
            <>
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />}
                >
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : (!data || data.length === 0) === 0 ? (
                        <Text>No data available</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={data?.employer_logo}
                                jobTitle={data?.job_title}
                                companyName={data?.employer_name}
                                location={data?.job_country}
                            />

                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {DisplayTabContent()}
                        </View>
                    )}
                </ScrollView>
                <JobFooter url={data?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetail